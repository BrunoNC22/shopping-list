import { useCurrentAccount } from "@/main/providers/current-account/CurrentAccountContext"
import { useEffect } from "react"

export const LoginPage = () => {
  const { loginWithGoogle } = useCurrentAccount()

  useEffect(() => {
    loginWithGoogle()
  }, [loginWithGoogle])

  return <></>
}