import { Response } from "express";
import { GetUserInformation, HandleGoogleAuthCallbackJWTPayloadDataType } from "@shopping-list/domain";
import { createJsonwebtokenJWTServiceAdapter } from "../../jwt/JsonwebtokenJWTServiceAdapterFactory";
import { createUserPersisterPrismaAdapter } from "../../db/UserPersisterPrismaAdapterFactory";
import { GetUserInformationPresenter } from "../../../../infra/presenters/GetUserInformationPresenter";

export const createGetUserInformation = (res: Response) => {
  return new GetUserInformation(
    createJsonwebtokenJWTServiceAdapter<HandleGoogleAuthCallbackJWTPayloadDataType>(),
    createUserPersisterPrismaAdapter(),
    new GetUserInformationPresenter(res)
  )
}