import React from 'react'
import ReactDOM from 'react-dom/client'
import './App.css'
import { RouterProvider } from 'react-router-dom'
import AppRouter from './router/AppRouter.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* on enregistre le store */}
    {/* on enregistre le router */}
    <AppRouter />
  </React.StrictMode>,
)
