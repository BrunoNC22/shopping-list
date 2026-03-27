import { ItemList } from "@/models"

export type ReplaceItemListsProps = {
  userId: string,
  itemLists: ItemList[]
}

export interface ReplaceItemListsInputPort {
  perform(props: ReplaceItemListsProps): Promise<void>
}