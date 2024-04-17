import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './App.css'
import { RouterProvider } from 'react-router-dom'
import MainRouter from './router/MainRouter.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* on enregistre le store */}
      {/* on enregistre le router */}
      <RouterProvider router={MainRouter}>
        <App />
      </RouterProvider>
  </React.StrictMode>,
)
