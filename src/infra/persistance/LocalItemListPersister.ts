import type Item from "@/domain/models/Item";
import ItemList from "@/domain/models/ItemList";
import type { GetCacheStorageOutputPort, SetCacheStorageOutputPort } from "@/domain/output/cache/CacheStorageOutputPort";
import { ResourceNotFoundError } from "@/domain/output/cache/errors/ResourceNotFoundError";
import { ItemListNotFoundError } from "@/domain/output/persistance/errors/ItemListNotFoundError";
import type { ItemListPersisterOutputPort } from "@/domain/output/persistance/ItemListPersisterOutputPort";
import type { GetAllItemsPersisterOutputPort, getByItemListIdItemPersisterOutputPort } from "@/domain/output/persistance/ItemPersisterOutputPort";

export type StorageItemList = {
  id: string,
  name: string,
  createdAt: string
}

export class LocalItemListPersister implements ItemListPersisterOutputPort {
  constructor(
    private readonly cacheStorage: SetCacheStorageOutputPort & GetCacheStorageOutputPort,
    private readonly itemPersister: getByItemListIdItemPersisterOutputPort & GetAllItemsPersisterOutputPort
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

  async save(itemList: ItemList): Promise<void> {
    const storageItemList = await this.findAllOrThrow()

    storageItemList.push(this.convertDomainItemListToStorage(itemList))

    await this.cacheStorage.set('itemList', storageItemList)
  }

  private convertDomainItemListToStorage(itemList: ItemList): StorageItemList {
    return {
      createdAt: itemList.createdAt.toISOString(),
      id: itemList.id,
      name: itemList.name
    }
  }

  private convertStorageItemListToDomain(storageItemList: StorageItemList, items: Item[]): ItemList {
    return new ItemList(storageItemList.id, storageItemList.name, items, new Date(storageItemList.createdAt))
  }

  private async findAllOrThrow(): Promise<StorageItemList[]> {
    try {
      return await this.cacheStorage.get<StorageItemList[]>('itemList')
    } catch (e) {
      if (e instanceof ResourceNotFoundError) {
        return []
      } else throw new Error(`Erro inesperado ao tentar encontrar itemLists no storage: ${e}`)
    }
  }
}