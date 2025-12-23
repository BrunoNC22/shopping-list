import { ItemListsProvider } from "@/main/providers/item-list/ItemListsProvider"
import { createLocalCreateItemListFactory } from "../usecases/LocalCreateItemListFactory"
import { createLocalGetAllItemLists } from "../usecases/LocalGetAllItemListsFactory"
import { MobileHome } from "@/main/presentation/view/MobileHome"

export const CreateHomePageFactory = () => {
  return (
    <ItemListsProvider createItemList={createLocalCreateItemListFactory()} getItemLists={createLocalGetAllItemLists()}>
      <MobileHome />
    </ItemListsProvider>
  )
}