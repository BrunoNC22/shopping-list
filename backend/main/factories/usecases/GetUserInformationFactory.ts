import { Response } from "express";
import { GetUserInformation } from "../../../domain/usecases/GetUserInformation";
import { createJsonwebtokenJWTServiceAdapter } from "../jwt/JsonwebtokenJWTServiceAdapterFactory";
import { createUserPersisterPrismaAdapter } from "../db/UserPersisterPrismaAdapterFactory";
import { GetUserInformationPresenter } from "../../../infra/presenters/GetUserInformationPresenter";
import { GoogleLoginJWTPayloadDataType } from "../../../domain/usecases/GoogleLogin";

export const createGetUserInformation = (res: Response) => {
  return new GetUserInformation(
    createJsonwebtokenJWTServiceAdapter<GoogleLoginJWTPayloadDataType>(),
    createUserPersisterPrismaAdapter(),
    new GetUserInformationPresenter(res)
  )
}