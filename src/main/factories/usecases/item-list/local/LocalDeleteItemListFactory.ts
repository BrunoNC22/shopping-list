import { DeleteItemList } from "@/domain/usecases/item-list/DeleteItemList"
import { createLocalItemListPersister } from "@/main/factories/persister/local/LocalItemListPersisterFactory"

export const createLocalDeleteItemListFactory = () => {
  return new DeleteItemList(createLocalItemListPersister())
}