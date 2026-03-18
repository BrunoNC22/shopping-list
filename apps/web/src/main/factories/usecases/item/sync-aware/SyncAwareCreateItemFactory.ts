import { createIdGeneratorAdapter } from "@/main/factories/id/IdGeneratorAdapterFactory";
import { createSyncAwareCategoryPersister } from "@/main/factories/persister/sync/SyncAwareCategoryPersisterFactory";
import { createSyncAwareItemListPersister } from "@/main/factories/persister/sync/SyncAwareItemListPersisterFactory";
import { createSyncAwareItemPersister } from "@/main/factories/persister/sync/SyncAwareItemPersisterFactory";
import { CreateItem } from "@shopping-list/domain";

export const createSyncAwareCreateItem = () => new CreateItem(
  createSyncAwareItemPersister(),
  createSyncAwareCategoryPersister(),
  createSyncAwareItemListPersister(),
  createIdGeneratorAdapter()
)