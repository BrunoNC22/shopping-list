import { useCallback, useEffect, useState, type PropsWithChildren } from "react"
import { ItemListsContext } from "./ItemListsContext"
import type { CreateItemListInputPort, CreateItemListProps, DeleteItemListInputPort, DeleteItemListProps, EditItemListInputPort, EditItemListProps, GetItemListsInputPort, ItemList } from "@shopping-list/domain"

type ItemListsProviderProps = {
  getItemLists: GetItemListsInputPort
  localGetItemLists: GetItemListsInputPort,
  createItemList: CreateItemListInputPort
  deleteItemList: DeleteItemListInputPort
  editItemList: EditItemListInputPort
}

export const ItemListsProvider = ({
  children,
  createItemList,
  getItemLists,
  deleteItemList,
  editItemList,
  localGetItemLists
}: PropsWithChildren & ItemListsProviderProps) => {
  const [itemLists, setItemLists] = useState<ItemList[]>([])

  const handleGetItemLists = useCallback(async () => {
    setItemLists(await localGetItemLists.perform())

    getItemLists
      .perform()
      .then(result => {
        setItemLists(result)
      })
  }, [localGetItemLists, getItemLists])

  const handleCreateItemList = useCallback(async (props: CreateItemListProps) => {
    await createItemList.perform(props)
    handleGetItemLists() 
  }, [createItemList, handleGetItemLists])

  const handleDeleteItemList = useCallback(async (props: DeleteItemListProps) => {
    await deleteItemList.perform(props)
    handleGetItemLists()
  }, [deleteItemList, handleGetItemLists])

  const handleEditItemList = useCallback(async (props: EditItemListProps) => {
    await editItemList.perform(props)
    handleGetItemLists()
  }, [editItemList, handleGetItemLists])
  
  useEffect(() => {
    handleGetItemLists()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      getItemLists
        .perform()
        .then(result => {
          setItemLists(result)
        })
    }, 5000)

    return () => clearInterval(interval)
  }, [])
  return (
    <ItemListsContext.Provider value={{
      createItemList: handleCreateItemList,
      itemLists,
      deleteItemList: handleDeleteItemList,
      editItemList: handleEditItemList
    }}>
      {children}
    </ItemListsContext.Provider>
  )
}