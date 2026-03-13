import { GoogleLoginInputPort, GoogleLoginProps } from "../input/GoogleLoginInputPort";
import { User } from "../models/User";
import { GoogleAuthServiceOutputPort } from "../output/GoogleAuthServiceOutputPort";
import { GoogleLoginPresenterOutputPort } from "../output/GoogleLoginPresenterOutputPort";
import { IdGeneratorOutputPort } from "../output/IdGeneratorOutputPort";
import { SignJWTServiceOutputPort } from "../output/JWTService";
import { UserNotFoundError } from "../output/UserPersister/UserNotFoundError";
import { GetByEmailUserPersisterOutputPort, SaveUserPersisterOutputPort } from "../output/UserPersister/UserPersisterOutputPort";

export type GoogleLoginJWTPayloadDataType = {
  id: string,
  name: string,
  email: string
}

export class GoogleLogin implements GoogleLoginInputPort {
  constructor(
    private readonly googleAuthService: GoogleAuthServiceOutputPort,
    private readonly jwtService: SignJWTServiceOutputPort,
    private readonly googleLoginPresenter: GoogleLoginPresenterOutputPort,
    private readonly userPersister: SaveUserPersisterOutputPort & GetByEmailUserPersisterOutputPort,
    private readonly idGenerator: IdGeneratorOutputPort
  ) {}

  async perform({ googleCode }: GoogleLoginProps): Promise<void> {
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

      const jwtPayload: GoogleLoginJWTPayloadDataType = {
        id: user.id,
        email: user.email,
        name: user.name
      }
      const token = this.jwtService.sign({ payload: jwtPayload })

      return this.googleLoginPresenter.success({
        id: user.id,
        name: user.name,
        email: user.email,
        jwtToken: token,
        expiresIn: parseInt(process.env.JWT_EXPIRATES_IN as string)
      })
    } catch (e) {
      return this.googleLoginPresenter.defaultError(e as Error)
    }
  }
}