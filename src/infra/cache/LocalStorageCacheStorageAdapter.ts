import type { CacheStorageOutputPort } from "@/domain/output/cache/CacheStorageOutputPort";
import { ResourceNotFoundError } from "@/domain/output/cache/errors/ResourceNotFoundError";

export class LocalStorageCacheStorageAdapter implements CacheStorageOutputPort {
  async get<T>(key: string): Promise<T> {
    const foundResource = localStorage.getItem(key)
    if (!foundResource) throw new ResourceNotFoundError(key)
    return JSON.parse(foundResource) as T
  }

  async set(key: string, value: object): Promise<void> {
    if (value) {
      localStorage.setItem(key, JSON.stringify(value))
    } else {
      localStorage.removeItem(key)
    }
  }
}