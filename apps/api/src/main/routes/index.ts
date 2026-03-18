import { Router } from "express"
import { createHandleGoogleAuthCallback } from "../factories/usecases/HandleGoogleAuthCallbackFactory"
import { createGetUserInformation } from "../factories/usecases/GetUserInformationFactory"
import { GetUserInformationProps } from "@shopping-list/domain"

export const routes = Router()

type GoogleAuthPayload = {
  code: string,
  scope: string,
  authuser: string,
  prompt: string
}

routes.get("/auth/google/redirect", (req, res) => {
  const { code } = req.query as GoogleAuthPayload
  
  const usecase = createHandleGoogleAuthCallback(res)
  usecase.perform({ googleCode: code })
})

routes.get("/auth/me", (req, res) => {
  const token = req.cookies.auth_token
  
  const usecase = createGetUserInformation(res)
  const props: GetUserInformationProps = { token }
  usecase.perform(props)
})

routes.post("/sync/events", (req, res) => {
  const body = req.body
  console.log(`Request body`, body)

  res.status(200).send({ message: "received!" })
})

