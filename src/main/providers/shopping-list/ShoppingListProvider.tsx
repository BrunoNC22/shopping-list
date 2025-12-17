import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";
import type Item from "@/domain/models/Item";
import { ShoppingListContext } from "./ShoppingListContext";
import type LoadItemsInputPort from "@/domain/input/LoadItemsInputPort";
import type RemoveItemInputPort from "@/domain/input/RemoveItemInputPort";
import type { AddItemInputPort, AddItemProps } from "@/domain/input/AddItemInputPort";
import type { ToggleIsCheckedInputPort } from "@/domain/input/ToggleIsCheckedInputPort";
import type { GetTotalByCategoryInputPort, GetTotalByCategoryResponseItem } from "@/domain/input/GetTotalByCategoryInputPort";
import type { GetItemsByCategoryInputPort, ItemsByCategoryResponseItem } from "@/domain/input/GetItemsByCategoryInputPort";

type ShoppingListProviderProps = {
  loadItems: LoadItemsInputPort;
  removeItem: RemoveItemInputPort;
  addItem: AddItemInputPort;
  toggleIsChecked: ToggleIsCheckedInputPort;
  getTotalByCategory: GetTotalByCategoryInputPort
  getItemsByCategory: GetItemsByCategoryInputPort
};

export const ShoppingListProvider = ({
  children,
  addItem,
  loadItems,
  removeItem,
  toggleIsChecked,
  getTotalByCategory,
  getItemsByCategory
}: PropsWithChildren & ShoppingListProviderProps) => {
  const [itemList, setItemList] = useState<Item[] | null>(null);
  const [isReloading, setIsReloading] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [totalByCategory, setTotalByCategory] = useState<GetTotalByCategoryResponseItem[]>([])
  const [itemsByCategory, setItemsByCategory] = useState<ItemsByCategoryResponseItem[]>([])


  const totalValue = useMemo(() => {
    if (!itemList) return (0).toFixed(2);
    return itemList
      .reduce((acc, item) => (acc += item.price * item.amount), 0)
      .toFixed(2);
  }, [itemList]);

  const handleGetItemsByCategory = useCallback(
    async () => {
      setItemsByCategory(await getItemsByCategory.perform())
    },
    [getItemsByCategory]
  )

  const handleGetTotalByCategory = useCallback(
    async () => {
      setTotalByCategory(await getTotalByCategory.perform())
    },
    [getTotalByCategory]
  )

  const handleLoadItems = useCallback(async () => {
    if (itemList) setIsReloading(true)
    if (!itemList) setIsLoading(true)
    const items = await loadItems.perform();
    setItemList(items);
    setIsReloading(false)
    setIsLoading(false)
  }, [loadItems, itemList]);

  const handleRemoveItem = useCallback(
    async (itemId: string) => {
      await removeItem.perform({ itemId });
      await handleLoadItems();
      handleGetTotalByCategory()
      handleGetItemsByCategory()
    },
    [removeItem, handleLoadItems, handleGetTotalByCategory, handleGetItemsByCategory]
  );

  const handleAddItem = useCallback(
    async (props: AddItemProps) => {
      await addItem.perform(props);
      await handleLoadItems();
      handleGetTotalByCategory()
      handleGetItemsByCategory()
    },
    [addItem, handleLoadItems, handleGetTotalByCategory, handleGetItemsByCategory]
  );

  const handleToggleIsChecked = useCallback(
    async (itemId: string) => {
      await toggleIsChecked.perform({ itemId });
      await handleLoadItems();
    },
    [toggleIsChecked, handleLoadItems]
  );

  

  useEffect(() => {
    handleLoadItems();
    handleGetTotalByCategory()
    handleGetItemsByCategory()
    handleGetItemsByCategory()
  }, []);
  return (
    <ShoppingListContext.Provider value={{
      addItem: handleAddItem,
      removeItem: handleRemoveItem,
      loadItems: handleLoadItems,
      toggleIsChecked: handleToggleIsChecked,
      isLoading,
      isReloading,
      items: itemList,
      totalValue,
      totalByCategory,
      itemsByCategory
    }}>
      {children}
    </ShoppingListContext.Provider>
  );
};
