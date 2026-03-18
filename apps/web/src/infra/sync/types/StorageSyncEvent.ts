import type { SyncEventEnum } from "@shopping-list/domain"

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