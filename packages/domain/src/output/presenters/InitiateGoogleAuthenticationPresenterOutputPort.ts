import { CurrentAccount } from "@/models"

export interface InitiateGoogleAuthenticationPresenterOutputPort {
  handleDefaultError(e: Error): void,
  handleDefaultSuccess(currentAccount: CurrentAccount): void
  handleUnauthorizedError(): void
}