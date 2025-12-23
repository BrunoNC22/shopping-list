import type { GetItemListsInputPort } from "@/domain/input/GetItemListsInputPort";
import { GetItemLists } from "@/domain/usecases/GetItemLists";
import { createLocalItemListPersister } from "../persister/LocalItemListPersisterFactory";

export const createLocalGetAllItemLists = (): GetItemListsInputPort => {
  return new GetItemLists(createLocalItemListPersister())
}