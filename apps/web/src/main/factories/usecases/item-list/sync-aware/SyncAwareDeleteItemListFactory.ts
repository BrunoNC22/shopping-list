import { createSyncAwareItemListPersister } from "@/main/factories/persister/sync/SyncAwareItemListPersisterFactory";
import { DeleteItemList } from "@shopping-list/domain";

export const createSyncAwareDeleteItemList = () => new DeleteItemList(
  createSyncAwareItemListPersister()
)