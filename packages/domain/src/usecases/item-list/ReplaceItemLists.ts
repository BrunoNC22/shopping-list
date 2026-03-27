import { ReplaceItemListsInputPort, ReplaceItemListsProps } from "@/input";
import { ReplaceItemListsByUserIdOutputPort } from "@/output";

export class ReplaceItemLists implements ReplaceItemListsInputPort {
  constructor(private readonly itemListPersister: ReplaceItemListsByUserIdOutputPort) {}

  async perform(props: ReplaceItemListsProps): Promise<void> {
    await this.itemListPersister.replaceByUserId(props.userId, props.itemLists)
  }
}