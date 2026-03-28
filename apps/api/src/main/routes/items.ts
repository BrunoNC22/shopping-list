import { Router } from "express";
import { createGetItems } from "../factories/usecases/item/GetItemsFactory";
import { GetItemsProps } from "@shopping-list/domain";
import { toRemoteItem } from "./types/RemoteItem";

const routes = Router()



export default routes

