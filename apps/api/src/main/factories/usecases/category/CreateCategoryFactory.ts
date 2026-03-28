import { CreateCategory } from "@shopping-list/domain";
import { createCategoryPersisterPrismaAdapter } from "../../db/CategoryPersisterPrismaAdapterFactory";
import { createIdGenerator } from "../../id/IdGeneratorFactory";

export const createCreateCategory = () => new CreateCategory(
    createCategoryPersisterPrismaAdapter(),
    createIdGenerator()
)