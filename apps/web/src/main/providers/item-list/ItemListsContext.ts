import type { CreateItemListProps, DeleteItemListProps, EditItemListProps, ItemList } from "@shopping-list/domain";
import { createContext, useContext } from "react";

interface IItemListsContext {
  itemLists: ItemList[]
  createItemList: (props: CreateItemListProps) => Promise<void>
  deleteItemList: (props: DeleteItemListProps) => Promise<void>
  editItemList: (props: EditItemListProps) => Promise<void>
}

export const ItemListsContext = createContext<IItemListsContext | null>(null)

export const useItemLists = () => {
  const ctx = useContext(ItemListsContext)
  if (!ctx) throw new Error("useItemLists must be used within ItemListsProvider")

  return ctx
}