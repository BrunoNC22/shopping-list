import { createLocalItemListPersister } from "@/main/factories/persister/local/LocalItemListPersisterFactory";
import { ReplaceItemLists } from "@shopping-list/domain";

export const createLocalReplaceItemLists = () => new ReplaceItemLists(createLocalItemListPersister())