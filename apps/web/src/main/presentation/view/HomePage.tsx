import { useCurrentAccount } from "@/main/providers/current-account/CurrentAccountContext";
import { useHeader } from "@/main/providers/header/HeaderContext";
import { useEffect } from "react";
import { Link } from "react-router";

export const HomePage = () => {
  const { currentAccount } = useCurrentAccount()
  const { setHeaderTitle } = useHeader()

  useEffect(() => {
    setHeaderTitle("Your Shopping List")

    return () => {
      setHeaderTitle("")
    }
  }, [])
  return (
    <div className="bg-background text-slate-900 dark:text-slate-100 font-display transition-colors duration-300">
      <main className="pt-32 pb-20">
        <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="flex flex-col gap-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider w-fit">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Novo: Sincronização em Tempo Real
            </div>
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] text-slate-900 dark:text-white">
                Organize suas compras de{" "}
                <span className="text-primary">forma inteligente</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-lg leading-relaxed">
                Controle seus gastos, organize por categorias e nunca mais
                esqueça um item essencial na hora do mercado.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              {currentAccount ? (
                <Link to={"/listas"} className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white text-zinc-900 font-bold text-lg hover:bg-white/90 transition-all shadow-zinc-900/20 shadow-lg">
                  Começar agora
                  <span className="material-symbols-outlined">arrow_forward</span>
                </Link>
              ) : (
                <Link to={"/listas"} className="flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-primary text-white font-bold text-lg hover:bg-primary/90 transition-all neon-glow shadow-primary/20 shadow-lg">
                  <div className="h-6 w-6">
                    <svg viewBox="-0.5 0 48 48" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>Google-color</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Color-" transform="translate(-401.000000, -860.000000)"> <g id="Google" transform="translate(401.000000, 860.000000)"> <path d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24" id="Fill-1" fill="#FBBC05"> </path> <path d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333" id="Fill-2" fill="#EB4335"> </path> <path d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667" id="Fill-3" fill="#34A853"> </path> <path d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24" id="Fill-4" fill="#4285F4"> </path> </g> </g> </g> </g></svg>
                  </div>
                  <span>Começar com conta Google</span>
                  <span className="material-symbols-outlined">arrow_forward</span>
                </Link>
              )}
            </div>
            <div className="flex items-center gap-6 pt-4">
              <div className="flex -space-x-3">
                <div className="w-10 h-10 rounded-full border-2 border-background-dark bg-slate-800 overflow-hidden">
                  <img
                    alt="User 1"
                    className="w-full h-full object-cover"
                    data-alt="User avatar profile picture circular"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLxpeOpQNSrbkrjF7s73WqyP4awjNCp27Azb3RVCmYfbfMC4uyDVboCjEb0nZx_vZqCLGUFgmfks3ZJH_zYab-rgNKU-uJSYXzYh2x3ooet0Hnw1LQWl0B8wDdt3GI3v8h3zS6YPhupnMI5Df1MwIS2UNkhAcqaAQFLcMvWuw8NE7Xct6mtfYCpfTrovrifwYCDAEn0w1e6WF7uP1ETRBnj_WKvRYWvK7ldBu5-M9zWrIlVn1hI5sm1AaH7nwJDD8BDbJrIY0Wddw"
                  />
                </div>
                <div className="w-10 h-10 rounded-full border-2 border-background-dark bg-slate-800 overflow-hidden">
                  <img
                    alt="User 2"
                    className="w-full h-full object-cover"
                    data-alt="User avatar profile picture circular"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCiiULIkPEtwcP3G3r43pSpr4Rz7oviHsW3yw6mwC-_uG4XBJs4Xg1XFBHjbFAXyM95zru6zE1vJehd4AobrRw4tI2yaeaQDhKyNP4dFaVBxq-LJnwJEXo3gEs6KYjOO3baV8N_cA9dq23OqMO0uA9Kyy_LSJOSH0UWtGgTjjkEoDrX0oI-SfecFPaJNzzPw5gPjI-_Y_Ee_tYGjAq0_uW-tke1X5Po5r4MuHr79p8hJcG3LGECEhLD0z7DZ17rQe7DAlMPVAr4hcU"
                  />
                </div>
                <div className="w-10 h-10 rounded-full border-2 border-background-dark bg-slate-800 overflow-hidden">
                  <img
                    alt="User 3"
                    className="w-full h-full object-cover"
                    data-alt="User avatar profile picture circular"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDpQKtE5cLTy2z_3PHJcIY5mipLA0aOVtG1fBLzwGBjIj6-OAN0iiOi10ObRnsEevY0dZE_wMnQ0qfbZBQzCfPp9btYc4ZbuQZVvhVp9rUOMJVTr0H7c3SDBlSXiHfRLZ3zeM9P4ZHtofPfiEWQ5CZyuhbt08F7UQ0odm7nuL5KWQkPTcmwzBF4JOt2bjoUDS8uzky9DP02ozonrEMIq4zaDYW8ksB945V_vn9OJZItX-6eHcPWsOakUd5nUVSLIocUA2qTwgjvkI8"
                  />
                </div>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                <span className="font-bold text-slate-900 dark:text-white">
                  +10k
                </span>{" "}
                usuários já economizam
              </p>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-4 bg-primary/20 rounded-[2.5rem] blur-3xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
            <div className="relative glass-card rounded-[2rem] p-6 shadow-2xl border border-white/10 overflow-hidden">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-xl font-bold">Minha Lista</h3>
                  <p className="text-xs text-slate-500">
                    Última atualização: Agora
                  </p>
                </div>
                <div className="p-2 rounded-full bg-primary/20 text-primary">
                  <span className="material-symbols-outlined">add</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-slate-500">
                    <span>🛒 Mercado</span>
                    <span className="text-primary">R$ 42,90</span>
                  </div>
                  <div className="bg-graphite/50 p-4 rounded-xl border border-white/5 flex items-center justify-between hover:bg-graphite transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded border border-primary/50 flex items-center justify-center text-primary bg-primary/10">
                        <span className="material-symbols-outlined text-sm">
                          check
                        </span>
                      </div>
                      <span className="text-sm font-medium">
                        Leite Integral (2L)
                      </span>
                    </div>
                    <span className="text-sm text-slate-400">R$ 12,90</span>
                  </div>
                  <div className="bg-graphite/50 p-4 rounded-xl border border-white/5 flex items-center justify-between hover:bg-graphite transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded border border-white/10"></div>
                      <span className="text-sm font-medium">
                        Café Arábica 500g
                      </span>
                    </div>
                    <span className="text-sm text-slate-400">R$ 30,00</span>
                  </div>
                </div>
                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-slate-500">
                    <span>🥐 Padaria</span>
                    <span className="text-primary">R$ 15,00</span>
                  </div>
                  <div className="bg-graphite/50 p-4 rounded-xl border border-white/5 flex items-center justify-between hover:bg-graphite transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded border border-white/10"></div>
                      <span className="text-sm font-medium">
                        Pão Francês (10 un)
                      </span>
                    </div>
                    <span className="text-sm text-slate-400">R$ 15,00</span>
                  </div>
                </div>
              </div>
              <div className="mt-10 pt-6 border-t border-white/5 flex items-center justify-between">
                <span className="text-slate-400 font-medium">
                  Total estimado
                </span>
                <span className="text-2xl font-extrabold text-white">
                  R$ 57,90
                </span>
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/20 rounded-full blur-2xl"></div>
            </div>
          </div>
        </section>
        <section className="max-w-7xl mx-auto px-6 mt-40">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              Funcionalidades Incríveis
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              Tudo o que você precisa para gerenciar suas compras sem estresse e
              com total economia.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group p-8 rounded-2xl bg-zinc-900/30 border border-slate-200 dark:border-slate-800 hover:border-primary/50 transition-all">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-3xl">
                  category
                </span>
              </div>
              <h3 className="text-xl font-bold mb-3">
                Categorias Inteligentes
              </h3>
              <p className="text-slate-500 leading-relaxed">
                Organize itens por corredor ou tipo automaticamente, facilitando
                seu trajeto no mercado.
              </p>
            </div>
            <div className="group p-8 rounded-2xl bg-zinc-900/30 border border-slate-200 dark:border-slate-800 hover:border-primary/50 transition-all">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-3xl">
                  analytics
                </span>
              </div>
              <h3 className="text-xl font-bold mb-3">Controle de Gastos</h3>
              <p className="text-slate-500 leading-relaxed">
                Acompanhe o valor total do seu carrinho em tempo real e mantenha
                seu orçamento sob controle.
              </p>
            </div>
            <div className="group p-8 rounded-2xl bg-zinc-900/30 border border-slate-200 dark:border-slate-800 hover:border-primary/50 transition-all">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-3xl">
                  cloud_sync
                </span>
              </div>
              <h3 className="text-xl font-bold mb-3">Sincronização Cloud</h3>
              <p className="text-slate-500 leading-relaxed">
                Acesse sua lista de qualquer dispositivo. Comece no PC, finalize
                no seu celular no mercado.
              </p>
            </div>
          </div>
        </section>
        <section className="max-w-7xl mx-auto px-6 mt-40">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-primary px-8 py-20 text-center">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
              <svg
                height="100%"
                width="100%"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <pattern
                    height="40"
                    id="grid"
                    patternUnits="userSpaceOnUse"
                    width="40"
                  >
                    <path
                      d="M 40 0 L 0 0 0 40"
                      fill="none"
                      stroke="white"
                      stroke-width="1"
                    ></path>
                  </pattern>
                </defs>
                <rect fill="url(#grid)" height="100%" width="100%"></rect>
              </svg>
            </div>
            <div className="relative z-10 max-w-2xl mx-auto space-y-8">
              <h2 className="text-4xl md:text-5xl font-black text-white">
                Pronto para economizar tempo e dinheiro?
              </h2>
              <p className="text-primary-100 text-lg opacity-90 text-white/80">
                Junte-se a milhares de pessoas que transformaram suas idas ao
                supermercado em uma experiência rápida e organizada.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button className="w-full sm:w-auto px-10 py-5 rounded-2xl bg-white text-primary font-extrabold text-xl shadow-2xl hover:scale-105 transition-transform">
                  Criar minha lista grátis
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t border-slate-200 dark:border-slate-800 py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">
              shopping_cart_checkout
            </span>
            <span className="text-lg font-bold">Your Shopping List</span>
          </div>
          <p className="text-sm text-slate-500">
            © 2024 Your Shopping List. Todos os direitos reservados.
          </p>
          <div className="flex gap-6 text-slate-400">
            <a className="hover:text-primary transition-colors" href="#">
              <span className="material-symbols-outlined">brand_awareness</span>
            </a>
            <a className="hover:text-primary transition-colors" href="#">
              <span className="material-symbols-outlined">share</span>
            </a>
            <a className="hover:text-primary transition-colors" href="#">
              <span className="material-symbols-outlined">mail</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};
