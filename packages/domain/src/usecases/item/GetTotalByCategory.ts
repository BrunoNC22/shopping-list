import { GetTotalByCategoryInputPort, GetTotalByCategoryProps, GetTotalByCategoryResponseItem } from "@/input"
import { getByItemListIdItemPersisterOutputPort } from "@/output"


export class GetTotalByCategory implements GetTotalByCategoryInputPort {
  constructor(private readonly itemPersister: getByItemListIdItemPersisterOutputPort) {}

  async perform(props: GetTotalByCategoryProps): Promise<GetTotalByCategoryResponseItem[]> {
    const items = await this.itemPersister.getByItemListId(props.itemListId)
    if (items.length === 0) return []

    const map: Record<string, GetTotalByCategoryResponseItem> = {}

    for (const item of items) {
      if (!map[item.category.nome]) {
        map[item.category.nome] = {
          categoryName: item.category.nome,
          total: 0
        }
      }
      map[item.category.nome].total += item.price * item.amount
    }

    return Object.values(map)
  }
}