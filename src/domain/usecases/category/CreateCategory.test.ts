import { describe, it, expect } from "vitest"
import { CreateCategory } from "./CreateCategory"
import type { Categoria } from "@/domain/models/Categoria"
import type { IdGeneratorOutputPort } from "@/domain/output/id/IdGeneratorOutputPort"
import type { SaveCategoryPersisterOutputPort } from "@/domain/output/persistance/CategoryPersisterOutputPort"

class IdGeneratorMock implements IdGeneratorOutputPort {

  public generatedId = "generated-id"

  async generate(): Promise<string> {
    return this.generatedId
  }

}

class CategoryPersisterMock implements SaveCategoryPersisterOutputPort {

  public savedCategory: Categoria | null = null

  async save(category: Categoria): Promise<void> {
    this.savedCategory = category
  }

}

describe("CreateCategory", () => {

  it("deve gerar um id para a categoria", async () => {

    const idGenerator = new IdGeneratorMock()
    const persister = new CategoryPersisterMock()

    const useCase = new CreateCategory(persister, idGenerator)

    const id = await useCase.perform({
      categoryName: "Bebidas"
    })

    expect(id).toBe("generated-id")

  })

  it("deve persistir a categoria criada", async () => {

    const idGenerator = new IdGeneratorMock()
    const persister = new CategoryPersisterMock()

    const useCase = new CreateCategory(persister, idGenerator)

    await useCase.perform({
      categoryName: "Bebidas"
    })

    expect(persister.savedCategory).not.toBeNull()
    expect(persister.savedCategory?.nome).toBe("Bebidas")

  })

  it("deve persistir a categoria com o id gerado", async () => {

    const idGenerator = new IdGeneratorMock()
    idGenerator.generatedId = "cat-123"

    const persister = new CategoryPersisterMock()

    const useCase = new CreateCategory(persister, idGenerator)

    await useCase.perform({
      categoryName: "Mercado"
    })

    expect(persister.savedCategory?.id).toBe("cat-123")

  })

  it("deve retornar o id da categoria criada", async () => {

    const idGenerator = new IdGeneratorMock()
    idGenerator.generatedId = "cat-999"

    const persister = new CategoryPersisterMock()

    const useCase = new CreateCategory(persister, idGenerator)

    const id = await useCase.perform({
      categoryName: "Padaria"
    })

    expect(id).toBe("cat-999")

  })

})