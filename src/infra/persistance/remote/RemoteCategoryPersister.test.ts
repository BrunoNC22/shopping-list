import { describe, it, expect } from "vitest"
import { RemoteCategoryPersister } from "./RemoteCategoryPersister"
import { Categoria } from "@/domain/models/Categoria"
import type { GetHttpClientOutputPort } from "@/domain/output/http/HttpClientOutputPort"
import type { RemoteCategory } from "./types/RemoteCategory"
import { NotFoundError } from "@/domain/output/http/errors/NotFoundError"
import { CategoryNotFoundError } from "@/domain/output/persistance/errors/CategoryNotFoundError"

class HttpClientMock implements GetHttpClientOutputPort {
  response: unknown = undefined
  errorToThrow: Error | null = null
  lastUrl: string | null = null
  async get<T>(props: { url: string }): Promise<T> {
    this.lastUrl = props.url
    if (this.errorToThrow) {
      throw this.errorToThrow
    }
    return this.response as T
  }
}

function makeSut() {
  const httpClient = new HttpClientMock()
  const sut = new RemoteCategoryPersister(httpClient)
  return { sut, httpClient }
}

describe("RemoteCategoryPersister", () => {
  it("deve buscar todas categorias do servidor", async () => {
    const { sut, httpClient } = makeSut()
    const remoteCategories: RemoteCategory[] = [
      { id: "1", name: "Mercearia" },
      { id: "2", name: "Limpeza" }
    ]
    httpClient.response = remoteCategories

    const result = await sut.getAll()

    expect(httpClient.lastUrl).toBe("/categories")
    expect(result.length).toBe(2)
    expect(result[0]).toBeInstanceOf(Categoria)
    expect(result[0].nome).toBe("Mercearia")
  })

  it("deve lançar erro inesperado ao buscar todas categorias", async () => {
    const { sut, httpClient } = makeSut()
    httpClient.errorToThrow = new Error("server error")

    await expect(
      sut.getAll()
    ).rejects.toThrow("Unexpected error while trying to get all categories")
  })

  it("deve buscar categoria por id", async () => {
    const { sut, httpClient } = makeSut()
    const remoteCategory: RemoteCategory = {
      id: "1",
      name: "Mercearia"
    }
    httpClient.response = remoteCategory

    const result = await sut.getById("1")

    expect(httpClient.lastUrl).toBe("/categories/1")
    expect(result).toBeInstanceOf(Categoria)
    expect(result.nome).toBe("Mercearia")
  })

  it("deve lançar CategoryNotFoundError quando API retornar NotFoundError", async () => {
    const { sut, httpClient } = makeSut()
    httpClient.errorToThrow = new NotFoundError("not found")

    await expect(
      sut.getById("invalid")
    ).rejects.toBeInstanceOf(CategoryNotFoundError)
  })

  it("deve lançar erro inesperado ao buscar categoria por id", async () => {
    const { sut, httpClient } = makeSut()
    httpClient.errorToThrow = new Error("server error")

    await expect(
      sut.getById("1")
    ).rejects.toThrow("Unexpected Error while trying to get category by id")
  })

  it("save deve lançar erro pois não é suportado", async () => {
    const { sut } = makeSut()
    
    await expect(
      sut.save()
    ).rejects.toThrow("RemoteCategoryPersister do not save Categoria.")
  })
})