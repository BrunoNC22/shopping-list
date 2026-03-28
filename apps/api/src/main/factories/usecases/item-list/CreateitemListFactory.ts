import { CreateItemList } from "@shopping-list/domain"
import { createItemListPersisterPrismaAdapterFactory } from "../../db/ItemListPersisterPrismaAdapterFactory"
import { createIdGenerator } from "../../id/IdGeneratorFactory"

export const createCreateItemList = () => new CreateItemList(
    createItemListPersisterPrismaAdapterFactory(),
    createIdGenerator()
)