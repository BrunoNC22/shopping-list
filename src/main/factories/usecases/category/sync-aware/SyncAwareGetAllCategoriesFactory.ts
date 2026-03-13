import { GetAllCategories } from "@/domain/usecases/category/GetAllCategories";
import { createSyncAwareCategoryPersister } from "@/main/factories/persister/sync/SyncAwareCategoryPersisterFactory";

export const createSyncAwareGetAllCategories = () => new GetAllCategories(
  createSyncAwareCategoryPersister()
)