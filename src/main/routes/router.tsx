import { BrowserRouter, Route, Routes } from "react-router"
import CreateShoppingListView from "../factories/pages/shopping-list-factory"
import { CreateHomePageFactory } from "../factories/pages/home-page-factory"

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CreateHomePageFactory />} />
        <Route path="listas/:listId" element={<CreateShoppingListView />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router