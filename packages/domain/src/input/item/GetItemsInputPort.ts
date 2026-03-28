import { type Item } from "@/models/Item";

export interface GetItemsProps {
  itemListId: string
}

export interface GetItemsInputPort {
  perform(props: GetItemsProps): Promise<Item[]>
}