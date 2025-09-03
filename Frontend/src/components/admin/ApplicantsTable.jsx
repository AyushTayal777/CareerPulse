import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { 
    MoreHorizontal, 
    User, 
    Mail, 
    Phone, 
    FileText, 
    Calendar,
    CheckCircle,
    XCircle,
    Download,
    ExternalLink
} from 'lucide-react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import axios from 'axios';

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
    const { applicants } = useSelector(store => store.application);

    const statusHandler = async (status, id) => {
        console.log('called');
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status });
            console.log(res);
            if (res.data.success) {
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    const getStatusBadge = (status) => {
        const statusLower = status?.toLowerCase();
        if (statusLower === 'accepted' || statusLower === 'approved') {
            return (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                    <CheckCircle className="w-3 h-3" />
                    Accepted
                </span>
            );
        } else if (statusLower === 'rejected' || statusLower === 'declined') {
            return (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">
                    <XCircle className="w-3 h-3" />
                    Rejected
                </span>
            );
        } else {
            return (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800 border border-orange-200">
                    <Calendar className="w-3 h-3" />
                    Pending
                </span>
            );
        }
    };

    return (
        <div className="w-full">
            {/* Enhanced Table Container */}
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-white/50 shadow-lg overflow-hidden">
                <Table>
                    <TableCaption className="text-gray-600 font-medium py-4">
                        Complete list of job applicants with their details and application status
                    </TableCaption>
                    
                    {/* Enhanced Table Header */}
                    <TableHeader>
                        <TableRow className="bg-gradient-to-r from-gray-50/80 to-blue-50/80 border-b border-gray-200/50 hover:bg-gradient-to-r hover:from-gray-100/80 hover:to-blue-100/80 transition-all duration-200">
                            <TableHead className="font-semibold text-gray-700 py-4">
                                <div className="flex items-center gap-2">
                                    <User className="w-4 h-4 text-blue-600" />
                                    Full Name
                                </div>
                            </TableHead>
                            <TableHead className="font-semibold text-gray-700">
                                <div className="flex items-center gap-2">
                                    <Mail className="w-4 h-4 text-green-600" />
                                    Email
                                </div>
                            </TableHead>
                            <TableHead className="font-semibold text-gray-700">
                                <div className="flex items-center gap-2">
                                    <Phone className="w-4 h-4 text-purple-600" />
                                    Contact
                                </div>
                            </TableHead>
                            <TableHead className="font-semibold text-gray-700">
                                <div className="flex items-center gap-2">
                                    <FileText className="w-4 h-4 text-orange-600" />
                                    Resume
                                </div>
                            </TableHead>
                            <TableHead className="font-semibold text-gray-700">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-indigo-600" />
                                    Applied Date
                                </div>
                            </TableHead>
                            <TableHead className="font-semibold text-gray-700">
                                Status
                            </TableHead>
                            <TableHead className="text-right font-semibold text-gray-700">
                                Actions
                            </TableHead>
                        </TableRow>
                    </TableHeader>

                    {/* Enhanced Table Body */}
                    <TableBody>
                        {applicants && applicants?.applications?.map((item, index) => (
                            <TableRow 
                                key={item._id}
                                className={`
                                    border-b border-gray-100/50 hover:bg-gradient-to-r hover:from-blue-50/30 hover:to-purple-50/30 
                                    transition-all duration-300 group
                                    ${index % 2 === 0 ? 'bg-white/30' : 'bg-gray-50/30'}
                                `}
                            >
                                {/* Full Name Cell */}
                                <TableCell className="py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                                            <User className="w-5 h-5 text-blue-600" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900">{item?.applicant?.fullname}</p>
                                            <p className="text-xs text-gray-500">Applicant</p>
                                        </div>
                                    </div>
                                </TableCell>

                                {/* Email Cell */}
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <Mail className="w-4 h-4 text-gray-400" />
                                        <span className="text-gray-700 hover:text-blue-600 transition-colors duration-200">
                                            {item?.applicant?.email}
                                        </span>
                                    </div>
                                </TableCell>

                                {/* Contact Cell */}
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <Phone className="w-4 h-4 text-gray-400" />
                                        <span className="text-gray-700 font-mono text-sm">
                                            {item?.applicant?.phoneNumber}
                                        </span>
                                    </div>
                                </TableCell>

                                {/* Resume Cell */}
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        {item.applicant?.profile?.resume ? (
                                            <a 
                                                className="inline-flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 text-blue-700 rounded-lg border border-blue-200 hover:border-blue-300 transition-all duration-200 text-sm font-medium group"
                                                href={item?.applicant?.profile?.resume} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                            >
                                                <Download className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                                                <span className="max-w-[120px] truncate">
                                                    {item?.applicant?.profile?.resumeOriginalName || 'Resume'}
                                                </span>
                                                <ExternalLink className="w-3 h-3 opacity-70" />
                                            </a>
                                        ) : (
                                            <div className="inline-flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-500 rounded-lg text-sm">
                                                <FileText className="w-4 h-4" />
                                                <span>No Resume</span>
                                            </div>
                                        )}
                                    </div>
                                </TableCell>

                                {/* Date Cell */}
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4 text-gray-400" />
                                        <span className="text-gray-700 font-medium">
                                            {new Date(item?.applicant.createdAt).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric'
                                            })}
                                        </span>
                                    </div>
                                </TableCell>

                                {/* Status Cell */}
                                <TableCell>
                                    {getStatusBadge(item?.status)}
                                </TableCell>

                                {/* Actions Cell */}
                                <TableCell className="text-right">
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 group-hover:bg-white group-hover:shadow-md">
                                                <MoreHorizontal className="w-4 h-4 text-gray-600" />
                                            </button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-48 p-2 bg-white/95 backdrop-blur-sm border border-white/50 shadow-xl rounded-xl">
                                            <div className="space-y-1">
                                                {shortlistingStatus.map((status, statusIndex) => (
                                                    <button
                                                        key={statusIndex}
                                                        onClick={() => statusHandler(status, item?._id)}
                                                        className={`
                                                            w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-all duration-200 text-left
                                                            ${status === 'Accepted' 
                                                                ? 'hover:bg-green-50 hover:text-green-700 text-green-600' 
                                                                : 'hover:bg-red-50 hover:text-red-700 text-red-600'
                                                            }
                                                        `}
                                                    >
                                                        {status === 'Accepted' ? (
                                                            <CheckCircle className="w-4 h-4" />
                                                        ) : (
                                                            <XCircle className="w-4 h-4" />
                                                        )}
                                                        <span className="font-medium">{status}</span>
                                                    </button>
                                                ))}
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                {/* Empty State */}
                {(!applicants?.applications || applicants.applications.length === 0) && (
                    <div className="text-center py-12 bg-gradient-to-br from-gray-50/50 to-blue-50/50">
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                                <User className="w-8 h-8 text-blue-500" />
                            </div>
                            <div>
                                <p className="text-gray-600 font-medium">No applicants found</p>
                                <p className="text-gray-400 text-sm mt-1">
                                    Applications will appear here once candidates apply for this position
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ApplicantsTable