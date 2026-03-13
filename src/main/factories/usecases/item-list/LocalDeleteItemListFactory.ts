import { DeleteItemList } from "@/domain/usecases/item-list/DeleteItemList"
import { createLocalItemListPersister } from "../../persister/LocalItemListPersisterFactory"

export const createLocalDeleteItemListFactory = () => {
  return new DeleteItemList(createLocalItemListPersister())
}