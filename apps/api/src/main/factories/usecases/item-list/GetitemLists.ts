import { GetItemLists } from "@shopping-list/domain";
import { createItemListPersisterPrismaAdapterFactory } from "../../db/ItemListPersisterPrismaAdapterFactory";

export const createGetItemLists = () => new GetItemLists(createItemListPersisterPrismaAdapterFactory())