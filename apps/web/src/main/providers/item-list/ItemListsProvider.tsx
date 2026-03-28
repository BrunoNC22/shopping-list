import { useCallback, useEffect, useState, type PropsWithChildren } from "react"
import { ItemListsContext } from "./ItemListsContext"
import type { CreateItemListInputPort, CreateItemListProps, DeleteItemListInputPort, DeleteItemListProps, EditItemListInputPort, EditItemListProps, GetItemListsInputPort, ItemList, ReplaceItemListsInputPort } from "@shopping-list/domain"
import { useCurrentAccount } from "../current-account/CurrentAccountContext"
import { useNavigate } from "react-router"

type ItemListsProviderProps = {
  remoteGetItemLists: GetItemListsInputPort
  localGetItemLists: GetItemListsInputPort,
  createItemList: CreateItemListInputPort
  deleteItemList: DeleteItemListInputPort
  editItemList: EditItemListInputPort
  localReplaceItemLists: ReplaceItemListsInputPort
}

export const ItemListsProvider = ({
  children,
  createItemList,
  remoteGetItemLists,
  deleteItemList,
  editItemList,
  localGetItemLists,
  localReplaceItemLists
}: PropsWithChildren & ItemListsProviderProps) => {
  const [itemLists, setItemLists] = useState<ItemList[]>([])

  const { currentAccount, isGettingCurrentAccount } = useCurrentAccount()
  let navigate = useNavigate()

  const handleGetItemLists = useCallback(async () => {
    if (!isGettingCurrentAccount && !currentAccount) {
      navigate("/")
      console.error("Usuário não autenticado.")
    } else if (!isGettingCurrentAccount && currentAccount) {
      setItemLists(await localGetItemLists.perform({ userId: currentAccount.id }))
    }
  }, [localGetItemLists, remoteGetItemLists, isGettingCurrentAccount, currentAccount])

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

  const syncItemLists = useCallback(async (userId: string) => {
    const remoteItems = await remoteGetItemLists.perform({ userId })
    await localReplaceItemLists.perform({ userId, itemLists: remoteItems })
  }, [remoteGetItemLists, localReplaceItemLists])
  
  useEffect(() => {
    if (!isGettingCurrentAccount && !currentAccount) {
      navigate("/")
      console.error("Usuário não autenticado.")
    } else if (!isGettingCurrentAccount && currentAccount) {
      syncItemLists(currentAccount.id)
      handleGetItemLists()
    }
  }, [isGettingCurrentAccount])

  useEffect(() => {
    const interval = setInterval(async () => {
      if (!isGettingCurrentAccount && !currentAccount) {
        console.error("Usuário não autenticado.")
        return navigate("/")
      } else if (!isGettingCurrentAccount && currentAccount) {
        await syncItemLists(currentAccount.id)
        handleGetItemLists()
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [isGettingCurrentAccount, currentAccount, handleGetItemLists, syncItemLists])
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