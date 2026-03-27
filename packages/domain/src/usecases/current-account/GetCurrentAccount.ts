import { GetCurrentAccountInputPort } from "@/input";
import { User } from "@/models";
import { GetCurrentAccountPersisterOutputPort } from "@/output";


export class GetCurrentAccount implements GetCurrentAccountInputPort {
  constructor(private readonly currentAccountPersister: GetCurrentAccountPersisterOutputPort) {}

  async perform(): Promise<User | undefined> {
    return await this.currentAccountPersister.get()
  }
}