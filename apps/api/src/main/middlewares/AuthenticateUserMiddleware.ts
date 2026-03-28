import { NextFunction, Request, Response } from "express";
import { ExpressAuthenticateUserPresenter } from "../../infra/presenters/ExpressAuthenticateuserPresenterAdapter";
import { AuthenticateUser } from "@shopping-list/domain";
import { createJsonwebtokenJWTServiceAdapter } from "../factories/jwt/JsonwebtokenJWTServiceAdapterFactory";
import { createUserPersisterPrismaAdapter } from "../factories/db/UserPersisterPrismaAdapterFactory";

export const autenticateUserMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const presenter = new ExpressAuthenticateUserPresenter(req, res, next)

  const usecase = new AuthenticateUser(
    presenter,
    createJsonwebtokenJWTServiceAdapter(),
    createUserPersisterPrismaAdapter()
  )
  const token = req.cookies['auth_token']
  await usecase.perform({ token })
}