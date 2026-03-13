import { EditItemList } from "@/domain/usecases/item-list/EditItemList"
import { createLocalItemListPersister } from "../../persister/LocalItemListPersisterFactory"

export const createLocalEditItemListFactory = () => {
  return new EditItemList(createLocalItemListPersister())
}