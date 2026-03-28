import { DeleteItem } from "@shopping-list/domain";
import { createItemPersisterPrismaAdapterFactory } from "../../db/ItemPersisterPrismaAdapterFactory";

export const createDeleteItem = () => new DeleteItem(createItemPersisterPrismaAdapterFactory())