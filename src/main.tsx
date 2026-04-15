import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ListProvider } from './context/ListProvider.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ListProvider> {/* <-- Envuelve App con el Provider */}
      <App />
    </ListProvider>
  </React.StrictMode>,
)