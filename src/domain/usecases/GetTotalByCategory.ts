import type { GetTotalByCategoryInputPort, GetTotalByCategoryResponseItem } from "../input/GetTotalByCategoryInputPort";
import type { GetAllItemsPersisterOutputPort } from "../output/persistance/ItemPersisterOutputPort";

export class GetTotalByCategory implements GetTotalByCategoryInputPort {
  constructor(private readonly itemPersister: GetAllItemsPersisterOutputPort) {}

  async perform(): Promise<GetTotalByCategoryResponseItem[]> {
    const items = await this.itemPersister.getAll()
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