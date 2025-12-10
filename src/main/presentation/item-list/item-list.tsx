import { Badge } from "@/components/ui/badge";
import type Item from "@/domain/models/Item";
import { useShoppingList } from "@/main/providers/shopping-list/ShoppingListContext";

type Props = {
  items: Item[]
  totalValue: string
}

export const ItemList = ({ items, totalValue }: Props) => {
  const { removeItem, toggleIsChecked, totalByCategory } = useShoppingList()

  return (
    <main className="flex-1 p-6 overflow-y-auto">
      <div className="flex flex-col gap-6 max-w-7xl mx-auto">
        <div className="flex flex-wrap justify-between items-center gap-6">
          <div className="flex flex-col gap-5">
            <p className="text-foreground text-4xl font-black leading-tight tracking-[-0.033em]">Lista Semanal
            </p>
            <div className="flex gap-3">
              {totalByCategory.map((totalByCategoryItem, i) => (
                <Badge key={i} className="bg-secondary">
                  {totalByCategoryItem.categoryName} R$ {totalByCategoryItem.total.toFixed(2)}
                </Badge>
              ))}
            </div>
          </div>
          <div className="bg-primary/5 border border-foreground/10 rounded-xl p-6 shadow-[0_0_25px] shadow-primary/20">
            <p className="text-foreground/80 text-sm font-medium mb-1">Valor Total da Lista</p>
            <p className="text-4xl font-bold text-primary tracking-tighter text-shadow-[0_0_10px] text-shadow-primary/20">R$ {totalValue}</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm ">
            <thead className="text-xs text-foredround/10 uppercase border-b border-foreground/10">
              <tr>
                <th className="px-6 py-3" scope="col">Item</th>
                <th className="px-6 py-3 text-center" scope="col">Qtde</th>
                <th className="px-6 py-3 text-right" scope="col">Preço Un.</th>
                <th className="px-6 py-3 text-right" scope="col">Total Est.</th>
                <th className="px-6 py-3 text-center" scope="col">Comprado</th>
                <th className="px-6 py-3 text-center" scope="col">Categoria</th>
                <th className="px-6 py-3 text-center" scope="col">Excluir</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id} className="border-b border-foreground/10">
                  <th className="px-6 py-4 font-medium text-foreground whitespace-nowrap" scope="row">{item.name}</th>
                  <td className="px-6 py-4 text-center">{item.amount}</td>
                  <td className="px-6 py-4 text-right">R$ {item.price.toFixed(2)}</td>
                  <td className="px-6 py-4 text-right font-semibold text-foreground">R$ {(item.price * item.amount).toFixed(2)}</td>
                  <td className="px-6 py-4 text-center">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input className="sr-only peer" type="checkbox" value="" checked={item.checked} onChange={() => toggleIsChecked(item.id)} />
                      <div className="w-9 h-5 bg-slate-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-foreground after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-foreground after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </td>
                  <td className="px-6 py-4 text-center">{item.category.nome}</td>
                  <td className="px-6 py-4 text-center">
                    <button className="text-foredround/10 hover:text-red-500 transition-colors p-1 rounded-md hover:bg-foreground/10" onClick={() => removeItem(item.id)}>
                      <span className="material-symbols-outlined text-xl">delete</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};
