import { createSyncAwareItemPersister } from "@/main/factories/persister/sync/SyncAwareItemPersisterFactory";
import { GetItems } from "@shopping-list/domain";

export const createSyncAwareGetItems = () => new GetItems(
  createSyncAwareItemPersister()
)