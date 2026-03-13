import { LocalCurrentAccountPersister } from "@/infra/persistance/local/LocalCurrentAccountPersister"
import { createLocalStorageCacheStorageAdapter } from "../cache/LocalStorageCacheStorageAdapterFactory"

export const createLocalCurrentAccountPersister = () => {
  return new LocalCurrentAccountPersister(createLocalStorageCacheStorageAdapter())
}