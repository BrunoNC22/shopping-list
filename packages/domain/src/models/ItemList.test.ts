import { describe, it, expect, beforeEach } from "vitest"
import { ItemList } from "./ItemList"
import { Item } from "./Item"
import { Categoria } from "./Categoria"

describe("ItemList", () => {

  const categoria = new Categoria("cat-1", "Mercado")
  const createdAt = new Date()

  let item1: Item
  let item2: Item
  let list: ItemList

  beforeEach(() => {
    item1 = new Item("1", "list-1", "Arroz", 10, 2, categoria)
    item2 = new Item("2", "list-1", "Feijão", 8, 3, categoria)

    list = new ItemList(
      "list-1",
      "Lista de Compras",
      [item1],
      createdAt
    )
  })

  it("deve instanciar corretamente", () => {
    expect(list.id).toBe("list-1")
    expect(list.name).toBe("Lista de Compras")
    expect(list.createdAt).toBe(createdAt)
    expect(list.getItems()).toHaveLength(1)
    expect(list.getItems()[0]).toBe(item1)
  })

  it("deve permitir alterar o nome", () => {
    list.name = "Nova Lista"

    expect(list.name).toBe("Nova Lista")
  })

  it("deve retornar os itens da lista", () => {
    const items = list.getItems()

    expect(items.length).toBe(1)
    expect(items[0]).toBe(item1)
  })

  it("deve adicionar um item", () => {
    list.addItem(item2)

    const items = list.getItems()

    expect(items).toHaveLength(2)
    expect(items).toContain(item2)
  })

  it("deve remover um item existente", () => {
    list.addItem(item2)

    list.removeItem(item1)

    const items = list.getItems()

    expect(items).toHaveLength(1)
    expect(items[0]).toBe(item2)
  })

  it("deve lançar erro ao remover item inexistente", () => {
    expect(() => {
      list.removeItem(item2)
    }).toThrow("Item not found in the list.")
  })

  it("deve calcular o valor total dos itens", () => {
    list.addItem(item2)

    const total = list.getTotalValue()

    expect(total).toBe(44)
  })

  it("deve retornar 0 quando não houver itens", () => {
    const emptyList = new ItemList(
      "list-2",
      "Lista vazia",
      [],
      new Date()
    )

    expect(emptyList.getTotalValue()).toBe(0)
  })
})