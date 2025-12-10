import { Sidebar } from "../sidebar/sidebar";
import { ItemList } from "../item-list/item-list";
import { ItemForm } from "../ShoppingList/ItemForm";
import { useShoppingList } from "@/main/providers/shopping-list/ShoppingListContext";


export default function ShoppingListView() {
  const { items, isLoading, totalValue, addItem } = useShoppingList()

  return (
    <div className="bg-background-dark font-display">
      <div className="flex h-screen w-full bg-background-dark overflow-hidden">
        <Sidebar />
        <div className="flex flex-col flex-1">
          {isLoading && <div>Carregando...</div>}
          {items && <ItemList items={items} totalValue={totalValue} />}
          <footer className="flex-shrink-0 bg-sidebar-bg border-t border-border p-4">
            <ItemForm onSubmit={formItem => {
              addItem({
                amount: formItem.itemAmount,
                name: formItem.itemName,
                price: formItem.itemValue,
                categoryId: formItem.itemCategoryId
              })
            }} />
          </footer>
        </div>
      </div>
    </div>
  );
}
