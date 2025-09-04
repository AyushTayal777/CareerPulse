import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useSelector } from 'react-redux'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { 
    Loader2, 
    Briefcase, 
    FileText, 
    MapPin, 
    DollarSign, 
    Building2,
    Users,
    Clock,
    Award,
    CheckCircle,
    AlertCircle,
    ArrowLeft,
    Plus,
    Sparkles,
    Target,
    TrendingUp,
    Globe
} from 'lucide-react'

const PostJob = () => {
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: 0,
        companyId: ""
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const { companies } = useSelector(store => store.company);
    
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const selectChangeHandler = (value) => {
        const selectedCompany = companies.find((company) => company.name.toLowerCase() === value);
        setInput({ ...input, companyId: selectedCompany._id });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/jobs");
            }
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    }

    const isFormValid = input.title && input.description && input.companyId && companies.length > 0;

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <Navbar />
            
            <div className='max-w-6xl mx-auto pt-24 pb-8 px-6'>
                {/* Enhanced Header Section */}
                <div className="bg-white/80 backdrop-blur-sm border border-white/50 rounded-3xl shadow-2xl overflow-hidden mb-8">
                    {/* Gradient Top Border */}
                    <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
                    
                    <div className="p-8">
                        {/* Back Navigation */}
                        <div className="flex items-center gap-4 mb-8">
                            <Button
                                variant="outline"
                                onClick={() => navigate("/admin/jobs")}
                                className="p-2 rounded-xl border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
                                disabled={loading}
                            >
                                <ArrowLeft className="w-5 h-5" />
                            </Button>
                            
                            <div className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl">
                                <Briefcase className="w-8 h-8 text-blue-600" />
                            </div>
                            
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-gray-800 to-blue-800 bg-clip-text text-transparent">
                                    Post New Job
                                </h1>
                                <p className="text-gray-600 mt-1">
                                    Create a compelling job listing to attract top talent
                                </p>
                            </div>
                        </div>

                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-2xl border border-blue-200 hover:shadow-lg transition-all duration-300">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-blue-500 rounded-lg">
                                        <Target className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-blue-600 font-medium">Reach Candidates</p>
                                        <p className="text-2xl font-bold text-blue-900">100+</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-2xl border border-green-200 hover:shadow-lg transition-all duration-300">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-green-500 rounded-lg">
                                        <TrendingUp className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-green-600 font-medium">Success Rate</p>
                                        <p className="text-2xl font-bold text-green-900">87%</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-6 rounded-2xl border border-purple-200 hover:shadow-lg transition-all duration-300">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-purple-500 rounded-lg">
                                        <Globe className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-purple-600 font-medium">Global Reach</p>
                                        <p className="text-2xl font-bold text-purple-900">2+ MNC</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Enhanced Form Section */}
                <div className="bg-white/80 backdrop-blur-sm border border-white/50 rounded-3xl shadow-2xl overflow-hidden">
                    <div className="p-8">
                        {/* Company Validation Warning */}
                        {companies.length === 0 && (
                            <div className="mb-8 p-6 bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-2xl">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-red-100 rounded-lg">
                                        <AlertCircle className="w-6 h-6 text-red-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-red-900 mb-1">Company Required</h3>
                                        <p className="text-red-700 text-sm">
                                            Please register a company first before posting jobs. 
                                            <button 
                                                onClick={() => navigate("/admin/companies/create")}
                                                className="ml-1 font-semibold underline hover:no-underline"
                                            >
                                                Create Company →
                                            </button>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        <form onSubmit={submitHandler}>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                <div className="p-2 bg-blue-100 rounded-lg">
                                    <Briefcase className="w-6 h-6 text-blue-600" />
                                </div>
                                Job Details
                            </h2>

                            {/* Form Grid */}
                            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8'>
                                {/* Job Title */}
                                <div>
                                    <Label className="text-gray-700 font-semibold flex items-center gap-2 mb-3">
                                        <Briefcase className="w-4 h-4 text-blue-600" />
                                        Job Title *
                                    </Label>
                                    <Input
                                        type="text"
                                        name="title"
                                        value={input.title}
                                        onChange={changeEventHandler}
                                        className="py-3 px-4 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-xl shadow-sm hover:shadow-md focus:shadow-lg transition-all duration-200 focus:border-blue-300 focus:ring-4 focus:ring-blue-100"
                                        placeholder="e.g., Senior Software Engineer"
                                        required
                                    />
                                </div>

                                {/* Job Description */}
                                <div>
                                    <Label className="text-gray-700 font-semibold flex items-center gap-2 mb-3">
                                        <FileText className="w-4 h-4 text-green-600" />
                                        Description *
                                    </Label>
                                    <Input
                                        type="text"
                                        name="description"
                                        value={input.description}
                                        onChange={changeEventHandler}
                                        className="py-3 px-4 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-xl shadow-sm hover:shadow-md focus:shadow-lg transition-all duration-200 focus:border-green-300 focus:ring-4 focus:ring-green-100"
                                        placeholder="Brief job description"
                                        required
                                    />
                                </div>

                                {/* Requirements */}
                                <div>
                                    <Label className="text-gray-700 font-semibold flex items-center gap-2 mb-3">
                                        <CheckCircle className="w-4 h-4 text-purple-600" />
                                        Requirements
                                    </Label>
                                    <Input
                                        type="text"
                                        name="requirements"
                                        value={input.requirements}
                                        onChange={changeEventHandler}
                                        className="py-3 px-4 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-xl shadow-sm hover:shadow-md focus:shadow-lg transition-all duration-200 focus:border-purple-300 focus:ring-4 focus:ring-purple-100"
                                        placeholder="Required skills and qualifications"
                                    />
                                </div>

                                {/* Salary */}
                                <div>
                                    <Label className="text-gray-700 font-semibold flex items-center gap-2 mb-3">
                                        <DollarSign className="w-4 h-4 text-orange-600" />
                                        Salary
                                    </Label>
                                    <Input
                                        type="text"
                                        name="salary"
                                        value={input.salary}
                                        onChange={changeEventHandler}
                                        className="py-3 px-4 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-xl shadow-sm hover:shadow-md focus:shadow-lg transition-all duration-200 focus:border-orange-300 focus:ring-4 focus:ring-orange-100"
                                        placeholder="e.g., $80,000 - $100,000"
                                    />
                                </div>

                                {/* Location */}
                                <div>
                                    <Label className="text-gray-700 font-semibold flex items-center gap-2 mb-3">
                                        <MapPin className="w-4 h-4 text-red-600" />
                                        Location
                                    </Label>
                                    <Input
                                        type="text"
                                        name="location"
                                        value={input.location}
                                        onChange={changeEventHandler}
                                        className="py-3 px-4 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-xl shadow-sm hover:shadow-md focus:shadow-lg transition-all duration-200 focus:border-red-300 focus:ring-4 focus:ring-red-100"
                                        placeholder="e.g., New York, NY or Remote"
                                    />
                                </div>

                                {/* Job Type */}
                                <div>
                                    <Label className="text-gray-700 font-semibold flex items-center gap-2 mb-3">
                                        <Clock className="w-4 h-4 text-indigo-600" />
                                        Job Type
                                    </Label>
                                    <Input
                                        type="text"
                                        name="jobType"
                                        value={input.jobType}
                                        onChange={changeEventHandler}
                                        className="py-3 px-4 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-xl shadow-sm hover:shadow-md focus:shadow-lg transition-all duration-200 focus:border-indigo-300 focus:ring-4 focus:ring-indigo-100"
                                        placeholder="e.g., Full-time, Part-time, Contract"
                                    />
                                </div>

                                {/* Experience Level */}
                                <div>
                                    <Label className="text-gray-700 font-semibold flex items-center gap-2 mb-3">
                                        <Award className="w-4 h-4 text-pink-600" />
                                        Experience Level
                                    </Label>
                                    <Input
                                        type="text"
                                        name="experience"
                                        value={input.experience}
                                        onChange={changeEventHandler}
                                        className="py-3 px-4 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-xl shadow-sm hover:shadow-md focus:shadow-lg transition-all duration-200 focus:border-pink-300 focus:ring-4 focus:ring-pink-100"
                                        placeholder="e.g., 3-5 years, Entry Level, Senior"
                                    />
                                </div>

                                {/* Number of Positions */}
                                <div>
                                    <Label className="text-gray-700 font-semibold flex items-center gap-2 mb-3">
                                        <Users className="w-4 h-4 text-teal-600" />
                                        Number of Positions
                                    </Label>
                                    <Input
                                        type="number"
                                        name="position"
                                        value={input.position}
                                        onChange={changeEventHandler}
                                        min="1"
                                        className="py-3 px-4 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-xl shadow-sm hover:shadow-md focus:shadow-lg transition-all duration-200 focus:border-teal-300 focus:ring-4 focus:ring-teal-100"
                                        placeholder="1"
                                    />
                                </div>
                            </div>

                            {/* Company Selection */}
                            {companies.length > 0 && (
                                <div className="mb-8">
                                    <Label className="text-gray-700 font-semibold flex items-center gap-2 mb-3">
                                        <Building2 className="w-4 h-4 text-cyan-600" />
                                        Select Company *
                                    </Label>
                                    <Select onValueChange={selectChangeHandler}>
                                        <SelectTrigger className="w-full py-3 px-4 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-xl shadow-sm hover:shadow-md focus:shadow-lg transition-all duration-200 focus:border-cyan-300 focus:ring-4 focus:ring-cyan-100">
                                            <SelectValue placeholder="Choose the company for this position" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white/95 backdrop-blur-sm border border-white/50 shadow-xl rounded-xl">
                                            <SelectGroup>
                                                {companies.map((company) => (
                                                    <SelectItem 
                                                        key={company._id}
                                                        value={company?.name?.toLowerCase()}
                                                        className="hover:bg-blue-50 focus:bg-blue-50 rounded-lg m-1"
                                                    >
                                                        <div className="flex items-center gap-2">
                                                            <Building2 className="w-4 h-4 text-blue-600" />
                                                            {company.name}
                                                        </div>
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                            )}

                            {/* Form Validation */}
                            {!isFormValid && companies.length > 0 && (
                                <div className="mb-6 p-4 bg-orange-50 border border-orange-200 rounded-xl">
                                    <div className="flex items-center gap-2 text-orange-700">
                                        <AlertCircle className="w-4 h-4" />
                                        <span className="text-sm font-medium">
                                            Please fill in the job title, description, and select a company to continue
                                        </span>
                                    </div>
                                </div>
                            )}

                            {/* Submit Button */}
                            {loading ? (
                                <Button 
                                    disabled
                                    className="w-full py-4 bg-gradient-to-r from-blue-400 to-purple-400 text-white font-semibold rounded-xl shadow-lg"
                                >
                                    <Loader2 className='mr-2 h-5 w-5 animate-spin' />
                                    Publishing Job...
                                </Button>
                            ) : (
                                <Button 
                                    type="submit" 
                                    disabled={!isFormValid}
                                    className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                >
                                    <div className="flex items-center justify-center gap-2">
                                        <Plus className="w-5 h-5" />
                                        <span>Post New Job</span>
                                        <Sparkles className="w-4 h-4" />
                                    </div>
                                </Button>
                            )}
                        </form>
                    </div>
                </div>

                {/* Benefits Section */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white/60 backdrop-blur-sm border border-white/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                        <div className="p-3 bg-blue-100 rounded-xl w-fit mb-4">
                            <Target className="w-6 h-6 text-blue-600" />
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">Targeted Reach</h3>
                        <p className="text-gray-600 text-sm">
                            Your job posting will reach qualified candidates actively looking for opportunities in your field.
                        </p>
                    </div>

                    <div className="bg-white/60 backdrop-blur-sm border border-white/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                        <div className="p-3 bg-green-100 rounded-xl w-fit mb-4">
                            <TrendingUp className="w-6 h-6 text-green-600" />
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">High Success Rate</h3>
                        <p className="text-gray-600 text-sm">
                            Our platform has a proven track record of successful job matches and satisfied employers.
                        </p>
                    </div>

                    <div className="bg-white/60 backdrop-blur-sm border border-white/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                        <div className="p-3 bg-purple-100 rounded-xl w-fit mb-4">
                            <Globe className="w-6 h-6 text-purple-600" />
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">Global Talent Pool</h3>
                        <p className="text-gray-600 text-sm">
                            Access to talented professionals from around the world, expanding your hiring possibilities.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostJob