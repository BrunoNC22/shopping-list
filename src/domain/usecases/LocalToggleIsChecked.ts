import type { ToggleIsCheckedInputPort } from "../input/ToggleIsCheckedInputPort";
import type { GetAllItemsPersisterOutputPort, ReplaceItemsPersisterOutputPort } from "../output/persistance/ItemPersisterOutputPort";

export class LocalToggleIsChecked implements ToggleIsCheckedInputPort {
  constructor(private readonly itemPersister: GetAllItemsPersisterOutputPort & ReplaceItemsPersisterOutputPort) {}

  async perform(props: { itemId: string; }): Promise<void> {
    const items = await this.itemPersister.getAll()
    const newItems = items.map(item => {
      if (item.id !== props.itemId) return item
      item.checked = !item.checked
      return item
    })

    await this.itemPersister.replace(newItems)
  }
}