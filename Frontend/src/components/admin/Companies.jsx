import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '@/redux/companySlice'
import { 
    Building2, 
    Search, 
    Plus, 
    Filter,
    Users,
    TrendingUp,
    Globe,
    Sparkles
} from 'lucide-react'

const Companies = () => {
    useGetAllCompanies();
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSearchCompanyByText(input));
    }, [input]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <Navbar />
            
            <div className='max-w-7xl mx-auto pt-24 py-8 px-6'>
                {/* Enhanced Header Section */}
                <div className="bg-white/80 backdrop-blur-sm border border-white/50 rounded-3xl shadow-2xl overflow-hidden mb-8">
                    {/* Gradient Top Border */}
                    <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
                    
                    <div className="p-8">
                        {/* Page Title */}
                        <div className="flex items-center gap-4 mb-8">
                            <div className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl">
                                <Building2 className="w-8 h-8 text-blue-600" />
                            </div>
                            
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-gray-800 to-blue-800 bg-clip-text text-transparent">
                                    Companies Management
                                </h1>
                                <p className="text-gray-600 mt-1">
                                    Manage and organize your company partnerships
                                </p>
                            </div>
                        </div>

                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                            <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-2xl border border-blue-200 hover:shadow-lg transition-all duration-300">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-blue-500 rounded-lg">
                                        <Building2 className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-blue-600 font-medium">Total Companies</p>
                                        <p className="text-2xl font-bold text-blue-900">--</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-2xl border border-green-200 hover:shadow-lg transition-all duration-300">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-green-500 rounded-lg">
                                        <Users className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-green-600 font-medium">Active Partners</p>
                                        <p className="text-2xl font-bold text-green-900">--</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-6 rounded-2xl border border-purple-200 hover:shadow-lg transition-all duration-300">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-purple-500 rounded-lg">
                                        <TrendingUp className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-purple-600 font-medium">Growth Rate</p>
                                        <p className="text-2xl font-bold text-purple-900">--</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-6 rounded-2xl border border-orange-200 hover:shadow-lg transition-all duration-300">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-orange-500 rounded-lg">
                                        <Globe className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-orange-600 font-medium">Global Reach</p>
                                        <p className="text-2xl font-bold text-orange-900">--</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Enhanced Action Bar */}
                        <div className="bg-gradient-to-r from-gray-50/80 to-blue-50/80 rounded-2xl p-6 border border-gray-200/50">
                            <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4'>
                                {/* Search Section */}
                                <div className="flex items-center gap-4 flex-1">
                                    <div className="relative flex-1 max-w-md">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Search className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <Input
                                            className="w-full pl-10 pr-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl shadow-sm hover:shadow-md focus:shadow-lg transition-all duration-200 focus:border-blue-300 focus:ring-2 focus:ring-blue-100"
                                            placeholder="Search companies by name..."
                                            value={input}
                                            onChange={(e) => setInput(e.target.value)}
                                        />
                                    </div>
                                    
                                    {/* Filter Indicator */}
                                    {input && (
                                        <div className="flex items-center gap-2 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium">
                                            <Filter className="w-4 h-4" />
                                            <span>Filtering: "{input}"</span>
                                            <button 
                                                onClick={() => setInput("")}
                                                className="ml-1 text-blue-500 hover:text-blue-700"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {/* Action Button */}
                                <Button 
                                    onClick={() => navigate("/admin/companies/create")}
                                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center gap-2"
                                >
                                    <Plus className="w-5 h-5" />
                                    <span>New Company</span>
                                    <Sparkles className="w-4 h-4" />
                                </Button>
                            </div>

                            {/* Quick Actions */}
                            <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-200/50">
                                <span className="text-sm text-gray-600 font-medium">Quick Actions:</span>
                                <div className="flex items-center gap-2">
                                    <button className="px-3 py-1 text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors duration-200">
                                        View All
                                    </button>
                                    <button className="px-3 py-1 text-xs font-medium text-green-600 bg-green-50 hover:bg-green-100 rounded-lg transition-colors duration-200">
                                        Active Only
                                    </button>
                                    <button className="px-3 py-1 text-xs font-medium text-purple-600 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors duration-200">
                                        Recent
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Enhanced Table Container */}
                <div className="bg-white/80 backdrop-blur-sm border border-white/50 rounded-3xl shadow-2xl overflow-hidden">
                    {/* Table Header */}
                    <div className="bg-gradient-to-r from-gray-50 to-blue-50 px-8 py-6 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-100 rounded-lg">
                                    <Building2 className="w-5 h-5 text-blue-600" />
                                </div>
                                <h2 className="text-xl font-bold text-gray-900">
                                    Companies Directory
                                </h2>
                            </div>
                            
                            <div className="flex items-center gap-4 text-sm">
                                <div className="flex items-center gap-1">
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    <span className="text-gray-600">Active Companies</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                    <span className="text-gray-600">All Records</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Table Content */}
                    <div className="p-8">
                        <CompaniesTable />
                    </div>
                </div>

                {/* Footer Info */}
                <div className="mt-8 text-center">
                    <p className="text-gray-500 text-sm">
                        Manage your company partnerships and track performance metrics
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Companies