import type Item from "@/domain/models/Item";

export default interface LoadItemsInputPort {
  perform(): Promise<Item[]>
}