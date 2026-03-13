import { CurrentAccount } from "@/domain/models/CurrentAccount";
import type { CacheStorageOutputPort } from "@/domain/output/cache/CacheStorageOutputPort";
import { ResourceNotFoundError } from "@/domain/output/cache/errors/ResourceNotFoundError";
import type { CurrentAccountPersisterOutputPort } from "@/domain/output/persistance/CurrentAccountPersisterOutputPort";

type StorageCurrentAccount = {
  name: string,
  email: string,
  prifilePicUrl?: string
}

export class LocalCurrentAccountPersister implements CurrentAccountPersisterOutputPort {
  constructor(private readonly cacheStorage: CacheStorageOutputPort ) {}

  async get(): Promise<CurrentAccount | undefined> {
    try {
      const cacheCurrentAccount = await this.cacheStorage.get<StorageCurrentAccount>("currentAccount")
      return new CurrentAccount(cacheCurrentAccount.name, cacheCurrentAccount.email, cacheCurrentAccount.prifilePicUrl)
    } catch (e) {
      if (e instanceof ResourceNotFoundError) {
        return undefined
      } else throw new Error(`Unexpected error while trying to get current account from cache storahe: ${e}`)
    }
  }

  async set(currentAccount: CurrentAccount): Promise<void> {
    const cacheCurrentAccount: StorageCurrentAccount = {
      email: currentAccount.email,
      name: currentAccount.name,
      prifilePicUrl: currentAccount.profilePicUrl
    }

    await this.cacheStorage.set("currentAccount", cacheCurrentAccount)
  }
}