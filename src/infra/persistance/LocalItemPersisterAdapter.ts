import type { Categoria } from "@/domain/models/Categoria";
import Item from "@/domain/models/Item";
import type { GetCacheStorageOutputPort, SetCacheStorageOutputPort } from "@/domain/output/cache/CacheStorageOutputPort";
import { ResourceNotFoundError } from "@/domain/output/cache/errors/ResourceNotFoundError";
import type { GetAllCategoriesPersisterOutputPort, GetByIdCategoriesPersisterOutputPort } from "@/domain/output/persistance/CategoryPersisterOutputPort";
import type { ItemPersisterOutputPort } from "@/domain/output/persistance/ItemPersisterOutputPort";

type StorageItem = {
  id: string,
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

    const newStorageItem: StorageItem = {
      amount: item.amount,
      id: item.id,
      name: item.name,
      price: item.price,
      checked: item.checked,
      categoryId: item.category.id
    }

    receivedItems.push(newStorageItem)
  
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

  private parseStorageItem(storageItem: StorageItem, categories: Categoria[]): Item {
    const foundCategory = categories.find(category => category.id === storageItem.categoryId)
    return new Item(storageItem.id, storageItem.name, storageItem.price, storageItem.amount, foundCategory!, storageItem.checked)
  }

  private parseItem(item: Item): StorageItem {
    return {
      amount: item.amount,
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