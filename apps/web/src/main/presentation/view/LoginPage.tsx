import { useCurrentAccount } from "@/main/providers/current-account/CurrentAccountContext"
import { useHeader } from "@/main/providers/header/HeaderContext"
import { useEffect } from "react"

export const LoginPage = () => {
  const { loginWithGoogle } = useCurrentAccount()
  const { setHeaderTitle } = useHeader()

  useEffect(() => {
    loginWithGoogle()
  }, [loginWithGoogle])

  useEffect(() => {
    setHeaderTitle("Logging in...")

    return () => {
      setHeaderTitle("")
    }
  }, [])

  return <></>
}