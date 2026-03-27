import { ItemList } from "@/models"

export interface SaveItemListPersisterOutputPort {
  save(itemList: ItemList): Promise<void>
}

export interface GetAllItemListsPersisterOutputPort {
  getAll(): Promise<ItemList[]>
}

export interface GetAllItemListsByUserIdOutputPort {
  getAllByUserId(userId: string): Promise<ItemList[]>
}

export interface GetItemListPersisterOutputPort {
  get(listId: string): Promise<ItemList>
}

export interface DeleteItemListPersisterOutputPort {
  delete(listId: string): Promise<void>
}

export interface ReplaceItemListsByUserIdOutputPort {
  replaceByUserId(userId: string, itemLists: ItemList[]): Promise<void>
}

export interface ItemListPersisterOutputPort extends 
  SaveItemListPersisterOutputPort, 
  GetItemListPersisterOutputPort,
  GetAllItemListsPersisterOutputPort,
  DeleteItemListPersisterOutputPort,
  GetAllItemListsByUserIdOutputPort,
  ReplaceItemListsByUserIdOutputPort {}