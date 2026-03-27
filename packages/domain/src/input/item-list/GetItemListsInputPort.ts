import { type ItemList } from "../../models/ItemList";

export type GetItemListsProps = {
  userId: string
}

export interface GetItemListsInputPort {
  perform(props: GetItemListsProps): Promise<ItemList[]>
}