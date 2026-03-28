import { createContext, useContext } from "react"

export interface IHeaderContext {
  setHeaderTitle: (title: string) => void
  headerTitle: string
}

export const HeaderContext = createContext<IHeaderContext | null>(null)

export const useHeader = () => {
  const context = useContext(HeaderContext)
  if (!context) throw new Error("useHeader must be used within HeaderProvider")
  return context
}