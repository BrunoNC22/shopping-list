import { useState, type PropsWithChildren } from "react"
import { HeaderContext } from "./HeaderContext"

export const HeaderProvider = ({ children }: PropsWithChildren) => {
  const [headerTitle, setHeaderTitle] = useState<string>("")

  return (
    <HeaderContext.Provider value={{
      headerTitle,
      setHeaderTitle: (title) => setHeaderTitle(title)
    }} >
      {children}
    </HeaderContext.Provider>
  )
}