import { GetItemsByCategory } from "@/domain/usecases/item/GetItemsByCategory";
import { createSyncAwareItemPersister } from "@/main/factories/persister/sync/SyncAwareItemPersisterFactory";

export const createSyncAwareGetItemsByCategory = () => new GetItemsByCategory(
  createSyncAwareItemPersister()
)