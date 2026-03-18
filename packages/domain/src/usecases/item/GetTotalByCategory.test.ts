import { describe, it, expect } from "vitest"

import { GetTotalByCategory } from "./GetTotalByCategory"
import { Item } from "../../models/Item"
import { Categoria } from "../../models/Categoria"

import type { getByItemListIdItemPersisterOutputPort }
from "../../output/persistance/ItemPersisterOutputPort"


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


describe("GetTotalByCategory", () => {

  it("deve chamar getByItemListId com o id correto", async () => {

    const persister = new ItemPersisterMock()
    const sut = new GetTotalByCategory(persister)

    await sut.perform({ itemListId: "list1" })

    expect(persister.getCallCount).toBe(1)
    expect(persister.receivedListId).toBe("list1")

  })


  it("deve retornar lista vazia quando não houver itens", async () => {

    const persister = new ItemPersisterMock()
    const sut = new GetTotalByCategory(persister)

    const result = await sut.perform({ itemListId: "list1" })

    expect(result).toEqual([])

  })


  it("deve calcular o total corretamente para uma categoria", async () => {

    const persister = new ItemPersisterMock()

    const cat = new Categoria("c1", "Alimentos")

    const item1 = buildItem("1", cat, 10, 2) // 20
    const item2 = buildItem("2", cat, 5, 3)  // 15

    persister.itemsToReturn = [item1, item2]

    const sut = new GetTotalByCategory(persister)

    const result = await sut.perform({ itemListId: "list1" })

    expect(result).toHaveLength(1)
    expect(result[0].categoryName).toBe("Alimentos")
    expect(result[0].total).toBe(35)

  })


  it("deve calcular totais para múltiplas categorias", async () => {

    const persister = new ItemPersisterMock()

    const alimentos = new Categoria("c1", "Alimentos")
    const bebidas = new Categoria("c2", "Bebidas")

    const item1 = buildItem("1", alimentos, 10, 1) // 10
    const item2 = buildItem("2", bebidas, 5, 2)    // 10
    const item3 = buildItem("3", alimentos, 2, 5)  // 10

    persister.itemsToReturn = [item1, item2, item3]

    const sut = new GetTotalByCategory(persister)

    const result = await sut.perform({ itemListId: "list1" })

    const totalAlimentos = result.find(r => r.categoryName === "Alimentos")
    const totalBebidas = result.find(r => r.categoryName === "Bebidas")

    expect(totalAlimentos?.total).toBe(20)
    expect(totalBebidas?.total).toBe(10)

  })

})