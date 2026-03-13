import { DeleteItemList } from "@/domain/usecases/item-list/DeleteItemList";
import { createSyncAwareItemListPersister } from "@/main/factories/persister/sync/SyncAwareItemListPersisterFactory";

export const createSyncAwareDeleteItemList = () => new DeleteItemList(
  createSyncAwareItemListPersister()
)