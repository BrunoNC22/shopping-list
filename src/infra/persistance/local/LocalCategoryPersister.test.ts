import { describe, it, expect } from "vitest"

import { LocalCategoryPersister } from "./LocalCategoryPersister"
import { Categoria } from "@/domain/models/Categoria"

import type {
  GetCacheStorageOutputPort,
  SetCacheStorageOutputPort
} from "@/domain/output/cache/CacheStorageOutputPort"

import { ResourceNotFoundError } from "@/domain/output/cache/errors/ResourceNotFoundError"
import { CategoryNotFoundError } from "@/domain/output/persistance/errors/CategoryNotFoundError"


type StorageCategory = {
  id: string
  name: string
}


class CacheStorageMock implements GetCacheStorageOutputPort, SetCacheStorageOutputPort {

  getCallCount = 0
  getKey: string | null = null

  setCallCount = 0
  setKey: string | null = null
  setValue: object | null = null

  data: Record<string, unknown> = {}

  errorToThrow: Error | null = null


  async get<T>(key: string): Promise<T> {

    this.getCallCount++
    this.getKey = key

    if (this.errorToThrow) {
      throw this.errorToThrow
    }

    return this.data[key] as T
  }


  async set(key: string, value: object): Promise<void> {

    this.setCallCount++
    this.setKey = key
    this.setValue = value

    this.data[key] = value

  }

}


function makeSut() {

  const cacheStorage = new CacheStorageMock()

  const sut = new LocalCategoryPersister(cacheStorage)

  return { sut, cacheStorage }

}



describe("LocalCategoryPersister", () => {

  it("deve retornar todas as categorias", async () => {

    const { sut, cacheStorage } = makeSut()

    const categories: StorageCategory[] = [
      { id: "1", name: "Alimentos" },
      { id: "2", name: "Bebidas" }
    ]

    cacheStorage.data["categories"] = categories

    const result = await sut.getAll()

    expect(result).toHaveLength(2)
    expect(result[0]).toBeInstanceOf(Categoria)
    expect(result[0].nome).toBe("Alimentos")

  })


  it("deve criar categorias default quando não existirem", async () => {

    const { sut, cacheStorage } = makeSut()

    cacheStorage.errorToThrow = new ResourceNotFoundError("categories")

    const result = await sut.getAll()

    expect(cacheStorage.setCallCount).toBe(1)
    expect(cacheStorage.setKey).toBe("categories")

    expect(result.length).toBeGreaterThan(0)

  })


  it("deve lançar erro inesperado ao obter categorias", async () => {

    const { sut, cacheStorage } = makeSut()

    cacheStorage.errorToThrow = new Error("unexpected")

    await expect(sut.getAll()).rejects.toThrow("Erro inesperado")

  })


  it("deve retornar categoria pelo id", async () => {

    const { sut, cacheStorage } = makeSut()

    const categories: StorageCategory[] = [
      { id: "1", name: "Alimentos" }
    ]

    cacheStorage.data["categories"] = categories

    const result = await sut.getById("1")

    expect(result).toBeInstanceOf(Categoria)
    expect(result.nome).toBe("Alimentos")

  })


  it("deve lançar CategoryNotFoundError quando categoria não existir", async () => {

    const { sut, cacheStorage } = makeSut()

    cacheStorage.data["categories"] = []

    await expect(
      sut.getById("invalid")
    ).rejects.toBeInstanceOf(CategoryNotFoundError)

  })


  it("deve adicionar nova categoria quando não existir", async () => {

    const { sut, cacheStorage } = makeSut()

    cacheStorage.data["categories"] = []

    const category = new Categoria("1", "Alimentos")

    await sut.save(category)

    const saved = cacheStorage.data["categories"] as StorageCategory[]

    expect(saved).toHaveLength(1)
    expect(saved[0].name).toBe("Alimentos")

  })


  it("deve atualizar categoria existente", async () => {

    const { sut, cacheStorage } = makeSut()

    const categories: StorageCategory[] = [
      { id: "1", name: "Antigo" }
    ]

    cacheStorage.data["categories"] = categories

    const updated = new Categoria("1", "Novo")

    await sut.save(updated)

    const saved = cacheStorage.data["categories"] as StorageCategory[]

    expect(saved).toHaveLength(1)
    expect(saved[0].name).toBe("Novo")

  })

})