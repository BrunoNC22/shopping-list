import type { CurrentAccount } from "@/models/CurrentAccount";

export interface GetCurrentAccountPersisterOutputPort {
  get(): Promise<CurrentAccount | undefined>
}

export interface SetCurrentAccountPersisterOutputPort {
  set(currentAccount: CurrentAccount): Promise<void>
}

export interface CurrentAccountPersisterOutputPort extends GetCurrentAccountPersisterOutputPort, SetCurrentAccountPersisterOutputPort {}