import { describe, it, expect, beforeEach } from "vitest"
import { SyncAwareItemPersister } from "./SyncAwareItemPersister"
import { Categoria, Item, SyncEventEnum, type AddEventSyncQueueOutputPort, type AnySyncEvent, type IdGeneratorOutputPort, type ItemPersisterOutputPort, type SyncEngineOutputPort } from "@shopping-list/domain"


class ItemPersisterMock implements ItemPersisterOutputPort {
  saved: Item[] = []
  deleted: string[] = []
  replaced: Item[][] = []
  items: Item[] = []

  async save(item: Item): Promise<void> {
    this.saved.push(item)
  }

  async delete(itemId: string): Promise<void> {
    this.deleted.push(itemId)
  }

  async replace(_: string, items: Item[]): Promise<void> {
    this.replaced.push(items)
  }

  async getAll(): Promise<Item[]> {
    return this.items
  }

  async getById(id: string): Promise<Item> {

    const found = this.items.find(i => i.id === id)

    if (!found) {
      throw new Error("Item not found")
    }

    return found
  }

  async getByItemListId(itemListId: string): Promise<Item[]> {
    return this.items.filter(i => i.itemListId === itemListId)
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



function createCategory(): Categoria {

  return new Categoria("cat-1", "Food")
}


function createItem(): Item {

  const category = createCategory()

  return new Item(
    "item-1",
    "list-1",
    "Milk",
    5,
    2,
    category,
    false
  )

}



describe("SyncAwareItemPersister", () => {

  let remote: ItemPersisterMock
  let local: ItemPersisterMock
  let queue: SyncQueueMock
  let engine: SyncEngineMock
  let idGenerator: IdGeneratorMock

  let persister: SyncAwareItemPersister



  beforeEach(() => {

    Object.defineProperty(global.navigator, "onLine", {
      value: true,
      configurable: true
    })

    remote = new ItemPersisterMock()
    local = new ItemPersisterMock()
    queue = new SyncQueueMock()
    engine = new SyncEngineMock()
    idGenerator = new IdGeneratorMock()

    persister = new SyncAwareItemPersister(
      local,
      queue,
      engine,
      idGenerator
    )

  })



  it("save deve salvar item localmente", async () => {

    const item = createItem()

    await persister.save(item)

    expect(local.saved.length).toBe(1)
    expect(local.saved[0].id).toBe(item.id)

  })



  it("save deve criar evento CREATE_ITEM", async () => {

    const item = createItem()

    await persister.save(item)

    expect(queue.events.length).toBe(1)

    const event = queue.events[0]

    expect(event.type).toBe(SyncEventEnum.CREATE_ITEM)

    if (event.type === SyncEventEnum.CREATE_ITEM) {
      expect(event.payload.id).toBe(item.id)
      expect(event.payload.name).toBe(item.name)
      expect(event.payload.itemListId).toBe(item.itemListId)
    }

  })



  it("save deve disparar syncEngine", async () => {

    const item = createItem()

    await persister.save(item)

    expect(engine.triggerCalled).toBe(true)

  })



  it("delete deve remover item localmente", async () => {

    await persister.delete("item-1")

    expect(local.deleted.length).toBe(1)
    expect(local.deleted[0]).toBe("item-1")

  })



  it("delete deve criar evento DELETE_ITEM", async () => {

    await persister.delete("item-1")

    expect(queue.events.length).toBe(1)

    const event = queue.events[0]

    expect(event.type).toBe(SyncEventEnum.DELETE_ITEM)

    if (event.type === SyncEventEnum.DELETE_ITEM) {
      expect(event.payload.id).toBe("item-1")
    }

  })



  it("getAll deve usar remoto quando online", async () => {

    const item = createItem()

    remote.items = [item]

    const result = await persister.getAll()

    expect(result.length).toBe(1)
    expect(result[0].id).toBe(item.id)

  })



  it("getAll deve usar local quando offline", async () => {

    Object.defineProperty(global.navigator, "onLine", {
      value: false,
      configurable: true
    })

    const item = createItem()

    local.items = [item]

    const result = await persister.getAll()

    expect(result.length).toBe(1)
    expect(result[0].id).toBe(item.id)

  })



  it("getById deve usar remoto quando online", async () => {

    const item = createItem()

    remote.items = [item]

    const result = await persister.getById(item.id)

    expect(result.id).toBe(item.id)

  })



  it("getById deve usar local quando offline", async () => {

    Object.defineProperty(global.navigator, "onLine", {
      value: false,
      configurable: true
    })

    const item = createItem()

    local.items = [item]

    const result = await persister.getById(item.id)

    expect(result.id).toBe(item.id)

  })



  it("getByItemListId deve usar remoto quando online", async () => {

    const item = createItem()

    remote.items = [item]

    const result = await persister.getByItemListId(item.itemListId)

    expect(result.length).toBe(1)

  })



  it("getByItemListId deve usar local quando offline", async () => {

    Object.defineProperty(global.navigator, "onLine", {
      value: false,
      configurable: true
    })

    const item = createItem()

    local.items = [item]

    const result = await persister.getByItemListId(item.itemListId)

    expect(result.length).toBe(1)

  })
})