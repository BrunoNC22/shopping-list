import { CurrentAccount, User } from "@/models"

export interface InitiateGoogleAuthenticationPresenterOutputPort {
  handleDefaultError(e: Error): void,
  handleDefaultSuccess(currentAccount: User): void
  handleUnauthorizedError(): void
}