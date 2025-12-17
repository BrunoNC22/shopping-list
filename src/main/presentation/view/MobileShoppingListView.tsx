import { useShoppingList } from "@/main/providers/shopping-list/ShoppingListContext";
import { MobileItemForm } from "../item-form/mobile-item-form";

export const MobileShoppingListView = () => {
  const { totalValue, addItem, removeItem, itemsByCategory } = useShoppingList();

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

          <MobileItemForm
            onSubmit={async (formItem) =>
              await addItem({
                amount: formItem.itemAmount,
                categoryId: formItem.itemCategoryId,
                name: formItem.itemName,
                price: formItem.itemValue,
              })
            }
          />
          <div className="flex flex-col gap-3 pb-32">
            {itemsByCategory.map(responseItem => (
              <div className="flex flex-col gap-3 pb-8" key={responseItem.category.id}>
                <p>{responseItem.category.nome} R$ {responseItem.totalValue.toFixed(2)}</p>
                <div className="flex flex-col gap-2">
                  {responseItem.items.map(item => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between rounded-xl bg-card/60 p-4"
                    >
                      <div className="flex flex-col">
                        <p className="text-base font-semibold text-white">
                          {item.name}
                        </p>
                        <p className="text-sm text-gray-400">
                          {item.amount} un. x R$ {item.price.toFixed(2)}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <p className="text-lg font-bold text-white">
                          R$ {(item.amount * item.price).toFixed(2)}
                        </p>
                        <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-background-dark">
                          <span onClick={() => removeItem(item.id)} className="material-symbols-outlined text-xl text-gray-400">
                            delete
                          </span>
                        </button>
                      </div>
                    </div>
                  ))}
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
            <span className="text-2xl font-extrabold text-white">
              R$ {totalValue}
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
};
