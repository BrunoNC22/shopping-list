import { DeleteItemList } from "@/domain/usecases/DeleteItemList"
import { createLocalItemListPersister } from "../persister/LocalItemListPersisterFactory"

export const createLocalDeleteItemListFactory = () => {
  return new DeleteItemList(createLocalItemListPersister())
}