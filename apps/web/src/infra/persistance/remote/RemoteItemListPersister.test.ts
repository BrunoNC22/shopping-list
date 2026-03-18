import { describe, it, expect } from "vitest"
import { RemoteItemListPersister } from "./RemoteItemListPersister"
import type { RemoteItemList } from "./types/RemoteItemList"
import { Categoria, Item, ItemList, ItemListNotFoundError, NotFoundError, type GetHttpClientOutputPort } from "@shopping-list/domain"


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
  const sut = new RemoteItemListPersister(httpClient)

  return { sut, httpClient }
}

function createRemoteItemList(): RemoteItemList {
  return {
    id: "list1",
    name: "Compras",
    createdAt: "2024-01-01T00:00:00.000Z",
    items: [
      {
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
    ]
  }
}

describe("RemoteItemListPersister", () => {
  it("deve buscar ItemList por id", async () => {
    const { sut, httpClient } = makeSut()
    const remoteItemList = createRemoteItemList()
    httpClient.response = remoteItemList

    const result = await sut.get("list1")

    expect(httpClient.lastUrl).toBe("/item-lists/list1")
    expect(result).toBeInstanceOf(ItemList)
    expect(result.name).toBe("Compras")
    expect(result.getItems().length).toBe(1)
    expect(result.getItems()[0]).toBeInstanceOf(Item)
    expect(result.getItems()[0].category).toBeInstanceOf(Categoria)
    expect(result.getItems()[0].category.nome).toBe("Mercearia")
  })

  it("deve lançar ItemListNotFoundError quando API retornar NotFoundError", async () => {
    const { sut, httpClient } = makeSut()
    httpClient.errorToThrow = new NotFoundError("not found")

    await expect(
      sut.get("invalid")
    ).rejects.toBeInstanceOf(ItemListNotFoundError)
  })

  it("deve lançar erro inesperado ao buscar ItemList", async () => {
    const { sut, httpClient } = makeSut()
    httpClient.errorToThrow = new Error("server error")

    await expect(
      sut.get("list1")
    ).rejects.toThrow("Unexpected error while trying to get ItemList")
  })

  it("deve buscar todas ItemLists", async () => {
    const { sut, httpClient } = makeSut()
    const remoteLists: RemoteItemList[] = [
      createRemoteItemList()
    ]
    httpClient.response = remoteLists

    const result = await sut.getAll()

    expect(httpClient.lastUrl).toBe("/item-lists")
    expect(result.length).toBe(1)
    expect(result[0]).toBeInstanceOf(ItemList)
    expect(result[0].getItems().length).toBe(1)
    expect(result[0].getItems()[0]).toBeInstanceOf(Item)
  })

  it("deve lançar erro inesperado ao buscar todas ItemLists", async () => {
    const { sut, httpClient } = makeSut()
    httpClient.errorToThrow = new Error("server error")

    await expect(
      sut.getAll()
    ).rejects.toThrow("Unexpected error while trying to get item lists")
  })

  it("save deve lançar erro pois não é suportado", async () => {
    const { sut } = makeSut()

    await expect(
      sut.save()
    ).rejects.toThrow("RemoteItemListPersister do not save ItemList.")
  })

  it("delete deve lançar erro pois não é suportado", async () => {
    const { sut } = makeSut()

    await expect(
      sut.delete()
    ).rejects.toThrow("RemoteItemListPersister do not delete ItemList.")
  })
})