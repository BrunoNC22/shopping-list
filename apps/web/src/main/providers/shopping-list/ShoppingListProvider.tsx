import type { CreateItemInputPort, CreateItemProps, DeleteItemInputPort, EditIntemInputPort, EditItemProps, GetItemListByItemListIdInputPort, GetItemsByCategoryInputPort, GetItemsInputPort, GetTotalByCategoryInputPort, GetTotalByCategoryResponseItem, Item, ItemsByCategoryResponseItem, ReplaceItemsInputPort, ToggleItemIsCheckedInputPort } from "@shopping-list/domain";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";
import { useParams } from "react-router";
import { ShoppingListContext } from "./ShoppingListContext";

type ShoppingListProviderProps = {
  getItemListByItemListId: GetItemListByItemListIdInputPort;
  remoteGetItems: GetItemsInputPort
  localReplaceitems: ReplaceItemsInputPort
  localGetItemListByItemListId: GetItemListByItemListIdInputPort;
  removeItem: DeleteItemInputPort;
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
  remoteGetItems,
  localReplaceitems,
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
    [localGetItemsByCategory, getItemsByCategory, listId]
  )

  const handleGetTotalByCategory = useCallback(
    async () => {
      if (!listId) return
      setTotalByCategory(await localGetTotalByCategory.perform({ itemListId: listId }))

      getTotalByCategory.perform({ itemListId: listId })
        .then(result => setTotalByCategory(result))
    },
    [localGetTotalByCategory, getTotalByCategory, listId]
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
  }, [localGetItemListByItemListId, getItemListByItemListId, itemList, listId]);

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

  const syncItems = useCallback(async () => {
      if (!listId) return
      const remoteItems = await remoteGetItems.perform({ itemListId: listId })
      await localReplaceitems.perform({ itemListId: listId, items: remoteItems })
    }, [listId, remoteGetItems, localReplaceitems])

  useEffect(() => {
    handleGetItemListByItemListId();
    handleGetTotalByCategory()
    handleGetItemsByCategory()
  }, []);

  useEffect(() => {
    syncItems()
  }, [listId])

  useEffect(() => {
    const interval = setInterval(async () => {
      await syncItems()
      if (!listId) return
      getItemListByItemListId
        .perform({ itemListId: listId })
        .then(result => {
          setShoppingListName(result.name)
          setItemList(result.getItems());
        })
      
      getItemsByCategory
        .perform({ itemListId: listId })
        .then(result => setItemsByCategory(result))

      getTotalByCategory
        .perform({ itemListId: listId })
        .then(result => setTotalByCategory(result))
    }, 5000)

    return () => clearInterval(interval)
  }, [listId])
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
