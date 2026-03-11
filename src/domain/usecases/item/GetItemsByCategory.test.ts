import { describe, it, expect } from "vitest"

import { GetItemsByCategory } from "./GetItemsByCategory"
import Item from "../../models/Item"
import { Categoria } from "../../models/Categoria"

import type { getByItemListIdItemPersisterOutputPort } from "../../output/persistance/ItemPersisterOutputPort"


class ItemPersisterMock implements getByItemListIdItemPersisterOutputPort {

  getCallCount = 0
  receivedListId: string | null = null
  itemsToReturn: Item[] = []

  async getByItemListId(itemListId: string): Promise<Item[]> {
    this.getCallCount++
    this.receivedListId = itemListId
    return this.itemsToReturn
  }

}


function buildItem(
  id: string,
  category: Categoria,
  price: number,
  amount: number
) {
  return new Item(id, "list1", "Item", price, amount, category)
}


describe("GetItemsByCategory", () => {

  it("deve chamar getByItemListId com o id correto", async () => {

    const persister = new ItemPersisterMock()
    const sut = new GetItemsByCategory(persister)

    await sut.perform({ itemListId: "list-1" })

    expect(persister.getCallCount).toBe(1)
    expect(persister.receivedListId).toBe("list-1")

  })


  it("deve retornar lista vazia quando não houver itens", async () => {

    const persister = new ItemPersisterMock()
    const sut = new GetItemsByCategory(persister)

    const result = await sut.perform({ itemListId: "list-1" })

    expect(result).toEqual([])

  })


  it("deve agrupar itens pela categoria", async () => {

    const persister = new ItemPersisterMock()

    const cat1 = new Categoria("c1", "Alimentos")
    const cat2 = new Categoria("c2", "Bebidas")

    const item1 = buildItem("1", cat1, 10, 1)
    const item2 = buildItem("2", cat1, 5, 2)
    const item3 = buildItem("3", cat2, 3, 4)

    persister.itemsToReturn = [item1, item2, item3]

    const sut = new GetItemsByCategory(persister)

    const result = await sut.perform({ itemListId: "list1" })

    expect(result).toHaveLength(2)

    const alimentos = result.find(r => r.category.id === "c1")
    const bebidas = result.find(r => r.category.id === "c2")

    expect(alimentos?.items).toHaveLength(2)
    expect(bebidas?.items).toHaveLength(1)

  })


  it("deve calcular corretamente o totalValue por categoria", async () => {

    const persister = new ItemPersisterMock()

    const cat = new Categoria("c1", "Alimentos")

    const item1 = buildItem("1", cat, 10, 2) // 20
    const item2 = buildItem("2", cat, 5, 3)  // 15

    persister.itemsToReturn = [item1, item2]

    const sut = new GetItemsByCategory(persister)

    const result = await sut.perform({ itemListId: "list1" })

    expect(result[0].totalValue).toBe(35)

  })


  it("deve manter a referência correta da categoria", async () => {

    const persister = new ItemPersisterMock()

    const category = new Categoria("c1", "Alimentos")

    const item = buildItem("1", category, 10, 1)

    persister.itemsToReturn = [item]

    const sut = new GetItemsByCategory(persister)

    const result = await sut.perform({ itemListId: "list1" })

    expect(result[0].category).toBe(category)

  })

})