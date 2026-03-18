import { describe, it, expect } from "vitest"
import { CreateItemList } from "./CreateItemList"
import { ItemList } from "../../models/ItemList"
import type { IdGeneratorOutputPort } from "../../output/id/IdGeneratorOutputPort"
import type { SaveItemListPersisterOutputPort } from "../../output/persistance/ItemListPersisterOutputPort"

class IdGeneratorMock implements IdGeneratorOutputPort {

  public generatedId = "generated-list-id"

  async generate(): Promise<string> {
    return this.generatedId
  }

}

class ItemListPersisterMock implements SaveItemListPersisterOutputPort {

  public savedItemList: ItemList | null = null

  async save(itemList: ItemList): Promise<void> {
    this.savedItemList = itemList
  }

}

describe("CreateItemList", () => {

  it("deve gerar um id para a lista", async () => {

    const idGenerator = new IdGeneratorMock()
    const persister = new ItemListPersisterMock()

    const useCase = new CreateItemList(persister, idGenerator)

    await useCase.perform({
      listName: "Lista do mercado"
    })

    expect(persister.savedItemList?.id).toBe("generated-list-id")

  })

  it("deve criar uma ItemList com o nome correto", async () => {

    const idGenerator = new IdGeneratorMock()
    const persister = new ItemListPersisterMock()

    const useCase = new CreateItemList(persister, idGenerator)

    await useCase.perform({
      listName: "Lista da semana"
    })

    expect(persister.savedItemList?.name).toBe("Lista da semana")

  })

  it("deve criar a lista com itens vazios", async () => {

    const idGenerator = new IdGeneratorMock()
    const persister = new ItemListPersisterMock()

    const useCase = new CreateItemList(persister, idGenerator)

    await useCase.perform({
      listName: "Lista vazia"
    })

    const items = persister.savedItemList?.getItems()

    expect(items).toHaveLength(0)

  })

  it("deve definir createdAt na criação da lista", async () => {

    const idGenerator = new IdGeneratorMock()
    const persister = new ItemListPersisterMock()

    const useCase = new CreateItemList(persister, idGenerator)

    const before = new Date()

    await useCase.perform({
      listName: "Lista teste"
    })

    const createdAt = persister.savedItemList?.createdAt

    const after = new Date()

    expect(createdAt).toBeInstanceOf(Date)
    expect(createdAt!.getTime()).toBeGreaterThanOrEqual(before.getTime())
    expect(createdAt!.getTime()).toBeLessThanOrEqual(after.getTime())

  })

  it("deve persistir a ItemList criada", async () => {

    const idGenerator = new IdGeneratorMock()
    const persister = new ItemListPersisterMock()

    const useCase = new CreateItemList(persister, idGenerator)

    await useCase.perform({
      listName: "Lista persistida"
    })

    expect(persister.savedItemList).not.toBeNull()

  })

})