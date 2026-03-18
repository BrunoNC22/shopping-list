import { describe, it, expect, vi, beforeEach, afterEach, type MockedFunction } from "vitest"
import { FetchHttpClientAdapter } from "./FetchHttpClientAdapter"
import { NotFoundError, UnauthorizedError } from "@shopping-list/domain"

describe("FetchHttpClientAdapter", () => {
  const baseUrl = "http://api.test"
  let fetchMock: MockedFunction<typeof fetch>

  beforeEach(() => {
    fetchMock = vi.fn()

    global.fetch = fetchMock
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })


  it("deve chamar fetch corretamente no GET", async () => {
    const response = { name: "Bruno" }

    fetchMock.mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => response
    } as Response)

    const sut = new FetchHttpClientAdapter(baseUrl)

    const result = await sut.get<{ name: string }>({
      url: "/user"
    })

    expect(fetchMock).toHaveBeenCalledTimes(1)

    expect(fetchMock).toHaveBeenCalledWith(
      "http://api.test/user",
      {
        method: "GET",
        headers: undefined,
        credentials: "include"
      }
    )

    expect(result).toEqual(response)
  })


  it("deve chamar fetch corretamente no POST", async () => {
    const response = { success: true }

    fetchMock.mockResolvedValue({
      ok: true,
      status: 201,
      json: async () => response
    } as Response)

    const sut = new FetchHttpClientAdapter(baseUrl)

    const body = { name: "Bruno" }

    const result = await sut.post<{ success: boolean }>({
      url: "/users",
      body
    })

    expect(fetchMock).toHaveBeenCalledWith(
      "http://api.test/users",
      {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "content-type": "application/json"
        },
        credentials: "include"
      }
    )

    expect(result).toEqual(response)
  })


  it("deve mesclar headers customizados com os default no POST", async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ ok: true })
    } as Response)

    const sut = new FetchHttpClientAdapter(baseUrl)

    await sut.post({
      url: "/test",
      body: { a: 1 },
      headers: {
        authorization: "Bearer token"
      }
    })

    expect(fetchMock).toHaveBeenCalledWith(
      "http://api.test/test",
      {
        method: "POST",
        body: JSON.stringify({ a: 1 }),
        headers: {
          "content-type": "application/json",
          authorization: "Bearer token"
        },
        credentials: "include"
      }
    )
  })


  it("deve enviar headers no GET quando fornecidos", async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ ok: true })
    } as Response)

    const sut = new FetchHttpClientAdapter(baseUrl)

    await sut.get({
      url: "/test",
      headers: {
        authorization: "Bearer token"
      }
    })

    expect(fetchMock).toHaveBeenCalledWith(
      "http://api.test/test",
      {
        method: "GET",
        headers: {
          authorization: "Bearer token"
        },
        credentials: "include"
      }
    )
  })


  it("deve retornar o resultado do json()", async () => {
    const data = { id: 1, name: "Item" }

    fetchMock.mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => data
    } as Response)

    const sut = new FetchHttpClientAdapter(baseUrl)

    const result = await sut.get<typeof data>({
      url: "/items"
    })

    expect(result).toEqual(data)
  })

  it("deve lançar UnauthorizedError quando status for 401", async () => {
    fetchMock.mockResolvedValue({
      ok: false,
      status: 401,
      statusText: "Unauthorized",
      json: async () => ({})
    } as Response)

    const sut = new FetchHttpClientAdapter(baseUrl)

    await expect(
      sut.get({ url: "/private" })
    ).rejects.toBeInstanceOf(UnauthorizedError)
  })

  it("deve lançar NotFoundError quando status for 404", async () => {
    fetchMock.mockResolvedValue({
      ok: false,
      status: 404,
      statusText: "Not Found",
      json: async () => ({})
    } as Response)

    const sut = new FetchHttpClientAdapter(baseUrl)

    await expect(
      sut.get({ url: "/resource" })
    ).rejects.toBeInstanceOf(NotFoundError)
  })
})