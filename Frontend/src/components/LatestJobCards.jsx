import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
import { Building2, MapPin, Clock, IndianRupee, Users, Briefcase } from 'lucide-react'

const LatestJobCards = ({job}) => {
    const navigate = useNavigate();
    
    const getJobTypeIcon = (jobType) => {
        switch(jobType?.toLowerCase()) {
            case 'full time': case 'full-time': return <Briefcase className="w-3 h-3" />;
            case 'part time': case 'part-time': return <Clock className="w-3 h-3" />;
            default: return <Briefcase className="w-3 h-3" />;
        }
    };

    const truncateDescription = (text, maxLength = 120) => {
        if (text?.length <= maxLength) return text;
        return text?.substring(0, maxLength) + '...';
    };

    return (
        <div 
            onClick={() => navigate(`/description/${job._id}`)} 
            className='group p-6 rounded-2xl shadow-md bg-white border border-gray-100 cursor-pointer hover:shadow-xl hover:border-gray-200 transition-all duration-300 hover:-translate-y-1'
        >
            {/* Company Header */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <Building2 className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                            <h1 className='font-bold text-lg text-gray-800 group-hover:text-purple-600 transition-colors duration-300'>
                                {job?.company?.name}
                            </h1>
                            <div className="flex items-center gap-1 text-gray-500">
                                <MapPin className="w-3 h-3" />
                                <p className='text-sm'>India</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Featured Badge */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 text-purple-600 px-2 py-1 rounded-full text-xs font-medium">
                    New
                </div>
            </div>

            {/* Job Details */}
            <div className="mb-4">
                <h1 className='font-bold text-xl text-gray-800 mb-3 group-hover:text-gray-900 transition-colors duration-300'>
                    {job?.title}
                </h1>
                <p className='text-sm text-gray-600 leading-relaxed line-clamp-3'>
                    {truncateDescription(job?.description)}
                </p>
            </div>

            {/* Badges */}
            <div className='flex flex-wrap items-center gap-2'>
                {/* Positions Badge */}
                <Badge className="bg-blue-50 text-blue-700 hover:bg-blue-100 font-semibold border-blue-200 px-3 py-1 rounded-full flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {job?.position} Positions
                </Badge>

                {/* Job Type Badge */}
                <Badge className="bg-orange-50 text-orange-700 hover:bg-orange-100 font-semibold border-orange-200 px-3 py-1 rounded-full flex items-center gap-1">
                    {getJobTypeIcon(job?.jobType)}
                    {job?.jobType}
                </Badge>

                {/* Salary Badge */}
                <Badge className="bg-green-50 text-green-700 hover:bg-green-100 font-semibold border-green-200 px-3 py-1 rounded-full flex items-center gap-1">
                    <IndianRupee className="w-3 h-3" />
                    {job?.salary} LPA
                </Badge>
            </div>

            {/* Bottom Action Indicator */}
            <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                <div className="text-xs text-gray-500">
                    Click to view details
                </div>
                <div className="text-purple-600 font-medium text-sm group-hover:translate-x-1 transition-transform duration-300">
                    View Job →
                </div>
            </div>
        </div>
    )
}

export default LatestJobCards