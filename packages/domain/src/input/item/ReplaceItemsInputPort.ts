import { Item } from "@/models"

export type ReplaceItemsProps = {
  itemListId: string,
  items: Item[]
}

export interface ReplaceItemsInputPort {
  perform(props: ReplaceItemsProps): Promise<void>
}