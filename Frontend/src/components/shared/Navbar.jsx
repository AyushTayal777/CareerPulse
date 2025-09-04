import React, { useState, useEffect } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { LogOut, User2, Menu, X } from 'lucide-react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const Navbar = () => {
  const { user } = useSelector(store => store.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Auth routes
  const authRoutes = ["/login", "/signup", "/forgot-password"]
  const isAuthRoute = authRoutes.includes(location.pathname)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true })
      if (res.data.success) {
        dispatch(setUser(null))
        navigate("/login")
        toast.success(res.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message || "Logout failed")
    }
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-xl border-b border-gray-200/50 shadow-sm'
          : 'bg-white/90 backdrop-blur-sm border-b border-gray-100/50'
      }`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-purple-50/20 via-pink-50/20 to-blue-50/20"></div>

      <div className="relative flex items-center justify-between mx-auto max-w-7xl h-20 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="group cursor-pointer flex-shrink-0">
          <h1 className="text-3xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300 drop-shadow-sm whitespace-nowrap">
            Career<span className="text-pink-600">Pulse</span>
          </h1>
        </div>

        {/* ✅ Auth Routes → show only Login/Signup buttons */}
        {isAuthRoute ? (
          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button
                variant="outline"
                className="border-2 border-purple-200 hover:border-purple-400 hover:bg-purple-50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20"
              >
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-6 py-2 rounded-lg shadow-lg hover:shadow-xl hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300 hover:-translate-y-0.5">
                Signup
              </Button>
            </Link>
          </div>
        ) : (
          <>
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-12">
              <ul className="flex font-semibold items-center gap-8">
                {user && user.role === 'recruiter' ? (
                  <>
                    <li>
                      <Link to="/admin/companies" className="relative px-4 py-2 text-gray-700 hover:text-purple-600 transition-all duration-300 group">
                        Companies
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 group-hover:w-full transition-all duration-300"></span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/admin/jobs" className="relative px-4 py-2 text-gray-700 hover:text-purple-600 transition-all duration-300 group">
                        Jobs
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 group-hover:w-full transition-all duration-300"></span>
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link to="/" className="relative px-4 py-2 text-gray-700 hover:text-purple-600 transition-all duration-300 group">
                        Home
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 group-hover:w-full transition-all duration-300"></span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/jobs" className="relative px-4 py-2 text-gray-700 hover:text-purple-600 transition-all duration-300 group">
                        Jobs
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 group-hover:w-full transition-all duration-300"></span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/browse" className="relative px-4 py-2 text-gray-700 hover:text-purple-600 transition-all duration-300 group">
                        Browse
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 group-hover:w-full transition-all duration-300"></span>
                      </Link>
                    </li>
                  </>
                )}
              </ul>

              {/* Auth Section */}
              {!user ? (
                <div className="flex items-center gap-3">
                  <Link to="/login">
                    <Button
                      variant="outline"
                      className="border-2 border-purple-200 hover:border-purple-400 hover:bg-purple-50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20"
                    >
                      Login
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-6 py-2 rounded-lg shadow-lg hover:shadow-xl hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300 hover:-translate-y-0.5">
                      Signup
                    </Button>
                  </Link>
                </div>
              ) : (
                <Popover>
                  <PopoverTrigger asChild>
                    <div className="relative group cursor-pointer">
                      <Avatar className="w-12 h-12 ring-2 ring-purple-200 hover:ring-purple-400 transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-purple-500/20">
                        <AvatarImage src={user?.profile?.profilePhoto} alt="Profile" />
                      </Avatar>
                      <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur opacity-0 group-hover:opacity-20 transition duration-300"></div>
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 p-0 border-0 shadow-2xl shadow-purple-500/10 bg-white/95 backdrop-blur-xl">
                    <div className="p-6">
                      <div className="flex gap-4 items-center mb-6">
                        <Avatar className="w-16 h-16 ring-2 ring-purple-200">
                          <AvatarImage src={user?.profile?.profilePhoto} alt="Profile" />
                        </Avatar>
                        <div>
                          <h4 className="font-bold text-lg text-gray-800">{user?.fullname}</h4>
                          <p className="text-sm text-gray-600 mt-1">{user?.profile?.bio}</p>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        {user && user.role === 'student' && (
                          <Link to="/profile" className="flex items-center gap-3 p-3 hover:bg-purple-50 rounded-lg transition-all duration-200 group">
                            <User2 className="w-5 h-5 text-purple-600 group-hover:scale-110 transition-transform" />
                            <span className="font-medium text-gray-700 group-hover:text-purple-600">View Profile</span>
                          </Link>
                        )}
                        <button
                          onClick={logoutHandler}
                          className="flex items-center gap-3 p-3 hover:bg-red-50 rounded-lg transition-all duration-200 group w-full text-left"
                        >
                          <LogOut className="w-5 h-5 text-red-500 group-hover:scale-110 transition-transform" />
                          <span className="font-medium text-gray-700 group-hover:text-red-600">Logout</span>
                        </button>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              )}
            </div>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar
