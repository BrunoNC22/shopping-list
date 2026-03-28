import { Router } from "express"
import eventRoutes from './events'
import authRoutes from './auth'
import itemListRoutes from './item-lists'
import itemRoutes from "./items"
import categoryRoutes from './category'

const routes = Router()

routes.use("/auth", authRoutes)
routes.use("/sync/events", eventRoutes)
routes.use("/item-lists", itemListRoutes)
routes.use("/items", itemRoutes)
routes.use("/categories", categoryRoutes)

export default routes
