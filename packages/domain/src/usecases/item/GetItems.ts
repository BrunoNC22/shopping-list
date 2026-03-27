import { GetItemsInputPort } from "@/input";
import { Item } from "@/models";
import { GetAllItemsPersisterOutputPort } from "@/output";


export class GetItems implements GetItemsInputPort {
  constructor(
    private readonly itemPersister: GetAllItemsPersisterOutputPort
  ) {}

  async perform(): Promise<Item[]> {
    return await this.itemPersister.getAll()
  }
}