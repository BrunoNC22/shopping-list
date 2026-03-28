import { Response } from "express";
import { createGoogleAuthService } from "../../google/GoogleAuthServiceFactory";
import { createJsonwebtokenJWTServiceAdapter } from "../../jwt/JsonwebtokenJWTServiceAdapterFactory";
import { GoogleLoginPresenter } from "../../../../infra/presenters/GoogleLoginPresenter";
import { createUserPersisterPrismaAdapter } from "../../db/UserPersisterPrismaAdapterFactory";
import { createIdGenerator } from "../../id/IdGeneratorFactory";
import { HandleGoogleAuthCallback } from "@shopping-list/domain";

export const createHandleGoogleAuthCallback = (response: Response) => new HandleGoogleAuthCallback(
  createGoogleAuthService(),
  createJsonwebtokenJWTServiceAdapter(),
  new GoogleLoginPresenter(response),
  createUserPersisterPrismaAdapter(),
  createIdGenerator()
)