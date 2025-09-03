import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'
import { 
    Building2, 
    ArrowLeft, 
    ArrowRight, 
    Sparkles,
    CheckCircle,
    AlertCircle,
    Lightbulb,
    Users,
    Globe,
    TrendingUp
} from 'lucide-react'

const CompanyCreate = () => {
    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    const registerNewCompany = async () => {
        if (!companyName || companyName.trim().length === 0) {
            toast.error('Please enter a company name');
            return;
        }

        setIsLoading(true);
        try {
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`, { companyName: companyName.trim() }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            
            if (res?.data?.success) {
                dispatch(setSingleCompany(res.data.company));
                toast.success(res.data.message);
                const companyId = res?.data?.company?._id;
                navigate(`/admin/companies/${companyId}`);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || 'Failed to create company');
        } finally {
            setIsLoading(false);
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !isLoading) {
            registerNewCompany();
        }
    }

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
                                variant="outline"
                                onClick={() => navigate("/admin/companies")}
                                className="p-2 rounded-xl border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
                                disabled={isLoading}
                            >
                                <ArrowLeft className="w-5 h-5" />
                            </Button>
                            
                            <div className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl">
                                <Building2 className="w-8 h-8 text-blue-600" />
                            </div>
                            
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-gray-800 to-blue-800 bg-clip-text text-transparent">
                                    Create New Company
                                </h1>
                                <p className="text-gray-600 mt-1">
                                    Start building your company profile and attract top talent
                                </p>
                            </div>
                        </div>

                        {/* Progress Steps */}
                        <div className="flex items-center gap-4 mb-8 p-4 bg-gradient-to-r from-blue-50/50 to-purple-50/50 rounded-2xl">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                                    1
                                </div>
                                <span className="font-semibold text-blue-600">Company Name</span>
                            </div>
                            <div className="w-8 h-0.5 bg-gray-300"></div>
                            <div className="flex items-center gap-2 opacity-50">
                                <div className="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-sm font-bold">
                                    2
                                </div>
                                <span className="text-gray-600">Company Details</span>
                            </div>
                            <div className="w-8 h-0.5 bg-gray-300"></div>
                            <div className="flex items-center gap-2 opacity-50">
                                <div className="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-sm font-bold">
                                    3
                                </div>
                                <span className="text-gray-600">Complete Profile</span>
                            </div>
                        </div>

                        {/* Main Form Section */}
                        <div className="bg-gradient-to-br from-white/60 to-blue-50/60 rounded-2xl p-8 border border-white/50">
                            <div className="mb-8">
                                <h2 className="text-xl font-bold text-gray-900 mb-2">What's your company name?</h2>
                                <p className="text-gray-600">
                                    Choose a name that represents your brand. Don't worry, you can always change this later in your company settings.
                                </p>
                            </div>

                            {/* Form Input */}
                            <div className="space-y-4 mb-8">
                                <Label className="text-gray-700 font-semibold flex items-center gap-2">
                                    <Building2 className="w-4 h-4 text-blue-600" />
                                    Company Name
                                </Label>
                                
                                <div className="relative">
                                    <Input
                                        type="text"
                                        value={companyName}
                                        className="w-full py-4 px-6 text-lg bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-xl shadow-sm hover:shadow-md focus:shadow-lg transition-all duration-200 focus:border-blue-300 focus:ring-4 focus:ring-blue-100 placeholder:text-gray-400"
                                        placeholder="e.g., JobHunt, Microsoft, TechCorp..."
                                        onChange={(e) => setCompanyName(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                        disabled={isLoading}
                                    />
                                    
                                    {companyName && companyName.length > 0 && (
                                        <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                                            <CheckCircle className="w-5 h-5 text-green-500" />
                                        </div>
                                    )}
                                </div>

                                {/* Character Counter */}
                                <div className="flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-2 text-gray-500">
                                        <AlertCircle className="w-4 h-4" />
                                        <span>Minimum 2 characters required</span>
                                    </div>
                                    <span className={`font-medium ${companyName.length > 50 ? 'text-red-500' : 'text-gray-500'}`}>
                                        {companyName.length}/50
                                    </span>
                                </div>
                            </div>

                            {/* Suggestions */}
                            <div className="bg-gradient-to-r from-orange-50/80 to-yellow-50/80 rounded-2xl p-6 border border-orange-200/50 mb-8">
                                <div className="flex items-start gap-3">
                                    <div className="p-2 bg-orange-100 rounded-lg">
                                        <Lightbulb className="w-5 h-5 text-orange-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-orange-900 mb-2">Naming Tips</h3>
                                        <ul className="text-sm text-orange-800 space-y-1">
                                            <li>• Keep it simple and memorable</li>
                                            <li>• Make it easy to spell and pronounce</li>
                                            <li>• Ensure it reflects your brand identity</li>
                                            <li>• Check if the domain name is available</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row items-center gap-4">
                                <Button 
                                    variant="outline" 
                                    onClick={() => navigate("/admin/companies")}
                                    className="w-full sm:w-auto px-8 py-3 border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 rounded-xl"
                                    disabled={isLoading}
                                >
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    Cancel
                                </Button>
                                
                                <Button 
                                    onClick={registerNewCompany}
                                    disabled={!companyName || companyName.trim().length < 2 || isLoading}
                                    className="w-full sm:flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                >
                                    {isLoading ? (
                                        <div className="flex items-center gap-2">
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            Creating...
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-2">
                                            <span>Continue to Details</span>
                                            <ArrowRight className="w-4 h-4" />
                                            <Sparkles className="w-4 h-4" />
                                        </div>
                                    )}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Benefits Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white/60 backdrop-blur-sm border border-white/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                        <div className="p-3 bg-blue-100 rounded-xl w-fit mb-4">
                            <Users className="w-6 h-6 text-blue-600" />
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">Attract Top Talent</h3>
                        <p className="text-gray-600 text-sm">
                            Build a compelling company profile to attract the best candidates for your open positions.
                        </p>
                    </div>

                    <div className="bg-white/60 backdrop-blur-sm border border-white/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                        <div className="p-3 bg-green-100 rounded-xl w-fit mb-4">
                            <Globe className="w-6 h-6 text-green-600" />
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">Global Reach</h3>
                        <p className="text-gray-600 text-sm">
                            Connect with talented professionals from around the world and expand your team globally.
                        </p>
                    </div>

                    <div className="bg-white/60 backdrop-blur-sm border border-white/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                        <div className="p-3 bg-purple-100 rounded-xl w-fit mb-4">
                            <TrendingUp className="w-6 h-6 text-purple-600" />
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">Grow Your Business</h3>
                        <p className="text-gray-600 text-sm">
                            Scale your operations by finding the right people to drive your company's success forward.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CompanyCreate