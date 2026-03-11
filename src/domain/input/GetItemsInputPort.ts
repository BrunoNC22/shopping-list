import type Item from "@/domain/models/Item";

export default interface GetItemsInputPort {
  perform(): Promise<Item[]>
}