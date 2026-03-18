import { createIdGeneratorAdapter } from "@/main/factories/id/IdGeneratorAdapterFactory";
import { createSyncAwareCategoryPersister } from "@/main/factories/persister/sync/SyncAwareCategoryPersisterFactory";
import { CreateCategory } from "@shopping-list/domain";

export const createSyncAwareCreateCategory = () => new CreateCategory(
  createSyncAwareCategoryPersister(),
  createIdGeneratorAdapter()
)