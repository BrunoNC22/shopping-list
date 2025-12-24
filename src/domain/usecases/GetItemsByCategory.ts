import type { GetItemsByCategoryInputPort, GetItemsByCategoryProps, ItemsByCategoryResponseItem } from "../input/GetItemsByCategoryInputPort";
import type { getByItemListIdItemPersisterOutputPort } from "../output/persistance/ItemPersisterOutputPort";

export class GetItemsByCategory implements GetItemsByCategoryInputPort {
  constructor(private readonly itemPersister: getByItemListIdItemPersisterOutputPort) {}

  async perform(props: GetItemsByCategoryProps): Promise<ItemsByCategoryResponseItem[]> {
    const items = await this.itemPersister.getByItemListId(props.itemListId)
    if (items.length === 0) return []

    const itemsMap: Record<string, ItemsByCategoryResponseItem> = {}

    for (const item of items) {
      if (!itemsMap[item.category.id]) {
        itemsMap[item.category.id] = {
          category: item.category,
          items: [],
          totalValue: 0
        }
      }

      itemsMap[item.category.id].items.push(item)
      itemsMap[item.category.id].totalValue += item.price * item.amount
    }

    return Object.values(itemsMap)
  }
}