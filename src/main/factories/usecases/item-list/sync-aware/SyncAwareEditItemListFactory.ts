import { EditItemList } from "@/domain/usecases/item-list/EditItemList";
import { createSyncAwareItemListPersister } from "@/main/factories/persister/sync/SyncAwareItemListPersisterFactory";

export const createSyncAwareEditItemList = () => new EditItemList(
  createSyncAwareItemListPersister()
)