import { useShoppingList } from "@/main/providers/shopping-list/ShoppingListContext";
import { MobileItemForm } from "../item-form/mobile-item-form";
import { Button } from "@/components/ui/button";
import { useDrawer } from "@/main/providers/drawer/DrawerContext";
import { EllipsisVertical, Pen, Trash2 } from "lucide-react"
import { CheckboxIcon } from "../checkbox/checkbox-icon";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";


export const MobileShoppingListView = () => {
  const {
    totalValue,
    addItem,
    itemsByCategory,
    toggleIsChecked,
    removeItem,
    editItem
  } = useShoppingList();

  const { openDrawer } = useDrawer()

  return (
    <div className="relative flex items-center h-screen w-full flex-col text-white">
      {/* <Header headerTitle={shoppingListName} /> */}
      <main className="flex h-[100vh] flex-col px-4 pt-20 container max-w-md">
        <div className="flex flex-col gap-3 pb-32">
          {itemsByCategory.map(responseItem => (
            <div className="flex flex-col gap-3 pb-8" key={responseItem.category.id}>
              <p>{responseItem.category.nome} R$ {responseItem.totalValue.toFixed(2)}</p>
              <div className="flex flex-col gap-2">
                {responseItem.items.map(item => (
                  <div
                    key={item.id}
                    className={`flex justify-between rounded-xl bg-card p-4 pr-0 gap-3 transition-opacity ${item.checked ? 'opacity-75' : ''}`}
                  >
                    <div className="flex flex-col min-w-0">
                      <p className="text-base font-semibold text-white text-wrap break-words">
                        {item.name}
                      </p>
                      <p className="text-sm text-gray-400">
                        {item.amount} un. x R$ {item.price.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex flex-col">
                      
                      <div className="flex items-center gap-4">
                        <p className="text-lg font-bold text-white text-nowrap">
                          R$ {(item.amount * item.price).toFixed(2)}
                        </p>
                        <CheckboxIcon checked={item.checked} onChange={() => toggleIsChecked(item.id)} />
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button 
                              size={"icon"} 
                              variant={"ghost"} 
                              className="shrink-0" 
                              onClick={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                              }
                            }>
                              <EllipsisVertical />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                          }}>
                            <DropdownMenuLabel>Ações</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              onSelect={() => {
                                openDrawer((close) => (
                                  <MobileItemForm 
                                    onSubmit={async (formItem) => {
                                      await editItem({
                                        itemId: item.id,
                                        itemListId: item.itemListId,
                                        amount: formItem.itemAmount,
                                        categoryId: formItem.itemCategoryId,
                                        name: formItem.itemName,
                                        value: formItem.itemValue
                                      })
                                      close()
                                    }}
                                    defaultItem={item}
                                  />
                                ))
                              }}
                            >
                              <Pen />  
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              variant="destructive"
                              onSelect={() => removeItem(item.id)}
                            >
                              <Trash2 />
                              Excluir
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 z-10 p-4 flex gap-3 items-center justify-center">
        <div className="neon-shadow-subtle flex-1 flex max-w-md items-center justify-between rounded-xl border border-primary/20 bg-surface-dark/80 p-4 backdrop-blur-xs">
          <span className="text-base font-semibold uppercase tracking-wider text-gray-300">
            Total
          </span>
          <span className="text-2xl font-extrabold text-white">
            R$ {totalValue}
          </span>
        </div>
        <Button
          onClick={() => {
            openDrawer(
              (close) => (
                <div className="max-h-[60vh] overflow-y-auto">
                  <MobileItemForm
                    onSubmit={async (formItem) => {
                      await addItem({
                        amount: formItem.itemAmount,
                        categoryId: formItem.itemCategoryId,
                        name: formItem.itemName,
                        price: formItem.itemValue,
                      })
                      close()
                    }}
                  />
                </div>
              ),
              "Adicionar Item",
              "Adicione um Item a lista de compras."
            )
          }} 
          size={"lg"}
        >
          Adicionar Item
        </Button>
      </footer>
    </div>
  );
};
