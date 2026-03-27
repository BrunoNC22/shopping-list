import { DeleteItemInputPort, DeleteItemProps } from "@/input";
import { DeleteItemPersisterOutputPort } from "@/output";


export class DeleteItem implements DeleteItemInputPort {
  constructor(private readonly itemPersister: DeleteItemPersisterOutputPort) {}

  async perform(props: DeleteItemProps): Promise<void> {
    await this.itemPersister.delete(props.itemId)
  }
}