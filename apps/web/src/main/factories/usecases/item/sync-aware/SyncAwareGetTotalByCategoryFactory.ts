import { createSyncAwareItemPersister } from "@/main/factories/persister/sync/SyncAwareItemPersisterFactory";
import { GetTotalByCategory } from "@shopping-list/domain";

export const createSyncAwareGetTotalByCategory = () => new GetTotalByCategory(
  createSyncAwareItemPersister()
)