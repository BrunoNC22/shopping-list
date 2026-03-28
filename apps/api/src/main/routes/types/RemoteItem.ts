import { Item } from "@shopping-list/domain"
import { toDomainCategory, toRemoteCategory, type RemoteCategory } from "./RemoteCategory"

export type RemoteItem = {
  id: string,
  itemListId: string,
  category: RemoteCategory,
  name: string,
  price: number,
  amount: number,
  checked: boolean
}

export const toDomainItem = (remoteItem: RemoteItem) => new Item(
  remoteItem.id,
  remoteItem.itemListId,
  remoteItem.name,
  remoteItem.price,
  remoteItem.amount,
  toDomainCategory(remoteItem.category),
  remoteItem.checked
)

export const toRemoteItem = (item: Item): RemoteItem => ({
  id: item.id,
  amount: item.amount,
  category: toRemoteCategory(item.category),
  checked: item.checked,
  itemListId: item.itemListId,
  name: item.name,
  price: item.price
})