import { createSyncAwareItemListPersister } from "@/main/factories/persister/sync/SyncAwareItemListPersisterFactory";
import { GetItemListByItemListId } from "@shopping-list/domain";

export const createSyncAwareGetItemListByItemListId = () => new GetItemListByItemListId(
  createSyncAwareItemListPersister()
)