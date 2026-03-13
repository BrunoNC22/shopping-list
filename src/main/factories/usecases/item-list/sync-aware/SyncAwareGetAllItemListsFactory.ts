import { GetItemLists } from "@/domain/usecases/item-list/GetItemLists";
import { createSyncAwareItemListPersister } from "@/main/factories/persister/sync/SyncAwareItemListPersisterFactory";

export const createSyncAwareGetAllItemLists = () => new GetItemLists(
  createSyncAwareItemListPersister()
)