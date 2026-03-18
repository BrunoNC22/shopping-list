import { Categoria, SyncEvent, SyncEventEnum, type AddEventSyncQueueOutputPort, type CategoryPersisterOutputPort, type IdGeneratorOutputPort, type SyncEngineOutputPort } from "@shopping-list/domain"


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