import type { GoogleLoginInputPort } from "../../input/GoogleLoginInputPort";
import { CurrentAccount } from "../../models/CurrentAccount";
import { UnauthorizedError } from "../../output/http/errors/UnauthorizedError";
import type { GetHttpClientOutputPort } from "../../output/http/HttpClientOutputPort";
import type { SetCurrentAccountPersisterOutputPort } from "../../output/persistance/CurrentAccountPersisterOutputPort";

export interface GoogleLoginPresenter {
  handleDefaultError(e: Error): void,
  handleDefaultSuccess(currentAccount: CurrentAccount): void
  handleUnauthorizedError(): void
} 

type GoogleLoginProps = {
  name: string,
  email: string,
  profilePicUrl?: string
}

export class GoogleLogin implements GoogleLoginInputPort {
  constructor(
    private readonly currentAccountPersister: SetCurrentAccountPersisterOutputPort,
    private readonly httpClient: GetHttpClientOutputPort,
    private readonly presenter: GoogleLoginPresenter
  ) {}

  async perform(): Promise<void> {
    let props: GoogleLoginProps
    try {
      props = await this.httpClient.get({ url: `${import.meta.env.VITE_BACKEND_URL}/auth/me` })
    } catch (e) {
      if (e instanceof UnauthorizedError) {
        return this.presenter.handleUnauthorizedError()
      } else return this.presenter.handleDefaultError(e as Error)
    }

    const currentAccount = new CurrentAccount(props.name, props.email, props.profilePicUrl)
    await this.currentAccountPersister.set(currentAccount)

    return this.presenter.handleDefaultSuccess(currentAccount)
  }
}