import { useItemForm, type FormItem } from "@/main/hooks/useItemForm";
import { useCategories } from "@/main/providers/categories/CategoriesContext";

type ItemFormProps = {
  onSubmit: (formItem: FormItem) => Promise<unknown> | unknown;

};
export const MobileItemForm = ({ onSubmit }: ItemFormProps) => {
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
    <div className="flex flex-col gap-4 py-4">
      <label className="flex flex-col">
        <p className="pb-2 text-sm font-medium leading-normal text-gray-300">
          Nome do Item
        </p>
        <input
          className="form-input h-12 w-full resize-none overflow-hidden rounded-lg border border-white/10 bg-surface-dark p-3 text-base font-normal leading-normal text-white placeholder:text-gray-500 focus:border-primary focus:outline-0 focus:ring-2 focus:ring-primary/50"
          placeholder="Ex: Leite Integral"
          value={itemName}
          onChange={e => setItemName(e.target.value)}
        />
      </label>
      <div className="flex w-full flex-wrap items-end gap-4">
        <label className="flex min-w-[5rem] flex-1 flex-col">
          <p className="pb-2 text-sm font-medium leading-normal text-gray-300">
            Quantidade
          </p>
          <input
            className="form-input h-12 w-full resize-none overflow-hidden rounded-lg border border-white/10 bg-surface-dark p-3 text-base font-normal leading-normal text-white placeholder:text-gray-500 focus:border-primary focus:outline-0 focus:ring-2 focus:ring-primary/50"
            placeholder="1"
            type="number"
            min={1}
            max={99999}
            step={1}
            value={itemAmount}
            onChange={e => setItemAmount(e.target.value)}
          />
        </label>
        <label className="flex min-w-[5rem] flex-1 flex-col">
          <p className="pb-2 text-sm font-medium leading-normal text-gray-300">
            Valor Unitário
          </p>
          <input
            className="form-input h-12 w-full resize-none overflow-hidden rounded-lg border border-white/10 bg-surface-dark p-3 text-base font-normal leading-normal text-white placeholder:text-gray-500 focus:border-primary focus:outline-0 focus:ring-2 focus:ring-primary/50"
            placeholder="R$ 0,00"
            type="number"
            min={0}
            step={1}
            max={999999}
            value={itemValue}
            onChange={e => setItemValue(e.target.value)}
          />
        </label>
      </div>
      <label className="flex flex-col">
        <p className="pb-2 text-sm font-medium leading-normal text-gray-300">
          Categoria
        </p>
        <select
          className="form-select h-12 w-full resize-none appearance-none overflow-hidden rounded-lg border border-white/10 bg-surface-dark p-3 text-base font-normal leading-normal text-white focus:border-primary focus:outline-0 focus:ring-2 focus:ring-primary/50"
          
          value={categoryId}
          onChange={e => setCategoryId(e.target.value)}
        >
          <option
            disabled
            value={""}
            className="bg-background text-foreground disabled:bg-background/50"
          >Selecione uma categoria</option>
          {categories && categories.map(category => (
            <option 
            key={category.id}
            value={category.id}
            className="bg-background text-foreground focus:bg-primary focus-within:text-white"
          >{category.nome}</option>
          ))}
        </select>
      </label>
      <button
        onClick={() => submitItem()}
        disabled={isSubmitting}
        className="neon-shadow mt-2 flex h-14 w-full cursor-pointer items-center justify-center rounded-xl bg-primary text-base font-bold leading-normal text-white"
      >
        Adicionar Item
      </button>
    </div>
  );
};
