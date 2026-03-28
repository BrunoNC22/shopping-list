import { EditItem } from "@shopping-list/domain";
import { createItemPersisterPrismaAdapterFactory } from "../../db/ItemPersisterPrismaAdapterFactory";
import { createCategoryPersisterPrismaAdapter } from "../../db/CategoryPersisterPrismaAdapterFactory";

export const createEditItem = () => new EditItem(
    createItemPersisterPrismaAdapterFactory(),
    createCategoryPersisterPrismaAdapter()
)