
import { Categoria, Item, ItemListNotFoundError, ItemNotFoundError, NotFoundError, type GetHttpClientOutputPort, type ItemPersisterOutputPort } from "@shopping-list/domain";
import type { RemoteItem } from "./types/RemoteItem";

export class RemoteItemPersister implements ItemPersisterOutputPort {
  constructor(private readonly httpClient: GetHttpClientOutputPort) {}

  async getAll(): Promise<Item[]> {
    try {
      const remoteItems = await this.httpClient.get<RemoteItem[]>({ url: "/items" })
      return remoteItems.map((remoteItem) => this.convertToDomainItem(remoteItem))
    } catch (e) {
      throw new Error(`Unexpected error while trying to get items from server: ${e}`)
    }
  }

  async getByItemListId(itemListId: string): Promise<Item[]> {
    try {
      const remoteItems = await this.httpClient.get<RemoteItem[]>({ url: `/item-list/${itemListId}/items` })
      return remoteItems.map((remoteItem) => this.convertToDomainItem(remoteItem))
    } catch (e) {
      if (e instanceof NotFoundError) {
        throw new ItemListNotFoundError(`ItemList with id ${itemListId} not found.`)
      }
      throw new Error(`Unexpected error while trying to get item by item list id from the server: ${e}`)
    }
  }

  convertToDomainItem(remoteItem: RemoteItem) {
    const category = new Categoria(remoteItem.category.id, remoteItem.category.name)
    return new Item(remoteItem.id, remoteItem.itemListId, remoteItem.name, remoteItem.price, remoteItem.amount, category, remoteItem.checked)
  }

  async replace(): Promise<void> {
    throw new Error("RemoteItemPersister do not replace items.")
  }

  async save(): Promise<void> {
    throw new Error("RemoteItemPersister do not save items.")
  }

  async delete(): Promise<void> {
    throw new Error("RemoteItemPersister do not delete items")
  }

  async getById(id: string): Promise<Item> {
    try {
      const remoteItem = await this.httpClient.get<RemoteItem>({ url: `/items/${id}` })
      return this.convertToDomainItem(remoteItem)
    } catch (e) {
      if (e instanceof NotFoundError) {
        throw new ItemNotFoundError(`Item com id ${id} não encontrado`)
      }
      throw new Error(`Erro inesperado ao buscar item com id ${id} no servidor: ${e}`)
    }
  }
}