import type { GetItemListsInputPort } from "@/domain/input/GetItemListsInputPort";
import { createLocalItemListPersister } from "../../persister/LocalItemListPersisterFactory";
import { GetItemLists } from "@/domain/usecases/item-list/GetItemLists";

export const createLocalGetAllItemLists = (): GetItemListsInputPort => {
  return new GetItemLists(createLocalItemListPersister())
}