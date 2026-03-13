import type { Categoria } from "@/domain/models/Categoria";
import Item from "@/domain/models/Item";
import type { GetCacheStorageOutputPort, SetCacheStorageOutputPort } from "@/domain/output/cache/CacheStorageOutputPort";
import { ResourceNotFoundError } from "@/domain/output/cache/errors/ResourceNotFoundError";
import type { GetAllCategoriesPersisterOutputPort, GetByIdCategoriesPersisterOutputPort } from "@/domain/output/persistance/CategoryPersisterOutputPort";
import { ItemNotFoundError } from "@/domain/output/persistance/errors/ItemNotFoundError";
import type { ItemPersisterOutputPort } from "@/domain/output/persistance/ItemPersisterOutputPort";

export type StorageItem = {
  id: string,
  itemListId: string,
  name: string,
  price: number,
  amount: number,
  checked: boolean,
  categoryId: string
}

export class LocalItemPersisterAdapter implements ItemPersisterOutputPort {
  constructor(
    private readonly cacheStorage: SetCacheStorageOutputPort & GetCacheStorageOutputPort,
    private readonly categoryPersister: GetByIdCategoriesPersisterOutputPort & GetAllCategoriesPersisterOutputPort
  ) {}

  async save(item: Item): Promise<void> {
    const receivedItems = await this.getAllItemsOrThrow()
    const foundIndex = receivedItems.findIndex((storageItem) => storageItem.id === item.id)

    if (foundIndex >= 0) {
      receivedItems[foundIndex] = this.parseItem(item)
    } else {
      receivedItems.push(this.parseItem(item))
    }
  
    await this.cacheStorage.set('items', receivedItems)
  }

  async getAll(): Promise<Item[]> {
    const receivedItems = await this.getAllItemsOrThrow()

    const categories = await this.categoryPersister.getAll()

    return receivedItems.map(item => this.parseStorageItem(item, categories))
  }

  async replace(items: Item[]): Promise<void> {
    const storageItems = items.map(item => this.parseItem(item))

    await this.cacheStorage.set('items', storageItems)
  }

  async getByItemListId(itemListId: string): Promise<Item[]> {
    const receivedItems = await this.getAllItemsOrThrow()

    const categories = await this.categoryPersister.getAll()

    return receivedItems.filter((storageItem) => storageItem.itemListId === itemListId).map((item) => this.parseStorageItem(item, categories))
  }

  async delete(itemId: string): Promise<void> {
    const items = await this.getAllItemsOrThrow()
    const filteredItems = items.filter(item => item.id != itemId)
    
    await this.cacheStorage.set('items', filteredItems)
  }

  async getById(id: string): Promise<Item> {
    const items = await this.getAllItemsOrThrow()
    const foundItem = items.find(item => item.id === id)
    
    if (!foundItem) throw new ItemNotFoundError(`Item com id ${id} não encontrado`)
    
    const categories = await this.categoryPersister.getAll()

    return this.parseStorageItem(foundItem, categories)
  }

  private parseStorageItem(storageItem: StorageItem, categories: Categoria[]): Item {
    const foundCategory = categories.find(category => category.id === storageItem.categoryId)
    return new Item(storageItem.id, storageItem.itemListId, storageItem.name, storageItem.price, storageItem.amount, foundCategory!, storageItem.checked)
  }

  private parseItem(item: Item): StorageItem {
    return {
      amount: item.amount,
      itemListId: item.itemListId,
      id: item.id,
      name: item.name,
      price: item.price,
      checked: item.checked,
      categoryId: item.category.id
    }
  }

  private async getAllItemsOrThrow(): Promise<StorageItem[]> {
    try {
      return await this.cacheStorage.get<StorageItem[]>('items')
    } catch (e) {
      if (e instanceof ResourceNotFoundError) {
        return []
      } else throw new Error(`Unexpected error while getting resource from cache: ${e}`)
    }
  }
}