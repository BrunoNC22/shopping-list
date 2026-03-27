import { User } from "@/models";

export interface GetCurrentAccountInputPort {
  perform(): Promise<User | undefined>
}