import React, { useEffect, useState, useMemo } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import AdminJobsTable from './AdminJobsTable'
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs'
import { setSearchJobByText } from '@/redux/jobSlice'
import { 
  Search, 
  Plus, 
  Briefcase, 
  Filter, 
  Users, 
  TrendingUp,
  Building,
  Calendar
} from 'lucide-react'

const AdminJobs = () => {
  useGetAllAdminJobs();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Get jobs data from Redux store
  const { allAdminJobs } = useSelector(store => store.job);

  // Calculate dynamic stats from actual job data
  const jobStats = useMemo(() => {
    if (!allAdminJobs || allAdminJobs.length === 0) {
      return {
        totalJobs: 0,
        activeJobs: 0,
        totalApplications: 0,
        thisMonth: 0
      };
    }

    const now = new Date();
    const thisMonth = now.getMonth();
    const thisYear = now.getFullYear();

    const stats = allAdminJobs.reduce((acc, job) => {
      // Count total jobs
      acc.totalJobs += 1;
      
      // Count active jobs (you might have a status field)
      // Assuming jobs are active if they exist, adjust based on your data structure
      acc.activeJobs += 1;
      
      // Count applications (sum up applications for each job)
      if (job.applications && Array.isArray(job.applications)) {
        acc.totalApplications += job.applications.length;
      }
      
      // Count jobs created this month
      const jobDate = new Date(job.createdAt);
      if (jobDate.getMonth() === thisMonth && jobDate.getFullYear() === thisYear) {
        acc.thisMonth += 1;
      }
      
      return acc;
    }, {
      totalJobs: 0,
      activeJobs: 0,
      totalApplications: 0,
      thisMonth: 0
    });

    return stats;
  }, [allAdminJobs]);

  // Filter jobs based on search input
  const filteredJobs = useMemo(() => {
    if (!allAdminJobs) return [];
    if (!input) return allAdminJobs;
    
    return allAdminJobs.filter((job) => {
      return job?.title?.toLowerCase().includes(input.toLowerCase()) || 
             job?.company?.name?.toLowerCase().includes(input.toLowerCase());
    });
  }, [allAdminJobs, input]);

  useEffect(() => {
    dispatch(setSearchJobByText(input));
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
                <Briefcase className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-gray-800 to-blue-800 bg-clip-text text-transparent">
                  Job Management
                </h1>
                <p className="text-gray-600 mt-1">Manage and monitor all your job postings</p>
              </div>
            </div>

            {/* Dynamic Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-2xl border border-blue-200 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500 rounded-lg">
                    <Briefcase className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-blue-600 font-medium">Total Jobs</p>
                    <p className="text-2xl font-bold text-blue-900">{jobStats.totalJobs}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-2xl border border-green-200 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-500 rounded-lg">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-green-600 font-medium">Active Jobs</p>
                    <p className="text-2xl font-bold text-green-900">{jobStats.activeJobs}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-6 rounded-2xl border border-orange-200 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-500 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-orange-600 font-medium">Applications</p>
                    <p className="text-2xl font-bold text-orange-900">{jobStats.totalApplications}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-6 rounded-2xl border border-purple-200 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-500 rounded-lg">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-purple-600 font-medium">This Month</p>
                    <p className="text-2xl font-bold text-purple-900">{jobStats.thisMonth}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Search and Action Bar */}
            <div className='flex flex-col md:flex-row items-center justify-between gap-6 p-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl border border-gray-200'>
              {/* Search Section */}
              <div className="flex items-center gap-4 flex-1 w-full md:w-auto">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Filter className="w-5 h-5 text-blue-600" />
                </div>
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    className="pl-12 pr-4 py-3 w-full border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200 bg-white"
                    placeholder="Search by job title, company, or role..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                  />
                  {input && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <Button 
                onClick={() => navigate("/admin/jobs/create")}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-blue-200 transition-all duration-300 transform hover:scale-105 font-semibold"
              >
                <Plus className="w-5 h-5 mr-2" />
                Create New Job
              </Button>
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
                  <Building className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">
                  All Job Postings 
                  {filteredJobs.length > 0 && (
                    <span className="text-base font-medium text-gray-600 ml-2">
                      ({filteredJobs.length} {filteredJobs.length === 1 ? 'job' : 'jobs'})
                    </span>
                  )}
                </h2>
              </div>
              {input && (
                <div className="flex items-center gap-2 text-sm text-blue-600">
                  <Search className="w-4 h-4" />
                  <span>Searching for "{input}"</span>
                </div>
              )}
            </div>
          </div>

          {/* Table Content */}
          <div className="p-8">
            <AdminJobsTable />
          </div>
        </div>

        {/* Additional Info Cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/80 backdrop-blur-sm border border-white/50 rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Button 
                variant="ghost" 
                className="w-full justify-start hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200"
                onClick={() => navigate("/admin/jobs/create")}
              >
                <Plus className="w-4 h-4 mr-2" />
                Post New Job
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start hover:bg-purple-50 hover:text-purple-700 transition-colors duration-200"
              >
                <Users className="w-4 h-4 mr-2" />
                View Applications ({jobStats.totalApplications})
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start hover:bg-green-50 hover:text-green-700 transition-colors duration-200"
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                Analytics Dashboard
              </Button>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm border border-white/50 rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Job Overview</h3>
            <div className="space-y-3 text-sm">
              {allAdminJobs && allAdminJobs.length > 0 ? (
                <>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Total Posted</span>
                    <span className="font-semibold text-blue-600">{jobStats.totalJobs}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Total Applications</span>
                    <span className="font-semibold text-green-600">{jobStats.totalApplications}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Posted This Month</span>
                    <span className="font-semibold text-purple-600">{jobStats.thisMonth}</span>
                  </div>
                  {input && (
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <span className="text-gray-700">Search Results</span>
                      <span className="font-semibold text-blue-600">{filteredJobs.length}</span>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center p-4">
                  <p className="text-gray-500">No jobs posted yet</p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => navigate("/admin/jobs/create")}
                    className="mt-2"
                  >
                    Post Your First Job
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminJobs