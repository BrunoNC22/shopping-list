import { createSyncAwareCategoryPersister } from "@/main/factories/persister/sync/SyncAwareCategoryPersisterFactory";
import { createSyncAwareItemPersister } from "@/main/factories/persister/sync/SyncAwareItemPersisterFactory";
import { EditItem } from "@shopping-list/domain";

export const createSyncAwareEditItem = () => new EditItem(
  createSyncAwareItemPersister(),
  createSyncAwareCategoryPersister()
)