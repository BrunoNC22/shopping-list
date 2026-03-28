import { ItemList } from "@shopping-list/domain"
import { toRemoteItem, type RemoteItem } from "./RemoteItem"

export type RemoteItemList = {
  id: string,
  name: string,
  createdAt: string,
  items: RemoteItem[],
  userId: string
}

export const toRemoteItemList = (itemList: ItemList): RemoteItemList => ({
  createdAt: itemList.createdAt.toISOString(),
  id: itemList.id,
  items: itemList.getItems().map(item => toRemoteItem(item)),
  name: itemList.name,
  userId: itemList.userId
})