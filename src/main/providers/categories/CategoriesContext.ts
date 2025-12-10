import type { Categoria } from "@/domain/models/Categoria";
import { createContext, useContext } from "react";

export interface ICategoriesContext {
  categories: Categoria[] | null
  isLoading: boolean
}

export const CategoriesContext = createContext<ICategoriesContext | null>(null)

export const useCategories = () => {
  const context = useContext(CategoriesContext)

  if (!context) throw new Error("useCategories must be used within CategoriesProvider.")

  return context
} 