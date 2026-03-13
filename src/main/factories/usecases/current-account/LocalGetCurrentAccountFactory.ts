import { GetCurrentAccount } from "@/domain/usecases/current-account/GetCurrentAccount"
import { createLocalCurrentAccountPersister } from "../../persister/LocalCurrentAccountPersisterFactory"

export const createLocalGetCurrentAccount = () => {
  return new GetCurrentAccount(createLocalCurrentAccountPersister())
}