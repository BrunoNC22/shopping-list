import { GetUserInformationInputPort, GetUserInformationProps } from "../input/GetUserInformation";
import { User } from "../models/User";
import { VerifyJWTServiceOutputPort } from "../output/JWTService";
import { UserNotFoundError } from "../output/UserPersister/UserNotFoundError";
import { GetByIdUserPersisterOutputPort } from "../output/UserPersister/UserPersisterOutputPort";
import { GoogleLoginJWTPayloadDataType } from "./GoogleLogin";

export interface GetUserInformationPresenterOutputPort {
  defaultError(error: Error): void
  defaultSuccess(user: User): void
  userNotFoundError(userId: string): void
}

export class GetUserInformation implements GetUserInformationInputPort {
  constructor(
    private readonly jwtService: VerifyJWTServiceOutputPort<GoogleLoginJWTPayloadDataType>,
    private readonly userPersister: GetByIdUserPersisterOutputPort,
    private readonly presenter: GetUserInformationPresenterOutputPort
  ) {}

  async perform(props: GetUserInformationProps): Promise<void> {
    const { id } = this.jwtService.verify({ token: props.token })

    try {
      return this.presenter.defaultSuccess(await this.userPersister.getById(id)) 
    } catch (e) {
      if (e instanceof UserNotFoundError) {
        return this.presenter.userNotFoundError(id)
      } else return this.presenter.defaultError(e as Error)
    }
  }
}