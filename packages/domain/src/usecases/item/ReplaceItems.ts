import { ReplaceItemsInputPort, ReplaceItemsProps } from "@/input";
import { ReplaceItemsPersisterOutputPort } from "@/output";

export class ReplaceItems implements ReplaceItemsInputPort {
  constructor(private readonly itemPersister: ReplaceItemsPersisterOutputPort) {}

  async perform(props: ReplaceItemsProps): Promise<void> {
    await this.itemPersister.replace(props.itemListId, props.items)
  }
}