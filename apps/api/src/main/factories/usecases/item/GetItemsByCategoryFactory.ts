import { GetItemsByCategory } from "@shopping-list/domain";
import { createItemPersisterPrismaAdapterFactory } from "../../db/ItemPersisterPrismaAdapterFactory";

export const createGetItemsByCategory = () => new GetItemsByCategory(createItemPersisterPrismaAdapterFactory())