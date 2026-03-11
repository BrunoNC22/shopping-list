import { describe, it, expect } from "vitest"

import { ToggleItemIsChecked } from "./ToggleItemIsChecked"
import Item from "../../models/Item"
import { Categoria } from "../../models/Categoria"

import type {
  GetByIdItemPersisterOutputPort,
  SaveItemPersisterOutputPort
} from "../../output/persistance/ItemPersisterOutputPort"


class ItemPersisterMock implements
  GetByIdItemPersisterOutputPort,
  SaveItemPersisterOutputPort {

  getCallCount = 0
  saveCallCount = 0

  receivedId: string | null = null
  savedItem: Item | null = null

  itemToReturn: Item | null = null
  errorToThrow: Error | null = null

  async getById(id: string): Promise<Item> {
    this.getCallCount++
    this.receivedId = id

    if (this.errorToThrow) throw this.errorToThrow

    return this.itemToReturn as Item
  }

  async save(item: Item): Promise<void> {
    this.saveCallCount++
    this.savedItem = item
  }

}


function buildItem(checked = false) {
  const category = new Categoria("cat", "Categoria")
  return new Item("item1", "list1", "Arroz", 10, 1, category, checked)
}


describe("ToggleItemIsChecked", () => {

  it("deve buscar o item pelo id", async () => {

    const persister = new ItemPersisterMock()
    persister.itemToReturn = buildItem(false)

    const sut = new ToggleItemIsChecked(persister)

    await sut.perform({ itemId: "item1" })

    expect(persister.getCallCount).toBe(1)
    expect(persister.receivedId).toBe("item1")

  })


  it("deve alternar checked de false para true", async () => {

    const persister = new ItemPersisterMock()

    const item = buildItem(false)
    persister.itemToReturn = item

    const sut = new ToggleItemIsChecked(persister)

    await sut.perform({ itemId: "item1" })

    expect(item.checked).toBe(true)

  })


  it("deve alternar checked de true para false", async () => {

    const persister = new ItemPersisterMock()

    const item = buildItem(true)
    persister.itemToReturn = item

    const sut = new ToggleItemIsChecked(persister)

    await sut.perform({ itemId: "item1" })

    expect(item.checked).toBe(false)

  })


  it("deve salvar o item atualizado", async () => {

    const persister = new ItemPersisterMock()

    const item = buildItem(false)
    persister.itemToReturn = item

    const sut = new ToggleItemIsChecked(persister)

    await sut.perform({ itemId: "item1" })

    expect(persister.saveCallCount).toBe(1)
    expect(persister.savedItem).toBe(item)

  })


  it("deve propagar erro caso getById falhe", async () => {

    const persister = new ItemPersisterMock()
    persister.errorToThrow = new Error("database error")

    const sut = new ToggleItemIsChecked(persister)

    await expect(
      sut.perform({ itemId: "item1" })
    ).rejects.toThrow("database error")

  })

})