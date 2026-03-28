import { ShoppingListProvider } from "@/main/providers/shopping-list/ShoppingListProvider";
import { CategoriesProvider } from "@/main/providers/categories/CategoriesProvider";
import { MobileShoppingListView } from "@/main/presentation/view/MobileShoppingListView";
import { DrawerProvider } from "@/main/providers/drawer/DrawerProvider";
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
import { createRemoteGetAllCategories } from "../usecases/category/remote/RemoteGetAllCategoriesFactory";
import { createLocalReplaceCategories } from "../usecases/category/local/LocalReplaceCategoriesFactory";
import { createLocalReplaceItems } from "../usecases/item/local/LocalReplaceItemsFactory";
import { createRemoteGetItems } from "../usecases/item/remote/RemoteGetItemsFactory";

const CreateShoppingListView = () => {
  return (
    <CategoriesProvider 
      localGetAllCategories={createLocalGetAllCategories()}
      createCategoryUsecase={createSyncAwareCreateCategory()}
      remoteGetAllCategoriesUsecase={createRemoteGetAllCategories()}
      replaceCategoriesUsecase={createLocalReplaceCategories()}
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
        localReplaceitems={createLocalReplaceItems()}
        remoteGetItems={createRemoteGetItems()}
      >
        <DrawerProvider>
          <MobileShoppingListView />
        </DrawerProvider>
      </ShoppingListProvider>
    </CategoriesProvider>
  );
};

export default CreateShoppingListView;
