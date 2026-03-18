import type { DeleteItemInputPort, DeleteItemProps } from "../../input/DeleteItemInputPort";
import type { DeleteItemPersisterOutputPort } from "../../output/persistance/ItemPersisterOutputPort";

export class DeleteItem implements DeleteItemInputPort {
  constructor(private readonly itemPersister: DeleteItemPersisterOutputPort) {}

  async perform(props: DeleteItemProps): Promise<void> {
    await this.itemPersister.delete(props.itemId)
  }
}