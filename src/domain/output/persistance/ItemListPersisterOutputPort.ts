import type ItemList from "@/domain/models/ItemList";

export interface SaveItemListPersisterOutputPort {
  save(itemList: ItemList): Promise<void>
}

export interface GetAllItemListsPersisterOutputPort {
  getAll(): Promise<ItemList[]>
}

export interface GetItemListPersisterOutputPort {
  get(listId: string): Promise<ItemList>
}

export interface ItemListPersisterOutputPort extends 
  SaveItemListPersisterOutputPort, 
  GetItemListPersisterOutputPort,
  GetAllItemListsPersisterOutputPort {}