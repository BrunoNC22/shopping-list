import { User } from "@/models";

export interface GetCurrentAccountPersisterOutputPort {
  get(): Promise<User | undefined>
}

export interface SetCurrentAccountPersisterOutputPort {
  set(currentAccount: User): Promise<void>
}

export interface CurrentAccountPersisterOutputPort extends GetCurrentAccountPersisterOutputPort, SetCurrentAccountPersisterOutputPort {}