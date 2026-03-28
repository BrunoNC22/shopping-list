import { EditItemList } from "@shopping-list/domain";
import { createItemListPersisterPrismaAdapterFactory } from "../../db/ItemListPersisterPrismaAdapterFactory";

export const createEditItemList = () => new EditItemList(
    createItemListPersisterPrismaAdapterFactory()
)