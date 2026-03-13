import { GetItemListByItemListId } from "@/domain/usecases/item-list/GetItemListByItemListId";
import { createSyncAwareItemListPersister } from "@/main/factories/persister/sync/SyncAwareItemListPersisterFactory";

export const createSyncAwareGetItemListByItemListId = () => new GetItemListByItemListId(
  createSyncAwareItemListPersister()
)