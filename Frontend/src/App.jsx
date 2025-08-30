import Navbar from './components/shared/Navbar'
import {
  createBrowserRouter,
  RouterProvider,   
} from 'react-router-dom'
import Home from './components/Home'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import { Router } from 'lucide-react'
import Jobs from './components/Jobs'

const appRouter=createBrowserRouter([
  {
    path:'/',
    element:<Home/>
  },
  {
    path:'/login',
    element:<Login/>
  },
  {
    path:'/signup',
    element:<Signup/>
  },
  {
    path:'/jobs',
    element:<Jobs/>
  }
]
)
function App(){
  return (
    <>
      <RouterProvider router={appRouter}/>
    </>
  )
}

export default App
