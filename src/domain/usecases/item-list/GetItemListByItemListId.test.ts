import { describe, it, expect } from "vitest"
import { GetItemListByItemListId } from "./GetItemListByItemListId"
import ItemList from "../../models/ItemList"
import type { GetItemListPersisterOutputPort } from "../../output/persistance/ItemListPersisterOutputPort"

class ItemListPersisterMock implements GetItemListPersisterOutputPort {

  getCallCount = 0
  receivedListId: string | null = null

  itemListToReturn = new ItemList(
    "list-1",
    "Lista teste",
    [],
    new Date()
  )

  async get(listId: string): Promise<ItemList> {
    this.getCallCount++
    this.receivedListId = listId
    return this.itemListToReturn
  }

}

describe("GetItemListByItemListId", () => {

  it("deve chamar o persister.get com o itemListId correto", async () => {

    const persister = new ItemListPersisterMock()
    const sut = new GetItemListByItemListId(persister)

    await sut.perform({ itemListId: "list-123" })

    expect(persister.getCallCount).toBe(1)
    expect(persister.receivedListId).toBe("list-123")

  })

  it("deve retornar o ItemList retornado pelo persister", async () => {

    const persister = new ItemListPersisterMock()

    const expectedList = new ItemList(
      "list-999",
      "Lista mercado",
      [],
      new Date()
    )

    persister.itemListToReturn = expectedList

    const sut = new GetItemListByItemListId(persister)

    const result = await sut.perform({ itemListId: "list-999" })

    expect(result).toBe(expectedList)

  })

})