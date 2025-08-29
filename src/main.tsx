import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'
import { ThemeProvider } from './providers/theme/ThemeProvider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme='dark' storageKey='app-theme'>
      <h1 className="text-3xl font-bold underline text-primary">
        Hello world!
      </h1>
    </ThemeProvider>
  </StrictMode>,
)
