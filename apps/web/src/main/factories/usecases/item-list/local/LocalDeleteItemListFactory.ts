import { createLocalItemListPersister } from "@/main/factories/persister/local/LocalItemListPersisterFactory"
import { DeleteItemList } from "@shopping-list/domain"

export const createLocalDeleteItemListFactory = () => {
  return new DeleteItemList(createLocalItemListPersister())
}