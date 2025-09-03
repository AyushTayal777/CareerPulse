import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'
import { Calendar, Briefcase, Building, Clock, CheckCircle, XCircle, AlertCircle, Search } from 'lucide-react'

const AppliedJobTable = () => {
    const {allAppliedJobs} = useSelector(store=>store.job);

    const getStatusConfig = (status) => {
        switch(status?.toLowerCase()) {
            case 'accepted':
            case 'approved':
                return {
                    bg: 'bg-green-100 border-green-300 text-green-800',
                    icon: CheckCircle,
                    color: 'text-green-600'
                };
            case 'rejected':
                return {
                    bg: 'bg-red-100 border-red-300 text-red-800',
                    icon: XCircle,
                    color: 'text-red-600'
                };
            case 'pending':
            default:
                return {
                    bg: 'bg-yellow-100 border-yellow-300 text-yellow-800',
                    icon: Clock,
                    color: 'text-yellow-600'
                };
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const getDaysAgo = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays === 1 ? '1 day ago' : `${diffDays} days ago`;
    };

    if (allAppliedJobs.length <= 0) {
        return (
            <div className="flex flex-col items-center justify-center py-16 px-8">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                    <Search className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Applications Yet</h3>
                <p className="text-gray-500 text-center max-w-md">
                    You haven't applied to any jobs yet. Start exploring opportunities and apply to jobs that match your skills!
                </p>
            </div>
        );
    }

    return (
        <div className="w-full">
            {/* Enhanced Table Container */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <Table>
                    <TableCaption className="text-base text-gray-600 py-4 bg-gray-50 border-t border-gray-200">
                        <div className="flex items-center justify-center gap-2">
                            <Briefcase className="w-4 h-4" />
                            Showing {allAppliedJobs.length} job application{allAppliedJobs.length !== 1 ? 's' : ''}
                        </div>
                    </TableCaption>
                    
                    {/* Enhanced Table Header */}
                    <TableHeader>
                        <TableRow className="bg-gradient-to-r from-gray-50 to-blue-50 border-b-2 border-gray-200 hover:bg-gray-50">
                            <TableHead className="font-bold text-gray-900 py-4 px-6">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-gray-600" />
                                    Applied Date
                                </div>
                            </TableHead>
                            <TableHead className="font-bold text-gray-900 py-4 px-6">
                                <div className="flex items-center gap-2">
                                    <Briefcase className="w-4 h-4 text-gray-600" />
                                    Job Role
                                </div>
                            </TableHead>
                            <TableHead className="font-bold text-gray-900 py-4 px-6">
                                <div className="flex items-center gap-2">
                                    <Building className="w-4 h-4 text-gray-600" />
                                    Company
                                </div>
                            </TableHead>
                            <TableHead className="text-right font-bold text-gray-900 py-4 px-6">
                                <div className="flex items-center justify-end gap-2">
                                    <AlertCircle className="w-4 h-4 text-gray-600" />
                                    Status
                                </div>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    
                    {/* Enhanced Table Body */}
                    <TableBody>
                        {allAppliedJobs.map((appliedJob, index) => {
                            const statusConfig = getStatusConfig(appliedJob?.status);
                            const StatusIcon = statusConfig.icon;
                            
                            return (
                                <TableRow 
                                    key={appliedJob._id} 
                                    className="hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 transition-all duration-200 border-b border-gray-100 group"
                                >
                                    {/* Date Column */}
                                    <TableCell className="py-6 px-6">
                                        <div className="space-y-1">
                                            <div className="font-semibold text-gray-900">
                                                {formatDate(appliedJob?.createdAt)}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {getDaysAgo(appliedJob?.createdAt)}
                                            </div>
                                        </div>
                                    </TableCell>
                                    
                                    {/* Job Role Column */}
                                    <TableCell className="py-6 px-6">
                                        <div className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors duration-200">
                                            {appliedJob.job?.title}
                                        </div>
                                        <div className="text-sm text-gray-500 mt-1">
                                            Applied for this position
                                        </div>
                                    </TableCell>
                                    
                                    {/* Company Column */}
                                    <TableCell className="py-6 px-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                                                <Building className="w-5 h-5 text-blue-600" />
                                            </div>
                                            <div>
                                                <div className="font-semibold text-gray-900">
                                                    {appliedJob.job?.company?.name}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    Technology Company
                                                </div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    
                                    {/* Status Column */}
                                    <TableCell className="text-right py-6 px-6">
                                        <div className="flex justify-end">
                                            <Badge 
                                                className={`px-4 py-2 rounded-full border-2 font-semibold text-sm flex items-center gap-2 min-w-[120px] justify-center ${statusConfig.bg} hover:scale-105 transition-transform duration-200 shadow-sm`}
                                            >
                                                <StatusIcon className={`w-4 h-4 ${statusConfig.color}`} />
                                                {appliedJob.status.toUpperCase()}
                                            </Badge>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>
            
            {/* Table Summary */}
            <div className="mt-4 text-center text-sm text-gray-500">
                <div className="flex items-center justify-center gap-6">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                        <span>Accepted</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                        <span>Pending</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                        <span>Rejected</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AppliedJobTable