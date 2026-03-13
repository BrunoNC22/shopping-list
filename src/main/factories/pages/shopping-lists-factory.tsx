import { ItemListsProvider } from "@/main/providers/item-list/ItemListsProvider"
import { createLocalCreateItemListFactory } from "../usecases/item-list/local/LocalCreateItemListFactory"
import { createLocalGetAllItemLists } from "../usecases/item-list/local/LocalGetAllItemListsFactory"
import { MobileHome } from "@/main/presentation/view/MobileHome"
import { createLocalDeleteItemListFactory } from "../usecases/item-list/local/LocalDeleteItemListFactory"
import { createLocalEditItemListFactory } from "../usecases/item-list/local/LocalEditItemListFactory"
import { DrawerProvider } from "@/main/providers/drawer/DrawerProvider"

export const ShoppingListsFactory = () => {
  return (
    <ItemListsProvider 
      createItemList={createLocalCreateItemListFactory()} 
      getItemLists={createLocalGetAllItemLists()}
      deleteItemList={createLocalDeleteItemListFactory()}
      editItemList={createLocalEditItemListFactory()}
    >
      <DrawerProvider>
        <MobileHome />
      </DrawerProvider>
    </ItemListsProvider>
  )
}