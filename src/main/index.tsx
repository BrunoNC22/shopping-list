import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './presentation/style/global.css'
import Router from './routes/router'
import { ThemeProvider } from './providers/theme/ThemeProvider'
import { DrawerProvider } from './providers/drawer/DrawerProvider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme='dark' storageKey='app-theme'>
      <DrawerProvider>
        <Router />
      </DrawerProvider>
    </ThemeProvider>
  </StrictMode>,
)
