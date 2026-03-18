import { createSyncAwareItemListPersister } from "@/main/factories/persister/sync/SyncAwareItemListPersisterFactory";
import { EditItemList } from "@shopping-list/domain";

export const createSyncAwareEditItemList = () => new EditItemList(
  createSyncAwareItemListPersister()
)