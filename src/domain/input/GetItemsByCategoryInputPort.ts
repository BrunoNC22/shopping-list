import type { Categoria } from "../models/Categoria"
import type Item from "../models/Item"

export type ItemsByCategoryResponseItem = {
  items: Item[]
  category: Categoria
  totalValue: number
}

export type GetItemsByCategoryProps = {
  itemListId: string
}

export interface GetItemsByCategoryInputPort {
  perform(props: GetItemsByCategoryProps): Promise<ItemsByCategoryResponseItem[]>
}
