import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { 
    ArrowLeft, 
    Loader2, 
    Building2, 
    Globe, 
    MapPin, 
    FileText, 
    Upload,
    CheckCircle,
    AlertCircle,
    Image,
    Users,
    TrendingUp,
    Sparkles,
    Save
} from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'
import useGetCompanyById from '@/hooks/useGetCompanyById'

const CompanySetup = () => {
    const params = useParams();
    useGetCompanyById(params.id);
    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null
    });
    const { singleCompany } = useSelector(store => store.company);
    const [loading, setLoading] = useState(false);
    const [dragActive, setDragActive] = useState(false);
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const changeFileHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
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
                setInput({ ...input, file });
            } else {
                toast.error('Please select an image file');
            }
        }
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", input.name);
        formData.append("description", input.description);
        formData.append("website", input.website);
        formData.append("location", input.location);
        if (input.file) {
            formData.append("file", input.file);
        }
        try {
            setLoading(true);
            const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/companies");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        setInput({
            name: singleCompany.name || "",
            description: singleCompany.description || "",
            website: singleCompany.website || "",
            location: singleCompany.location || "",
            file: singleCompany.file || null
        })
    }, [singleCompany]);

    const isFormValid = input.name.trim().length > 0;

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <Navbar />
            
            <div className='max-w-4xl mx-auto pt-24 py-8 px-6'>
                {/* Enhanced Header Section */}
                <div className="bg-white/80 backdrop-blur-sm border border-white/50 rounded-3xl shadow-2xl overflow-hidden mb-8">
                    {/* Gradient Top Border */}
                    <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
                    
                    <div className="p-8">
                        {/* Back Navigation */}
                        <div className="flex items-center gap-4 mb-8">
                            <Button
                                onClick={() => navigate("/admin/companies")} 
                                variant="outline" 
                                className="p-2 rounded-xl border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
                                disabled={loading}
                            >
                                <ArrowLeft className="w-5 h-5" />
                            </Button>
                            
                            <div className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl">
                                <Building2 className="w-8 h-8 text-blue-600" />
                            </div>
                            
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-gray-800 to-blue-800 bg-clip-text text-transparent">
                                    Company Setup
                                </h1>
                                <p className="text-gray-600 mt-1">
                                    Complete your company profile to attract top talent
                                </p>
                            </div>
                        </div>

                        {/* Progress Steps */}
                        <div className="flex items-center gap-4 mb-8 p-4 bg-gradient-to-r from-blue-50/50 to-purple-50/50 rounded-2xl">
                            <div className="flex items-center gap-2 opacity-50">
                                <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                                    <CheckCircle className="w-4 h-4" />
                                </div>
                                <span className="text-green-600 font-semibold">Company Name</span>
                            </div>
                            <div className="w-8 h-0.5 bg-blue-400"></div>
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                                    2
                                </div>
                                <span className="font-semibold text-blue-600">Company Details</span>
                            </div>
                            <div className="w-8 h-0.5 bg-gray-300"></div>
                            <div className="flex items-center gap-2 opacity-50">
                                <div className="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-sm font-bold">
                                    3
                                </div>
                                <span className="text-gray-600">Complete Profile</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Enhanced Form Section */}
                <form onSubmit={submitHandler}>
                    <div className="bg-white/80 backdrop-blur-sm border border-white/50 rounded-3xl shadow-2xl overflow-hidden">
                        <div className="p-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                <div className="p-2 bg-blue-100 rounded-lg">
                                    <Building2 className="w-6 h-6 text-blue-600" />
                                </div>
                                Company Information
                            </h2>

                            {/* Form Grid */}
                            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8'>
                                {/* Company Name */}
                                <div className="lg:col-span-1">
                                    <Label className="text-gray-700 font-semibold flex items-center gap-2 mb-3">
                                        <Building2 className="w-4 h-4 text-blue-600" />
                                        Company Name *
                                    </Label>
                                    <Input
                                        type="text"
                                        name="name"
                                        value={input.name}
                                        onChange={changeEventHandler}
                                        className="py-3 px-4 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-xl shadow-sm hover:shadow-md focus:shadow-lg transition-all duration-200 focus:border-blue-300 focus:ring-4 focus:ring-blue-100"
                                        placeholder="Enter your company name"
                                        required
                                    />
                                    {input.name && input.name.length > 0 && (
                                        <div className="flex items-center gap-1 mt-2 text-green-600 text-sm">
                                            <CheckCircle className="w-4 h-4" />
                                            <span>Looks good!</span>
                                        </div>
                                    )}
                                </div>

                                {/* Location */}
                                <div>
                                    <Label className="text-gray-700 font-semibold flex items-center gap-2 mb-3">
                                        <MapPin className="w-4 h-4 text-green-600" />
                                        Location
                                    </Label>
                                    <Input
                                        type="text"
                                        name="location"
                                        value={input.location}
                                        onChange={changeEventHandler}
                                        className="py-3 px-4 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-xl shadow-sm hover:shadow-md focus:shadow-lg transition-all duration-200 focus:border-green-300 focus:ring-4 focus:ring-green-100"
                                        placeholder="e.g., New York, NY or Remote"
                                    />
                                </div>

                                {/* Website */}
                                <div>
                                    <Label className="text-gray-700 font-semibold flex items-center gap-2 mb-3">
                                        <Globe className="w-4 h-4 text-purple-600" />
                                        Website
                                    </Label>
                                    <Input
                                        type="url"
                                        name="website"
                                        value={input.website}
                                        onChange={changeEventHandler}
                                        className="py-3 px-4 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-xl shadow-sm hover:shadow-md focus:shadow-lg transition-all duration-200 focus:border-purple-300 focus:ring-4 focus:ring-purple-100"
                                        placeholder="https://www.yourcompany.com"
                                    />
                                </div>

                                {/* Description */}
                                <div>
                                    <Label className="text-gray-700 font-semibold flex items-center gap-2 mb-3">
                                        <FileText className="w-4 h-4 text-orange-600" />
                                        Description
                                    </Label>
                                    <Input
                                        type="text"
                                        name="description"
                                        value={input.description}
                                        onChange={changeEventHandler}
                                        className="py-3 px-4 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-xl shadow-sm hover:shadow-md focus:shadow-lg transition-all duration-200 focus:border-orange-300 focus:ring-4 focus:ring-orange-100"
                                        placeholder="Brief description of your company"
                                    />
                                </div>
                            </div>

                            {/* Logo Upload Section */}
                            <div className="mb-8">
                                <Label className="text-gray-700 font-semibold flex items-center gap-2 mb-3">
                                    <Image className="w-4 h-4 text-indigo-600" />
                                    Company Logo
                                </Label>
                                
                                <div 
                                    className={`relative border-2 border-dashed rounded-2xl p-8 transition-all duration-200 ${
                                        dragActive 
                                            ? 'border-blue-400 bg-blue-50/50' 
                                            : 'border-gray-300 hover:border-gray-400'
                                    }`}
                                    onDragEnter={handleDrag}
                                    onDragLeave={handleDrag}
                                    onDragOver={handleDrag}
                                    onDrop={handleDrop}
                                >
                                    <div className="text-center">
                                        <div className="p-4 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl w-fit mx-auto mb-4">
                                            <Upload className="w-8 h-8 text-indigo-600" />
                                        </div>
                                        <p className="text-gray-600 mb-2">
                                            <span className="font-semibold">Click to upload</span> or drag and drop your logo
                                        </p>
                                        <p className="text-sm text-gray-400">PNG, JPG up to 10MB</p>
                                        
                                        {input.file && (
                                            <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                                                <div className="flex items-center gap-2 text-green-700">
                                                    <CheckCircle className="w-4 h-4" />
                                                    <span className="text-sm font-medium">
                                                        {typeof input.file === 'string' ? 'Current logo' : input.file.name}
                                                    </span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        onChange={changeFileHandler}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    />
                                </div>
                            </div>

                            {/* Form Validation Alert */}
                            {!isFormValid && (
                                <div className="mb-6 p-4 bg-orange-50 border border-orange-200 rounded-xl">
                                    <div className="flex items-center gap-2 text-orange-700">
                                        <AlertCircle className="w-4 h-4" />
                                        <span className="text-sm font-medium">Company name is required to continue</span>
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
                                    Updating Company...
                                </Button>
                            ) : (
                                <Button 
                                    type="submit" 
                                    disabled={!isFormValid}
                                    className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                >
                                    <div className="flex items-center justify-center gap-2">
                                        <Save className="w-5 h-5" />
                                        <span>Update Company Profile</span>
                                        <Sparkles className="w-4 h-4" />
                                    </div>
                                </Button>
                            )}
                        </div>
                    </div>
                </form>

                {/* Benefits Section */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white/60 backdrop-blur-sm border border-white/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                        <div className="p-3 bg-blue-100 rounded-xl w-fit mb-4">
                            <Users className="w-6 h-6 text-blue-600" />
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">Professional Profile</h3>
                        <p className="text-gray-600 text-sm">
                            Create a compelling company profile that showcases your brand and attracts quality candidates.
                        </p>
                    </div>

                    <div className="bg-white/60 backdrop-blur-sm border border-white/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                        <div className="p-3 bg-green-100 rounded-xl w-fit mb-4">
                            <Globe className="w-6 h-6 text-green-600" />
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">Brand Visibility</h3>
                        <p className="text-gray-600 text-sm">
                            Increase your company's visibility and establish a strong presence in the job market.
                        </p>
                    </div>

                    <div className="bg-white/60 backdrop-blur-sm border border-white/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                        <div className="p-3 bg-purple-100 rounded-xl w-fit mb-4">
                            <TrendingUp className="w-6 h-6 text-purple-600" />
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">Better Hiring</h3>
                        <p className="text-gray-600 text-sm">
                            Complete profiles lead to better candidate matches and more successful hiring outcomes.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CompanySetup