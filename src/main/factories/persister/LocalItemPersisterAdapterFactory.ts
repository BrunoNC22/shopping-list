import { LocalItemPersisterAdapter } from "@/infra/persistance/LocalItemPersisterAdapter";
import { createLocalStorageCacheStorageAdapter } from "../cache/LocalStorageCacheStorageAdapterFactory";
import { createLocalCategoryPersister } from "./LocalCategoryPersisterFactory";

export const createLocalItemPeristerAdapter = () => new LocalItemPersisterAdapter(createLocalStorageCacheStorageAdapter(), createLocalCategoryPersister())