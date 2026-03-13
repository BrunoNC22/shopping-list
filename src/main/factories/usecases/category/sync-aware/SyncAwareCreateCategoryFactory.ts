import { CreateCategory } from "@/domain/usecases/category/CreateCategory";
import { createIdGeneratorAdapter } from "@/main/factories/id/IdGeneratorAdapterFactory";
import { createSyncAwareCategoryPersister } from "@/main/factories/persister/sync/SyncAwareCategoryPersisterFactory";

export const createSyncAwareCreateCategory = () => new CreateCategory(
  createSyncAwareCategoryPersister(),
  createIdGeneratorAdapter()
)