import { ItemListPersisterPrismaAdapter } from "../../../infra/db/item-list/ItemListPersisterPrismaAdapter"
import { prisma } from "../../../infra/db/prisma/prisma"

export const createItemListPersisterPrismaAdapterFactory = () => new ItemListPersisterPrismaAdapter(prisma)