import { GetItemsByCategoryInputPort, GetItemsByCategoryProps, ItemsByCategoryResponseItem } from "@/input"
import { getByItemListIdItemPersisterOutputPort } from "@/output"


export class GetItemsByCategory implements GetItemsByCategoryInputPort {

  constructor(
    private readonly itemPersister: getByItemListIdItemPersisterOutputPort
  ) {}

  async perform(
    props: GetItemsByCategoryProps
  ): Promise<ItemsByCategoryResponseItem[]> {
    const items = await this.itemPersister.getByItemListId(props.itemListId)

    if (items.length === 0) return []

    const groups = new Map<string, ItemsByCategoryResponseItem>()

    for (const item of items) {
      let group = groups.get(item.category.id)
      if (!group) {
        group = {
          category: item.category,
          items: [],
          totalValue: 0
        }

        groups.set(item.category.id, group)
      }

      group.items.push(item)
      group.totalValue += item.price * item.amount
    }

    return Array.from(groups.values())
      .sort((a, b) => a.category.nome.localeCompare(b.category.nome))
  }
}