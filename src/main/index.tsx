import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './presentation/style/global.css'
import Router from './routes/router'
import { ThemeProvider } from './providers/theme/ThemeProvider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme='dark' storageKey='app-theme'>
      <Router />
    </ThemeProvider>
  </StrictMode>,
)
