import { ToggleItemIsChecked } from "@/domain/usecases/item/ToggleItemIsChecked";
import { createSyncAwareItemPersister } from "@/main/factories/persister/sync/SyncAwareItemPersisterFactory";

export const createSyncAwareToggleItemIsChecked = () => new ToggleItemIsChecked(
  createSyncAwareItemPersister()
)