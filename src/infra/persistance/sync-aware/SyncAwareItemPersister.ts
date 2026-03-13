import Item from "@/domain/models/Item"

import SyncEvent, { SyncEventEnum } from "@/domain/models/SyncEvent"

import type { ItemPersisterOutputPort } from "@/domain/output/persistance/ItemPersisterOutputPort"
import type { AddEventSyncQueueOutputPort } from "@/domain/output/sync/SyncQueueOutputPort"
import type { SyncEngineOutputPort } from "@/domain/output/sync/SyncEngineOutputPort"
import type { IdGeneratorOutputPort } from "@/domain/output/id/IdGeneratorOutputPort"



export class SyncAwareItemPersister implements ItemPersisterOutputPort {

  constructor(
    private readonly remoteItemPersister: ItemPersisterOutputPort,
    private readonly localItemPersister: ItemPersisterOutputPort,
    private readonly syncQueue: AddEventSyncQueueOutputPort,
    private readonly syncEngine: SyncEngineOutputPort,
    private readonly idGenerator: IdGeneratorOutputPort
  ) {}



  async save(item: Item): Promise<void> {

    await this.localItemPersister.save(item)

    const syncEventId = await this.idGenerator.generate()

    const syncEvent = new SyncEvent(
      syncEventId,
      SyncEventEnum.CREATE_ITEM,
      {
        id: item.id,
        itemListId: item.itemListId,
        name: item.name,
        price: item.price,
        amount: item.amount,
        categoryId: item.category.id,
        checked: item.checked
      },
      new Date()
    )

    await this.syncQueue.add(syncEvent)

    this.syncEngine.trigger()

  }



  async delete(itemId: string): Promise<void> {

    await this.localItemPersister.delete(itemId)

    const syncEventId = await this.idGenerator.generate()

    const syncEvent = new SyncEvent(
      syncEventId,
      SyncEventEnum.DELETE_ITEM,
      {
        id: itemId
      },
      new Date()
    )

    await this.syncQueue.add(syncEvent)

    this.syncEngine.trigger()

  }



  async replace(items: Item[]): Promise<void> {
    await this.localItemPersister.replace(items)
  }



  async getAll(): Promise<Item[]> {

    if (navigator.onLine) {
      return await this.remoteItemPersister.getAll()
    }

    return await this.localItemPersister.getAll()

  }



  async getById(id: string): Promise<Item> {

    if (navigator.onLine) {
      return await this.remoteItemPersister.getById(id)
    }

    return await this.localItemPersister.getById(id)

  }



  async getByItemListId(itemListId: string): Promise<Item[]> {

    if (navigator.onLine) {
      return await this.remoteItemPersister.getByItemListId(itemListId)
    }

    return await this.localItemPersister.getByItemListId(itemListId)

  }

}