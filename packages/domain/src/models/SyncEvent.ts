import { BaseModel } from "./BaseModel"

export enum SyncEventEnum {

  CREATE_CATEGORY = "CREATE_CATEGORY",
  EDIT_CATEGORY = "EDIT_CATEGORY",
  DELETE_CATEGORY = "DELETE_CATEGORY",

  CREATE_ITEM = "CREATE_ITEM",
  EDIT_ITEM = "EDIT_ITEM",
  DELETE_ITEM = "DELETE_ITEM",

  CREATE_ITEM_LIST = "CREATE_ITEM_LIST",
  EDIT_ITEM_LIST = "EDIT_ITEM_LIST",
  DELETE_ITEM_LIST = "DELETE_ITEM_LIST"

}

export interface SyncEventPayloadMap {

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
    createdAt: Date
  }

  [SyncEventEnum.EDIT_ITEM_LIST]: {
    id: string
    name: string
  }

  [SyncEventEnum.DELETE_ITEM_LIST]: {
    id: string
  }

}

export class SyncEvent<T extends SyncEventEnum> extends BaseModel {

  constructor(
    id: string,
    readonly type: T,
    readonly payload: SyncEventPayloadMap[T],
    readonly createdAt: Date,
    public synced: boolean = false
  ) {
    super(id)
  }

}

export type AnySyncEvent = {
  [K in SyncEventEnum]: SyncEvent<K>
}[SyncEventEnum]