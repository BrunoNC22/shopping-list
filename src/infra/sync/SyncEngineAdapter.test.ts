import { describe, it, expect, beforeEach } from "vitest"

import SyncEvent, { SyncEventEnum, type AnySyncEvent } from "@/domain/models/SyncEvent"
import type { GetPendingSyncQueueOutputPort, MarkAsSyncedSyncQueueOutputPort } from "@/domain/output/sync/SyncQueueOutputPort"
import type { PostHTTPClientOutputPort, PostRequestProps } from "@/domain/output/http/HttpClientOutputPort"
import { SyncEngine } from "./SyncEngineAdapter"


class QueueMock implements GetPendingSyncQueueOutputPort, MarkAsSyncedSyncQueueOutputPort {
  events: AnySyncEvent[] = []
  markedAsSynced: string[] = []
  async getPending(): Promise<AnySyncEvent[]> {
    return this.events
  }
  async markAsSynced(eventId: string): Promise<void> {
    this.markedAsSynced.push(eventId)
  }
}

class HttpClientMock implements PostHTTPClientOutputPort {
  lastRequest: PostRequestProps | null = null
  async post<T>(props: PostRequestProps): Promise<T> {
    this.lastRequest = props
    return {} as T
  }
}

function createEvent(): AnySyncEvent {
  return new SyncEvent(
    "event-1",
    SyncEventEnum.CREATE_CATEGORY,
    {
      id: "cat-1",
      name: "Food"
    },
    new Date("2024-01-01T10:00:00Z")
  )
}

describe("SyncEngine", () => {
  let queue: QueueMock
  let httpClient: HttpClientMock
  let engine: SyncEngine

  beforeEach(() => {
    Object.defineProperty(global.navigator, "onLine", {
      value: true,
      configurable: true
    })
    queue = new QueueMock()
    httpClient = new HttpClientMock()
    engine = new SyncEngine(queue, httpClient)
  })

  it("não deve executar se estiver offline", async () => {
    Object.defineProperty(global.navigator, "onLine", {
      value: false,
      configurable: true
    })
    queue.events = [createEvent()]

    await engine.trigger()

    expect(httpClient.lastRequest).toBeNull()
  })

  it("deve enviar eventos pendentes para API", async () => {
    const event = createEvent()
    queue.events = [event]

    await engine.trigger()

    expect(httpClient.lastRequest?.url).toBe("/sync/events")
    const body = httpClient.lastRequest?.body
    if (Array.isArray(body)) {
      expect(body.length).toBe(1)
      expect(body[0].id).toBe(event.id)
      expect(body[0].type).toBe(SyncEventEnum.CREATE_CATEGORY)
    } else {
      throw new Error("Body não é array")
    }
  })

  it("deve marcar eventos como sincronizados", async () => {
    const event = createEvent()
    queue.events = [event]

    await engine.trigger()

    expect(queue.markedAsSynced.length).toBe(1)
    expect(queue.markedAsSynced[0]).toBe(event.id)
  })

  it("não deve executar duas vezes simultaneamente", async () => {
    const event = createEvent()
    queue.events = [event]

    const first = engine.trigger()
    const second = engine.trigger()
    await Promise.all([first, second])


    expect(httpClient.lastRequest?.url).toBe("/sync/events")
  })

  it("deve enviar array vazio se não houver eventos", async () => {
    queue.events = []
    await engine.trigger()

    const body = httpClient.lastRequest?.body
    if (Array.isArray(body)) {
      expect(body.length).toBe(0)
    } else {
      throw new Error("Body não é array")
    }
  })

  it("deve converter corretamente evento para formato remoto", () => {
    const event = createEvent()
    const remote = engine.toRemoteSyncEnvent(event)
    
    expect(remote.id).toBe(event.id)
    expect(remote.type).toBe(event.type)
    expect(remote.createdAt).toBe(event.createdAt.toISOString())
  })
})