import React, { useEffect, useMemo } from 'react'
import Navbar from '../shared/Navbar'
import ApplicantsTable from './ApplicantsTable'
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAllApplicants } from '@/redux/applicationSlice';
import { 
  Users, 
  FileText, 
  Calendar, 
  TrendingUp, 
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Briefcase,
  ArrowLeft
} from 'lucide-react';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';

const Applicants = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { applicants } = useSelector(store => store.application);

    // Calculate applicant statistics
    const applicantStats = useMemo(() => {
        if (!applicants?.applications) {
            return {
                total: 0,
                pending: 0,
                accepted: 0,
                rejected: 0,
                today: 0
            };
        }

        const today = new Date().toDateString();
        
        return applicants.applications.reduce((acc, application) => {
            acc.total += 1;
            
            // Count by status (adjust field names based on your data structure)
            const status = application.status?.toLowerCase();
            if (status === 'pending' || !status) {
                acc.pending += 1;
            } else if (status === 'accepted' || status === 'approved') {
                acc.accepted += 1;
            } else if (status === 'rejected' || status === 'declined') {
                acc.rejected += 1;
            }
            
            // Count applications from today
            const applicationDate = new Date(application.createdAt).toDateString();
            if (applicationDate === today) {
                acc.today += 1;
            }
            
            return acc;
        }, {
            total: 0,
            pending: 0,
            accepted: 0,
            rejected: 0,
            today: 0
        });
    }, [applicants?.applications]);

    useEffect(() => {
        const fetchAllApplicants = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`, { withCredentials: true });
                dispatch(setAllApplicants(res.data.job));
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllApplicants();
    }, [params.id, dispatch]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <Navbar />
            
            <div className='max-w-7xl mx-auto pt-24 py-8 px-6'>
                {/* Enhanced Header Section */}
                <div className="bg-white/80 backdrop-blur-sm border border-white/50 rounded-3xl shadow-2xl overflow-hidden mb-8">
                    {/* Gradient Top Border */}
                    <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
                    
                    <div className="p-8">
                        {/* Back Button and Page Title */}
                        <div className="flex items-center gap-4 mb-8">
                            <Button
                                variant="outline"
                                onClick={() => navigate('/admin/jobs')}
                                className="p-2 rounded-xl border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
                            >
                                <ArrowLeft className="w-5 h-5" />
                            </Button>
                            
                            <div className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl">
                                <Users className="w-8 h-8 text-blue-600" />
                            </div>
                            
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-gray-800 to-blue-800 bg-clip-text text-transparent">
                                    Job Applicants
                                </h1>
                                <div className="flex items-center gap-2 mt-1">
                                    <p className="text-gray-600">
                                        {applicants?.title && (
                                            <span className="font-semibold text-blue-700">{applicants.title}</span>
                                        )}
                                        {applicants?.company?.name && (
                                            <span className="text-gray-500"> • {applicants.company.name}</span>
                                        )}
                                    </p>
                                </div>
                                <p className="text-sm text-gray-500 mt-1">
                                    {applicantStats.total} {applicantStats.total === 1 ? 'applicant' : 'applicants'} total
                                </p>
                            </div>
                        </div>

                        {/* Dynamic Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                            <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-2xl border border-blue-200 hover:shadow-lg transition-all duration-300">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-blue-500 rounded-lg">
                                        <Users className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-blue-600 font-medium">Total Applicants</p>
                                        <p className="text-2xl font-bold text-blue-900">{applicantStats.total}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-6 rounded-2xl border border-orange-200 hover:shadow-lg transition-all duration-300">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-orange-500 rounded-lg">
                                        <Clock className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-orange-600 font-medium">Pending Review</p>
                                        <p className="text-2xl font-bold text-orange-900">{applicantStats.pending}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-2xl border border-green-200 hover:shadow-lg transition-all duration-300">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-green-500 rounded-lg">
                                        <CheckCircle className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-green-600 font-medium">Accepted</p>
                                        <p className="text-2xl font-bold text-green-900">{applicantStats.accepted}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-6 rounded-2xl border border-purple-200 hover:shadow-lg transition-all duration-300">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-purple-500 rounded-lg">
                                        <Calendar className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-purple-600 font-medium">Today's Applications</p>
                                        <p className="text-2xl font-bold text-purple-900">{applicantStats.today}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Job Details Section */}
                        {applicants && (
                            <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-6 border border-gray-200">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                    <Briefcase className="w-5 h-5 text-blue-600" />
                                    Job Details
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                    {applicants.title && (
                                        <div className="flex items-center gap-2">
                                            <span className="text-gray-500">Position:</span>
                                            <span className="font-semibold text-gray-800">{applicants.title}</span>
                                        </div>
                                    )}
                                    {applicants.company?.name && (
                                        <div className="flex items-center gap-2">
                                            <span className="text-gray-500">Company:</span>
                                            <span className="font-semibold text-gray-800">{applicants.company.name}</span>
                                        </div>
                                    )}
                                    {applicants.location && (
                                        <div className="flex items-center gap-2">
                                            <span className="text-gray-500">Location:</span>
                                            <span className="font-semibold text-gray-800">{applicants.location}</span>
                                        </div>
                                    )}
                                    {applicants.createdAt && (
                                        <div className="flex items-center gap-2">
                                            <span className="text-gray-500">Posted:</span>
                                            <span className="font-semibold text-gray-800">
                                                {new Date(applicants.createdAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                    )}
                                    {applicants.salary && (
                                        <div className="flex items-center gap-2">
                                            <span className="text-gray-500">Salary:</span>
                                            <span className="font-semibold text-gray-800">{applicants.salary}</span>
                                        </div>
                                    )}
                                    {applicants.jobType && (
                                        <div className="flex items-center gap-2">
                                            <span className="text-gray-500">Type:</span>
                                            <span className="font-semibold text-gray-800">{applicants.jobType}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Enhanced Table Container */}
                <div className="bg-white/80 backdrop-blur-sm border border-white/50 rounded-3xl shadow-2xl overflow-hidden">
                    {/* Table Header */}
                    <div className="bg-gradient-to-r from-gray-50 to-blue-50 px-8 py-6 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-100 rounded-lg">
                                    <FileText className="w-5 h-5 text-blue-600" />
                                </div>
                                <h2 className="text-xl font-bold text-gray-900">
                                    Applicant Details
                                    {applicantStats.total > 0 && (
                                        <span className="text-base font-medium text-gray-600 ml-2">
                                            ({applicantStats.total} {applicantStats.total === 1 ? 'application' : 'applications'})
                                        </span>
                                    )}
                                </h2>
                            </div>
                            
                            {applicantStats.total > 0 && (
                                <div className="flex items-center gap-4 text-sm">
                                    <div className="flex items-center gap-1">
                                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                                        <span className="text-gray-600">Pending: {applicantStats.pending}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                        <span className="text-gray-600">Accepted: {applicantStats.accepted}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Table Content */}
                    <div className="p-8">
                        {applicants?.applications && applicants.applications.length > 0 ? (
                            <ApplicantsTable />
                        ) : (
                            <div className="text-center py-12">
                                <div className="flex flex-col items-center gap-4">
                                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                                        <Users className="w-8 h-8 text-gray-400" />
                                    </div>
                                    <div>
                                        <p className="text-gray-500 font-medium">No applications yet</p>
                                        <p className="text-gray-400 text-sm mt-1">
                                            Applications will appear here once candidates start applying
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Summary Cards */}
                {applicants?.applications && applicants.applications.length > 0 && (
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white/80 backdrop-blur-sm border border-white/50 rounded-2xl p-6 shadow-lg">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Status</h3>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4 text-orange-600" />
                                        <span className="text-gray-700">Pending Review</span>
                                    </div>
                                    <span className="font-semibold text-orange-600">{applicantStats.pending}</span>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                                    <div className="flex items-center gap-2">
                                        <CheckCircle className="w-4 h-4 text-green-600" />
                                        <span className="text-gray-700">Accepted</span>
                                    </div>
                                    <span className="font-semibold text-green-600">{applicantStats.accepted}</span>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                                    <div className="flex items-center gap-2">
                                        <XCircle className="w-4 h-4 text-red-600" />
                                        <span className="text-gray-700">Rejected</span>
                                    </div>
                                    <span className="font-semibold text-red-600">{applicantStats.rejected}</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white/80 backdrop-blur-sm border border-white/50 rounded-2xl p-6 shadow-lg">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Insights</h3>
                            <div className="space-y-3 text-sm">
                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <span className="text-gray-700">Total Applications</span>
                                    <span className="font-semibold text-blue-600">{applicantStats.total}</span>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <span className="text-gray-700">Today's Applications</span>
                                    <span className="font-semibold text-purple-600">{applicantStats.today}</span>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <span className="text-gray-700">Acceptance Rate</span>
                                    <span className="font-semibold text-green-600">
                                        {applicantStats.total > 0 ? Math.round((applicantStats.accepted / applicantStats.total) * 100) : 0}%
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Applicants