import { Response } from "express";
import { GoogleLogin } from "../../../domain/usecases/GoogleLogin";
import { createGoogleAuthService } from "../google/GoogleAuthServiceFactory";
import { createJsonwebtokenJWTServiceAdapter } from "../jwt/JsonwebtokenJWTServiceAdapterFactory";
import { GoogleLoginPresenter } from "../../../infra/presenters/GoogleLoginPresenter";
import { createUserPersisterPrismaAdapter } from "../db/UserPersisterPrismaAdapterFactory";
import { createIdGenerator } from "../id/IdGeneratorFactory";

export const createGoogleLogin = (response: Response) => new GoogleLogin(
  createGoogleAuthService(),
  createJsonwebtokenJWTServiceAdapter(),
  new GoogleLoginPresenter(response),
  createUserPersisterPrismaAdapter(),
  createIdGenerator()
)