import { DeleteItemList } from "@shopping-list/domain";
import { createItemListPersisterPrismaAdapterFactory } from "../../db/ItemListPersisterPrismaAdapterFactory";

export const createDeleteItemListFactory = () => new DeleteItemList(createItemListPersisterPrismaAdapterFactory())