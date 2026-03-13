import { createLocalDeleteItem } from "../usecases/item/local/LocalDeleteItemFactory";
import { createCreateItem } from "../usecases/item/local/LocalCreateItemFactory";
import { createLocalToggleItemIsChecked } from "../usecases/item/local/LocalToggleItemIsCheckedFactory";
import { ShoppingListProvider } from "@/main/providers/shopping-list/ShoppingListProvider";
import { CategoriesProvider } from "@/main/providers/categories/CategoriesProvider";
import { createLocalGetAllCategories } from "../usecases/category/local/LocalGetAllCategoriesFactory";
import { createLocalGetTotalByCategory } from "../usecases/item/local/LocalGetTotalByCategoryFactory";
import { MobileShoppingListView } from "@/main/presentation/view/MobileShoppingListView";
import { createLocalGetItemsByCategory } from "../usecases/item/local/LocalGetItemsByCategoryFactory";
import { createLocalGetItemListByItemListId } from "../usecases/item-list/local/LocalGetItemListByItemListIdFactory";
import { DrawerProvider } from "@/main/providers/drawer/DrawerProvider";
import { createLocalCreateCategoryFactory } from "../usecases/category/local/LocalCreateCategoryFactory";
import { createLocalEditItemFactory } from "../usecases/item/local/LocalEditItemFactory";

const CreateShoppingListView = () => {
  return (
    <CategoriesProvider 
      getAllCategoriesUsecase={createLocalGetAllCategories()}
      createCategoryUsecase={createLocalCreateCategoryFactory()}
    >
      <ShoppingListProvider
        addItem={createCreateItem()}
        editItem={createLocalEditItemFactory()}
        getItemListByItemListId={createLocalGetItemListByItemListId()}
        removeItem={createLocalDeleteItem()}
        toggleIsChecked={createLocalToggleItemIsChecked()}
        getTotalByCategory={createLocalGetTotalByCategory()}
        getItemsByCategory={createLocalGetItemsByCategory()}
      >
        <DrawerProvider>
          <MobileShoppingListView />
        </DrawerProvider>
      </ShoppingListProvider>
    </CategoriesProvider>
  );
};

export default CreateShoppingListView;
