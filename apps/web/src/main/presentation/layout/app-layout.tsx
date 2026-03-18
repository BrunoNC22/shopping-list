import { Outlet } from "react-router"
import { Header } from "../header/header"

export const AppLayout = () => {
  return (
    <div className="relative flex h-screen w-full flex-col text-white">
      <Header headerTitle="Teste"/>
      <Outlet />
    </div>
  )
}