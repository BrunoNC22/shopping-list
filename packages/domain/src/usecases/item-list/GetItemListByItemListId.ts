import { GetItemListByItemListIdInputPort, GetItemListByItemListIdProps } from "@/input";
import { ItemList } from "@/models";
import { GetItemListPersisterOutputPort } from "@/output";


export class GetItemListByItemListId implements GetItemListByItemListIdInputPort {
  constructor(private readonly itemListPersister: GetItemListPersisterOutputPort) {}

  async perform(props: GetItemListByItemListIdProps): Promise<ItemList> {
    return await this.itemListPersister.get(props.itemListId)
  }
}