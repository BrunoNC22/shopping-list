import { EditItemListInputPort, EditItemListProps } from "@/input"
import { GetItemListPersisterOutputPort, SaveItemListPersisterOutputPort } from "@/output"


export class EditItemList implements EditItemListInputPort {
  constructor(private readonly itemListPersister: SaveItemListPersisterOutputPort & GetItemListPersisterOutputPort) {}

  async perform(props: EditItemListProps): Promise<void> {
    if (!props.itemListName) return

    const foundItemList = await this.itemListPersister.get(props.itemListId)

    foundItemList.name = props.itemListName

    await this.itemListPersister.save(foundItemList)
  }
}