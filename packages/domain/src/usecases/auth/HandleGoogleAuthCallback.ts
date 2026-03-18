import { HandleGoogleAuthCallbackInputPort, HandleGoogleAuthCallbackProps } from "@/input"
import { User } from "@/models"
import { GetByEmailUserPersisterOutputPort, GoogleAuthServiceOutputPort, HandleGoogleAuthCallbackPresenterOutputPort, IdGeneratorOutputPort, SaveUserPersisterOutputPort, SignJWTServiceOutputPort, UserNotFoundError } from "@/output"


export type HandleGoogleAuthCallbackJWTPayloadDataType = {
  id: string,
  name: string,
  email: string
}

export class HandleGoogleAuthCallback implements HandleGoogleAuthCallbackInputPort {
  constructor(
    private readonly googleAuthService: GoogleAuthServiceOutputPort,
    private readonly jwtService: SignJWTServiceOutputPort,
    private readonly HandleGoogleAuthCallbackPresenter: HandleGoogleAuthCallbackPresenterOutputPort,
    private readonly userPersister: SaveUserPersisterOutputPort & GetByEmailUserPersisterOutputPort,
    private readonly idGenerator: IdGeneratorOutputPort
  ) {}

  async perform({ googleCode }: HandleGoogleAuthCallbackProps): Promise<void> {
    try {
      const userDataFromGoogle = await this.googleAuthService.getUserData({
        code: googleCode
      })

      let user: User
      try {
        user = await this.userPersister.getByEmail(userDataFromGoogle.email)
      } catch (e) {
        if (e instanceof UserNotFoundError) {
          const userId = await this.idGenerator.generate()
          user = new User(userId, userDataFromGoogle.name, userDataFromGoogle.email, userDataFromGoogle.pictureUrl)
          await this.userPersister.save(user)
        } else throw new Error(`Unexpected error while trying to find user by email: ${e}`)
      }

      const jwtPayload: HandleGoogleAuthCallbackJWTPayloadDataType = {
        id: user.id,
        email: user.email,
        name: user.name
      }
      const token = this.jwtService.sign({ payload: jwtPayload })

      return this.HandleGoogleAuthCallbackPresenter.success({
        id: user.id,
        name: user.name,
        email: user.email,
        jwtToken: token,
        expiresIn: parseInt(process.env.JWT_EXPIRATES_IN as string)
      })
    } catch (e) {
      return this.HandleGoogleAuthCallbackPresenter.defaultError(e as Error)
    }
  }
}