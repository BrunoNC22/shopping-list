import { CategoryPersisterPrismaAdapter } from "../../../infra/db/category/CategoryPersisterPrismaAdapter"
import { prisma } from "../../../infra/db/prisma/prisma"

export const createCategoryPersisterPrismaAdapter = () => new CategoryPersisterPrismaAdapter(prisma)