import { GetTotalByCategory } from "@shopping-list/domain";
import { createItemPersisterPrismaAdapterFactory } from "../../db/ItemPersisterPrismaAdapterFactory";

export const createGetTotalByCategory = () => new GetTotalByCategory(createItemPersisterPrismaAdapterFactory())