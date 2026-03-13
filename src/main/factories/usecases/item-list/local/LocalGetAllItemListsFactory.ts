import type { GetItemListsInputPort } from "@/domain/input/GetItemListsInputPort";
import { GetItemLists } from "@/domain/usecases/item-list/GetItemLists";
import { createLocalItemListPersister } from "@/main/factories/persister/local/LocalItemListPersisterFactory";

export const createLocalGetAllItemLists = (): GetItemListsInputPort => {
  return new GetItemLists(createLocalItemListPersister())
}