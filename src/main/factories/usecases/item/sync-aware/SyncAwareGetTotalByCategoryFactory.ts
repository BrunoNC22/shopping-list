import { GetTotalByCategory } from "@/domain/usecases/item/GetTotalByCategory";
import { createSyncAwareItemPersister } from "@/main/factories/persister/sync/SyncAwareItemPersisterFactory";

export const createSyncAwareGetTotalByCategory = () => new GetTotalByCategory(
  createSyncAwareItemPersister()
)