import { createLocalCategoryPersister } from "@/main/factories/persister/local/LocalCategoryPersisterFactory";
import { ReplaceCategories } from "@shopping-list/domain";

export const createLocalReplaceCategories = () => new ReplaceCategories(createLocalCategoryPersister())