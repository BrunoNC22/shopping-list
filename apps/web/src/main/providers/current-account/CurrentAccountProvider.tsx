import { useCallback, useEffect, useMemo, useState, type Dispatch, type PropsWithChildren, type SetStateAction } from "react"
import { CurrentAccountContext } from "./CurrentAccountContext"
import { createLocalGoogleLogin } from "@/main/factories/usecases/auth/LocalGoogleLoginFactory"
import { useNavigate, type NavigateFunction } from "react-router";
import type { GetCurrentAccountInputPort, InitiateGoogleAuthenticationPresenterOutputPort, User } from "@shopping-list/domain";

type CurrentAccountProviderProps = {
  getCurrentAccount: GetCurrentAccountInputPort,
}

class GoogleLoginPresenterAdapter implements InitiateGoogleAuthenticationPresenterOutputPort {
  constructor(
    private readonly setCurrentAccount: Dispatch<SetStateAction<User | undefined>>,
    private readonly navigate: NavigateFunction
  ) {}

  handleDefaultError(e: Error): void {
    console.log(e)
  }

  handleDefaultSuccess(currentAccount: User): void {
    this.setCurrentAccount(currentAccount)
    this.navigate("/listas")
  }

  handleUnauthorizedError(): void {
    console.error("Usuário não autorizado pelo backend.")
    this.navigate("/?usuario=não autorizei heheheheheheheheheheheheheheee")
  }
}

export const CurrentAccountProvider = ({ children, getCurrentAccount }: PropsWithChildren & CurrentAccountProviderProps) => {
  const [currentAccount, setCurrentAccountState] = useState<User | undefined>(undefined)
  const [isGettingCurrentAccount, setIsGettingCurrentAccount] = useState<boolean>(true)

  const navigate = useNavigate()

  const loginWithGoogle = useMemo(() => {
    return createLocalGoogleLogin(
      new GoogleLoginPresenterAdapter(
        setCurrentAccountState,
        navigate
      )
    )
  }, [navigate])
  

  const handleGetCurrentAccount = useCallback(async () => {
    setCurrentAccountState(await getCurrentAccount.perform())
    setIsGettingCurrentAccount(false)
  }, [getCurrentAccount])

  const handleLoginWithGoogle = useCallback(async () => {
    await loginWithGoogle.perform()
  }, [loginWithGoogle])

  useEffect(() => {
    handleGetCurrentAccount()
  }, [handleGetCurrentAccount])
  return (
    <CurrentAccountContext.Provider value={{
      currentAccount,
      isGettingCurrentAccount,
      loginWithGoogle: handleLoginWithGoogle
    }}>
      {children}
    </CurrentAccountContext.Provider>
  )
}