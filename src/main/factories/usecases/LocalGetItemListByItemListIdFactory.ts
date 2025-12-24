import { GetItemListByItemListId } from "@/domain/usecases/GetItemListByItemListId"
import { createLocalItemListPersister } from "../persister/LocalItemListPersisterFactory"

export const createLocalGetItemListByItemListId = () => {
  return new GetItemListByItemListId(createLocalItemListPersister())
}