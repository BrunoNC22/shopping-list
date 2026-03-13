import { GetItemListByItemListId } from "@/domain/usecases/item-list/GetItemListByItemListId"
import { createLocalItemListPersister } from "@/main/factories/persister/local/LocalItemListPersisterFactory"

export const createLocalGetItemListByItemListId = () => {
  return new GetItemListByItemListId(createLocalItemListPersister())
}