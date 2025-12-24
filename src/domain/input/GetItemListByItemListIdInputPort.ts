import type ItemList from "../models/ItemList"

export type GetItemListByItemListIdProps = {
  itemListId: string
}

export interface GetItemListByItemListIdInputPort {
  perform(props: GetItemListByItemListIdProps): Promise<ItemList>
}