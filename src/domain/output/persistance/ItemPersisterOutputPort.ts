import type Item from "@/domain/models/Item";

export interface SaveItemPersisterOutputPort {
  save(item: Item): Promise<void>
}

export interface GetAllItemsPersisterOutputPort {
  getAll(): Promise<Item[]>
}

export interface ReplaceItemsPersisterOutputPort {
  replace(items: Item[]): Promise<void>
}

export interface ItemPersisterOutputPort extends 
  SaveItemPersisterOutputPort, 
  GetAllItemsPersisterOutputPort, 
  ReplaceItemsPersisterOutputPort {}