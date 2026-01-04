import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { CreateItemListProps } from "@/domain/input/CreateItemListInputPort"
import type ItemList from "@/domain/models/ItemList"
import { useItemListform } from "@/main/hooks/useItemListForm"
import { Plus } from "lucide-react"
import { useMemo } from "react"

type ItemListFormProps = {
  onSubmit: (props: CreateItemListProps) => Promise<void>
  defaultItemList?: ItemList
}

export const ItemListForm = ({ onSubmit, defaultItemList }: ItemListFormProps) => {
  const isEditing = useMemo(() => !!defaultItemList, [defaultItemList])
  const {
    isSubmiting,
    itemListName,
    setItemListName,
    submitForm
  } = useItemListform({ 
    submitFn: onSubmit,
    itemListName: defaultItemList?.name
  })
  return (
    <div className="p-4 h-[300px] flex flex-col justify-between">
      <div className="flex flex-col gap-1">
        <Label htmlFor="shopping-list-name-input">Nome da lista</Label>
        <Input
          id="shopping-list-name-input"
          placeholder="Compras da semana"
          type="text"
          maxLength={100}
          max={100}
          min={1}
          minLength={1}
          value={itemListName}
          onChange={(e) => setItemListName(e.target.value)}
        />
      </div>
      <Button
        className="mx-auto"
        onClick={() => submitForm()}
        disabled={isSubmiting}
      >
        <Plus />
        {isEditing ? "Salvar" : "Adicionar"}
      </Button>
    </div>
  )
}
