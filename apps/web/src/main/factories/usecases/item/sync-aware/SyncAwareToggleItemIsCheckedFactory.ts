import { createSyncAwareItemPersister } from "@/main/factories/persister/sync/SyncAwareItemPersisterFactory";
import { ToggleItemIsChecked } from "@shopping-list/domain";

export const createSyncAwareToggleItemIsChecked = () => new ToggleItemIsChecked(
  createSyncAwareItemPersister()
)