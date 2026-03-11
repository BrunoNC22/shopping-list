import type { GetCurrentAccountInputPort } from "@/domain/input/GetCurrentAccountInputPort";
import type { CurrentAccount } from "@/domain/models/CurrentAccount";
import type { GetCurrentAccountPersisterOutputPort } from "@/domain/output/persistance/CurrentAccountPersisterOutputPort";


export class GetCurrentAccount implements GetCurrentAccountInputPort {
  constructor(private readonly currentAccountPersister: GetCurrentAccountPersisterOutputPort) {}

  async perform(): Promise<CurrentAccount | undefined> {
    return await this.currentAccountPersister.get()
  }
}