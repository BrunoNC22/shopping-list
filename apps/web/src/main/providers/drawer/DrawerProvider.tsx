import { useCallback, useState, type PropsWithChildren, type ReactElement } from "react"
import { DrawerContext } from "./DrawerContext"
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from "@/components/ui/drawer"

export type DrawerObj = {
  id: string,
  title?: string,
  description?: string,
  content: () => ReactElement
}

export const DrawerProvider = ({ children }: PropsWithChildren) => {
  const [drawers, setDrawers] = useState<DrawerObj[]>([])

  const closeDrawer = useCallback(
    (drawerId: string) => setDrawers((oldDrawers) => oldDrawers.filter((oldDrawer) => oldDrawer.id !== drawerId)),
    []
  )

  const openDrawer = useCallback((buildDrawer: (close: () => void) => ReactElement, title?: string, description?: string) => {
    const drawerId = (Math.random() * 10000).toFixed(0)
    const newDrawer: DrawerObj = {
      id: drawerId,
      title,
      description,
      content: () => buildDrawer(() => closeDrawer(drawerId))
    }
    setDrawers((oldDrawers) => [...oldDrawers, newDrawer])

    return drawerId
  }, [closeDrawer])

  return (
    <DrawerContext value={{ openDrawer, closeDrawer }} >
      {children}
      {drawers.map(drawer => (
        <Drawer key={drawer.id} open onClose={() => closeDrawer(drawer.id)}>
          <DrawerContent className="max-w-md mx-auto">
            <div className="mx-auto w-full max-w-sm">
              {(drawer.title || drawer.description) && (
                <DrawerHeader>
                  {drawer.title && <DrawerTitle>{drawer.title}</DrawerTitle>}
                  {drawer.description && <DrawerDescription>{drawer.description}</DrawerDescription>}
                </DrawerHeader>
              )}
              <drawer.content />
            </div>
          </DrawerContent>
        </Drawer>
      ))}
    </DrawerContext>
  )
}