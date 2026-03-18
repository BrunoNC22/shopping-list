import { GetCurrentAccount } from "@shopping-list/domain"
import { createLocalCurrentAccountPersister } from "../../persister/local/LocalCurrentAccountPersisterFactory"

export const createLocalGetCurrentAccount = () => {
  return new GetCurrentAccount(createLocalCurrentAccountPersister())
}