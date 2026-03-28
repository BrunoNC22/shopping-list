import { CreateItem } from "@shopping-list/domain";
import { createItemPersisterPrismaAdapterFactory } from "../../db/ItemPersisterPrismaAdapterFactory";
import { createCategoryPersisterPrismaAdapter } from "../../db/CategoryPersisterPrismaAdapterFactory";
import { createItemListPersisterPrismaAdapterFactory } from "../../db/ItemListPersisterPrismaAdapterFactory";
import { createIdGenerator } from "../../id/IdGeneratorFactory";

export const createCreateItem = () => new CreateItem(
    createItemPersisterPrismaAdapterFactory(),
    createCategoryPersisterPrismaAdapter(),
    createItemListPersisterPrismaAdapterFactory(),
    createIdGenerator()
)