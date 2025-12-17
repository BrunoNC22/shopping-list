import type { Categoria } from "../models/Categoria"
import type Item from "../models/Item"

export type ItemsByCategoryResponseItem = {
  items: Item[]
  category: Categoria
  totalValue: number
}

export interface GetItemsByCategoryInputPort {
  perform(): Promise<ItemsByCategoryResponseItem[]>
}
