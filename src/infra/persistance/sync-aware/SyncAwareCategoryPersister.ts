import type { Categoria } from "@/domain/models/Categoria"

import SyncEvent, { SyncEventEnum } from "@/domain/models/SyncEvent"

import type { CategoryPersisterOutputPort } from "@/domain/output/persistance/CategoryPersisterOutputPort"
import type { AddEventSyncQueueOutputPort } from "@/domain/output/sync/SyncQueueOutputPort"
import type { SyncEngineOutputPort } from "@/domain/output/sync/SyncEngineOutputPort"
import type { IdGeneratorOutputPort } from "@/domain/output/id/IdGeneratorOutputPort"



export class SyncAwareCategoryPersister implements CategoryPersisterOutputPort {

  constructor(
    private readonly remoteCategoryPersister: CategoryPersisterOutputPort,
    private readonly localCategoryPersister: CategoryPersisterOutputPort,
    private readonly syncQueue: AddEventSyncQueueOutputPort,
    private readonly syncEngine: SyncEngineOutputPort,
    private readonly idGenerator: IdGeneratorOutputPort
  ) {}



  async save(category: Categoria): Promise<void> {

    await this.localCategoryPersister.save(category)

    const syncEventId = await this.idGenerator.generate()

    const syncEvent = new SyncEvent(
      syncEventId,
      SyncEventEnum.CREATE_CATEGORY,
      {
        id: category.id,
        name: category.nome
      },
      new Date()
    )

    await this.syncQueue.add(syncEvent)

    this.syncEngine.trigger()

  }



  async getAll(): Promise<Categoria[]> {

    if (navigator.onLine) {
      return await this.remoteCategoryPersister.getAll()
    }

    return await this.localCategoryPersister.getAll()

  }



  async getById(id: string): Promise<Categoria> {

    if (navigator.onLine) {
      return await this.remoteCategoryPersister.getById(id)
    }

    return await this.localCategoryPersister.getById(id)

  }

}