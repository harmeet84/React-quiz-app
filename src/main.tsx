
import React from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { routes } from './router'
import './styles.css'

const basename = (import.meta.env.BASE_URL ?? '/').replace(/\/$/, '')

const router = createBrowserRouter(routes, {basename})

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)
