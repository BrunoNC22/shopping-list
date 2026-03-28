import { describe, it, expect, beforeEach } from "vitest"
import "fake-indexeddb/auto"
import { IndexedDBSyncQueueAdapter } from "./IndexedDBSyncQueueAdapter"
import { SyncEvent, SyncEventEnum, type AnySyncEvent } from "@shopping-list/domain"




function createCreateCategoryEvent(): AnySyncEvent {
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

function createCreateItemEvent(): AnySyncEvent {
  return new SyncEvent(
    "event-2",
    SyncEventEnum.CREATE_ITEM,
    {
      id: "item-1",
      itemListId: "list-1",
      name: "Rice",
      price: 10,
      amount: 2,
      categoryId: "cat-1",
      checked: false
    },
    new Date("2024-01-01T11:00:00Z")
  )
}

function createCreateItemListEvent(): AnySyncEvent {
  return new SyncEvent(
    "event-3",
    SyncEventEnum.CREATE_ITEM_LIST,
    {
      id: "list-1",
      userId: "asdjas",
      name: "Groceries",
      createdAt: new Date("2024-01-01T09:00:00Z")
    },
    new Date("2024-01-01T12:00:00Z")
  )
}



describe("IndexedDBSyncQueueAdapter", () => {

  let adapter: IndexedDBSyncQueueAdapter

  beforeEach(() => {
    adapter = new IndexedDBSyncQueueAdapter()
  })



  it("deve adicionar evento na fila", async () => {

    const event = createCreateCategoryEvent()

    await adapter.add(event)

    const pending = await adapter.getPending()

    expect(pending.length).toBe(1)

    const stored = pending[0]

    expect(stored.id).toBe(event.id)
    expect(stored.type).toBe(SyncEventEnum.CREATE_CATEGORY)

    if (stored.type === SyncEventEnum.CREATE_CATEGORY) {
      expect(stored.payload.name).toBe("Food")
    }

  })



  it("deve retornar apenas eventos não sincronizados", async () => {

    const event1 = createCreateCategoryEvent()
    const event2 = createCreateItemEvent()

    await adapter.add(event1)
    await adapter.add(event2)

    await adapter.markAsSynced(event1.id)

    const pending = await adapter.getPending()

    expect(pending.length).toBe(1)
    expect(pending[0].id).toBe(event2.id)

  })



  it("deve marcar evento como sincronizado", async () => {

    const event = createCreateItemEvent()

    await adapter.add(event)

    await adapter.markAsSynced(event.id)

    const pending = await adapter.getPending()

    expect(pending.length).toBe(0)

  })



  it("deve persistir múltiplos tipos de eventos", async () => {

    const categoryEvent = createCreateCategoryEvent()
    const itemEvent = createCreateItemEvent()
    const listEvent = createCreateItemListEvent()

    await adapter.add(categoryEvent)
    await adapter.add(itemEvent)
    await adapter.add(listEvent)

    const pending = await adapter.getPending()

    expect(pending.length).toBe(3)

    const types = pending.map(e => e.type)

    expect(types).toContain(SyncEventEnum.CREATE_CATEGORY)
    expect(types).toContain(SyncEventEnum.CREATE_ITEM)
    expect(types).toContain(SyncEventEnum.CREATE_ITEM_LIST)

  })



  it("deve restaurar corretamente datas ao converter do storage", async () => {

    const event = createCreateItemListEvent()

    await adapter.add(event)

    const pending = await adapter.getPending()

    const stored = pending[0]

    expect(stored.createdAt instanceof Date).toBe(true)

    if (stored.type === SyncEventEnum.CREATE_ITEM_LIST) {
      expect(stored.payload.createdAt instanceof Date).toBe(true)
    }

  })



  it("não deve falhar ao marcar evento inexistente como sincronizado", async () => {

    await expect(
      adapter.markAsSynced("evento-inexistente")
    ).resolves.toBeUndefined()

  })

})