import { describe, it, expect, beforeEach } from "vitest"

import { SyncAwareItemListPersister } from "./SyncAwareItemListPersister"

import { SyncEventEnum } from "@/domain/models/SyncEvent"
import type { AnySyncEvent } from "@/domain/models/SyncEvent"

import type ItemList from "@/domain/models/ItemList"

import type { ItemListPersisterOutputPort } from "@/domain/output/persistance/ItemListPersisterOutputPort"
import type { AddEventSyncQueueOutputPort } from "@/domain/output/sync/SyncQueueOutputPort"
import type { SyncEngineOutputPort } from "@/domain/output/sync/SyncEngineOutputPort"
import type { IdGeneratorOutputPort } from "@/domain/output/id/IdGeneratorOutputPort"



class ItemListPersisterMock implements ItemListPersisterOutputPort {

  saved: ItemList[] = []
  deleted: string[] = []
  lists: ItemList[] = []

  async save(itemList: ItemList): Promise<void> {
    this.saved.push(itemList)
  }

  async delete(listId: string): Promise<void> {
    this.deleted.push(listId)
  }

  async get(listId: string): Promise<ItemList> {
    const found = this.lists.find(l => l.id === listId)

    if (!found) {
      throw new Error("ItemList not found")
    }

    return found
  }

  async getAll(): Promise<ItemList[]> {
    return this.lists
  }

}



class SyncQueueMock implements AddEventSyncQueueOutputPort {

  events: AnySyncEvent[] = []

  async add(event: AnySyncEvent): Promise<void> {
    this.events.push(event)
  }

}



class SyncEngineMock implements SyncEngineOutputPort {

  triggerCalled = false

  async trigger(): Promise<void> {
    this.triggerCalled = true
  }

}



class IdGeneratorMock implements IdGeneratorOutputPort {

  async generate(): Promise<string> {
    return "sync-event-id"
  }

}



function createItemList(): ItemList {
  return {
    id: "list-1",
    name: "Groceries",
    createdAt: new Date("2024-01-01T10:00:00Z")
  } as ItemList
}



describe("SyncAwareItemListPersister", () => {

  let remote: ItemListPersisterMock
  let local: ItemListPersisterMock
  let queue: SyncQueueMock
  let engine: SyncEngineMock
  let idGenerator: IdGeneratorMock

  let persister: SyncAwareItemListPersister



  beforeEach(() => {

    Object.defineProperty(global.navigator, "onLine", {
      value: true,
      configurable: true
    })

    remote = new ItemListPersisterMock()
    local = new ItemListPersisterMock()
    queue = new SyncQueueMock()
    engine = new SyncEngineMock()
    idGenerator = new IdGeneratorMock()

    persister = new SyncAwareItemListPersister(
      remote,
      local,
      queue,
      engine,
      idGenerator
    )

  })



  it("save deve salvar localmente", async () => {

    const list = createItemList()

    await persister.save(list)

    expect(local.saved.length).toBe(1)
    expect(local.saved[0].id).toBe(list.id)

  })



  it("save deve criar evento CREATE_ITEM_LIST", async () => {

    const list = createItemList()

    await persister.save(list)

    expect(queue.events.length).toBe(1)

    const event = queue.events[0]

    expect(event.type).toBe(SyncEventEnum.CREATE_ITEM_LIST)

    if (event.type === SyncEventEnum.CREATE_ITEM_LIST) {
      expect(event.payload.id).toBe(list.id)
      expect(event.payload.name).toBe(list.name)
    }

  })



  it("save deve disparar syncEngine", async () => {

    const list = createItemList()

    await persister.save(list)

    expect(engine.triggerCalled).toBe(true)

  })



  it("delete deve remover localmente", async () => {

    await persister.delete("list-1")

    expect(local.deleted.length).toBe(1)
    expect(local.deleted[0]).toBe("list-1")

  })



  it("delete deve criar evento DELETE_ITEM_LIST", async () => {

    await persister.delete("list-1")

    expect(queue.events.length).toBe(1)

    const event = queue.events[0]

    expect(event.type).toBe(SyncEventEnum.DELETE_ITEM_LIST)

    if (event.type === SyncEventEnum.DELETE_ITEM_LIST) {
      expect(event.payload.id).toBe("list-1")
    }

  })



  it("get deve usar remoto quando online", async () => {

    const list = createItemList()

    remote.lists = [list]

    const result = await persister.get(list.id)

    expect(result.id).toBe(list.id)

  })



  it("get deve usar local quando offline", async () => {

    Object.defineProperty(global.navigator, "onLine", {
      value: false,
      configurable: true
    })

    const list = createItemList()

    local.lists = [list]

    const result = await persister.get(list.id)

    expect(result.id).toBe(list.id)

  })



  it("getAll deve usar remoto quando online", async () => {

    const list = createItemList()

    remote.lists = [list]

    const result = await persister.getAll()

    expect(result.length).toBe(1)
    expect(result[0].id).toBe(list.id)

  })



  it("getAll deve usar local quando offline", async () => {

    Object.defineProperty(global.navigator, "onLine", {
      value: false,
      configurable: true
    })

    const list = createItemList()

    local.lists = [list]

    const result = await persister.getAll()

    expect(result.length).toBe(1)
    expect(result[0].id).toBe(list.id)

  })

})