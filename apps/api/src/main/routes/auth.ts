import { Router } from "express";
import { createHandleGoogleAuthCallback } from "../factories/usecases/auth/HandleGoogleAuthCallbackFactory";
import { GetUserInformationProps } from "@shopping-list/domain";
import { createGetUserInformation } from "../factories/usecases/user/GetUserInformationFactory";
import { autenticateUserMiddleware } from "../middlewares/AuthenticateUserMiddleware";

const routes = Router()

type GoogleAuthPayload = {
  code: string,
  scope: string,
  authuser: string,
  prompt: string
}

routes.get("/google/redirect", (req, res) => {
  const { code } = req.query as GoogleAuthPayload
  
  const usecase = createHandleGoogleAuthCallback(res)
  usecase.perform({ googleCode: code })
})


routes.get("/me", autenticateUserMiddleware, (req, res) => {
  const token = req.cookies.auth_token
  
  const usecase = createGetUserInformation(res)
  const props: GetUserInformationProps = { token }
  usecase.perform(props)
})

export default routes