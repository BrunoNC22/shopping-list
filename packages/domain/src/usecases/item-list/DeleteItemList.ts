import { DeleteItemListInputPort, DeleteItemListProps } from "@/input";
import { DeleteItemListPersisterOutputPort } from "@/output";


export class DeleteItemList implements DeleteItemListInputPort {
  constructor(private readonly itemListPersister: DeleteItemListPersisterOutputPort) {}

  async perform(props: DeleteItemListProps): Promise<void> {
    await this.itemListPersister.delete(props.itemListId)
  }
}