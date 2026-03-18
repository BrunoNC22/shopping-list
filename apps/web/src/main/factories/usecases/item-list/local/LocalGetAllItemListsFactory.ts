import { createLocalItemListPersister } from "@/main/factories/persister/local/LocalItemListPersisterFactory";
import { GetItemLists } from "@shopping-list/domain";

export const createLocalGetAllItemLists = () => {
  return new GetItemLists(createLocalItemListPersister())
}