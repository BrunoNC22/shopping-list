import { GetItemListByItemListId } from "@/domain/usecases/item-list/GetItemListByItemListId"
import { createLocalItemListPersister } from "../../persister/LocalItemListPersisterFactory"

export const createLocalGetItemListByItemListId = () => {
  return new GetItemListByItemListId(createLocalItemListPersister())
}