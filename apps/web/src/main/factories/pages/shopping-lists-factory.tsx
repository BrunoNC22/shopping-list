import { ItemListsProvider } from "@/main/providers/item-list/ItemListsProvider"
import { MobileHome } from "@/main/presentation/view/MobileHome"
import { DrawerProvider } from "@/main/providers/drawer/DrawerProvider"
import { createSyncAwareCreateItemList } from "../usecases/item-list/sync-aware/SyncAwareCreateItemListFactory"
import { createSyncAwareDeleteItemList } from "../usecases/item-list/sync-aware/SyncAwareDeleteItemListFactory"
import { createSyncAwareEditItemList } from "../usecases/item-list/sync-aware/SyncAwareEditItemListFactory"
import { createLocalGetAllItemLists } from "../usecases/item-list/local/LocalGetAllItemListsFactory"
import { createLocalReplaceItemLists } from "../usecases/item-list/local/LocalReplaceItemListsFactory"
import { createRemoteGetAllItemLists } from "../usecases/item-list/remote/RemoteGetAllItemListsFactory"

export const ShoppingListsFactory = () => {
  return (
    <ItemListsProvider 
      createItemList={createSyncAwareCreateItemList()}
      localReplaceItemLists={createLocalReplaceItemLists()}
      remoteGetItemLists={createRemoteGetAllItemLists()}
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