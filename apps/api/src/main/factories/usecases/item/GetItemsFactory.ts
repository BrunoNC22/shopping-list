import { GetItems } from "@shopping-list/domain";
import { createItemPersisterPrismaAdapterFactory } from "../../db/ItemPersisterPrismaAdapterFactory";

export const createGetItems = () => new GetItems(createItemPersisterPrismaAdapterFactory())