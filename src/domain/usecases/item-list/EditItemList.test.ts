import type { GetItemListPersisterOutputPort, SaveItemListPersisterOutputPort } from "@/domain/output/persistance/ItemListPersisterOutputPort";
import { describe, expect, it } from "vitest";
import { EditItemList } from "./EditItemList";
import ItemList from "../../models/ItemList"

class ItemListPersisterMock implements SaveItemListPersisterOutputPort, GetItemListPersisterOutputPort {
  saveCallCount = 0
  getCallCount = 0
  savedItemList: ItemList | null = null
  getListId: string | null = null

  async save(itemList: ItemList): Promise<void> {
    this.getCallCount++
    this.savedItemList = itemList
  }

  async get(listId: string): Promise<ItemList> {
    this.saveCallCount++
    this.getListId = listId

    return new ItemList('testId', 'testName', [], new Date())
  }
}

describe('EditItemList', () => {
  it('Não deve chamar o save do ItemListPersister ao chamar o caso de uso com passando um nome de lista vazio', async () => {
    const persister = new ItemListPersisterMock()
    const sut = new EditItemList(persister)

    await sut.perform({ itemListId: 'listId', itemListName: '' })

    expect(persister.getCallCount).toBe(0)
    expect(persister.saveCallCount).toBe(0)
    expect(persister.getListId).toBe(null)
    expect(persister.savedItemList).toBe(null)
  })

  it('Deve salvar o ItemList com o nome atualizado', async () => {
    const persister = new ItemListPersisterMock()
    const sut = new EditItemList(persister)

    await sut.perform({ itemListId: 'validId', itemListName: 'validName' })

    expect(persister.getCallCount).toBe(1)
    expect(persister.saveCallCount).toBe(1)
    expect(persister.getListId).toBe('validId')
    expect(persister.savedItemList).not.toBe(null)
    expect(persister.savedItemList?.name).toBe('validName')
  })
})