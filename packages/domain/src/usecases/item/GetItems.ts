import { GetItemsInputPort, GetItemsProps } from "@/input";
import { Item } from "@/models";
import { getByItemListIdItemPersisterOutputPort } from "@/output";


export class GetItems implements GetItemsInputPort {
  constructor(
    private readonly itemPersister: getByItemListIdItemPersisterOutputPort
  ) {}

  async perform(props: GetItemsProps): Promise<Item[]> {
    return await this.itemPersister.getByItemListId(props.itemListId)
  }
}