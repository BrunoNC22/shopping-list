import type { User } from "@shopping-list/domain";
import { createContext, useContext } from "react";

export interface ICurrentAccountContext {
  currentAccount?: User
  isGettingCurrentAccount: boolean
  loginWithGoogle: () => void
}

export const CurrentAccountContext = createContext<ICurrentAccountContext | null>(null)

export const useCurrentAccount = () => {
  const context = useContext(CurrentAccountContext)
  if (!context) throw new Error("CurrentAccountContext must be used within CurrentAccountProvider.")
  
  return context 
}