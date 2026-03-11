import type { CurrentAccount } from "../models/CurrentAccount";

export interface GetCurrentAccountInputPort {
  perform(): Promise<CurrentAccount | undefined>
}