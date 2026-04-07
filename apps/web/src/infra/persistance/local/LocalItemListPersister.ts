import { Item, ItemList, ItemListNotFoundError, ResourceNotFoundError, type GetAllItemsPersisterOutputPort, type getByItemListIdItemPersisterOutputPort, type GetCacheStorageOutputPort, type ItemListPersisterOutputPort, type ReplaceItemsPersisterOutputPort, type SetCacheStorageOutputPort } from "@shopping-list/domain"

export type StorageItemList = {
  id: string,
  name: string,
  createdAt: string,
  userId: string
}

export class LocalItemListPersister implements ItemListPersisterOutputPort {
  private key = 'itemList'
  constructor(
    private readonly cacheStorage: SetCacheStorageOutputPort & GetCacheStorageOutputPort,
    private readonly itemPersister: getByItemListIdItemPersisterOutputPort & GetAllItemsPersisterOutputPort & ReplaceItemsPersisterOutputPort
  ) {}

  async get(listId: string): Promise<ItemList> {
    const itemLists = await this.findAllOrThrow()

    const foundItemList = itemLists.find((storageItemList) => storageItemList.id === listId)

    if (!foundItemList) throw new ItemListNotFoundError(`Não foi possivel encontrar a lista de itens com id ${listId}`)

    const items = await this.itemPersister.getByItemListId(listId)

    return this.convertStorageItemListToDomain(foundItemList, items)
  }

  async getAll(): Promise<ItemList[]> {
    const storageItemList = await this.findAllOrThrow()
    const allItems = await this.itemPersister.getAll()
    return storageItemList.map((stirageItemList) => {
      const items = allItems.filter((item) => item.itemListId === stirageItemList.id)

      return this.convertStorageItemListToDomain(stirageItemList, items)
    })
  }

  async getAllByUserId(userId: string): Promise<ItemList[]> {
    const storageItemLists = await this.findAllOrThrow()
    const allItems = await this.itemPersister.getAll()
    
    return storageItemLists
      .filter(storageItemList => storageItemList.userId === userId)
      .map(storageItemList => {
        const items = allItems.filter((item) => item.itemListId === storageItemList.id)

        return this.convertStorageItemListToDomain(storageItemList, items)
      })
  }

  async replaceByUserId(userId: string, itemLists: ItemList[]): Promise<void> {
    const storageItemLists = await this.findAllOrThrow()
    const filteredItemLists = storageItemLists.filter(storageItemList => storageItemList.userId !== userId)
    const convertedItemLists = await Promise.all(itemLists.map(async itemList => {
      await this.itemPersister.replace(itemList.id, Array.from(itemList.getItems()))

      return this.convertDomainItemListToStorage(itemList)
    }))

    filteredItemLists.push(...convertedItemLists)

    await this.cacheStorage.set(this.key, filteredItemLists)
  }

  async save(itemList: ItemList): Promise<void> {
    const storageItemLists = await this.findAllOrThrow()
    const foundIndex = storageItemLists.findIndex((storageItemList) => storageItemList.id === itemList.id)

    if (foundIndex >= 0) {
      storageItemLists[foundIndex] = this.convertDomainItemListToStorage(itemList)
    } else {
      storageItemLists.push(this.convertDomainItemListToStorage(itemList))
    }

    await this.cacheStorage.set(this.key, storageItemLists)
  }

  async delete(listId: string): Promise<void> {
    const storageItemLists = await this.findAllOrThrow()
    
    const filteredItemList = storageItemLists.filter((storageItemList) => storageItemList.id !== listId)

    await this.cacheStorage.set(this.key, filteredItemList)
  }

  private convertDomainItemListToStorage(itemList: ItemList): StorageItemList {
    return {
      createdAt: itemList.createdAt.toISOString(),
      id: itemList.id,
      name: itemList.name,
      userId: itemList.userId
    }
  }

  private convertStorageItemListToDomain(storageItemList: StorageItemList, items: Item[]): ItemList {
    return new ItemList(storageItemList.id, storageItemList.userId, storageItemList.name, items, new Date(storageItemList.createdAt))
  }

  private async findAllOrThrow(): Promise<StorageItemList[]> {
    try {
      return await this.cacheStorage.get<StorageItemList[]>(this.key)
    } catch (e) {
      if (e instanceof ResourceNotFoundError) {
        return []
      } else throw new Error(`Erro inesperado ao tentar encontrar itemLists no storage: ${e}`)
    }
  }
}