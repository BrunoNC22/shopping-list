import { BrowserRouter, Route, Routes } from "react-router"
import CreateShoppingListView from "../factories/pages/shopping-list-factory"

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CreateShoppingListView />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router