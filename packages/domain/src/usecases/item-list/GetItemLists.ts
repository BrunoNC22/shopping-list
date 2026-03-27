import { GetItemListsInputPort, GetItemListsProps } from "@/input";
import { ItemList } from "@/models";
import { GetAllItemListsByUserIdOutputPort } from "@/output";


export class GetItemLists implements GetItemListsInputPort {
  constructor(private readonly itemListPersister: GetAllItemListsByUserIdOutputPort) {}

  async perform(props: GetItemListsProps): Promise<ItemList[]> {
    return await this.itemListPersister.getAllByUserId(props.userId)
  }
}