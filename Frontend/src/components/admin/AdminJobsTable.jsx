import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, Eye, MoreHorizontal, Building2, Calendar, Briefcase } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AdminJobsTable = () => {
    const {allAdminJobs, searchJobByText} = useSelector(store=>store.job);
    const [filterJobs, setFilterJobs] = useState(allAdminJobs);
    const navigate = useNavigate();

    useEffect(()=>{
        console.log('called');
        const filteredJobs = allAdminJobs.filter((job)=>{
            if(!searchJobByText){
                return true;
            };
            return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase());
        });
        setFilterJobs(filteredJobs);
    },[allAdminJobs,searchJobByText])

    return (
        <div className="w-full">
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                        <Briefcase className="w-5 h-5 text-blue-600" />
                        Job Management Dashboard
                    </h2>
                    <p className="text-sm text-gray-600 mt-1">Manage and monitor your posted job listings</p>
                </div>
                
                <Table>
                    <TableCaption className="text-gray-500 py-4 bg-gray-50">
                        {filterJobs?.length > 0 ? 
                            `Showing ${filterJobs.length} job${filterJobs.length !== 1 ? 's' : ''}` : 
                            'No jobs found matching your criteria'
                        }
                    </TableCaption>
                    
                    <TableHeader>
                        <TableRow className="bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-150 border-b-2 border-gray-200">
                            <TableHead className="font-semibold text-gray-700 py-4">
                                <div className="flex items-center gap-2">
                                    <Building2 className="w-4 h-4 text-blue-600" />
                                    Company Name
                                </div>
                            </TableHead>
                            <TableHead className="font-semibold text-gray-700 py-4">
                                <div className="flex items-center gap-2">
                                    <Briefcase className="w-4 h-4 text-green-600" />
                                    Role
                                </div>
                            </TableHead>
                            <TableHead className="font-semibold text-gray-700 py-4">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-purple-600" />
                                    Date Posted
                                </div>
                            </TableHead>
                            <TableHead className="text-right font-semibold text-gray-700 py-4">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    
                    <TableBody>
                        {filterJobs?.map((job, index) => (
                            <TableRow 
                                key={job._id || index}
                                className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200 border-b border-gray-100 group"
                            >
                                <TableCell className="py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-md">
                                            {job?.company?.name?.charAt(0)?.toUpperCase() || 'C'}
                                        </div>
                                        <div>
                                            <div className="font-semibold text-gray-800 group-hover:text-blue-700 transition-colors">
                                                {job?.company?.name}
                                            </div>
                                            <div className="text-xs text-gray-500">Company</div>
                                        </div>
                                    </div>
                                </TableCell>
                                
                                <TableCell className="py-4">
                                    <div className="flex flex-col">
                                        <span className="font-medium text-gray-800 group-hover:text-indigo-700 transition-colors">
                                            {job?.title}
                                        </span>
                                        <span className="text-xs text-gray-500 mt-1">Position</span>
                                    </div>
                                </TableCell>
                                
                                <TableCell className="py-4">
                                    <div className="flex flex-col">
                                        <span className="font-medium text-gray-700">
                                            {job?.createdAt.split("T")[0]}
                                        </span>
                                        <span className="text-xs text-gray-500 mt-1">Created</span>
                                    </div>
                                </TableCell>
                                
                                <TableCell className="text-right py-4">
                                    <Popover>
                                        <PopoverTrigger className="hover:bg-gray-100 p-2 rounded-full transition-colors duration-200 inline-flex items-center justify-center">
                                            <MoreHorizontal className="w-5 h-5 text-gray-600 hover:text-gray-800" />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-48 p-2 bg-white shadow-xl border border-gray-200 rounded-lg">
                                            <div 
                                                onClick={() => navigate(`/admin/companies/${job._id}`)} 
                                                className="flex items-center gap-3 px-3 py-2 hover:bg-blue-50 rounded-md cursor-pointer transition-colors duration-200 group"
                                            >
                                                <Edit2 className="w-4 h-4 text-blue-600 group-hover:text-blue-700" />
                                                <span className="text-sm font-medium text-gray-700 group-hover:text-blue-700">Edit Job</span>
                                            </div>
                                            <div 
                                                onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)} 
                                                className="flex items-center gap-3 px-3 py-2 hover:bg-green-50 rounded-md cursor-pointer transition-colors duration-200 group mt-1"
                                            >
                                                <Eye className="w-4 h-4 text-green-600 group-hover:text-green-700" />
                                                <span className="text-sm font-medium text-gray-700 group-hover:text-green-700">View Applicants</span>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        ))}
                        
                        {filterJobs?.length === 0 && (
                            <TableRow>
                                <TableCell colSpan="4" className="text-center py-12">
                                    <div className="flex flex-col items-center gap-4">
                                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                                            <Briefcase className="w-8 h-8 text-gray-400" />
                                        </div>
                                        <div>
                                            <p className="text-gray-500 font-medium">No jobs found</p>
                                            <p className="text-gray-400 text-sm mt-1">Try adjusting your search criteria</p>
                                        </div>
                                    </div>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default AdminJobsTable