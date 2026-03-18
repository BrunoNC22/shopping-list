import { createSyncAwareCategoryPersister } from "@/main/factories/persister/sync/SyncAwareCategoryPersisterFactory";
import { GetAllCategories } from "@shopping-list/domain";

export const createSyncAwareGetAllCategories = () => new GetAllCategories(
  createSyncAwareCategoryPersister()
)