import { describe, it, expect } from "vitest"
import { BaseModel } from "./BaseModel"

class TestModel extends BaseModel {}

describe("BaseModel", () => {

  it("deve instanciar uma entidade com id", () => {
    const model = new TestModel("123")

    expect(model.id).toBe("123")
  })
})