import { CreateItemList } from "@/domain/usecases/item-list/CreateItemList";
import { createIdGeneratorAdapter } from "@/main/factories/id/IdGeneratorAdapterFactory";
import { createSyncAwareItemListPersister } from "@/main/factories/persister/sync/SyncAwareItemListPersisterFactory";

export const createSyncAwareCreateItemList = () => new CreateItemList(
  createSyncAwareItemListPersister(),
  createIdGeneratorAdapter()
)