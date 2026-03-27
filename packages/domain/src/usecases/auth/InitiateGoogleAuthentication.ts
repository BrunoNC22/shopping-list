import { InitiateGoogleAuthenticationInputPort } from "@/input";
import { User } from "@/models";
import { GetHttpClientOutputPort, InitiateGoogleAuthenticationPresenterOutputPort, SetCurrentAccountPersisterOutputPort, UnauthorizedError } from "@/output";


type GoogleLoginProps = {
  id: string,
  name: string,
  email: string,
  profilePicUrl?: string
}

export class InitiateGoogleAuthentication implements InitiateGoogleAuthenticationInputPort {
  constructor(
    private readonly currentAccountPersister: SetCurrentAccountPersisterOutputPort,
    private readonly httpClient: GetHttpClientOutputPort,
    private readonly presenter: InitiateGoogleAuthenticationPresenterOutputPort
  ) {}

  async perform(): Promise<void> {
    let props: GoogleLoginProps
    try {
      props = await this.httpClient.get({ url: `/auth/me` })
    } catch (e) {
      if (e instanceof UnauthorizedError) {
        return this.presenter.handleUnauthorizedError()
      } else return this.presenter.handleDefaultError(e as Error)
    }

    const currentAccount = new User(props.id, props.name, props.email, props.profilePicUrl)
    await this.currentAccountPersister.set(currentAccount)

    return this.presenter.handleDefaultSuccess(currentAccount)
  }
}