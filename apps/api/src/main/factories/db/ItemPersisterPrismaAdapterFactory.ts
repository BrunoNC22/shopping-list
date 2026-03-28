import { ItemPersisterPrismaAdapter } from "../../../infra/db/item/ItemPersisterPrismaAdapter";
import { prisma } from "../../../infra/db/prisma/prisma";

export const createItemPersisterPrismaAdapterFactory = () => new ItemPersisterPrismaAdapter(prisma)