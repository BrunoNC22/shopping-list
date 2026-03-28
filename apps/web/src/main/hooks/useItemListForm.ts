import type { CreateItemListProps } from "@shopping-list/domain"
import { useCallback, useState } from "react"
import { useCurrentAccount } from "../providers/current-account/CurrentAccountContext"
import { useNavigate } from "react-router"

type UseItemListformProps = {
  submitFn: (props: CreateItemListProps) => Promise<void> | void,
  itemListName?: string
}

export const useItemListform = ({ submitFn, itemListName: defaultItemListName }: UseItemListformProps) => {
  const [itemListName, setItemListName] = useState<string>(defaultItemListName ?? "")
  const [isSubmiting, setIsSubmiting] = useState<boolean>(false)

  const { currentAccount } = useCurrentAccount()
  const navigate = useNavigate()

  const resetForm = useCallback(() => {
    setItemListName("")
  }, [])

  const validate = useCallback(() => {
    if (!itemListName) return false
    if (typeof itemListName !== 'string') return false

    return true
  }, [itemListName])

  const submitForm = useCallback(async () => {
    if (!validate()) return
    if (!currentAccount) return await navigate("/")
    
    setIsSubmiting(true)
    await submitFn({ listName: itemListName, userId: currentAccount.id })
    setIsSubmiting(false)
    resetForm()
  }, [validate, submitFn, itemListName, resetForm])

  return {itemListName, setItemListName, isSubmiting, submitForm}
}