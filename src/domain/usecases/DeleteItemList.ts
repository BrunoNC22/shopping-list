import type { DeleteItemListInputPort, DeleteItemListProps } from "../input/DeleteItemListInputPort";
import type { DeleteItemListPersisterOutputPort } from "../output/persistance/ItemListPersisterOutputPort";

export class DeleteItemList implements DeleteItemListInputPort {
  constructor(private readonly itemListPersister: DeleteItemListPersisterOutputPort) {}

  async perform(props: DeleteItemListProps): Promise<void> {
    await this.itemListPersister.delete(props.itemListId)
  }
}