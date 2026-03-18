import { describe, it, expect } from "vitest"

import CreateItem from "./CreateItem"
import { Item } from "../../models/Item"
import { Categoria } from "../../models/Categoria"

import type { SaveItemPersisterOutputPort } from "../../output/persistance/ItemPersisterOutputPort"
import type { GetByIdCategoriesPersisterOutputPort } from "../../output/persistance/CategoryPersisterOutputPort"
import type { GetItemListPersisterOutputPort } from "../../output/persistance/ItemListPersisterOutputPort"
import type { IdGeneratorOutputPort } from "../../output/id/IdGeneratorOutputPort"

import { CategoryNotFoundError } from "../../output/persistance/errors/CategoryNotFoundError"
import { ItemListNotFoundError } from "../../output/persistance/errors/ItemListNotFoundError"
import { ItemList } from "@/models/ItemList"


class ItemPersisterMock implements SaveItemPersisterOutputPort {

  saveCallCount = 0
  savedItem: Item | null = null

  async save(item: Item): Promise<void> {
    this.saveCallCount++
    this.savedItem = item
  }

}


class CategoryPersisterMock implements GetByIdCategoriesPersisterOutputPort {

  getByIdCallCount = 0
  categoryToReturn: Categoria | null = null
  errorToThrow: Error | null = null

  async getById(): Promise<Categoria> {
    this.getByIdCallCount++

    if (this.errorToThrow) {
      throw this.errorToThrow
    }

    return this.categoryToReturn as Categoria
  }

}


class ItemListPersisterMock implements GetItemListPersisterOutputPort {

  getCallCount = 0
  errorToThrow: Error | null = null
  itemListToReturn = new ItemList('itemListId', 'Item List Name', [], new Date())

  async get(): Promise<ItemList> {
    this.getCallCount++

    if (this.errorToThrow) {
      throw this.errorToThrow
    }

    return this.itemListToReturn
  }

}


class IdGeneratorMock implements IdGeneratorOutputPort {

  generateCallCount = 0
  idToReturn = "generated-id"

  async generate(): Promise<string> {
    this.generateCallCount++
    return this.idToReturn
  }

}


describe("CreateItem", () => {

  function buildSUT() {

    const itemPersister = new ItemPersisterMock()
    const categoryPersister = new CategoryPersisterMock()
    const itemListPersister = new ItemListPersisterMock()
    const idGenerator = new IdGeneratorMock()

    const sut = new CreateItem(
      itemPersister,
      categoryPersister,
      itemListPersister,
      idGenerator
    )

    return {
      sut,
      itemPersister,
      categoryPersister,
      itemListPersister,
      idGenerator
    }
  }

  it("deve lançar erro quando categoria não existir", async () => {

    const { sut, categoryPersister } = buildSUT()

    categoryPersister.errorToThrow = new CategoryNotFoundError('Categoria não encontrada')

    await expect(
      sut.perform({
        name: "Item",
        price: 10,
        amount: 1,
        categoryId: "cat-id",
        itemListId: "list-id"
      })
    ).rejects.toThrow("Não foi possivel criar o item pois a categoria com id cat-id não existe.")

  })


  it("deve lançar erro quando itemList não existir", async () => {

    const { sut, categoryPersister, itemListPersister } = buildSUT()

    categoryPersister.categoryToReturn = new Categoria("cat", "categoria")
    itemListPersister.errorToThrow = new ItemListNotFoundError('Item list não encontrado')

    await expect(
      sut.perform({
        name: "Item",
        price: 10,
        amount: 1,
        categoryId: "cat",
        itemListId: "list-id"
      })
    ).rejects.toThrow("Não foi poassivel criar o item pois a lista de itens com id list-id não existe")

  })


  it("deve lançar erro inesperado ao buscar categoria", async () => {

    const { sut, categoryPersister } = buildSUT()

    categoryPersister.errorToThrow = new Error("db error")

    await expect(
      sut.perform({
        name: "Item",
        price: 10,
        amount: 1,
        categoryId: "cat",
        itemListId: "list"
      })
    ).rejects.toThrow("Erro inesperado ao buscar categoria com id cat")

  })


  it("deve criar um item corretamente", async () => {

    const { sut, categoryPersister, itemPersister, idGenerator } = buildSUT()

    const category = new Categoria("cat-id", "Categoria")

    categoryPersister.categoryToReturn = category
    idGenerator.idToReturn = "new-item-id"

    const item = await sut.perform({
      name: "Arroz",
      price: 20,
      amount: 2,
      categoryId: "cat-id",
      itemListId: "list-id"
    })

    expect(item).toBeInstanceOf(Item)
    expect(item.id).toBe("new-item-id")
    expect(item.name).toBe("Arroz")
    expect(item.price).toBe(20)
    expect(item.amount).toBe(2)
    expect(item.category).toBe(category)

    expect(itemPersister.saveCallCount).toBe(1)
    expect(itemPersister.savedItem).toBe(item)

  })


  it("deve chamar o idGenerator", async () => {

    const { sut, categoryPersister, idGenerator } = buildSUT()

    categoryPersister.categoryToReturn = new Categoria("cat", "categoria")

    await sut.perform({
      name: "Item",
      price: 5,
      amount: 1,
      categoryId: "cat",
      itemListId: "list"
    })

    expect(idGenerator.generateCallCount).toBe(1)

  })

})