import { DeleteItem } from "@/domain/usecases/item/DeleteItem";
import { createSyncAwareItemPersister } from "@/main/factories/persister/sync/SyncAwareItemPersisterFactory";

export const createSyncAwareDeleteItem = () => new DeleteItem(
  createSyncAwareItemPersister()
)