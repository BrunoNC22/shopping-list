import { describe, it, expect } from "vitest"
import { GetAllCategories } from "./GetAllCategories"
import { Categoria } from "../../models/Categoria"
import type { GetAllCategoriesPersisterOutputPort } from "../../output/persistance/CategoryPersisterOutputPort"

class CategoriesPersisterMock implements GetAllCategoriesPersisterOutputPort {

  public categories: Categoria[] = []
  public getAllCalled = false

  async getAll(): Promise<Categoria[]> {
    this.getAllCalled = true
    return this.categories
  }

}

describe("GetAllCategories", () => {

  it("deve chamar o persister para buscar categorias", async () => {

    const persister = new CategoriesPersisterMock()

    const useCase = new GetAllCategories(persister)

    await useCase.perform()

    expect(persister.getAllCalled).toBe(true)

  })

  it("deve retornar todas as categorias do persister", async () => {

    const persister = new CategoriesPersisterMock()

    persister.categories = [
      new Categoria("1", "Bebidas"),
      new Categoria("2", "Padaria")
    ]

    const useCase = new GetAllCategories(persister)

    const result = await useCase.perform()

    expect(result).toHaveLength(2)
    expect(result[0].nome).toBe("Bebidas")
    expect(result[1].nome).toBe("Padaria")

  })

  it("deve retornar lista vazia quando não houver categorias", async () => {

    const persister = new CategoriesPersisterMock()

    const useCase = new GetAllCategories(persister)

    const result = await useCase.perform()

    expect(result).toEqual([])

  })

})