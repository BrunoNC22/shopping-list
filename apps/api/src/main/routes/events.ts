import { Categoria, Item, ItemList, SyncEventEnum } from "@shopping-list/domain"
import { Router } from "express"
import { createCategoryPersisterPrismaAdapter } from "../factories/db/CategoryPersisterPrismaAdapterFactory"
import { createItemPersisterPrismaAdapterFactory } from "../factories/db/ItemPersisterPrismaAdapterFactory"
import { createDeleteItem } from "../factories/usecases/item/DeleteItemFactory"
import { createItemListPersisterPrismaAdapterFactory } from "../factories/db/ItemListPersisterPrismaAdapterFactory"
import { autenticateUserMiddleware } from "../middlewares/AuthenticateUserMiddleware"

const routes = Router()

export type StorageSyncEventPayloadMap = {

  [SyncEventEnum.CREATE_CATEGORY]: {
    id: string
    name: string
  }

  [SyncEventEnum.EDIT_CATEGORY]: {
    id: string
    name: string
  }

  [SyncEventEnum.DELETE_CATEGORY]: {
    id: string
  }

  [SyncEventEnum.CREATE_ITEM]: {
    id: string
    itemListId: string
    name: string
    price: number
    amount: number
    categoryId: string
    checked: boolean
  }

  [SyncEventEnum.EDIT_ITEM]: {
    id: string
    name: string
    price: number
    amount: number
    categoryId: string
    checked: boolean
  }

  [SyncEventEnum.DELETE_ITEM]: {
    id: string
  }

  [SyncEventEnum.CREATE_ITEM_LIST]: {
    id: string
    name: string
    createdAt: string
    userId: string
  }

  [SyncEventEnum.EDIT_ITEM_LIST]: {
    id: string
    name: string
  }

  [SyncEventEnum.DELETE_ITEM_LIST]: {
    id: string
  }

}

export type StorageSyncEvent<T extends SyncEventEnum> = {
  id: string
  type: T
  payload: StorageSyncEventPayloadMap[T]
  createdAt: string
  synced: boolean
}

export type AnyStorageSyncEvent = {
  [K in SyncEventEnum]: StorageSyncEvent<K>
}[SyncEventEnum]

const eventHandler: {
  [K in SyncEventEnum]: (payload: StorageSyncEventPayloadMap[K]) => Promise<void>
} = {
  [SyncEventEnum.CREATE_CATEGORY]: async (payload: StorageSyncEventPayloadMap[SyncEventEnum.CREATE_CATEGORY]) => {
    const categoryPersister = createCategoryPersisterPrismaAdapter()
    await categoryPersister.save(new Categoria(payload.id, payload.name))
  },

  [SyncEventEnum.DELETE_CATEGORY]: async (payload: StorageSyncEventPayloadMap[SyncEventEnum.DELETE_CATEGORY]) => {
    console.error("Por enquanto não deletamos categorias")
  },

  [SyncEventEnum.EDIT_CATEGORY]: async (payload: StorageSyncEventPayloadMap[SyncEventEnum.EDIT_CATEGORY]) => {
    const categoryPersister = createCategoryPersisterPrismaAdapter()
    await categoryPersister.save(new Categoria(payload.id, payload.name))
  },

  [SyncEventEnum.CREATE_ITEM]: async (payload: StorageSyncEventPayloadMap[SyncEventEnum.CREATE_ITEM]) => {
    const categoryPersister = createCategoryPersisterPrismaAdapter()
    const category = await categoryPersister.getById(payload.categoryId)
    const item = new Item(payload.id, payload.itemListId, payload.name, payload.price, payload.amount, category, payload.checked)
    const itemPersister = createItemPersisterPrismaAdapterFactory()
    await itemPersister.save(item)
  },

  [SyncEventEnum.EDIT_ITEM]: async (payload: StorageSyncEventPayloadMap[SyncEventEnum.EDIT_ITEM]) => {
    const itemPersister = createItemPersisterPrismaAdapterFactory()
    const item = await itemPersister.getById(payload.id)
    const categoryPersister = createCategoryPersisterPrismaAdapter()
    const category = await categoryPersister.getById(payload.categoryId)

    item.category = category
    item.amount = payload.amount
    item.checked = payload.checked
    item.name = payload.name
    item.price = payload.price
    
    await itemPersister.save(item)
  },

  [SyncEventEnum.DELETE_ITEM]: async (payload: StorageSyncEventPayloadMap[SyncEventEnum.DELETE_ITEM]) => {
    const usecase = createDeleteItem()
    await usecase.perform({ itemId: payload.id })
  },

  [SyncEventEnum.CREATE_ITEM_LIST]: async (payload: StorageSyncEventPayloadMap[SyncEventEnum.CREATE_ITEM_LIST]) => {
    const itemList = new ItemList(payload.id, payload.userId, payload.name, [], new Date(payload.createdAt))
    const itemListPersister = createItemListPersisterPrismaAdapterFactory()
    await itemListPersister.save(itemList)
  },

  [SyncEventEnum.EDIT_ITEM_LIST]: async (payload: StorageSyncEventPayloadMap[SyncEventEnum.EDIT_ITEM_LIST]) => {
    const itemListPersister = createItemListPersisterPrismaAdapterFactory()
    const itemList = await itemListPersister.get(payload.id)
    itemList.name = payload.name
    await itemListPersister.save(itemList)
  },

  [SyncEventEnum.DELETE_ITEM_LIST]: async (payload: StorageSyncEventPayloadMap[SyncEventEnum.DELETE_ITEM_LIST]) => {
    const itemListPersister = createItemListPersisterPrismaAdapterFactory()
    await itemListPersister.delete(payload.id)
  }
}
async function handleStorageEvent<T extends SyncEventEnum>(
  event: StorageSyncEvent<T>
) {
  const handler = eventHandler[event.type]
  await handler(event.payload)
}

routes.use(autenticateUserMiddleware)

routes.post("", async (req, res) => {
  const body = req.body as AnyStorageSyncEvent[]

  await Promise.all(body.map(async event => {
    try {
      await handleStorageEvent(event)
    } catch (e) {
      console.error(e)
      return res.status(500).send({ message: "Internal server error" })
    }
  }))
  

  res.status(200).send({ message: "received!" })
})

export default routes
