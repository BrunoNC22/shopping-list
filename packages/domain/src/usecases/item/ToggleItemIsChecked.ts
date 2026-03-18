import { ToggleItemIsCheckedInputPort, ToggleItemIsCheckedProps } from "../../input";
import { GetByIdItemPersisterOutputPort, SaveItemPersisterOutputPort } from "../../output/persistance/ItemPersisterOutputPort";

export class ToggleItemIsChecked implements ToggleItemIsCheckedInputPort {
  constructor(private readonly itemPersister: GetByIdItemPersisterOutputPort & SaveItemPersisterOutputPort) {}

  async perform(props: ToggleItemIsCheckedProps): Promise<void> {
    const item = await this.itemPersister.getById(props.itemId)
    item.checked = !item.checked

    await this.itemPersister.save(item)
  }
}