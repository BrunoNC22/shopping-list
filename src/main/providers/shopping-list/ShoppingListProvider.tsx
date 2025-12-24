import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";
import type Item from "@/domain/models/Item";
import { ShoppingListContext } from "./ShoppingListContext";
import type RemoveItemInputPort from "@/domain/input/RemoveItemInputPort";
import type { AddItemInputPort, AddItemProps } from "@/domain/input/AddItemInputPort";
import type { ToggleIsCheckedInputPort } from "@/domain/input/ToggleIsCheckedInputPort";
import type { GetTotalByCategoryInputPort, GetTotalByCategoryResponseItem } from "@/domain/input/GetTotalByCategoryInputPort";
import type { GetItemsByCategoryInputPort, ItemsByCategoryResponseItem } from "@/domain/input/GetItemsByCategoryInputPort";
import { useParams } from "react-router";
import type { GetItemListByItemListId } from "@/domain/usecases/GetItemListByItemListId";

type ShoppingListProviderProps = {
  getItemListByItemListId: GetItemListByItemListId;
  removeItem: RemoveItemInputPort;
  addItem: AddItemInputPort;
  toggleIsChecked: ToggleIsCheckedInputPort;
  getTotalByCategory: GetTotalByCategoryInputPort
  getItemsByCategory: GetItemsByCategoryInputPort
};

export const ShoppingListProvider = ({
  children,
  addItem,
  getItemListByItemListId,
  removeItem,
  toggleIsChecked,
  getTotalByCategory,
  getItemsByCategory
}: PropsWithChildren & ShoppingListProviderProps) => {
  const { listId } = useParams()
  const [itemList, setItemList] = useState<Readonly<Item[]> | null>(null);
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
      if (!listId) return
      setItemsByCategory(await getItemsByCategory.perform({ itemListId: listId }))
    },
    [getItemsByCategory, listId]
  )

  const handleGetTotalByCategory = useCallback(
    async () => {
      setTotalByCategory(await getTotalByCategory.perform())
    },
    [getTotalByCategory]
  )

  const handleGetItemListByItemListId = useCallback(async () => {
    if (!listId) throw new Error("list id must be not nullish.")

    if (itemList) setIsReloading(true)
    if (!itemList) setIsLoading(true)
    const items = await getItemListByItemListId.perform({ itemListId: listId });
    setItemList(items.getItems());
    setIsReloading(false)
    setIsLoading(false)
  }, [getItemListByItemListId, itemList, listId]);

  const handleRemoveItem = useCallback(
    async (itemId: string) => {
      await removeItem.perform({ itemId });
      await handleGetItemListByItemListId();
      handleGetTotalByCategory()
      handleGetItemsByCategory()
    },
    [removeItem, handleGetItemListByItemListId, handleGetTotalByCategory, handleGetItemsByCategory]
  );

  const handleAddItem = useCallback(
    async (props: Omit<AddItemProps, 'itemListId'>) => {
      if (!listId) return
      await addItem.perform({
        amount: props.amount,
        categoryId: props.categoryId,
        itemListId: listId,
        name: props.name,
        price: props.price
      });
      await handleGetItemListByItemListId();
      handleGetTotalByCategory()
      handleGetItemsByCategory()
    },
    [addItem, handleGetItemListByItemListId, handleGetTotalByCategory, handleGetItemsByCategory, listId]
  );

  const handleToggleIsChecked = useCallback(
    async (itemId: string) => {
      await toggleIsChecked.perform({ itemId });
      await handleGetItemListByItemListId();
    },
    [toggleIsChecked, handleGetItemListByItemListId]
  );

  

  useEffect(() => {
    handleGetItemListByItemListId();
    handleGetTotalByCategory()
    handleGetItemsByCategory()
    handleGetItemsByCategory()
  }, []);
  return (
    <ShoppingListContext.Provider value={{
      addItem: handleAddItem,
      removeItem: handleRemoveItem,
      getItemListByItemListId: handleGetItemListByItemListId,
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
