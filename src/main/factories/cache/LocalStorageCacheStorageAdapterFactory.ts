import { LocalStorageCacheStorageAdapter } from "@/infra/cache/LocalStorageCacheStorageAdapter";

export const createLocalStorageCacheStorageAdapter = () => new LocalStorageCacheStorageAdapter()