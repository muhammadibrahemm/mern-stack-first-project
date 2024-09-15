import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import { Layout } from './components/Layout/Layout'
import { Home } from './pages/Home/Home'
import { About } from './pages/About/About'
import { Login } from './pages/Login/Login'
import { Service } from './pages/Service'
import { Contact } from './pages/Contact/Contact'
import {Register} from './pages/Register/Register'
import { ErrorPage } from './pages/ErrorPage/errorPage'
import { Logout } from './pages/Logout/Logout'
import AdminLayout from './components/Admin Layout/Admin-Layout'
import AdminUser from './components/Admin Layout/Admin-User'
import AdminContact from './components/Admin Layout/Admin-Contact'
import { AdminUserUpdateById } from './components/Admin Layout/Admin-User-Update'

function App(){

  
    
    

  const router = createBrowserRouter(
    [
      {
        path:'/',
        element: <Layout/>,
        errorElement: <ErrorPage />,
        children:[
          {
            path: '/',
            element: <Home />
          },
          {
            path: '/about',
            element: <About />
          },
          {
            path: '/contact',
            element: <Contact />
          },
          {
            path: '/login',
            element: <Login />
          },
          {
            path: '/register',
            element: <Register />
          },
          {
            path: '/logout',
            element:<Logout />
          },
          {
            path: '/service',
            element: <Service />
          },
          {
            path: '/admin',
            element:<AdminLayout />,
            children:[
              {
                path:'users',
                element: <AdminUser />
              },
              {
                path:'contacts',
                element: <AdminContact />
              },
              {
                path:'users/:id/edit',
                element: <AdminUserUpdateById />
              }
            ]
          }
        ]
      }
    ]
  )
  return(
    <RouterProvider router={router} />
  )
}

export default App