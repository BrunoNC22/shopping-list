import { Router } from "express";
import { createJsonwebtokenJWTServiceAdapter } from "../factories/jwt/JsonwebtokenJWTServiceAdapterFactory";
import { HandleGoogleAuthCallbackJWTPayloadDataType } from "@shopping-list/domain";
import { createGetAllCategories } from "../factories/usecases/category/GetAllCategoriesFactory";
import { toRemoteCategory } from "./types/RemoteCategory";
import { autenticateUserMiddleware } from "../middlewares/AuthenticateUserMiddleware";

const routes = Router()
routes.use(autenticateUserMiddleware)

routes.get("", async (req, res) => {
  const token = req.cookies.auth_token
  const jwtService = createJsonwebtokenJWTServiceAdapter<HandleGoogleAuthCallbackJWTPayloadDataType>()
  jwtService.verify({ token })

  const usecase = createGetAllCategories()
  const categories = await usecase.perform()

  res.status(200).send(categories.map(category => toRemoteCategory(category)))
})

export default routes