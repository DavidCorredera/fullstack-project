import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ListProvider } from './context/ListProvider.tsx'
import { PlanProvider } from './context/PlanProvider.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PlanProvider>
      <ListProvider>
        <App />
      </ListProvider>
    </PlanProvider>
  </React.StrictMode>,
)