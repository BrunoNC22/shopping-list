import { Item } from "@/models"

export type CreateItemProps = {
  itemListId: string,
  name: string
  price: number,
  amount: number,
  categoryId: string
}

export interface CreateItemInputPort {
  perform(props: CreateItemProps): Promise<Item>
}