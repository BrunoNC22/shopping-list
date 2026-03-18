import { Loader2, Plus } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useCategories } from "@/main/providers/categories/CategoriesContext";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useItemForm, type FormItem } from "@/main/hooks/useItemForm";


type ItemFormProps = {
  onSubmit: (formItem: FormItem) => Promise<unknown> | unknown;
};

export const ItemForm = ({ onSubmit }: ItemFormProps) => {
  const {
    itemAmount,
    setItemAmount,
    itemName,
    setItemName,
    itemValue,
    setItemValue,
    submitItem,
    isSubmitting,
    categoryId,
    setCategoryId
  } = useItemForm({ onSubmit })

  const { categories } = useCategories()

  return (
    <>
      <div className="flex gap-3 py-3 items-end">
        <div className="grid grow-1 gap-2">
          <Label htmlFor="item-name-input">Nome</Label>
          <Input
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            id="item-name-input"
            type="text"
            maxLength={50}
            min={1}
          />
        </div>
        <div className="grid gap-2 w-[15%]">
          <Label htmlFor="item-value-input">Valor em R$</Label>
          <Input
            value={itemValue}
            onChange={(e) => setItemValue(e.target.value)}
            id="item-value-input"
            type="number"
            min={0}
            step={1}
          />
        </div>
        <div className="grid gap-2 w-[15%]">
          <Label>Quantidade</Label>
          <Input
            value={itemAmount}
            onChange={(e) => setItemAmount(e.target.value)}
            type="number"
            min={1}
            max={99999}
            step={1}
          />
        </div>
        <div className="grid gap-2">
          <Label>Categoria</Label>
          <Select onValueChange={e => setCategoryId(e)} value={categoryId}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Selecione"/>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Categorias</SelectLabel>
                {categories && categories.map(category => (
                  <SelectItem key={category.id} value={category.id}>{category.nome}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex justify-center">
          <Button
            size="sm"
            variant="default"
            className="shadow-[0_0_25px] shadow-primary/20 hover:shadow-primary/25"
            disabled={isSubmitting}
            onClick={() => submitItem()}
          >
            {isSubmitting && <Loader2 className="animate-spin" />}
            {!isSubmitting && <Plus />}
            Adicionar
          </Button>
        </div>
      </div>
    </>
  );
};
