import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader2, Mail, Lock, User, Users, Eye, EyeOff } from 'lucide-react'

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const { loading, user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            dispatch(setLoading(false));
        }
    }

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [])

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
            <Navbar />
            
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-2000"></div>
            </div>

            <div className='relative flex items-center justify-center min-h-screen px-4 pt-20'>
                <div className="w-full max-w-md">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="bg-gradient-to-r from-purple-600 to-pink-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                            <User className="w-8 h-8 text-white" />
                        </div>
                        <h1 className='text-3xl font-bold text-gray-800 mb-2'>Welcome Back</h1>
                        <p className="text-gray-600">Sign in to your CareerPulse account</p>
                    </div>

                    {/* Login Form */}
                    <form onSubmit={submitHandler} className='bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-2xl'>
                        {/* Email Field */}
                        <div className='mb-6'>
                            <Label className="text-gray-700 font-semibold mb-2 block">Email Address</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <Input
                                    type="email"
                                    value={input.email}
                                    name="email"
                                    onChange={changeEventHandler}
                                    placeholder="Enter your email"
                                    className="pl-12 h-12 border-gray-200 rounded-xl focus:border-purple-400 focus:ring-purple-400 transition-all duration-300"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className='mb-6'>
                            <Label className="text-gray-700 font-semibold mb-2 block">Password</Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    value={input.password}
                                    name="password"
                                    onChange={changeEventHandler}
                                    placeholder="Enter your password"
                                    className="pl-12 pr-12 h-12 border-gray-200 rounded-xl focus:border-purple-400 focus:ring-purple-400 transition-all duration-300"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        {/* Role Selection */}
                        <div className='mb-8'>
                            <Label className="text-gray-700 font-semibold mb-4 block">I am a</Label>
                            <RadioGroup className="grid grid-cols-2 gap-4">
                                <div className={`relative cursor-pointer transition-all duration-300 ${
                                    input.role === 'student' ? 'ring-2 ring-purple-400' : ''
                                }`}>
                                    <input
                                        type="radio"
                                        name="role"
                                        value="student"
                                        checked={input.role === 'student'}
                                        onChange={changeEventHandler}
                                        className="sr-only"
                                        id="student"
                                    />
                                    <label 
                                        htmlFor="student"
                                        className={`flex items-center justify-center p-4 border-2 rounded-xl transition-all duration-300 ${
                                            input.role === 'student' 
                                                ? 'border-purple-400 bg-purple-50 text-purple-700' 
                                                : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                                        }`}
                                    >
                                        <User className="w-5 h-5 mr-2" />
                                        Student
                                    </label>
                                </div>
                                <div className={`relative cursor-pointer transition-all duration-300 ${
                                    input.role === 'recruiter' ? 'ring-2 ring-purple-400' : ''
                                }`}>
                                    <input
                                        type="radio"
                                        name="role"
                                        value="recruiter"
                                        checked={input.role === 'recruiter'}
                                        onChange={changeEventHandler}
                                        className="sr-only"
                                        id="recruiter"
                                    />
                                    <label 
                                        htmlFor="recruiter"
                                        className={`flex items-center justify-center p-4 border-2 rounded-xl transition-all duration-300 ${
                                            input.role === 'recruiter' 
                                                ? 'border-purple-400 bg-purple-50 text-purple-700' 
                                                : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                                        }`}
                                    >
                                        <Users className="w-5 h-5 mr-2" />
                                        Recruiter
                                    </label>
                                </div>
                            </RadioGroup>
                        </div>

                        {/* Submit Button */}
                        {loading ? (
                            <Button 
                                disabled 
                                className="w-full h-12 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl shadow-lg mb-6"
                            >
                                <Loader2 className='mr-2 h-5 w-5 animate-spin' />
                                Signing in...
                            </Button>
                        ) : (
                            <Button 
                                type="submit" 
                                className="w-full h-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] mb-6"
                            >
                                Sign In
                            </Button>
                        )}

                        {/* Sign Up Link */}
                        <div className='text-center'>
                            <span className='text-gray-600'>Don't have an account? </span>
                            <Link 
                                to="/signup" 
                                className='font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent hover:from-purple-700 hover:to-pink-700 transition-all duration-300'
                            >
                                Create Account
                            </Link>
                        </div>

                        {/* Forgot Password */}
                        
                    </form>

                    
                </div>
            </div>

            <style jsx>{`
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
            `}</style>
        </div>
    )
}

export default Login