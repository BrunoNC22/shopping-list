import { Categoria, Item, ItemList, ItemListNotFoundError, NotFoundError, type GetHttpClientOutputPort, type ItemListPersisterOutputPort } from "@shopping-list/domain"
import type { RemoteItemList } from "./types/RemoteItemList"



export class RemoteItemListPersister implements ItemListPersisterOutputPort {
  constructor(private readonly httpClient: GetHttpClientOutputPort) {}

  async delete(): Promise<void> {
    throw new Error("RemoteItemListPersister do not delete ItemList.")
  }

  async get(listId: string): Promise<ItemList> {
    try {
      const remoteItemList = await this.httpClient.get<RemoteItemList>({ url: `/item-lists/${listId}` })
      return this.convertToDomainItemList(remoteItemList)
    } catch (e) {
      if (e instanceof NotFoundError) {
        throw new ItemListNotFoundError(`Não foi possivel encontrar ItemList com id ${listId}`)
      } else {
        throw new Error(`Unexpected error while trying to get ItemList from server: ${e}`)
      }
    }
  }

  async getAll(): Promise<ItemList[]> {
    try {
      const remoteItemLists = await this.httpClient.get<RemoteItemList[]>({ url: `/item-lists` })
      return remoteItemLists.map((remoteItemList) => this.convertToDomainItemList(remoteItemList))
    } catch (e) {
      throw new Error(`Unexpected error while trying to get item lists from server: ${e}`)
    }
  }

  async getAllByUserId(): Promise<ItemList[]> {
    try {
      const remoteItemLists = await this.httpClient.get<RemoteItemList[]>({ url: `/item-lists` })
      return remoteItemLists.map((remoteItemList) => this.convertToDomainItemList(remoteItemList))
    } catch (e) {
      throw new Error(`Unexpected error while trying to get item lists from server: ${e}`)
    }
  }

  async replaceByUserId(): Promise<void> {
    throw new Error("Remote item list persister do not replace items")
  }

  convertToDomainItemList(remoteItemList: RemoteItemList) {
    const items = remoteItemList.items.map((remoteItem) => {
      const category = new Categoria(remoteItem.category.id, remoteItem.category.name)

      return new Item(remoteItem.id, remoteItemList.id, remoteItem.name, remoteItem.price, remoteItem.amount, category, remoteItem.checked)
    })

    return new ItemList(remoteItemList.id, remoteItemList.userId, remoteItemList.name, items, new Date(remoteItemList.createdAt))
  }

  async save(): Promise<void> {
    throw new Error("RemoteItemListPersister do not save ItemList.")
  }
}