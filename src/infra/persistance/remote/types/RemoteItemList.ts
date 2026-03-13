import type { RemoteItem } from "./RemoteItem"

export type RemoteItemList = {
  id: string,
  name: string,
  createdAt: string,
  items: RemoteItem[]
}