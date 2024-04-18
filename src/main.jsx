import React from 'react'
import ReactDOM from 'react-dom/client'
import './App.css'
import AppRouter from './router/AppRouter.jsx'
import { AuthContextProvider } from './contexts/AuthContext'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* on enregistre le contexte de session */}
    <AuthContextProvider>
      {/* on enregistre le store */}
      {/* on enregistre le router */}
      <AppRouter />
    </AuthContextProvider>
  </React.StrictMode>,
)
