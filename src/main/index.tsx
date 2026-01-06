import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './presentation/style/global.css'
import Router from './routes/router'
import { ThemeProvider } from './providers/theme/ThemeProvider'
import { Background } from './presentation/background/Background'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme='dark' storageKey='app-theme'>
      <Background>
        <Router />
      </Background>
    </ThemeProvider>
  </StrictMode>,
)
