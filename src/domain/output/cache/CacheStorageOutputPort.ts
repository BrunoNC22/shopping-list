export interface GetCacheStorageOutputPort {
  get<T>(key: string): Promise<T>
}

export interface SetCacheStorageOutputPort {
  set(key: string, value: object): Promise<void>
}

export interface CacheStorageOutputPort extends GetCacheStorageOutputPort, SetCacheStorageOutputPort {}