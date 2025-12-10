import type RemoveItemInputPort from "../input/RemoveItemInputPort";
import type { GetAllItemsPersisterOutputPort, ReplaceItemsPersisterOutputPort } from "../output/persistance/ItemPersisterOutputPort";

export class LocalRemoveItem implements RemoveItemInputPort {
  constructor(private readonly itemPersister: GetAllItemsPersisterOutputPort & ReplaceItemsPersisterOutputPort) {}

  async perform(props: { itemId: string; }): Promise<void> {
    const items = await this.itemPersister.getAll()

    const filteredItems = items.filter(item => item.id !== props.itemId)

    await this.itemPersister.replace(filteredItems)
  }
}