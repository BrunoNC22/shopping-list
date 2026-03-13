import type ItemList from "@/domain/models/ItemList";
import SyncEvent, { SyncEventEnum } from "@/domain/models/SyncEvent";
import type { IdGeneratorOutputPort } from "@/domain/output/id/IdGeneratorOutputPort";
import type { ItemListPersisterOutputPort } from "@/domain/output/persistance/ItemListPersisterOutputPort";
import type { SyncEngineOutputPort } from "@/domain/output/sync/SyncEngineOutputPort";
import type { AddEventSyncQueueOutputPort } from "@/domain/output/sync/SyncQueueOutputPort";

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