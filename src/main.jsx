import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import NotifyContext from './contexts/notifyContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NotifyContext>
      <App />
    </NotifyContext>
  </StrictMode>,
)
