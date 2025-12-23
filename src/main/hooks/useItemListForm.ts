import type { CreateItemListProps } from "@/domain/input/CreateItemListInputPort"
import { useCallback, useState } from "react"

type UseItemListformProps = {
  submitFn: (props: CreateItemListProps) => Promise<void> | void
}

export const useItemListform = ({ submitFn }: UseItemListformProps) => {
  const [itemListName, setItemListName] = useState<string>("")
  const [isSubmiting, setIsSubmiting] = useState<boolean>(false)

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

    setIsSubmiting(true)
    await submitFn({ listName: itemListName })
    setIsSubmiting(false)
    resetForm()
  }, [validate, submitFn, itemListName, resetForm])

  return {itemListName, setItemListName, isSubmiting, submitForm}
}