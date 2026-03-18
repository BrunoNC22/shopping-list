import type { RemoteCategory } from "./RemoteCategory"

export type RemoteItem = {
  id: string,
  itemListId: string,
  category: RemoteCategory,
  name: string,
  price: number,
  amount: number,
  checked: boolean
}