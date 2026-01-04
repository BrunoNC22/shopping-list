import { EditItemList } from "@/domain/usecases/EditItemList"
import { createLocalItemListPersister } from "../persister/LocalItemListPersisterFactory"

export const createLocalEditItemListFactory = () => {
  return new EditItemList(createLocalItemListPersister())
}