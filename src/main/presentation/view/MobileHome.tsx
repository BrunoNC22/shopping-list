import { Button } from "@/components/ui/button"
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useItemListform } from "@/main/hooks/useItemListForm"
import { useItemLists } from "@/main/providers/item-list/ItemListsContext"
import { Calendar, Plus, ShoppingCart } from "lucide-react"
import { useMemo, useState } from "react"

export const MobileHome = () => {
  const { itemLists, createItemList } = useItemLists()
  const [isOpen, setIsOpen] = useState(false)
  const {
    isSubmiting,
    itemListName,
    setItemListName,
    submitForm
  } = useItemListform({ 
    submitFn: async (props) => {
      await createItemList(props)
      setIsOpen(false)
    }
  })


  const dateFormater = useMemo(() => new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }), [])

  return (
    <div className="bg-background-dark font-display">
      <div className="relative flex h-auto min-h-screen w-full flex-col text-white">
        <header className="sticky top-0 z-10 flex items-center justify-between bg-background-dark/80 p-4 pb-2 backdrop-blur-sm">
          <h1 className="text-xl font-bold leading-tight tracking-[-0.015em]">
            Listas de Compras
          </h1>
          <button className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full">
            <span className="material-symbols-outlined text-3xl">
              account_circle
            </span>
          </button>
        </header>
        <div className="flex-1 flex flex-col gap-2 overflow-y-auto pb-32 px-4 pt-6 space-y-6">
          {itemLists.map((itemList) => (
            <div
              key={itemList.id}
              className="group flex items-center gap-3 bg-card hover:bg-card/10 active:scale-[0.99] transition-all duration-200 rounded-lg p-3 border border-white/5 shadow-card cursor-pointer">
              <div className="size-10 shrink-0 rounded-full flex items-center justify-center bg-primary/20 text-primary">
                {/* <span className="material-symbols-outlined text-lg">shopping_cart</span> */}
                <ShoppingCart />
              </div>
              <div className="flex-1 overflow-hidden">
                <div className="flex justify-between items-center mb-0.5">
                  <h4
                    className="text-white font-bold text-sm leading-tight truncate group-hover:text-primary transition-colors">
                    {itemList.name}
                  </h4>
                  <span className="bg-primary/20 text-primary text-[10px] px-1.5 py-0.5 rounded-md font-bold shrink-0 ml-2">
                    R$ {itemList.getTotalValue().toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="flex items-center gap-0.5">
                    <Calendar size={16} />
                    {dateFormater.format(itemList.createdAt)}
                  </span>
                  <span className="text-emerald-400 font-semibold">{itemList.getItems().length} itens</span>
                </div>
                {/* <div className="w-full bg-background rounded-full h-1 overflow-hidden mt-1">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: "70%" }}></div>
                </div> */}
              </div>
            </div>
          ))}
        </div>
        <div className="fixed bottom-12 left-0 right-0 z-30 flex justify-center pointer-events-none">
          <Drawer open={isOpen} onOpenChange={setIsOpen}>
            <DrawerTrigger asChild>
              <button
                className="cursor-pointer pointer-events-auto bg-primary/70 text-foreground rounded-full size-16 flex items-center justify-center shadow-neon hover:scale-105 hover:rotate-90 active:scale-95 transition-all duration-300 group">
                <Plus size={32} />
              </button>
            </DrawerTrigger>
            <DrawerContent>
              <div className="mx-auto w-full max-w-sm">
                <DrawerHeader>
                  <DrawerTitle>Criar nova lista</DrawerTitle>
                  <DrawerDescription>Adicione uma nova lista de compras.</DrawerDescription>
                </DrawerHeader>
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
                  <Button className="mx-auto" onClick={() => submitForm()} disabled={isSubmiting}>
                    <Plus />
                    Adicionar
                  </Button>
                </div>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </div>
  )
}