import { createLocalDeleteItem } from "../usecases/item/LocalDeleteItemFactory";
import { createCreateItem } from "../usecases/item/LocalCreateItemFactory";
import { createLocalToggleItemIsChecked } from "../usecases/item/LocalToggleItemIsCheckedFactory";
import { ShoppingListProvider } from "@/main/providers/shopping-list/ShoppingListProvider";
import { CategoriesProvider } from "@/main/providers/categories/CategoriesProvider";
import { createLocalGetAllCategories } from "../usecases/category/LocalGetAllCategoriesFactory";
import { createLocalGetTotalByCategory } from "../usecases/item-list/LocalGetTotalByCategoryFactory";
import { MobileShoppingListView } from "@/main/presentation/view/MobileShoppingListView";
import { createLocalGetItemsByCategory } from "../usecases/item/LocalGetItemsByCategoryFactory";
import { createLocalGetItemListByItemListId } from "../usecases/item-list/LocalGetItemListByItemListIdFactory";
import { DrawerProvider } from "@/main/providers/drawer/DrawerProvider";
import { createLocalCreateCategoryFactory } from "../usecases/category/LocalCreateCategoryFactory";
import { createLocalEditItemFactory } from "../usecases/item/LocalEditItemFactory";

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
