import { createContext, useContext, type ReactElement } from "react";

export interface DrawerFunctions {
  openDrawer: (buildDrawer: (close: () => void) => ReactElement, title?: string, description?: string) => string
  closeDrawer: (drawerId: string) => void
}

export const DrawerContext = createContext<DrawerFunctions | null>(null)

export const useDrawer = () => {
  const context = useContext(DrawerContext)
  if (!context) throw new Error("useDrawer must be used within DrawerProvider")

  return context
}