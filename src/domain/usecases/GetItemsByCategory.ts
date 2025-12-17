import type { GetItemsByCategoryInputPort, ItemsByCategoryResponseItem } from "../input/GetItemsByCategoryInputPort";
import type { GetAllItemsPersisterOutputPort } from "../output/persistance/ItemPersisterOutputPort";

export class GetItemsByCategory implements GetItemsByCategoryInputPort {
  constructor(private readonly itemPersister: GetAllItemsPersisterOutputPort) {}

  async perform(): Promise<ItemsByCategoryResponseItem[]> {
    const items = await this.itemPersister.getAll()
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