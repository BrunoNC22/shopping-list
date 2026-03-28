import { CurrentAccountProvider } from "@/main/providers/current-account/CurrentAccountProvider"
import { createLocalGetCurrentAccount } from "../usecases/current-account/LocalGetCurrentAccountFactory"
import { AppLayout } from "@/main/presentation/layout/app-layout"
import { HeaderProvider } from "@/main/providers/header/HeaderProvider"

export const CreateAppLayout = () => {
  return (
    <HeaderProvider>
      <CurrentAccountProvider
        getCurrentAccount={createLocalGetCurrentAccount()}
      >
        <AppLayout />
      </CurrentAccountProvider>
    </HeaderProvider>
  )
}