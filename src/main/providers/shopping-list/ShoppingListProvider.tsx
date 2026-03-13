import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";
import type Item from "@/domain/models/Item";
import { ShoppingListContext } from "./ShoppingListContext";
import type RemoveItemInputPort from "@/domain/input/DeleteItemInputPort";
import type { CreateItemInputPort, CreateItemProps } from "@/domain/input/CreateItemInputPort";
import type { ToggleItemIsCheckedInputPort } from "@/domain/input/ToggleItemIsCheckedInputPort";
import type { GetTotalByCategoryInputPort, GetTotalByCategoryResponseItem } from "@/domain/input/GetTotalByCategoryInputPort";
import type { GetItemsByCategoryInputPort, ItemsByCategoryResponseItem } from "@/domain/input/GetItemsByCategoryInputPort";
import { useParams } from "react-router";
import type { EditIntemInputPort, EditItemProps } from "@/domain/input/EditItemInputPort";
import type { GetItemListByItemListIdInputPort } from "@/domain/input/GetItemListByItemListIdInputPort";

type ShoppingListProviderProps = {
  getItemListByItemListId: GetItemListByItemListIdInputPort;
  localGetItemListByItemListId: GetItemListByItemListIdInputPort;
  removeItem: RemoveItemInputPort;
  addItem: CreateItemInputPort;
  toggleIsChecked: ToggleItemIsCheckedInputPort;
  getTotalByCategory: GetTotalByCategoryInputPort;
  localGetTotalByCategory: GetTotalByCategoryInputPort
  getItemsByCategory: GetItemsByCategoryInputPort
  localGetItemsByCategory: GetItemsByCategoryInputPort
  editItem: EditIntemInputPort
};

export const ShoppingListProvider = ({
  children,
  addItem,
  getItemListByItemListId,
  localGetItemListByItemListId,
  removeItem,
  toggleIsChecked,
  getTotalByCategory,
  localGetTotalByCategory,
  getItemsByCategory,
  localGetItemsByCategory,
  editItem
}: PropsWithChildren & ShoppingListProviderProps) => {
  const { listId } = useParams()
  const [itemList, setItemList] = useState<Readonly<Item[]> | null>(null);
  const [isReloading, setIsReloading] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [totalByCategory, setTotalByCategory] = useState<GetTotalByCategoryResponseItem[]>([])
  const [itemsByCategory, setItemsByCategory] = useState<ItemsByCategoryResponseItem[]>([])
  const [shoppingListName, setShoppingListName] = useState<string>("")


  const totalValue = useMemo(() => {
    if (!itemList) return (0).toFixed(2);
    return itemList
      .reduce((acc, item) => (acc += item.price * item.amount), 0)
      .toFixed(2);
  }, [itemList]);

  const handleGetItemsByCategory = useCallback(
    async () => {
      if (!listId) return
      setItemsByCategory(await localGetItemsByCategory.perform({ itemListId: listId }))
      getItemsByCategory.perform({ itemListId: listId })
        .then(result => setItemsByCategory(result))
    },
    [getItemsByCategory, localGetItemsByCategory, listId]
  )

  const handleGetTotalByCategory = useCallback(
    async () => {
      if (!listId) return
      setTotalByCategory(await localGetTotalByCategory.perform({ itemListId: listId }))
      getTotalByCategory.perform({ itemListId: listId })
        .then(result => setTotalByCategory(result))
    },
    [getTotalByCategory, localGetTotalByCategory, listId]
  )

  const handleGetItemListByItemListId = useCallback(async () => {
    if (!listId) throw new Error("list id must be not nullish.")

    if (itemList) setIsReloading(true)
    if (!itemList) setIsLoading(true)

    const localItems = await localGetItemListByItemListId.perform({ itemListId: listId })
    setShoppingListName(localItems.name)
    setItemList(localItems.getItems());

    getItemListByItemListId.perform({ itemListId: listId })
      .then(result => {
        setShoppingListName(result.name)
        setItemList(result.getItems());
      })
    setIsReloading(false)
    setIsLoading(false)
  }, [getItemListByItemListId, localGetItemListByItemListId, itemList, listId]);

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
    async (props: Omit<CreateItemProps, 'itemListId'>) => {
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
      handleGetItemListByItemListId();
      handleGetItemsByCategory()
    },
    [toggleIsChecked, handleGetItemListByItemListId, handleGetItemsByCategory]
  );

  const handleEditItem = useCallback(
    async (props: EditItemProps) => {
      await editItem.perform(props)
      handleGetItemListByItemListId();
      handleGetItemsByCategory()
    },
    [editItem, handleGetItemListByItemListId, handleGetItemsByCategory]
  )

  useEffect(() => {
    handleGetItemListByItemListId();
    handleGetTotalByCategory()
    handleGetItemsByCategory()
  }, []);
  return (
    <ShoppingListContext.Provider value={{
      addItem: handleAddItem,
      editItem: handleEditItem,
      removeItem: handleRemoveItem,
      getItemListByItemListId: handleGetItemListByItemListId,
      toggleIsChecked: handleToggleIsChecked,
      isLoading,
      isReloading,
      items: itemList,
      totalValue,
      totalByCategory,
      itemsByCategory,
      shoppingListName
    }}>
      {children}
    </ShoppingListContext.Provider>
  );
};
