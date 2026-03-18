import { createSyncAwareItemListPersister } from "@/main/factories/persister/sync/SyncAwareItemListPersisterFactory";
import { GetItemLists } from "@shopping-list/domain";

export const createSyncAwareGetAllItemLists = () => new GetItemLists(
  createSyncAwareItemListPersister()
)