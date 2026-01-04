import { useCallback, useEffect, useState, type PropsWithChildren } from "react"
import { ItemListsContext } from "./ItemListsContext"
import type { GetItemListsInputPort } from "@/domain/input/GetItemListsInputPort"
import type { CreateItemListInputPort, CreateItemListProps } from "@/domain/input/CreateItemListInputPort"
import type ItemList from "@/domain/models/ItemList"
import type { DeleteItemListInputPort, DeleteItemListProps } from "@/domain/input/DeleteItemListInputPort"
import type { EditItemListInputPort, EditItemListProps } from "@/domain/input/EditItemListInputPort"

type ItemListsProviderProps = {
  getItemLists: GetItemListsInputPort
  createItemList: CreateItemListInputPort
  deleteItemList: DeleteItemListInputPort
  editItemList: EditItemListInputPort
}

export const ItemListsProvider = ({ children, createItemList, getItemLists, deleteItemList, editItemList }: PropsWithChildren & ItemListsProviderProps) => {
  const [itemLists, setItemLists] = useState<ItemList[]>([])

  const handleGetItemLists = useCallback(async () => {
    setItemLists(await getItemLists.perform())
  }, [getItemLists])

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