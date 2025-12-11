import { Badge } from "@/components/ui/badge";
import { useShoppingList } from "@/main/providers/shopping-list/ShoppingListContext";

export const MobileShoppingListView = () => {
  const { items, totalValue, totalByCategory } = useShoppingList()

  return (
    <div className="bg-background-dark font-display">
      <div className="relative flex h-auto min-h-screen w-full flex-col text-white">
        <header className="sticky top-0 z-10 flex items-center justify-between bg-background-dark/80 p-4 pb-2 backdrop-blur-sm">
          <h1 className="text-xl font-bold leading-tight tracking-[-0.015em]">
            Lista de Compras
          </h1>
          <button className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full">
            <span className="material-symbols-outlined text-3xl">
              account_circle
            </span>
          </button>
        </header>
        <main className="flex flex-1 flex-col px-4 pt-2">
          <div className="flex gap-3 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none]">
            {totalByCategory.map((totalByCategoryItem, i) => (
              <Badge key={i} className="bg-secondary">
                {totalByCategoryItem.categoryName} R$ {totalByCategoryItem.total.toFixed(2)}
              </Badge>
            ))}
          </div>

          <div className="flex flex-col gap-4 py-4">
            <label className="flex flex-col">
              <p className="pb-2 text-sm font-medium leading-normal text-gray-300">
                Nome do Item
              </p>
              <input
                className="form-input h-12 w-full resize-none overflow-hidden rounded-lg border border-white/10 bg-surface-dark p-3 text-base font-normal leading-normal text-white placeholder:text-gray-500 focus:border-primary focus:outline-0 focus:ring-2 focus:ring-primary/50"
                placeholder="Ex: Leite Integral"
                value=""
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
                  value=""
                />
              </label>
              <label className="flex min-w-[5rem] flex-1 flex-col">
                <p className="pb-2 text-sm font-medium leading-normal text-gray-300">
                  Valor Unitário
                </p>
                <input
                  className="form-input h-12 w-full resize-none overflow-hidden rounded-lg border border-white/10 bg-surface-dark p-3 text-base font-normal leading-normal text-white placeholder:text-gray-500 focus:border-primary focus:outline-0 focus:ring-2 focus:ring-primary/50"
                  placeholder="R$ 0,00"
                  value=""
                />
              </label>
            </div>
            <label className="flex flex-col">
              <p className="pb-2 text-sm font-medium leading-normal text-gray-300">
                Categoria
              </p>
              <select
                className="form-select h-12 w-full resize-none appearance-none overflow-hidden rounded-lg border border-white/10 bg-surface-dark p-3 text-base font-normal leading-normal text-white focus:border-primary focus:outline-0 focus:ring-2 focus:ring-primary/50"
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDqKDOeJ38a8WjTYebN7E2oJm9nHjLKQWeDA0c84VWLjICLQ630_B0h364WtQjzv7irJOoyOxHylLU8jJXTXcyio7gC-JU5uQPWhMz1OKEIho5OD2PRhXH4YyVX7Epg4fwbOruW49-TzDRms3D0BbkvYcSfoBwsWehp8ZP38ANNKS69FO62LDvrtyPp19_Z2YKBwkjBR_mgVuAbcge0G-Jw75y9WK1Z8ZQcoXUUnxBK-88T8ONaopxe452zAVzXYH_uYpB-pF2CjLw")',
                  backgroundPosition: "right 0.5rem center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "1.5em 1.5em",
                }}
              >
                <option>Selecione uma categoria</option>
                <option>Mercearia</option>
                <option>Açougue</option>
                <option>Limpeza</option>
                <option>Higiene</option>
                <option>Bebidas</option>
              </select>
            </label>
            <button className="neon-shadow mt-2 flex h-14 w-full cursor-pointer items-center justify-center rounded-xl bg-primary text-base font-bold leading-normal text-white">
              Adicionar Item
            </button>
          </div>
          <div className="flex flex-col gap-3 pb-32">
            {items && items.map(item => (
              <div key={item.id} className="flex items-center justify-between rounded-xl bg-card/60 p-4">
                <div className="flex flex-col">
                  <p className="text-base font-semibold text-white">
                    {item.name}
                  </p>
                  <p className="text-sm text-gray-400">{item.amount} un. x R$ {item.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-4">
                  <p className="text-lg font-bold text-white">R$ {(item.amount * item.price).toFixed(2)}</p>
                  <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-background-dark">
                    <span className="material-symbols-outlined text-xl text-gray-400">
                      delete
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>

        <footer className="fixed bottom-0 left-0 right-0 z-10 p-4">
          <div className="neon-shadow-subtle mx-auto flex max-w-md items-center justify-between rounded-xl border border-primary/20 bg-surface-dark/80 p-4 backdrop-blur-sm">
            <span className="text-base font-semibold uppercase tracking-wider text-gray-300">
              Total
            </span>
            <span className="text-2xl font-extrabold text-white">R$ {totalValue}</span>
          </div>
        </footer>
      </div>
    </div>
  );
};
