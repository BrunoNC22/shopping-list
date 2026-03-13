import { describe, it, expect, beforeEach } from "vitest"

import { SyncEventEnum, type AnySyncEvent } from "@/domain/models/SyncEvent"

import { Categoria } from "@/domain/models/Categoria"

import type {
  CategoryPersisterOutputPort
} from "@/domain/output/persistance/CategoryPersisterOutputPort"

import type { AddEventSyncQueueOutputPort } from "@/domain/output/sync/SyncQueueOutputPort"
import type { SyncEngineOutputPort } from "@/domain/output/sync/SyncEngineOutputPort"
import type { IdGeneratorOutputPort } from "@/domain/output/id/IdGeneratorOutputPort"
import { SyncAwareCategoryPersister } from "./SyncAwareCategoryPersister"




class CategoryPersisterMock implements CategoryPersisterOutputPort {

  saved: Categoria[] = []
  categories: Categoria[] = []

  async save(category: Categoria): Promise<void> {
    this.saved.push(category)
  }

  async getAll(): Promise<Categoria[]> {
    return this.categories
  }

  async getById(id: string): Promise<Categoria> {
    const found = this.categories.find(c => c.id === id)

    if (!found) {
      throw new Error("Category not found")
    }

    return found
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



describe("SyncAwareCategoryPersister", () => {

  let remote: CategoryPersisterMock
  let local: CategoryPersisterMock
  let queue: SyncQueueMock
  let engine: SyncEngineMock
  let idGenerator: IdGeneratorMock

  let persister: SyncAwareCategoryPersister



  beforeEach(() => {

    Object.defineProperty(global.navigator, "onLine", {
      value: true,
      configurable: true
    })

    remote = new CategoryPersisterMock()
    local = new CategoryPersisterMock()
    queue = new SyncQueueMock()
    engine = new SyncEngineMock()
    idGenerator = new IdGeneratorMock()

    persister = new SyncAwareCategoryPersister(
      remote,
      local,
      queue,
      engine,
      idGenerator
    )

  })



  it("save deve salvar categoria localmente", async () => {

    const category = createCategory()

    await persister.save(category)

    expect(local.saved.length).toBe(1)
    expect(local.saved[0].id).toBe(category.id)

  })



  it("save deve criar evento CREATE_CATEGORY", async () => {

    const category = createCategory()

    await persister.save(category)

    expect(queue.events.length).toBe(1)

    const event = queue.events[0]

    expect(event.type).toBe(SyncEventEnum.CREATE_CATEGORY)

    if (event.type === SyncEventEnum.CREATE_CATEGORY) {
      expect(event.payload.id).toBe(category.id)
      expect(event.payload.name).toBe(category.nome)
    }

  })



  it("save deve disparar syncEngine", async () => {

    const category = createCategory()

    await persister.save(category)

    expect(engine.triggerCalled).toBe(true)

  })



  it("getAll deve usar remoto quando online", async () => {

    const category = createCategory()

    remote.categories = [category]

    const result = await persister.getAll()

    expect(result.length).toBe(1)
    expect(result[0].id).toBe(category.id)

  })



  it("getAll deve usar local quando offline", async () => {

    Object.defineProperty(global.navigator, "onLine", {
      value: false,
      configurable: true
    })

    const category = createCategory()

    local.categories = [category]

    const result = await persister.getAll()

    expect(result.length).toBe(1)
    expect(result[0].id).toBe(category.id)

  })



  it("getById deve usar remoto quando online", async () => {

    const category = createCategory()

    remote.categories = [category]

    const result = await persister.getById(category.id)

    expect(result.id).toBe(category.id)

  })



  it("getById deve usar local quando offline", async () => {

    Object.defineProperty(global.navigator, "onLine", {
      value: false,
      configurable: true
    })

    const category = createCategory()

    local.categories = [category]

    const result = await persister.getById(category.id)

    expect(result.id).toBe(category.id)

  })

})