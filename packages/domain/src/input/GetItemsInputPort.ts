import { type Item } from "@/models/Item";

export interface GetItemsInputPort {
  perform(): Promise<Item[]>
}