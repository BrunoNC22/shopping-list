import { EditItemList } from "@/domain/usecases/item-list/EditItemList"
import { createLocalItemListPersister } from "@/main/factories/persister/local/LocalItemListPersisterFactory"

export const createLocalEditItemListFactory = () => {
  return new EditItemList(createLocalItemListPersister())
}