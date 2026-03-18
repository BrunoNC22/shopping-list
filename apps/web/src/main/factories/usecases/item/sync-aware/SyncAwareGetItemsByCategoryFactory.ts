import { createSyncAwareItemPersister } from "@/main/factories/persister/sync/SyncAwareItemPersisterFactory";
import { GetItemsByCategory } from "@shopping-list/domain";

export const createSyncAwareGetItemsByCategory = () => new GetItemsByCategory(
  createSyncAwareItemPersister()
)