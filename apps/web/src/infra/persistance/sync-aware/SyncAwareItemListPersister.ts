import { ItemList, SyncEvent, SyncEventEnum, type AddEventSyncQueueOutputPort, type IdGeneratorOutputPort, type ItemListPersisterOutputPort, type SyncEngineOutputPort } from "@shopping-list/domain"


export class SyncAwareItemListPersister implements ItemListPersisterOutputPort {
  constructor(
    private readonly remoteItemListPersister: ItemListPersisterOutputPort,
    private readonly localItemListPersister: ItemListPersisterOutputPort,
    private readonly syncQueue: AddEventSyncQueueOutputPort,
    private readonly syncEngine: SyncEngineOutputPort,
    private readonly idGenerator: IdGeneratorOutputPort
  ) {}

  async delete(listId: string): Promise<void> {
    await this.localItemListPersister.delete(listId)
    const syncEventId = await this.idGenerator.generate()
    const syncEvent = new SyncEvent(
      syncEventId,
      SyncEventEnum.DELETE_ITEM_LIST,
      {
        id: listId
      },
      new Date()
    )
    await this.syncQueue.add(syncEvent)

    this.syncEngine.trigger()
  }

  async get(listId: string): Promise<ItemList> {
    if (navigator.onLine) {
      return await this.remoteItemListPersister.get(listId)
    }

    return await this.localItemListPersister.get(listId)
  }

  async getAll(): Promise<ItemList[]> {
    if (navigator.onLine) {
      return await this.remoteItemListPersister.getAll()
    }

    return await this.localItemListPersister.getAll()
  }

  async save(itemList: ItemList): Promise<void> {
    await this.localItemListPersister.save(itemList)

    const syncEventId = await this.idGenerator.generate()
    
    const syncEvent = new SyncEvent(
      syncEventId,
      SyncEventEnum.CREATE_ITEM_LIST,
      { 
        id: itemList.id,
        name: itemList.name,
        createdAt: itemList.createdAt
      },
      new Date()
    )
    await this.syncQueue.add(syncEvent)

    this.syncEngine.trigger()
  }
}