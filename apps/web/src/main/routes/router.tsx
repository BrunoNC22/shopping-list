import { BrowserRouter, Route, Routes } from "react-router"
import CreateShoppingListView from "../factories/pages/shopping-list-factory"
import { CreateHomePageFactory } from "../factories/pages/home-page-factory"
import { CreateLoginPage } from "../factories/pages/login-page-factory"
import { ShoppingListsFactory } from "../factories/pages/shopping-lists-factory"
import { CreateAppLayout } from "../factories/pages/app-layout-factory"

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<CreateAppLayout />}>
          <Route path="listas" element={<ShoppingListsFactory />} />
          <Route path="listas/:listId" element={<CreateShoppingListView />} />
          <Route path="/" element={<CreateHomePageFactory />} />
        </Route>
        <Route path="login" element={<CreateLoginPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router