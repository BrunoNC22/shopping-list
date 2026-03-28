import { ItemList, SyncEvent, SyncEventEnum, type AddEventSyncQueueOutputPort, type GetPendingSyncQueueOutputPort, type IdGeneratorOutputPort, type ItemListPersisterOutputPort, type SyncEngineOutputPort } from "@shopping-list/domain"


export class SyncAwareItemListPersister implements ItemListPersisterOutputPort {
  constructor(
    private readonly localItemListPersister: ItemListPersisterOutputPort,
    private readonly syncQueue: AddEventSyncQueueOutputPort & GetPendingSyncQueueOutputPort,
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
    return await this.localItemListPersister.get(listId)
  }

  async getAll(): Promise<ItemList[]> {
    return await this.localItemListPersister.getAll()
  }

  async getAllByUserId(userId: string): Promise<ItemList[]> {
    return await this.localItemListPersister.getAllByUserId(userId)
  }

  async replaceByUserId(userId: string, itemLists: ItemList[]): Promise<void> {
    await this.localItemListPersister.replaceByUserId(userId, itemLists)
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
        createdAt: itemList.createdAt,
        userId: itemList.userId
      },
      new Date()
    )
    await this.syncQueue.add(syncEvent)

    this.syncEngine.trigger()
  }
}