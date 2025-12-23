import type { CreateItemListInputPort } from "@/domain/input/CreateItemListInputPort"
import { CreateItemList } from "@/domain/usecases/CreateItemList"
import { createLocalItemListPersister } from "../persister/LocalItemListPersisterFactory"

export const createLocalCreateItemListFactory = (): CreateItemListInputPort => {
  return new CreateItemList(createLocalItemListPersister())
}