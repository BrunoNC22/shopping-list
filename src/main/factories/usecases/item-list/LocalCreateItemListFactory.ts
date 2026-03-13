import { createSyncAwareItemListPersister } from "../../persister/sync/SyncAwareItemListPersisterFactory"
import { createIdGeneratorAdapter } from "../../id/IdGeneratorAdapterFactory"
import { CreateItemList } from "@/domain/usecases/item-list/CreateItemList"

export const createLocalCreateItemListFactory = () => {
  return new CreateItemList(createSyncAwareItemListPersister(), createIdGeneratorAdapter())
}