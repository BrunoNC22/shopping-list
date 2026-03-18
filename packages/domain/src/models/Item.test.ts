import { describe, it, expect } from "vitest"
import { Item } from "./Item"
import { Categoria } from "./Categoria"

describe("Item", () => {

  const categoria = new Categoria("1", "Bebidas")

  it("deve instanciar um item corretamente", () => {
    const item = new Item(
      "item-1",
      "list-1",
      "Coca-Cola",
      5,
      2,
      categoria
    )

    expect(item.id).toBe("item-1")
    expect(item.itemListId).toBe("list-1")
    expect(item.name).toBe("Coca-Cola")
    expect(item.price).toBe(5)
    expect(item.amount).toBe(2)
    expect(item.category).toBe(categoria)
    expect(item.checked).toBe(false)
  })

  it("deve permitir definir checked como true", () => {
    const item = new Item("1", "list", "Produto", 10, 1, categoria)

    item.checked = true

    expect(item.checked).toBe(true)
  })

  it("deve permitir alterar o nome", () => {
    const item = new Item("1", "list", "Produto", 10, 1, categoria)

    item.name = "Novo Produto"

    expect(item.name).toBe("Novo Produto")
  })

  it("deve remover espaços ao definir nome", () => {
    const item = new Item("1", "list", "Produto", 10, 1, categoria)

    item.name = "   Arroz   "

    expect(item.name).toBe("Arroz")
  })

  it("não deve permitir nome vazio", () => {
    const item = new Item("1", "list", "Produto", 10, 1, categoria)

    expect(() => {
      item.name = ""
    }).toThrow("Name cannot be empty.")
  })

  it("não deve permitir nome apenas com espaços", () => {
    const item = new Item("1", "list", "Produto", 10, 1, categoria)

    expect(() => {
      item.name = "   "
    }).toThrow("Name cannot be empty.")
  })

  it("deve permitir alterar o preço", () => {
    const item = new Item("1", "list", "Produto", 10, 1, categoria)

    item.price = 20

    expect(item.price).toBe(20)
  })

  it("não deve permitir preço negativo", () => {
    const item = new Item("1", "list", "Produto", 10, 1, categoria)

    expect(() => {
      item.price = -1
    }).toThrow("Price cannot be negative.")
  })

  it("deve permitir alterar a quantidade", () => {
    const item = new Item("1", "list", "Produto", 10, 1, categoria)

    item.amount = 5

    expect(item.amount).toBe(5)
  })

  it("não deve permitir quantidade negativa", () => {
    const item = new Item("1", "list", "Produto", 10, 1, categoria)

    expect(() => {
      item.amount = -1
    }).toThrow("Amount cannot be empty.")
  })

  it("deve permitir alterar a categoria", () => {
    const item = new Item("1", "list", "Produto", 10, 1, categoria)

    const novaCategoria = new Categoria("2", "Limpeza")

    item.category = novaCategoria

    expect(item.category).toBe(novaCategoria)
  })
})