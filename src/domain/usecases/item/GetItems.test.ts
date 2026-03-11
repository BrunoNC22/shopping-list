import { describe, it, expect } from "vitest"
import { GetItems } from "./GetItems"
import Item from "../../models/Item"
import { Categoria } from "../../models/Categoria"

import type { GetAllItemsPersisterOutputPort } from "../../output/persistance/ItemPersisterOutputPort"


class ItemPersisterMock implements GetAllItemsPersisterOutputPort {

  getAllCallCount = 0
  itemsToReturn: Item[] = []

  async getAll(): Promise<Item[]> {
    this.getAllCallCount++
    return this.itemsToReturn
  }

}


function buildItem(id: string) {
  const category = new Categoria("cat", "Categoria")
  return new Item(id, "list1", "Item", 10, 1, category)
}


describe("GetItems", () => {

  it("deve chamar itemPersister.getAll", async () => {

    const persister = new ItemPersisterMock()
    const sut = new GetItems(persister)

    await sut.perform()

    expect(persister.getAllCallCount).toBe(1)

  })


  it("deve retornar todos os itens retornados pelo persister", async () => {

    const persister = new ItemPersisterMock()

    const item1 = buildItem("1")
    const item2 = buildItem("2")

    persister.itemsToReturn = [item1, item2]

    const sut = new GetItems(persister)

    const result = await sut.perform()

    expect(result).toHaveLength(2)
    expect(result[0]).toBe(item1)
    expect(result[1]).toBe(item2)

  })


  it("deve retornar lista vazia quando não houver itens", async () => {

    const persister = new ItemPersisterMock()

    const sut = new GetItems(persister)

    const result = await sut.perform()

    expect(result).toEqual([])

  })

})