import { describe, it, expect } from "vitest"
import SyncEvent, { SyncEventEnum } from "./SyncEvent"

describe("SyncEvent", () => {

  it("deve criar evento CREATE_CATEGORY", () => {

    const event = new SyncEvent(
      "1",
      SyncEventEnum.CREATE_CATEGORY,
      {
        id: "cat-1",
        name: "Bebidas"
      },
      new Date()
    )

    expect(event.type).toBe(SyncEventEnum.CREATE_CATEGORY)
    expect(event.payload.name).toBe("Bebidas")

  })

  it("deve criar evento EDIT_CATEGORY", () => {

    const event = new SyncEvent(
      "2",
      SyncEventEnum.EDIT_CATEGORY,
      {
        id: "cat-1",
        name: "Bebidas Alcoólicas"
      },
      new Date()
    )

    expect(event.payload.name).toBe("Bebidas Alcoólicas")

  })

  it("deve criar evento DELETE_CATEGORY", () => {

    const event = new SyncEvent(
      "3",
      SyncEventEnum.DELETE_CATEGORY,
      {
        id: "cat-1"
      },
      new Date()
    )

    expect(event.payload.id).toBe("cat-1")

  })

  it("deve criar evento CREATE_ITEM", () => {

    const event = new SyncEvent(
      "4",
      SyncEventEnum.CREATE_ITEM,
      {
        id: "item-1",
        itemListId: "list-1",
        name: "Arroz",
        price: 10,
        amount: 2,
        categoryId: "cat-1",
        checked: false
      },
      new Date()
    )

    expect(event.payload.name).toBe("Arroz")
    expect(event.payload.amount).toBe(2)

  })

  it("deve criar evento EDIT_ITEM", () => {

    const event = new SyncEvent(
      "5",
      SyncEventEnum.EDIT_ITEM,
      {
        id: "item-1",
        name: "Arroz Integral",
        price: 12,
        amount: 1,
        categoryId: "cat-1",
        checked: true
      },
      new Date()
    )

    expect(event.payload.checked).toBe(true)

  })

  it("deve criar evento DELETE_ITEM", () => {

    const event = new SyncEvent(
      "6",
      SyncEventEnum.DELETE_ITEM,
      {
        id: "item-1"
      },
      new Date()
    )

    expect(event.payload.id).toBe("item-1")

  })

  it("deve criar evento CREATE_ITEM_LIST", () => {

    const createdAt = new Date()

    const event = new SyncEvent(
      "7",
      SyncEventEnum.CREATE_ITEM_LIST,
      {
        id: "list-1",
        name: "Lista do mercado",
        createdAt
      },
      createdAt
    )

    expect(event.payload.name).toBe("Lista do mercado")

  })

  it("deve criar evento EDIT_ITEM_LIST", () => {

    const event = new SyncEvent(
      "8",
      SyncEventEnum.EDIT_ITEM_LIST,
      {
        id: "list-1",
        name: "Lista atualizada"
      },
      new Date()
    )

    expect(event.payload.name).toBe("Lista atualizada")

  })

  it("deve criar evento DELETE_ITEM_LIST", () => {

    const event = new SyncEvent(
      "9",
      SyncEventEnum.DELETE_ITEM_LIST,
      {
        id: "list-1"
      },
      new Date()
    )

    expect(event.payload.id).toBe("list-1")

  })

  it("deve iniciar com synced=false", () => {

    const event = new SyncEvent(
      "10",
      SyncEventEnum.DELETE_ITEM,
      { id: "item-1" },
      new Date()
    )

    expect(event.synced).toBe(false)

  })

  it("deve permitir marcar como sincronizado", () => {

    const event = new SyncEvent(
      "11",
      SyncEventEnum.DELETE_ITEM,
      { id: "item-1" },
      new Date()
    )

    event.synced = true

    expect(event.synced).toBe(true)

  })

})