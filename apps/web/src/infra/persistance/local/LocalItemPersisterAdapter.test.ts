import { describe, it, expect } from "vitest"
import { LocalItemPersisterAdapter, type StorageItem } from "./LocalItemPersisterAdapter"
import { Item, ItemNotFoundError, ResourceNotFoundError, type Categoria, type GetAllCategoriesPersisterOutputPort, type GetByIdCategoriesPersisterOutputPort, type GetCacheStorageOutputPort, type SetCacheStorageOutputPort } from "@shopping-list/domain"

class CacheStorageMock implements GetCacheStorageOutputPort, SetCacheStorageOutputPort {
  data: Record<string, unknown> = {}
  errorToThrow: Error | null = null
  async get<T>(key: string): Promise<T> {
    if (this.errorToThrow) {
      throw this.errorToThrow
    }
    return this.data[key] as T
  }
  async set(key: string, value: object): Promise<void> {
    this.data[key] = value
  }
}

class CategoryPersisterMock implements GetByIdCategoriesPersisterOutputPort, GetAllCategoriesPersisterOutputPort {
  categories: Categoria[] = []
  async getAll(): Promise<Categoria[]> {
    return this.categories
  }
  async getById(id: string): Promise<Categoria> {
    const found = this.categories.find(c => c.id === id)
    if (!found) {
      throw new Error("Category not found")
    }
    return found
  }
}

function createCategory(id: string, name: string): Categoria {
  return {
    id,
    nome: name
  } as Categoria
}

function createItem(category: Categoria): Item {
  return new Item(
    "item1",
    "list1",
    "Arroz",
    10,
    2,
    category,
    false
  )
}

function makeSut() {
  const cacheStorage = new CacheStorageMock()
  const categoryPersister = new CategoryPersisterMock()
  const sut = new LocalItemPersisterAdapter(
    cacheStorage,
    categoryPersister
  )
  return { sut, cacheStorage, categoryPersister }
}

describe("LocalItemPersisterAdapter", () => {
  it("deve salvar novo item", async () => {
    const { sut, cacheStorage } = makeSut()
    cacheStorage.data["items"] = []
    const category = createCategory("c1", "Mercearia")
    const item = createItem(category)
    await sut.save(item)
    const saved = cacheStorage.data["items"] as StorageItem[]
    expect(saved.length).toBe(1)
    expect(saved[0].name).toBe("Arroz")
  })

  it("deve atualizar item existente", async () => {
    const { sut, cacheStorage } = makeSut()
    const category = createCategory("c1", "Mercearia")
    cacheStorage.data["items"] = [
      {
        id: "item1",
        itemListId: "list1",
        name: "Antigo",
        price: 5,
        amount: 1,
        checked: false,
        categoryId: "c1"
      }
    ] satisfies StorageItem[]
    const item = createItem(category)
    await sut.save(item)
    const saved = cacheStorage.data["items"] as StorageItem[]
    expect(saved.length).toBe(1)
    expect(saved[0].name).toBe("Arroz")
  })

  it("deve retornar todos itens com categoria", async () => {
    const { sut, cacheStorage, categoryPersister } = makeSut()
    const category = createCategory("c1", "Mercearia")
    categoryPersister.categories = [category]
    cacheStorage.data["items"] = [
      {
        id: "item1",
        itemListId: "list1",
        name: "Arroz",
        price: 10,
        amount: 2,
        checked: false,
        categoryId: "c1"
      }
    ] satisfies StorageItem[]
    const result = await sut.getAll()
    expect(result.length).toBe(1)
    expect(result[0]).toBeInstanceOf(Item)
    expect(result[0].category.id).toBe("c1")
  })

  it("deve substituir todos itens", async () => {
    const { sut, cacheStorage } = makeSut()
    const category = createCategory("c1", "Mercearia")
    const item = createItem(category)
    await sut.replace([item])
    const saved = cacheStorage.data["items"] as StorageItem[]
    expect(saved.length).toBe(1)
    expect(saved[0].name).toBe("Arroz")
  })

  it("deve retornar itens por itemListId", async () => {
    const { sut, cacheStorage, categoryPersister } = makeSut()
    const category = createCategory("c1", "Mercearia")
    categoryPersister.categories = [category]
    cacheStorage.data["items"] = [
      {
        id: "item1",
        itemListId: "list1",
        name: "Arroz",
        price: 10,
        amount: 2,
        checked: false,
        categoryId: "c1"
      },
      {
        id: "item2",
        itemListId: "list2",
        name: "Feijão",
        price: 8,
        amount: 1,
        checked: false,
        categoryId: "c1"
      }
    ] satisfies StorageItem[]
    const result = await sut.getByItemListId("list1")
    expect(result.length).toBe(1)
    expect(result[0].name).toBe("Arroz")
  })

  it("deve remover item", async () => {
    const { sut, cacheStorage } = makeSut()
    cacheStorage.data["items"] = [
      {
        id: "item1",
        itemListId: "list1",
        name: "Arroz",
        price: 10,
        amount: 2,
        checked: false,
        categoryId: "c1"
      }
    ] satisfies StorageItem[]
    await sut.delete("item1")
    const saved = cacheStorage.data["items"] as StorageItem[]
    expect(saved.length).toBe(0)
  })

  it("deve retornar item por id", async () => {
    const { sut, cacheStorage, categoryPersister } = makeSut()
    const category = createCategory("c1", "Mercearia")
    categoryPersister.categories = [category]
    cacheStorage.data["items"] = [
      {
        id: "item1",
        itemListId: "list1",
        name: "Arroz",
        price: 10,
        amount: 2,
        checked: false,
        categoryId: "c1"
      }
    ] satisfies StorageItem[]
    const result = await sut.getById("item1")
    expect(result).toBeInstanceOf(Item)
    expect(result.name).toBe("Arroz")
  })

  it("deve lançar ItemNotFoundError quando item não existir", async () => {
    const { sut, cacheStorage } = makeSut()
    cacheStorage.data["items"] = []
    await expect(
      sut.getById("invalid")
    ).rejects.toBeInstanceOf(ItemNotFoundError)
  })

  it("deve retornar lista vazia quando storage não existir", async () => {
    const { sut, cacheStorage } = makeSut()
    cacheStorage.errorToThrow = new ResourceNotFoundError("items")
    const result = await sut.getAll()
    expect(result).toEqual([])
  })
})