import { CurrentAccountProvider } from "@/main/providers/current-account/CurrentAccountProvider"
import { createLocalGetCurrentAccount } from "../usecases/current-account/LocalGetCurrentAccountFactory"
import { AppLayout } from "@/main/presentation/layout/app-layout"

export const CreateAppLayout = () => {
  return (
    <CurrentAccountProvider
      getCurrentAccount={createLocalGetCurrentAccount()}
    >
      <AppLayout />
    </CurrentAccountProvider>
  )
}