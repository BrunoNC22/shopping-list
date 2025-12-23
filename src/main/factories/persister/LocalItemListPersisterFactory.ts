import type { ItemListPersisterOutputPort } from "@/domain/output/persistance/ItemListPersisterOutputPort"
import { LocalItemListPersister } from "@/infra/persistance/LocalItemListPersister"
import { createLocalStorageCacheStorageAdapter } from "../cache/LocalStorageCacheStorageAdapterFactory"
import { createLocalItemPeristerAdapter } from "./LocalItemPersisterAdapterFactory"

export const createLocalItemListPersister = (): ItemListPersisterOutputPort => {
  return new LocalItemListPersister(createLocalStorageCacheStorageAdapter(), createLocalItemPeristerAdapter())
}