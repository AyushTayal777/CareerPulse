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
import { setLoading } from '@/redux/authSlice'
import { Loader2, User, Mail, Phone, Lock, Upload, Eye, EyeOff, UserPlus, Users, Camera } from 'lucide-react'

const Signup = () => {
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: ""
    });
    const [showPassword, setShowPassword] = useState(false);
    const [dragActive, setDragActive] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);
    const {loading, user} = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const changeFileHandler = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setInput({ ...input, file });
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    }

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    }

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            if (file.type.startsWith('image/')) {
                changeFileHandler({ target: { files: [file] } });
            } else {
                toast.error('Please upload an image file');
            }
        }
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: { 'Content-Type': "multipart/form-data" },
                withCredentials: true,
            });
            if (res.data.success) {
                navigate("/login");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally{
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
                <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
                <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-2000"></div>
            </div>

            <div className='relative flex items-center justify-center min-h-screen px-4 pt-20 pb-10'>
                <div className="w-full max-w-lg">
                    {/* Header */}
                    <div className="text-center pt-5 mb-8">
                        <div className="bg-gradient-to-r from-purple-600 to-pink-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                            <UserPlus className="w-8 h-8 text-white" />
                        </div>
                        <h1 className='text-3xl font-bold text-gray-800 mb-2'>Create Account</h1>
                        <p className="text-gray-600">Join CareerPulse and start your journey</p>
                    </div>

                    {/* Signup Form */}
                    <form onSubmit={submitHandler} className='bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-2xl space-y-6'>
                        
                        {/* Full Name Field */}
                        <div>
                            <Label className="text-gray-700 font-semibold mb-2 block">Full Name</Label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <Input
                                    type="text"
                                    value={input.fullname}
                                    name="fullname"
                                    onChange={changeEventHandler}
                                    placeholder="Enter your full name"
                                    className="pl-12 h-12 border-gray-200 rounded-xl focus:border-purple-400 focus:ring-purple-400 transition-all duration-300"
                                    required
                                />
                            </div>
                        </div>

                        {/* Email Field */}
                        <div>
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

                        {/* Phone Number Field */}
                        <div>
                            <Label className="text-gray-700 font-semibold mb-2 block">Phone Number</Label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <Input
                                    type="tel"
                                    value={input.phoneNumber}
                                    name="phoneNumber"
                                    onChange={changeEventHandler}
                                    placeholder="Enter your phone number"
                                    className="pl-12 h-12 border-gray-200 rounded-xl focus:border-purple-400 focus:ring-purple-400 transition-all duration-300"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div>
                            <Label className="text-gray-700 font-semibold mb-2 block">Password</Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    value={input.password}
                                    name="password"
                                    onChange={changeEventHandler}
                                    placeholder="Create a strong password"
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
                        <div>
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

                        {/* Profile Picture Upload */}
                        <div>
                            <Label className="text-gray-700 font-semibold mb-4 block">Profile Picture (Optional)</Label>
                            <div
                                className={`relative border-2 border-dashed rounded-xl p-6 transition-all duration-300 ${
                                    dragActive 
                                        ? 'border-purple-400 bg-purple-50' 
                                        : 'border-gray-300 hover:border-gray-400'
                                }`}
                                onDragEnter={handleDrag}
                                onDragLeave={handleDrag}
                                onDragOver={handleDrag}
                                onDrop={handleDrop}
                            >
                                {previewImage ? (
                                    <div className="text-center">
                                        <img 
                                            src={previewImage} 
                                            alt="Preview" 
                                            className="w-20 h-20 rounded-full mx-auto mb-3 object-cover border-4 border-white shadow-lg"
                                        />
                                        <p className="text-sm text-gray-600 mb-2">Profile picture uploaded</p>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setPreviewImage(null);
                                                setInput({...input, file: ""});
                                            }}
                                            className="text-sm text-red-500 hover:text-red-700 transition-colors"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ) : (
                                    <div className="text-center">
                                        <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                            <Camera className="w-8 h-8 text-gray-400" />
                                        </div>
                                        <p className="text-gray-600 mb-2">Drag & drop your photo here</p>
                                        <p className="text-sm text-gray-400 mb-4">or</p>
                                        <label className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer inline-flex items-center gap-2">
                                            <Upload className="w-4 h-4" />
                                            Choose File
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={changeFileHandler}
                                                className="hidden"
                                            />
                                        </label>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Submit Button */}
                        {loading ? (
                            <Button 
                                disabled 
                                className="w-full h-12 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl shadow-lg"
                            >
                                <Loader2 className='mr-2 h-5 w-5 animate-spin' />
                                Creating Account...
                            </Button>
                        ) : (
                            <Button 
                                type="submit" 
                                className="w-full h-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                            >
                                Create Account
                            </Button>
                        )}

                        {/* Login Link */}
                        <div className='text-center'>
                            <span className='text-gray-600'>Already have an account? </span>
                            <Link 
                                to="/login" 
                                className='font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent hover:from-purple-700 hover:to-pink-700 transition-all duration-300'
                            >
                                Sign In
                            </Link>
                        </div>
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

export default Signup