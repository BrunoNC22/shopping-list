import { AuthenticateUserInputPort, AuthenticateUserProps } from "@/input";
import { GetByIdUserPersisterOutputPort, UserNotFoundError, VerifyJWTServiceOutputPort } from "@/output";
import { HandleGoogleAuthCallbackJWTPayloadDataType } from "./HandleGoogleAuthCallback";
import { User } from "@/models";

export interface AuthenticateUserPresenter {
  unauthorized(message: string): void
  forbidden(message: string): void
  defaultError(message: string): void
  success(user: User): void
}

export class AuthenticateUser implements AuthenticateUserInputPort {
  constructor(
    private readonly presenter: AuthenticateUserPresenter,
    private readonly jwtService: VerifyJWTServiceOutputPort<HandleGoogleAuthCallbackJWTPayloadDataType>,
    private readonly userPersister: GetByIdUserPersisterOutputPort
  ) {}

  async perform({ token }: AuthenticateUserProps): Promise<void> {
    if (!token) return this.presenter.unauthorized("Token jwt não fornecido.")

    let decodedJwt: HandleGoogleAuthCallbackJWTPayloadDataType
    try {
      decodedJwt = this.jwtService.verify({ token })
    } catch (e: unknown) {
      return this.presenter.unauthorized(`Erro ao verificar token: ${e}`)
    }
    
    let foundUser: User
    try {
      foundUser = await this.userPersister.getById(decodedJwt.id)
    } catch (e) {
      if (e instanceof UserNotFoundError) return this.presenter.forbidden(`Usuário com id ${decodedJwt.id} não existe.`)
      return this.presenter.defaultError(`Erro desconhecido ao buscar usuário com id ${decodedJwt.id}: ${e}`)
    }

    return this.presenter.success(foundUser)
  }
}