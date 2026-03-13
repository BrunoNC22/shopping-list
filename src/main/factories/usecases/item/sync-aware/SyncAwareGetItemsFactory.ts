import { GetItems } from "@/domain/usecases/item/GetItems";
import { createSyncAwareItemPersister } from "@/main/factories/persister/sync/SyncAwareItemPersisterFactory";

export const createSyncAwareGetItems = () => new GetItems(
  createSyncAwareItemPersister()
)