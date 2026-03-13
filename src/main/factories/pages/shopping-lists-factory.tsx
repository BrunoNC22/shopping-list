import { ItemListsProvider } from "@/main/providers/item-list/ItemListsProvider"
import { MobileHome } from "@/main/presentation/view/MobileHome"
import { DrawerProvider } from "@/main/providers/drawer/DrawerProvider"
import { createSyncAwareCreateItemList } from "../usecases/item-list/sync-aware/SyncAwareCreateItemListFactory"
import { createSyncAwareGetAllItemLists } from "../usecases/item-list/sync-aware/SyncAwareGetAllItemListsFactory"
import { createSyncAwareDeleteItemList } from "../usecases/item-list/sync-aware/SyncAwareDeleteItemListFactory"
import { createSyncAwareEditItemList } from "../usecases/item-list/sync-aware/SyncAwareEditItemListFactory"
import { createLocalGetAllItemLists } from "../usecases/item-list/local/LocalGetAllItemListsFactory"

export const ShoppingListsFactory = () => {
  return (
    <ItemListsProvider 
      createItemList={createSyncAwareCreateItemList()} 
      getItemLists={createSyncAwareGetAllItemLists()}
      localGetItemLists={createLocalGetAllItemLists()}
      deleteItemList={createSyncAwareDeleteItemList()}
      editItemList={createSyncAwareEditItemList()}
    >
      <DrawerProvider>
        <MobileHome />
      </DrawerProvider>
    </ItemListsProvider>
  )
}