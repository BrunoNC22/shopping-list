import { createLocalLoadItems } from "../usecases/LocalLoadItemsFactory";
import { createLocalRemoveItem } from "../usecases/LocalRemoveItemFactory";
import { createLocalAddItem } from "../usecases/LocalAddItemFactory";
import { createLocalToggleIsChecked } from "../usecases/LocalToggleIsCheckedFactory";
import ShoppingListView from "@/main/presentation/view/ShoppingListView";
import { ShoppingListProvider } from "@/main/providers/shopping-list/ShoppingListProvider";
import { CategoriesProvider } from "@/main/providers/categories/CategoriesProvider";
import { createLocalGetAllCategories } from "../usecases/LocalGetAllCategoriesFactory";
import { createLocalGetTotalByCategory } from "../usecases/LocalGetTotalByCategoryFactory";

const CreateShoppingListView = () => {
  return (
    <CategoriesProvider getAllCategoriesUsecase={createLocalGetAllCategories()}>
      <ShoppingListProvider
        addItem={createLocalAddItem()}
        loadItems={createLocalLoadItems()}
        removeItem={createLocalRemoveItem()}
        toggleIsChecked={createLocalToggleIsChecked()}
        getTotalByCategory={createLocalGetTotalByCategory()}
      >
        <ShoppingListView />
      </ShoppingListProvider>
    </CategoriesProvider>
  );
};

export default CreateShoppingListView;
