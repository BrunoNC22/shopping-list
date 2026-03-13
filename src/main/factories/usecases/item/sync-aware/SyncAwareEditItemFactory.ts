import { EditItem } from "@/domain/usecases/item/EditItem";
import { createSyncAwareCategoryPersister } from "@/main/factories/persister/sync/SyncAwareCategoryPersisterFactory";
import { createSyncAwareItemPersister } from "@/main/factories/persister/sync/SyncAwareItemPersisterFactory";

export const createSyncAwareEditItem = () => new EditItem(
  createSyncAwareItemPersister(),
  createSyncAwareCategoryPersister()
)