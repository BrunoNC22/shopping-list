import { ShoppingListProvider } from "@/main/providers/shopping-list/ShoppingListProvider";
import { CategoriesProvider } from "@/main/providers/categories/CategoriesProvider";
import { MobileShoppingListView } from "@/main/presentation/view/MobileShoppingListView";
import { DrawerProvider } from "@/main/providers/drawer/DrawerProvider";
import { createSyncAwareGetAllCategories } from "../usecases/category/sync-aware/SyncAwareGetAllCategoriesFactory";
import { createSyncAwareCreateCategory } from "../usecases/category/sync-aware/SyncAwareCreateCategoryFactory";
import { createSyncAwareCreateItem } from "../usecases/item/sync-aware/SyncAwareCreateItemFactory";
import { createSyncAwareEditItem } from "../usecases/item/sync-aware/SyncAwareEditItemFactory";
import { createSyncAwareGetItemListByItemListId } from "../usecases/item-list/sync-aware/SyncAwareGetItemListByItemListIdFactory";
import { createSyncAwareDeleteItem } from "../usecases/item/sync-aware/SyncAwareDeleteItemFactory";
import { createSyncAwareToggleItemIsChecked } from "../usecases/item/sync-aware/SyncAwareToggleItemIsCheckedFactory";
import { createSyncAwareGetTotalByCategory } from "../usecases/item/sync-aware/SyncAwareGetTotalByCategoryFactory";
import { createSyncAwareGetItemsByCategory } from "../usecases/item/sync-aware/SyncAwareGetItemsByCategoryFactory";
import { createLocalGetAllCategories } from "../usecases/category/local/LocalGetAllCategoriesFactory";
import { createLocalGetItemListByItemListId } from "../usecases/item-list/local/LocalGetItemListByItemListIdFactory";
import { createLocalGetTotalByCategory } from "../usecases/item/local/LocalGetTotalByCategoryFactory";
import { createLocalGetItemsByCategory } from "../usecases/item/local/LocalGetItemsByCategoryFactory";

const CreateShoppingListView = () => {
  return (
    <CategoriesProvider 
      getAllCategoriesUsecase={createSyncAwareGetAllCategories()}
      localGetAllCategories={createLocalGetAllCategories()}
      createCategoryUsecase={createSyncAwareCreateCategory()}
    >
      <ShoppingListProvider
        addItem={createSyncAwareCreateItem()}
        editItem={createSyncAwareEditItem()}
        getItemListByItemListId={createSyncAwareGetItemListByItemListId()}
        localGetItemListByItemListId={createLocalGetItemListByItemListId()}
        removeItem={createSyncAwareDeleteItem()}
        toggleIsChecked={createSyncAwareToggleItemIsChecked()}
        getTotalByCategory={createSyncAwareGetTotalByCategory()}
        localGetTotalByCategory={createLocalGetTotalByCategory()}
        getItemsByCategory={createSyncAwareGetItemsByCategory()}
        localGetItemsByCategory={createLocalGetItemsByCategory()}
      >
        <DrawerProvider>
          <MobileShoppingListView />
        </DrawerProvider>
      </ShoppingListProvider>
    </CategoriesProvider>
  );
};

export default CreateShoppingListView;
