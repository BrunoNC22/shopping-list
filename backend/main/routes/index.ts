import { Router } from "express"
import { createGoogleLogin } from "../factories/usecases/GoogleLoginFactory"
import { createGetUserInformation } from "../factories/usecases/GetUserInformationFactory"

export const routes = Router()

type GoogleAuthPayload = {
  code: string,
  scope: string,
  authuser: string,
  prompt: string
}

routes.get("/auth/google/redirect", (req, res) => {
  const { code } = req.query as GoogleAuthPayload
  
  const usecase = createGoogleLogin(res)
  usecase.perform({ googleCode: code })
})

routes.get("/auth/me", (req, res) => {
  const token = req.cookies.auth_token

  const usecase = createGetUserInformation(res)
  usecase.perform({ token })
})

routes.post("/sync/events", (req, res) => {
  const body = req.body
  console.log(`Request body`, body)

  res.status(200).send({ message: "received!" })
})

