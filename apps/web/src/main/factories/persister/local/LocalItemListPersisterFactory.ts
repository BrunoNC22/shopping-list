import { LocalItemListPersister } from "@/infra/persistance/local/LocalItemListPersister"
import { createLocalStorageCacheStorageAdapter } from "../../cache/LocalStorageCacheStorageAdapterFactory"
import { createLocalItemPeristerAdapter } from "./LocalItemPersisterAdapterFactory"
import type { ItemListPersisterOutputPort } from "@shopping-list/domain"

export const createLocalItemListPersister = (): ItemListPersisterOutputPort => {
  return new LocalItemListPersister(createLocalStorageCacheStorageAdapter(), createLocalItemPeristerAdapter())
}