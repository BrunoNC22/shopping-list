import { GetItemListByItemListId } from "@shopping-list/domain";
import { createItemListPersisterPrismaAdapterFactory } from "../../db/ItemListPersisterPrismaAdapterFactory";

export const createGetItemListByItemListId = () => new GetItemListByItemListId(createItemListPersisterPrismaAdapterFactory())