import { describe, it, expect, vi, afterEach } from "vitest"
import { IdGeneratorAdapter } from "./IdGeneratorAdapter"

describe("IdGeneratorAdapter", () => {

  afterEach(() => {
    vi.restoreAllMocks()
  })


  it("deve retornar uma string", async () => {

    const sut = new IdGeneratorAdapter()

    const id = await sut.generate()

    expect(typeof id).toBe("string")

  })


  it("deve gerar apenas números", async () => {

    const sut = new IdGeneratorAdapter()

    const id = await sut.generate()

    expect(id).toMatch(/^\d+$/)

  })


  it("deve usar Math.random para gerar o id", async () => {

    const randomSpy = vi.spyOn(Math, "random").mockReturnValue(0.5)

    const sut = new IdGeneratorAdapter()

    const id = await sut.generate()

    expect(randomSpy).toHaveBeenCalledTimes(1)
    expect(id).toBe("500000000")

  })


  it("deve gerar ids diferentes em chamadas diferentes", async () => {

    const sut = new IdGeneratorAdapter()

    const id1 = await sut.generate()
    const id2 = await sut.generate()

    expect(id1).not.toBe(id2)

  })


  it("deve respeitar o range esperado", async () => {

    vi.spyOn(Math, "random").mockReturnValue(0.999999999)

    const sut = new IdGeneratorAdapter()

    const id = await sut.generate()

    const numericId = Number(id)

    expect(numericId).toBeGreaterThanOrEqual(0)
    expect(numericId).toBeLessThanOrEqual(1_000_000_000)

  })

})