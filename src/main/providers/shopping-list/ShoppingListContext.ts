import type { AddItemProps } from "@/domain/input/AddItemInputPort";
import type { ItemsByCategoryResponseItem } from "@/domain/input/GetItemsByCategoryInputPort";
import type { GetTotalByCategoryResponseItem } from "@/domain/input/GetTotalByCategoryInputPort";
import type Item from "@/domain/models/Item";
import { createContext, useContext } from "react";

export interface IShoppingListContext {
  addItem(props: Omit<AddItemProps, 'itemListId'>): Promise<void>
  removeItem(itemId: string): Promise<void>
  getItemListByItemListId(): Promise<void>
  toggleIsChecked(itemId: string): Promise<void>
  isLoading: boolean
  isReloading: boolean
  items: Readonly<Item[]> | null
  totalValue: string
  totalByCategory: GetTotalByCategoryResponseItem[]
  itemsByCategory: ItemsByCategoryResponseItem[]
}

export const ShoppingListContext = createContext<IShoppingListContext | null>(null)

export const useShoppingList = () => {
  const context = useContext(ShoppingListContext)

  if (!context) throw new Error("useShoppingList must be used within ShoppingListProvider")

  return context
}