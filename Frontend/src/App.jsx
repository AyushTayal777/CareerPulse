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
import Browse from './components/Browse'
import Profile from './components/Profile'
import JobDescription from './components/JobDescription'
import { Toaster } from 'react-hot-toast'

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
  },
  {
    path:'/description/:id',
    element:<JobDescription/>
  },
  {
    path:'/browse',
    element:<Browse/>
  },
  {
    path:'/profile',
    element:<Profile/>
  },

]
)
function App(){
  return (
    <>
      <RouterProvider router={appRouter}/>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  )
}

export default App
