import type { AddItemProps } from "@/domain/input/AddItemInputPort";
import type { GetTotalByCategoryResponseItem } from "@/domain/input/GetTotalByCategoryInputPort";
import type Item from "@/domain/models/Item";
import { createContext, useContext } from "react";

export interface IShoppingListContext {
  addItem(props: AddItemProps): Promise<void>
  removeItem(itemId: string): Promise<void>
  loadItems(): Promise<void>
  toggleIsChecked(itemId: string): Promise<void>
  isLoading: boolean
  isReloading: boolean
  items: Item[] | null
  totalValue: string
  totalByCategory: GetTotalByCategoryResponseItem[]
}

export const ShoppingListContext = createContext<IShoppingListContext | null>(null)

export const useShoppingList = () => {
  const context = useContext(ShoppingListContext)

  if (!context) throw new Error("useShoppingList must be used within ShoppingListProvider")

  return context
}