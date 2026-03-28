import { describe, it, expect } from "vitest"

import { LocalCurrentAccountPersister } from "./LocalCurrentAccountPersister"
import { CurrentAccount, ResourceNotFoundError, User, type CacheStorageOutputPort } from "@shopping-list/domain"


type StorageCurrentAccount = {
  name: string
  email: string
  prifilePicUrl?: string
}


class CacheStorageMock implements CacheStorageOutputPort {

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

  const sut = new LocalCurrentAccountPersister(cacheStorage)

  return { sut, cacheStorage }

}



describe("LocalCurrentAccountPersister", () => {

  it("deve retornar CurrentAccount quando existir no storage", async () => {

    const { sut, cacheStorage } = makeSut()

    const stored: StorageCurrentAccount = {
      name: "Bruno",
      email: "bruno@email.com",
      prifilePicUrl: "pic.png"
    }

    cacheStorage.data["currentAccount"] = stored

    const result = await sut.get()

    expect(result).toBeInstanceOf(CurrentAccount)
    expect(result?.name).toBe("Bruno")
    expect(result?.email).toBe("bruno@email.com")
    expect(result?.profilePicUrl).toBe("pic.png")

  })


  it("deve retornar undefined quando recurso não existir", async () => {

    const { sut, cacheStorage } = makeSut()

    cacheStorage.errorToThrow = new ResourceNotFoundError("currentAccount")

    const result = await sut.get()

    expect(result).toBeUndefined()

  })


  it("deve lançar erro quando ocorrer erro inesperado", async () => {

    const { sut, cacheStorage } = makeSut()

    cacheStorage.errorToThrow = new Error("unexpected")

    await expect(sut.get()).rejects.toThrow(
      "Unexpected error while trying to get current account"
    )

  })


  it("deve salvar CurrentAccount no storage", async () => {

    const { sut, cacheStorage } = makeSut()

    const account = new User(
      "useId",
      "Bruno",
      "bruno@email.com",
      "pic.png"
    )

    await sut.set(account)

    expect(cacheStorage.setCallCount).toBe(1)
    expect(cacheStorage.setKey).toBe("currentAccount")

    const saved = cacheStorage.data["currentAccount"] as StorageCurrentAccount

    expect(saved.name).toBe("Bruno")
    expect(saved.email).toBe("bruno@email.com")
    expect(saved.prifilePicUrl).toBe("pic.png")

  })

})