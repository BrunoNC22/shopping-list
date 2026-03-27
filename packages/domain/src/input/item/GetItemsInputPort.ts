import { type Item } from "@/models/Item";

export type GetItemsProps = {
  itemListId: string
}

export interface GetItemsInputPort {
  perform(props: GetItemsProps): Promise<Item[]>
}