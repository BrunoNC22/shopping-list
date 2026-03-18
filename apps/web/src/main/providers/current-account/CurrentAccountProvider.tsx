import { useCallback, useEffect, useMemo, useState, type Dispatch, type PropsWithChildren, type SetStateAction } from "react"
import { CurrentAccountContext } from "./CurrentAccountContext"
import { createLocalGoogleLogin } from "@/main/factories/usecases/auth/LocalGoogleLoginFactory"
import { useNavigate, type NavigateFunction } from "react-router";
import type { CurrentAccount, GetCurrentAccountInputPort, InitiateGoogleAuthenticationPresenterOutputPort } from "@shopping-list/domain";

type CurrentAccountProviderProps = {
  getCurrentAccount: GetCurrentAccountInputPort,
}

class GoogleLoginPresenterAdapter implements InitiateGoogleAuthenticationPresenterOutputPort {
  constructor(
    private readonly setCurrentAccount: Dispatch<SetStateAction<CurrentAccount | undefined>>,
    private readonly navigate: NavigateFunction
  ) {}

  handleDefaultError(e: Error): void {
    console.log(e)
  }

  handleDefaultSuccess(currentAccount: CurrentAccount): void {
    this.setCurrentAccount(currentAccount)
    this.navigate("/listas")
  }

  handleUnauthorizedError(): void {
    console.log("Usuário não autorizado pelo backend.")
    this.navigate("/listas?usuario=não autorizei heheheheheheheheheheheheheheee")
  }
}

export const CurrentAccountProvider = ({ children, getCurrentAccount }: PropsWithChildren & CurrentAccountProviderProps) => {
  const [currentAccount, setCurrentAccountState] = useState<CurrentAccount | undefined>(undefined)

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
      loginWithGoogle: handleLoginWithGoogle
    }}>
      {children}
    </CurrentAccountContext.Provider>
  )
}