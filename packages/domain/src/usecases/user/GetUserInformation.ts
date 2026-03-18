import { GetUserInformationInputPort, GetUserInformationProps } from "@/input"
import { GetByIdUserPersisterOutputPort, UserNotFoundError, VerifyJWTServiceOutputPort } from "@/output"
import { HandleGoogleAuthCallbackJWTPayloadDataType } from "../auth"
import { User } from "@/models"


export interface GetUserInformationPresenterOutputPort {
  defaultError(error: Error): void
  defaultSuccess(user: User): void
  userNotFoundError(userId: string): void
}

export class GetUserInformation implements GetUserInformationInputPort {
  constructor(
    private readonly jwtService: VerifyJWTServiceOutputPort<HandleGoogleAuthCallbackJWTPayloadDataType>,
    private readonly userPersister: GetByIdUserPersisterOutputPort,
    private readonly presenter: GetUserInformationPresenterOutputPort
  ) {}

  async perform(props: GetUserInformationProps): Promise<void> {
    let userId: string
    try {
      console.log('token: ', props.token)
      const { id } = this.jwtService.verify({ token: props.token })
      userId = id
    } catch (e) {
      return this.presenter.defaultError(e as Error)
    }

    try {
      return this.presenter.defaultSuccess(await this.userPersister.getById(userId)) 
    } catch (e) {
      if (e instanceof UserNotFoundError) {
        return this.presenter.userNotFoundError(userId)
      } else return this.presenter.defaultError(e as Error)
    }
  }
}