import { ResourceNotFoundError, type CacheStorageOutputPort } from "@shopping-list/domain"

export class LocalStorageCacheStorageAdapter implements CacheStorageOutputPort {
  constructor(private readonly localStorage: Storage) {}

  async get<T>(key: string): Promise<T> {
    const foundResource = this.localStorage.getItem(key)
    if (!foundResource) throw new ResourceNotFoundError(key)
    return JSON.parse(foundResource) as T
  }

  async set(key: string, value: object): Promise<void> {
    if (value) {
      this.localStorage.setItem(key, JSON.stringify(value))
    } else {
      this.localStorage.removeItem(key)
    }
  }
}