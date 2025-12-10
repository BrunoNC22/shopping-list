import { LocalCategoryPersister } from "@/infra/persistance/LocalCategoryPersister"
import { createLocalStorageCacheStorageAdapter } from "../cache/LocalStorageCacheStorageAdapterFactory"

export const createLocalCategoryPersister = () => {
  return new LocalCategoryPersister(createLocalStorageCacheStorageAdapter())
}