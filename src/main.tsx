import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Login, Users, Analytics } from './pages/index'
import { Provider } from 'react-redux'
import { store } from './app/store.ts'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SecureRoute from './components/SecureRoute.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <SecureRoute path='/users' />
  },
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/users',
        element: <Users />
      },
      {
        path: '/analytics',
        element: <Analytics />
      },
    ]
  },
  {
    path: '/login',
    element: <Login />
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
