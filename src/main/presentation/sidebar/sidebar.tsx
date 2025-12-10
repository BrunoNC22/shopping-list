import { useShoppingList } from "@/main/providers/shopping-list/ShoppingListContext";
import { useTheme } from "@/main/providers/theme/ThemeContext";
import { useCallback } from "react";

export const Sidebar = () => {
  const { items } = useShoppingList()
  const { setTheme, theme } = useTheme()

  const toggleTheme = useCallback(() => {
    if (theme === 'system') return setTheme('dark')
    if (theme === 'dark') return setTheme('light') 
    if (theme === 'light') return setTheme('dark') 
  }, [theme, setTheme])

  return (
    <aside className="w-64 flex-shrink-0 border-r border-solid border-border bg-sidebar-bg flex flex-col">
      <header className="flex items-center justify-between whitespace-nowrap px-4 py-3 border-b border-border">
        <div className="flex items-center gap-3 ">
          <div className="text-primary size-6 cursor-pointer" onClick={() => toggleTheme()}>
            <svg
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M19.382 5.618a4.331 4.331 0 0 0-6.124 0L12 6.878l-1.258-1.26a4.331 4.331 0 1 0-6.124 6.124L12 18.28l7.382-7.38a4.331 4.331 0 0 0 0-6.282Z"></path>
            </svg>
          </div>
          <h2 className=" text-base font-bold leading-tight tracking-[-0.015em]">
            Lista de Compras
          </h2>
        </div>
      </header>
      <nav className="flex-1 p-4 overflow-y-auto">
        <h3 className="text-sm font-semibold text-slate-400 mb-3 uppercase tracking-wider">
          Minhas Listas
        </h3>
        <ul className="space-y-2 mb-6">
          <li>
            <a
              className="flex items-center gap-2 p-2 rounded-lg bg-primary/20 text-primary font-medium hover:bg-primary/30 transition-colors"
              href="#"
            >
              <span className="material-symbols-outlined text-base">
                format_list_bulleted
              </span>
              <span>Lista Semanal</span>
              <span className="ml-auto text-xs bg-primary px-2 py-0.5 rounded-full text-background">
                {items ? items.length : 0}
              </span>
            </a>
          </li>
          <li>
            <a
              className="flex items-center gap-2 p-2 rounded-lg text-slate-300 hover:bg-white/5 transition-colors"
              href="#"
            >
              <span className="material-symbols-outlined text-base">
                shopping_bag
              </span>
              <span>Churrasco</span>
              <span className="ml-auto text-xs bg-border px-2 py-0.5 rounded-full text-slate-400">
                3
              </span>
            </a>
          </li>
          <li>
            <a
              className="flex items-center gap-2 p-2 rounded-lg text-slate-300 hover:bg-white/5 transition-colors"
              href="#"
            >
              <span className="material-symbols-outlined text-base">home</span>
              <span>Casa e Jardim</span>
              <span className="ml-auto text-xs bg-border px-2 py-0.5 rounded-full text-slate-400">
                2
              </span>
            </a>
          </li>
          <li>
            <button className="flex items-center gap-2 p-2 rounded-lg text-slate-300 hover:bg-white/5 transition-colors w-full">
              <span className="material-symbols-outlined text-base">add</span>
              <span>Nova Lista</span>
            </button>
          </li>
        </ul>
        <h3 className="text-sm font-semibold text-slate-400 mb-3 uppercase tracking-wider">
          Categorias
        </h3>
        <ul className="space-y-2">
          <li>
            <a
              className="flex items-center gap-2 p-2 rounded-lg text-slate-300 hover:bg-white/5 transition-colors"
              href="#"
            >
              <span className="material-symbols-outlined text-base text-primary">
                circle
              </span>
              <span>Mercearia</span>
            </a>
          </li>
          <li>
            <a
              className="flex items-center gap-2 p-2 rounded-lg text-slate-300 hover:bg-white/5 transition-colors"
              href="#"
            >
              <span className="material-symbols-outlined text-base text-green-400">
                circle
              </span>
              <span>Carnes</span>
            </a>
          </li>
          <li>
            <a
              className="flex items-center gap-2 p-2 rounded-lg text-slate-300 hover:bg-white/5 transition-colors"
              href="#"
            >
              <span className="material-symbols-outlined text-base text-purple-400">
                circle
              </span>
              <span>Limpeza</span>
            </a>
          </li>
          <li>
            <button className="flex items-center gap-2 p-2 rounded-lg text-slate-300 hover:bg-white/5 transition-colors w-full">
              <span className="material-symbols-outlined text-base">add</span>
              <span>Nova Categoria</span>
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
};
