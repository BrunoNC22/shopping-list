import { GetAllCategories } from "@shopping-list/domain";
import { createCategoryPersisterPrismaAdapter } from "../../db/CategoryPersisterPrismaAdapterFactory";

export const createGetAllCategories = () => new GetAllCategories(createCategoryPersisterPrismaAdapter())