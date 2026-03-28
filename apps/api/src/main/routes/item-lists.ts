import { Router } from "express";
import { createJsonwebtokenJWTServiceAdapter } from "../factories/jwt/JsonwebtokenJWTServiceAdapterFactory";
import { GetItemsProps, HandleGoogleAuthCallbackJWTPayloadDataType, Item } from "@shopping-list/domain";
import { createGetItemLists } from "../factories/usecases/item-list/GetitemLists";
import { toRemoteItemList } from "./types/RemoteItemList";
import { createGetItems } from "../factories/usecases/item/GetItemsFactory";
import { toRemoteItem } from "./types/RemoteItem";
import { autenticateUserMiddleware } from "../middlewares/AuthenticateUserMiddleware";

const routes = Router()
routes.use(autenticateUserMiddleware)

routes.get("", async (req, res) => {
  if (!req.user) return res.status(500).send({ message: "User era pra estar aqui..." })

  const usecase = createGetItemLists()
  const itemLists = await usecase.perform({ userId: req.user.id })

  const responseBody = itemLists.map(itemList => toRemoteItemList(itemList))

  return res.status(200).send(responseBody)
})

routes.get("/:id/items", async (req, res) => {
  const itemListId = req.params.id
  
  const usecase = createGetItems()

  const props: GetItemsProps = {
    itemListId: itemListId
  }
  const items = await usecase.perform(props)

  const remoteItems = items.map(item => toRemoteItem(item))
  res.status(200).send(remoteItems)
})

export default routes
