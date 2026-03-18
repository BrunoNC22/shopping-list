import { createIdGeneratorAdapter } from "@/main/factories/id/IdGeneratorAdapterFactory"
import { createSyncAwareItemListPersister } from "@/main/factories/persister/sync/SyncAwareItemListPersisterFactory"
import { CreateItemList } from "@shopping-list/domain"

export const createLocalCreateItemListFactory = () => {
  return new CreateItemList(createSyncAwareItemListPersister(), createIdGeneratorAdapter())
}