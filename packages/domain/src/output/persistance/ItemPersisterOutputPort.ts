import { type Item } from "@/models/Item";

export interface SaveItemPersisterOutputPort {
  save(item: Item): Promise<void>
}

export interface GetAllItemsPersisterOutputPort {
  getAll(): Promise<Item[]>
}

export interface GetByIdItemPersisterOutputPort {
  getById(id: string): Promise<Item>
}

export interface getByItemListIdItemPersisterOutputPort {
  getByItemListId(itemListId: string): Promise<Item[]>
}

export interface DeleteItemPersisterOutputPort {
  delete(itemId: string): Promise<void>
}

export interface ReplaceItemsPersisterOutputPort {
  replace(itemListId: string, items: Item[]): Promise<void>
}

export interface ItemPersisterOutputPort extends 
  SaveItemPersisterOutputPort, 
  GetAllItemsPersisterOutputPort,
  getByItemListIdItemPersisterOutputPort,
  ReplaceItemsPersisterOutputPort,
  DeleteItemPersisterOutputPort,
  GetByIdItemPersisterOutputPort {}