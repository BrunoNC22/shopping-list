import { createSyncAwareItemPersister } from "@/main/factories/persister/sync/SyncAwareItemPersisterFactory";
import { DeleteItem } from "@shopping-list/domain";

export const createSyncAwareDeleteItem = () => new DeleteItem(
  createSyncAwareItemPersister()
)