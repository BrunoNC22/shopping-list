import { describe, it, expect } from "vitest"

import { LocalItemListPersister, type StorageItemList } from "./LocalItemListPersister"
import { ItemList, ItemListNotFoundError, ResourceNotFoundError, type GetAllItemsPersisterOutputPort, type getByItemListIdItemPersisterOutputPort, type GetCacheStorageOutputPort, type Item, type SetCacheStorageOutputPort } from "@shopping-list/domain"




class CacheStorageMock implements GetCacheStorageOutputPort, SetCacheStorageOutputPort {

  data: Record<string, unknown> = {}

  getCallCount = 0
  setCallCount = 0

  errorToThrow: Error | null = null

  async get<T>(key: string): Promise<T> {

    this.getCallCount++

    if (this.errorToThrow) {
      throw this.errorToThrow
    }

    return this.data[key] as T
  }

  async set(key: string, value: object): Promise<void> {

    this.setCallCount++

    this.data[key] = value

  }

}



class ItemPersisterMock implements getByItemListIdItemPersisterOutputPort, GetAllItemsPersisterOutputPort {

  items: Item[] = []

  async getByItemListId(itemListId: string): Promise<Item[]> {

    return this.items.filter(item => item.itemListId === itemListId)

  }

  async getAll(): Promise<Item[]> {

    return this.items

  }

}



function makeSut() {

  const cacheStorage = new CacheStorageMock()

  const itemPersister = new ItemPersisterMock()

  const sut = new LocalItemListPersister(cacheStorage, itemPersister)

  return { sut, cacheStorage, itemPersister }

}

const userId = "user id"

describe("LocalItemListPersister", () => {

  it("deve retornar ItemList com itens", async () => {

    const { sut, cacheStorage, itemPersister } = makeSut()

    const storageLists: StorageItemList[] = [
      { id: "1", name: "Compras", createdAt: new Date().toISOString(), userId }
    ]

    cacheStorage.data["itemList"] = storageLists

    const items: Item[] = [
      { id: "item1", name: "Arroz", itemListId: "1" } as Item
    ]

    itemPersister.items = items

    const result = await sut.get("1")

    expect(result).toBeInstanceOf(ItemList)
    expect(result.getItems().length).toBe(1)
    expect(result.name).toBe("Compras")

  })


  it("deve lançar ItemListNotFoundError quando lista não existir", async () => {

    const { sut, cacheStorage } = makeSut()

    cacheStorage.data["itemList"] = []

    await expect(
      sut.get("invalid")
    ).rejects.toBeInstanceOf(ItemListNotFoundError)

  })


  it("deve retornar todas listas com seus itens", async () => {

    const { sut, cacheStorage, itemPersister } = makeSut()

    const createdAt = new Date().toISOString()

    const storageLists: StorageItemList[] = [
      { id: "1", name: "Lista1", createdAt, userId },
      { id: "2", name: "Lista2", createdAt, userId }
    ]

    cacheStorage.data["itemList"] = storageLists

    const items: Item[] = [
      { id: "i1", name: "Arroz", itemListId: "1" } as Item,
      { id: "i2", name: "Feijão", itemListId: "2" } as Item
    ]

    itemPersister.items = items

    const result = await sut.getAll()

    expect(result.length).toBe(2)

    expect(result[0].getItems().length).toBe(1)
    expect(result[1].getItems().length).toBe(1)

  })


  it("deve salvar nova lista", async () => {

    const { sut, cacheStorage } = makeSut()

    cacheStorage.data["itemList"] = []

    const list = new ItemList(
      "1",
      userId,
      "Compras",
      [],
      new Date()
    )

    await sut.save(list)

    const saved = cacheStorage.data["itemList"] as StorageItemList[]

    expect(saved.length).toBe(1)
    expect(saved[0].name).toBe("Compras")

  })


  it("deve atualizar lista existente", async () => {

    const { sut, cacheStorage } = makeSut()

    const createdAt = new Date().toISOString()

    cacheStorage.data["itemList"] = [
      { id: "1", name: "Antigo", createdAt, userId }
    ] satisfies StorageItemList[]

    const updated = new ItemList(
      "1",
      userId,
      "Novo",
      [],
      new Date(createdAt)
    )

    await sut.save(updated)

    const saved = cacheStorage.data["itemList"] as StorageItemList[]

    expect(saved.length).toBe(1)
    expect(saved[0].name).toBe("Novo")

  })


  it("deve remover lista", async () => {

    const { sut, cacheStorage } = makeSut()

    const createdAt = new Date().toISOString()

    cacheStorage.data["itemList"] = [
      { id: "1", name: "Lista1", createdAt, userId },
      { id: "2", name: "Lista2", createdAt, userId }
    ] satisfies StorageItemList[]

    await sut.delete("1")

    const saved = cacheStorage.data["itemList"] as StorageItemList[]

    expect(saved.length).toBe(1)
    expect(saved[0].id).toBe("2")

  })


  it("deve retornar vazio quando storage não existir", async () => {

    const { sut, cacheStorage } = makeSut()

    cacheStorage.errorToThrow = new ResourceNotFoundError("itemList")

    const result = await sut.getAll()

    expect(result).toEqual([])

  })

})