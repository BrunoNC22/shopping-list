import { createLocalItemListPersister } from "@/main/factories/persister/local/LocalItemListPersisterFactory"
import { EditItemList } from "@shopping-list/domain"

export const createLocalEditItemListFactory = () => {
  return new EditItemList(createLocalItemListPersister())
}