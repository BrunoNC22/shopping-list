import { createLocalRemoveItem } from "../usecases/LocalRemoveItemFactory";
import { createLocalAddItem } from "../usecases/LocalAddItemFactory";
import { createLocalToggleIsChecked } from "../usecases/LocalToggleIsCheckedFactory";
import ShoppingListView from "@/main/presentation/view/ShoppingListView";
import { ShoppingListProvider } from "@/main/providers/shopping-list/ShoppingListProvider";
import { CategoriesProvider } from "@/main/providers/categories/CategoriesProvider";
import { createLocalGetAllCategories } from "../usecases/LocalGetAllCategoriesFactory";
import { createLocalGetTotalByCategory } from "../usecases/LocalGetTotalByCategoryFactory";
import { useEffect, useState } from "react";
import { MobileShoppingListView } from "@/main/presentation/view/MobileShoppingListView";
import { createLocalGetItemsByCategory } from "../usecases/LocalGetItemsByCategoryFactory";
import { createLocalGetItemListByItemListId } from "../usecases/LocalGetItemListByItemListIdFactory";
import { DrawerProvider } from "@/main/providers/drawer/DrawerProvider";

const CreateShoppingListView = () => {

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 768);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <CategoriesProvider getAllCategoriesUsecase={createLocalGetAllCategories()}>
      <ShoppingListProvider
        addItem={createLocalAddItem()}
        getItemListByItemListId={createLocalGetItemListByItemListId()}
        removeItem={createLocalRemoveItem()}
        toggleIsChecked={createLocalToggleIsChecked()}
        getTotalByCategory={createLocalGetTotalByCategory()}
        getItemsByCategory={createLocalGetItemsByCategory()}
      >
        <DrawerProvider>
          {isMobile ? <MobileShoppingListView /> : <ShoppingListView />}
        </DrawerProvider>
      </ShoppingListProvider>
    </CategoriesProvider>
  );
};

export default CreateShoppingListView;
