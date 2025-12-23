import type Item from "@/domain/models/Item";

export type AddItemProps = {
  itemListId: string,
  name: string
  price: number,
  amount: number,
  categoryId: string
}

export interface AddItemInputPort {
  perform(props: AddItemProps): Promise<Item>
}