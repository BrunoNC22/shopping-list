import { describe, it, expect } from "vitest"
import { GetItemLists } from "./GetItemLists"
import ItemList from "../../models/ItemList"
import type { GetAllItemListsPersisterOutputPort } from "../../output/persistance/ItemListPersisterOutputPort"

class ItemListPersisterMock implements GetAllItemListsPersisterOutputPort {

  getAllCallCount = 0
  itemListsToReturn: ItemList[] = []

  async getAll(): Promise<ItemList[]> {
    this.getAllCallCount++
    return this.itemListsToReturn
  }

}

describe("GetItemLists", () => {

  it("deve chamar o persister.getAll", async () => {

    const persister = new ItemListPersisterMock()
    const sut = new GetItemLists(persister)

    await sut.perform()

    expect(persister.getAllCallCount).toBe(1)

  })

  it("deve retornar todas as listas retornadas pelo persister", async () => {

    const persister = new ItemListPersisterMock()

    const list1 = new ItemList("1", "Lista 1", [], new Date())
    const list2 = new ItemList("2", "Lista 2", [], new Date())

    persister.itemListsToReturn = [list1, list2]

    const sut = new GetItemLists(persister)

    const result = await sut.perform()

    expect(result).toHaveLength(2)
    expect(result[0]).toBe(list1)
    expect(result[1]).toBe(list2)

  })

  it("deve retornar lista vazia quando não houver listas", async () => {

    const persister = new ItemListPersisterMock()

    const sut = new GetItemLists(persister)

    const result = await sut.perform()

    expect(result).toEqual([])

  })

})