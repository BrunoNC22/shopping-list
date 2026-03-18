import type { GetCurrentAccountInputPort } from "@/input/GetCurrentAccountInputPort";
import type { CurrentAccount } from "@/models/CurrentAccount";
import type { GetCurrentAccountPersisterOutputPort } from "@/output/persistance/CurrentAccountPersisterOutputPort";


export class GetCurrentAccount implements GetCurrentAccountInputPort {
  constructor(private readonly currentAccountPersister: GetCurrentAccountPersisterOutputPort) {}

  async perform(): Promise<CurrentAccount | undefined> {
    return await this.currentAccountPersister.get()
  }
}