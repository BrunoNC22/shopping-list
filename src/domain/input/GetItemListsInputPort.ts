import type ItemList from "../models/ItemList";

export interface GetItemListsInputPort {
  perform(): Promise<ItemList[]>
}