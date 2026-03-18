import { describe, it, expect } from "vitest"
import { DeleteItem } from "./DeleteItem"

import type { DeleteItemPersisterOutputPort } from "../../output/persistance/ItemPersisterOutputPort"


class ItemPersisterMock implements DeleteItemPersisterOutputPort {

  deleteCallCount = 0
  receivedItemId: string | null = null
  errorToThrow: Error | null = null

  async delete(itemId: string): Promise<void> {
    this.deleteCallCount++
    this.receivedItemId = itemId

    if (this.errorToThrow) {
      throw this.errorToThrow
    }
  }

}


describe("DeleteItem", () => {

  it("deve chamar itemPersister.delete com o id correto", async () => {

    const persister = new ItemPersisterMock()
    const sut = new DeleteItem(persister)

    await sut.perform({ itemId: "item-123" })

    expect(persister.deleteCallCount).toBe(1)
    expect(persister.receivedItemId).toBe("item-123")

  })


  it("deve propagar erro do persister", async () => {

    const persister = new ItemPersisterMock()
    const sut = new DeleteItem(persister)

    persister.errorToThrow = new Error("database error")

    await expect(
      sut.perform({ itemId: "item-123" })
    ).rejects.toThrow("database error")

  })

})