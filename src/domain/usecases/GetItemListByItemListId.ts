import type { GetItemListByItemListIdInputPort, GetItemListByItemListIdProps } from "../input/GetItemListByItemListIdInputPort";
import type ItemList from "../models/ItemList";
import type { GetItemListPersisterOutputPort } from "../output/persistance/ItemListPersisterOutputPort";

export class GetItemListByItemListId implements GetItemListByItemListIdInputPort {
  constructor(private readonly itemListPersister: GetItemListPersisterOutputPort) {}

  async perform(props: GetItemListByItemListIdProps): Promise<ItemList> {
    return await this.itemListPersister.get(props.itemListId)
  }
}