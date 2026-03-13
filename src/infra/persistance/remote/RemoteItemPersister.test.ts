import { describe, it, expect } from "vitest"
import { RemoteItemPersister } from "./RemoteItemPersister"
import Item from "@/domain/models/Item"
import { Categoria } from "@/domain/models/Categoria"
import type { GetHttpClientOutputPort } from "@/domain/output/http/HttpClientOutputPort"
import { NotFoundError } from "@/domain/output/http/errors/NotFoundError"
import { ItemListNotFoundError } from "@/domain/output/persistance/errors/ItemListNotFoundError"
import { ItemNotFoundError } from "@/domain/output/persistance/errors/ItemNotFoundError"
import type { RemoteItem } from "./types/RemoteItem"

class HttpClientMock implements GetHttpClientOutputPort {
  response: unknown = undefined
  errorToThrow: Error | null = null
  lastUrl: string | null = null
  async get<T>(props: { url: string }): Promise<T> {
    this.lastUrl = props.url
    if (this.errorToThrow) {
      throw this.errorToThrow
    }
    return this.response as T
  }
}

function makeSut() {
  const httpClient = new HttpClientMock()
  const sut = new RemoteItemPersister(httpClient)
  return { sut, httpClient }
}

function createRemoteItem(): RemoteItem {
  return {
    id: "item1",
    itemListId: "list1",
    name: "Arroz",
    price: 10,
    amount: 2,
    checked: false,
    category: {
      id: "cat1",
      name: "Mercearia"
    }
  }
}

describe("RemoteItemPersister", () => {
  it("deve retornar todos os itens", async () => {
    const { sut, httpClient } = makeSut()
    const remoteItems: RemoteItem[] = [
      createRemoteItem()
    ]
    httpClient.response = remoteItems

    const result = await sut.getAll()

    expect(httpClient.lastUrl).toBe("/items")
    expect(result.length).toBe(1)
    expect(result[0]).toBeInstanceOf(Item)
    expect(result[0].name).toBe("Arroz")
    expect(result[0].category).toBeInstanceOf(Categoria)
  })

  it("deve lançar erro inesperado ao buscar todos itens", async () => {
    const { sut, httpClient } = makeSut()
    httpClient.errorToThrow = new Error("server error")

    await expect(
      sut.getAll()
    ).rejects.toThrow("Unexpected error while trying to get items")
  })

  it("deve buscar itens por itemListId", async () => {
    const { sut, httpClient } = makeSut()
    const remoteItems: RemoteItem[] = [
      createRemoteItem()
    ]
    httpClient.response = remoteItems

    const result = await sut.getByItemListId("list1")

    expect(httpClient.lastUrl).toBe("/item-list/list1/items")
    expect(result.length).toBe(1)
    expect(result[0]).toBeInstanceOf(Item)
  })

  it("deve lançar ItemListNotFoundError quando lista não existir", async () => {
    const { sut, httpClient } = makeSut()
    httpClient.errorToThrow = new NotFoundError("not found")

    await expect(
      sut.getByItemListId("invalid")
    ).rejects.toBeInstanceOf(ItemListNotFoundError)
  })

  it("deve lançar erro inesperado ao buscar itens por lista", async () => {
    const { sut, httpClient } = makeSut()
    httpClient.errorToThrow = new Error("server error")

    await expect(
      sut.getByItemListId("list1")
    ).rejects.toThrow("Unexpected error while trying to get item by item list id")
  })

  it("deve buscar item por id", async () => {
    const { sut, httpClient } = makeSut()
    const remoteItem = createRemoteItem()
    httpClient.response = remoteItem

    const result = await sut.getById("item1")

    expect(httpClient.lastUrl).toBe("/items/item1")
    expect(result).toBeInstanceOf(Item)
    expect(result.name).toBe("Arroz")
    expect(result.category).toBeInstanceOf(Categoria)
  })

  it("deve lançar ItemNotFoundError quando item não existir", async () => {
    const { sut, httpClient } = makeSut()
    httpClient.errorToThrow = new NotFoundError("not found")

    await expect(
      sut.getById("invalid")
    ).rejects.toBeInstanceOf(ItemNotFoundError)
  })

  it("deve lançar erro inesperado ao buscar item por id", async () => {
    const { sut, httpClient } = makeSut()
    httpClient.errorToThrow = new Error("server error")

    await expect(
      sut.getById("item1")
    ).rejects.toThrow("Erro inesperado ao buscar item com id")
  })

  it("save deve lançar erro pois não é suportado", async () => {
    const { sut } = makeSut()

    await expect(
      sut.save()
    ).rejects.toThrow("RemoteItemPersister do not save items.")
  })

  it("replace deve lançar erro pois não é suportado", async () => {
    const { sut } = makeSut()

    await expect(
      sut.replace()
    ).rejects.toThrow("RemoteItemPersister do not replace items.")
  })

  it("delete deve lançar erro pois não é suportado", async () => {
    const { sut } = makeSut()
    
    await expect(
      sut.delete()
    ).rejects.toThrow("RemoteItemPersister do not delete items")
  })
})