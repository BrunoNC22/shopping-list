import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useCurrentAccount } from "@/main/providers/current-account/CurrentAccountContext"
import { ArrowLeftRight, LogOut } from "lucide-react"
import { Link } from "react-router"

export type HeaderProps = {
  headerTitle: string
}

export const Header = ({ headerTitle }: HeaderProps) => {
  const { currentAccount } = useCurrentAccount()

  return (
    <header className="fixed w-full top-0 z-10 bg-background/50 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to={"/listas"}>
            <span className="material-symbols-outlined text-primary text-3xl">
              shopping_cart_checkout
            </span>
          </Link>
          <h1 className="text-xl font-bold leading-tight tracking-[-0.015em]">
            {headerTitle}
          </h1>
        </div>
        {currentAccount ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full overflow-hidden">
                {currentAccount.profilePicUrl ? (
                  <img src={currentAccount.profilePicUrl}></img>
                  ) : (
                  <span className="material-symbols-outlined text-3xl">
                    account_circle
                  </span>
                )}
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
            }}>
              <DropdownMenuLabel>
                <div className="flex gap-2 items-center">
                  <div className="h-7 w-7 flex items-center justify-center rounded-full overflow-hidden">
                    {currentAccount.profilePicUrl ? (
                      <img src={currentAccount.profilePicUrl}></img>
                      ) : (
                      <span className="material-symbols-outlined text-3xl">
                        account_circle
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <div className="text-sm">{currentAccount.name}</div>
                    <div className="text-xs">{currentAccount.email}</div>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <ArrowLeftRight />
                Trocar de conta Google
              </DropdownMenuItem>
              <DropdownMenuItem variant="destructive">
                <LogOut />
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>

          </DropdownMenu>
        ) : (
          <Link 
            to={`https://accounts.google.com/o/oauth2/v2/auth?client_id=${import.meta.env.VITE_GOOGLE_PUBLIC_API_KEY}&redirect_uri=http://localhost:8000/auth/google/redirect&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile`} 
            className="flex cursor-pointer items-center justify-center"
          >
            <Button variant={'outline'}>
              
              {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M564 325.8C564 467.3 467.1 568 324 568C186.8 568 76 457.2 76 320C76 182.8 186.8 72 324 72C390.8 72 447 96.5 490.3 136.9L422.8 201.8C334.5 116.6 170.3 180.6 170.3 320C170.3 406.5 239.4 476.6 324 476.6C422.2 476.6 459 406.2 464.8 369.7L324 369.7L324 284.4L560.1 284.4C562.4 297.1 564 309.3 564 325.8z"/></svg> */}
              <svg viewBox="-0.5 0 48 48" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>Google-color</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Color-" transform="translate(-401.000000, -860.000000)"> <g id="Google" transform="translate(401.000000, 860.000000)"> <path d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24" id="Fill-1" fill="#FBBC05"> </path> <path d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333" id="Fill-2" fill="#EB4335"> </path> <path d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667" id="Fill-3" fill="#34A853"> </path> <path d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24" id="Fill-4" fill="#4285F4"> </path> </g> </g> </g> </g></svg>
              Login com conta Google
            </Button>
          </Link>
        )}
      </div>
    </header>
  )
}