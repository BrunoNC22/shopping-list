import type { CreateItemListProps } from "@/domain/input/CreateItemListInputPort";
import type ItemList from "@/domain/models/ItemList";
import { createContext, useContext } from "react";

interface IItemListsContext {
  itemLists: ItemList[]
  createItemList: (props: CreateItemListProps) => Promise<void>
}


export const ItemListsContext = createContext<IItemListsContext | null>(null)

export const useItemLists = () => {
  const ctx = useContext(ItemListsContext)
  if (!ctx) throw new Error("useItemLists must be used within ItemListsProvider")

  return ctx
}