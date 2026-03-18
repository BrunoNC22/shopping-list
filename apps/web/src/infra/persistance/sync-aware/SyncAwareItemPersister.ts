import { SyncEvent, SyncEventEnum, type AddEventSyncQueueOutputPort, type IdGeneratorOutputPort, type Item, type ItemPersisterOutputPort, type SyncEngineOutputPort } from "@shopping-list/domain"

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