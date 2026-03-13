import type { AnySyncEvent, SyncEventEnum } from "@/domain/models/SyncEvent"
import type { PostHTTPClientOutputPort } from "@/domain/output/http/HttpClientOutputPort"
import type { SyncEngineOutputPort } from "@/domain/output/sync/SyncEngineOutputPort"
import type { GetPendingSyncQueueOutputPort, MarkAsSyncedSyncQueueOutputPort } from "@/domain/output/sync/SyncQueueOutputPort"

type RemoteSyncEvent = {
  id: string,
  type: SyncEventEnum,
  payload: object,
  createdAt: string,
}

export class SyncEngine implements SyncEngineOutputPort {

  private isRunning = false

  constructor(
    private readonly queue: GetPendingSyncQueueOutputPort & MarkAsSyncedSyncQueueOutputPort,
    private readonly httpClient: PostHTTPClientOutputPort
  ) {}

  async trigger() {
    if (this.isRunning) return
    if (!navigator.onLine) return

    this.isRunning = true

    const pending = await this.queue.getPending()

    const requestBody = pending.map((syncEvent) => this.toRemoteSyncEnvent(syncEvent))
    await this.httpClient.post({ url: "/sync/events", body: requestBody })
    
    await Promise.all(
      pending.map((event) => this.queue.markAsSynced(event.id))
    )

    this.isRunning = false
  }

  toRemoteSyncEnvent(syncEvent: AnySyncEvent): RemoteSyncEvent {
    return {
      id: syncEvent.id,
      createdAt: syncEvent.createdAt.toISOString(),
      type: syncEvent.type,
      payload: syncEvent.payload as object
    }
  }
}