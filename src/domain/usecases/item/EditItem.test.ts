import { describe, it, expect } from "vitest"

import { EditItem } from "./EditItem"
import Item from "../../models/Item"
import { Categoria } from "../../models/Categoria"

import type {
  getByItemListIdItemPersisterOutputPort,
  SaveItemPersisterOutputPort
} from "../../output/persistance/ItemPersisterOutputPort"

import type { GetByIdCategoriesPersisterOutputPort } from "../../output/persistance/CategoryPersisterOutputPort"

import { CategoryNotFoundError } from "../../output/persistance/errors/CategoryNotFoundError"


class ItemPersisterMock implements
  getByItemListIdItemPersisterOutputPort,
  SaveItemPersisterOutputPort {

  getCallCount = 0
  saveCallCount = 0

  itemsToReturn: Item[] = []
  savedItem: Item | null = null
  receivedListId: string | null = null

  async getByItemListId(itemListId: string): Promise<Item[]> {
    this.getCallCount++
    this.receivedListId = itemListId
    return this.itemsToReturn
  }

  async save(item: Item): Promise<void> {
    this.saveCallCount++
    this.savedItem = item
  }
}


class CategoryPersisterMock implements GetByIdCategoriesPersisterOutputPort {

  getCallCount = 0
  categoryToReturn: Categoria | null = null
  errorToThrow: Error | null = null
  receivedId: string | null = null

  async getById(id: string): Promise<Categoria> {
    this.getCallCount++
    this.receivedId = id

    if (this.errorToThrow) throw this.errorToThrow

    return this.categoryToReturn as Categoria
  }
}


function buildItem() {
  const category = new Categoria("cat", "categoria")
  return new Item("item1", "list1", "Arroz", 10, 1, category)
}


function buildSUT() {
  const itemPersister = new ItemPersisterMock()
  const categoryPersister = new CategoryPersisterMock()

  const sut = new EditItem(itemPersister, categoryPersister)

  return { sut, itemPersister, categoryPersister }
}


describe("EditItem", () => {

  it("deve buscar itens pelo itemListId", async () => {

    const { sut, itemPersister } = buildSUT()

    await sut.perform({
      itemId: "1",
      itemListId: "list1"
    })

    expect(itemPersister.getCallCount).toBe(1)
    expect(itemPersister.receivedListId).toBe("list1")

  })


  it("não deve salvar se o item não for encontrado", async () => {

    const { sut, itemPersister } = buildSUT()

    itemPersister.itemsToReturn = []

    await sut.perform({
      itemId: "not-found",
      itemListId: "list1"
    })

    expect(itemPersister.saveCallCount).toBe(0)

  })


  it("deve atualizar o nome do item", async () => {

    const { sut, itemPersister } = buildSUT()

    const item = buildItem()
    itemPersister.itemsToReturn = [item]

    await sut.perform({
      itemId: "item1",
      itemListId: "list1",
      name: "Feijão"
    })

    expect(itemPersister.savedItem?.name).toBe("Feijão")

  })


  it("deve atualizar o amount", async () => {

    const { sut, itemPersister } = buildSUT()

    const item = buildItem()
    itemPersister.itemsToReturn = [item]

    await sut.perform({
      itemId: "item1",
      itemListId: "list1",
      amount: 5
    })

    expect(itemPersister.savedItem?.amount).toBe(5)

  })


  it("deve atualizar o preço", async () => {

    const { sut, itemPersister } = buildSUT()

    const item = buildItem()
    itemPersister.itemsToReturn = [item]

    await sut.perform({
      itemId: "item1",
      itemListId: "list1",
      value: 30
    })

    expect(itemPersister.savedItem?.price).toBe(30)

  })


  it("deve atualizar a categoria", async () => {

    const { sut, itemPersister, categoryPersister } = buildSUT()

    const item = buildItem()
    const newCategory = new Categoria("cat2", "Nova")

    itemPersister.itemsToReturn = [item]
    categoryPersister.categoryToReturn = newCategory

    await sut.perform({
      itemId: "item1",
      itemListId: "list1",
      categoryId: "cat2"
    })

    expect(categoryPersister.getCallCount).toBe(1)
    expect(itemPersister.savedItem?.category).toBe(newCategory)

  })


  it("deve lançar erro quando categoria não existir", async () => {

    const { sut, itemPersister, categoryPersister } = buildSUT()

    const item = buildItem()

    itemPersister.itemsToReturn = [item]
    categoryPersister.errorToThrow = new CategoryNotFoundError('Categoria não encontrada')

    await expect(
      sut.perform({
        itemId: "item1",
        itemListId: "list1",
        categoryId: "invalid"
      })
    ).rejects.toThrow(
      "Não foi possivel editar o item pois a categoria com id invalid não existe."
    )

  })


  it("deve lançar erro inesperado ao buscar categoria", async () => {

    const { sut, itemPersister, categoryPersister } = buildSUT()

    const item = buildItem()

    itemPersister.itemsToReturn = [item]
    categoryPersister.errorToThrow = new Error("db error")

    await expect(
      sut.perform({
        itemId: "item1",
        itemListId: "list1",
        categoryId: "cat"
      })
    ).rejects.toThrow("Erro inesperado ao buscar categoria com id cat")

  })

})