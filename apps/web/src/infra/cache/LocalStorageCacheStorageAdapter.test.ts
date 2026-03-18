import { describe, expect, it } from "vitest"
import { LocalStorageCacheStorageAdapter } from "./LocalStorageCacheStorageAdapter"
import { ResourceNotFoundError } from "@shopping-list/domain"

class StorageMock implements Storage {
  length: number = 0

  clearCallCount = 0

  getItemCallCount = 0
  getItemKey: string | null = null

  keyCallCount = 0
  keyIndex: number | null = null

  removeItemCallCount = 0
  removeItemKey: string | null = null

  setItemCallCount = 0
  setItemKey: string | null = null
  setItemValue: string | null = null

  constructor(
    readonly getItemResponse: string | null,
    readonly keyResponse: string | null
  ) {}

  clear(): void {
    this.clearCallCount++
  }

  getItem(key: string): string | null {
    this.getItemCallCount++
    this.getItemKey = key
    return this.getItemResponse
  }

  key(index: number): string | null {
    this.keyCallCount++
    this.keyIndex = index
    return this.keyResponse
  }

  removeItem(key: string): void {
    this.removeItemCallCount++
    this.removeItemKey = key
  }

  setItem(key: string, value: string): void {
    this.setItemCallCount++
    this.setItemKey = key
    this.setItemValue = value
  }
}

describe("LocalStorageCacheStorageAdapter", () => {

  it("deve chamar getItem com a chave correta", async () => {

    const storage = new StorageMock(JSON.stringify({ name: "Bruno" }), null)

    const sut = new LocalStorageCacheStorageAdapter(storage)

    await sut.get("user")

    expect(storage.getItemCallCount).toBe(1)
    expect(storage.getItemKey).toBe("user")

  })


  it("deve retornar o objeto parseado", async () => {

    const data = { name: "Bruno", age: 25 }

    const storage = new StorageMock(JSON.stringify(data), null)

    const sut = new LocalStorageCacheStorageAdapter(storage)

    const result = await sut.get<typeof data>("user")

    expect(result).toEqual(data)

  })


  it("deve lançar ResourceNotFoundError quando o retorno do localstorage for null", async () => {

    const sut = new LocalStorageCacheStorageAdapter(new StorageMock(null, null))

    await expect(sut.get("invalidKey"))
      .rejects
      .toThrow(ResourceNotFoundError)

  })


  it("deve salvar o valor com JSON.stringify", async () => {

    const storage = new StorageMock(null, null)

    const sut = new LocalStorageCacheStorageAdapter(storage)

    const value = { name: "Bruno" }

    await sut.set("user", value)

    expect(storage.setItemCallCount).toBe(1)
    expect(storage.setItemKey).toBe("user")
    expect(storage.setItemValue).toBe(JSON.stringify(value))

  })


  it("deve remover item quando valor for falsy", async () => {

    const storage = new StorageMock(null, null)

    const sut = new LocalStorageCacheStorageAdapter(storage)

    await sut.set("user", null as unknown as object)

    expect(storage.removeItemCallCount).toBe(1)
    expect(storage.removeItemKey).toBe("user")

  })


  it("não deve chamar setItem quando valor for falsy", async () => {

    const storage = new StorageMock(null, null)

    const sut = new LocalStorageCacheStorageAdapter(storage)

    await sut.set("user", null as unknown as object)

    expect(storage.setItemCallCount).toBe(0)

  })

})