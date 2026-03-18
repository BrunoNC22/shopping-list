import { createLocalItemListPersister } from "@/main/factories/persister/local/LocalItemListPersisterFactory"
import { GetItemListByItemListId } from "@shopping-list/domain"

export const createLocalGetItemListByItemListId = () => {
  return new GetItemListByItemListId(createLocalItemListPersister())
}