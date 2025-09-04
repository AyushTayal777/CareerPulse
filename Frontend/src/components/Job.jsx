import React from 'react'
import { Button } from './ui/button'
import { Bookmark, MapPin, Clock, Briefcase } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const Job = ({job}) => {
    const navigate = useNavigate();
    
    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference/(1000*24*60*60));
    }
    
    const daysAgo = daysAgoFunction(job?.createdAt);
    const isNew = daysAgo === 0;
    
    return (
        <div className='group relative p-6 rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 overflow-hidden'>
            {/* Gradient Border Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* New Job Indicator */}
            {isNew && (
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-500 rounded-full animate-pulse shadow-lg">
                    <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75"></div>
                </div>
            )}
            
            <div className="relative z-10">
                {/* Header Section */}
                <div className='flex items-center justify-between mb-4'>
                    <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <p className={`text-sm font-medium ${isNew ? 'text-green-600 font-semibold' : 'text-gray-500'}`}>
                            {isNew ? "🔥 Posted Today" : `${daysAgo} days ago`}
                        </p>
                    </div>
                    
                </div>

                {/* Company Section */}
                <div className='flex items-center gap-4 mb-4'>
                    <div className="relative group/avatar">
                        <Button className="p-3 h-auto w-auto bg-gradient-to-br from-gray-50 to-gray-100 hover:from-blue-50 hover:to-purple-50 border-2 border-gray-200 hover:border-blue-300 transition-all duration-300" variant="outline">
                            <Avatar className="w-12 h-12">
                                <AvatarImage src={job?.company?.logo} className="object-cover" />
                            </Avatar>
                        </Button>
                        <div className="absolute inset-0 bg-blue-500/20 rounded-full opacity-0 group-hover/avatar:opacity-100 transition-opacity duration-300 blur-lg"></div>
                    </div>
                    <div className="flex-1">
                        <h1 className='font-bold text-xl text-gray-800 group-hover:text-blue-800 transition-colors duration-300'>
                            {job?.company?.name}
                        </h1>
                        <div className="flex items-center gap-1 text-gray-500">
                            <MapPin className="w-4 h-4" />
                            <p className='text-sm'>India</p>
                        </div>
                    </div>
                </div>

                {/* Job Details Section */}
                <div className="mb-5">
                    <h1 className='font-bold text-xl mb-3 text-gray-900 group-hover:text-blue-900 transition-colors duration-300 leading-tight'>
                        {job?.title}
                    </h1>
                    <p className='text-gray-600 leading-relaxed line-clamp-3 group-hover:text-gray-700 transition-colors duration-300'>
                        {job?.description}
                    </p>
                </div>

                {/* Badges Section */}
                <div className='flex flex-wrap items-center gap-3 mb-6'>
                    <Badge className="px-3 py-1 text-blue-700 bg-blue-50 font-semibold border border-blue-200 hover:bg-blue-100 transition-colors duration-200 rounded-full" variant="ghost">
                        <Briefcase className="w-3 h-3 mr-1" />
                        {job?.position} Positions
                    </Badge>
                    <Badge className="px-3 py-1 text-orange-700 bg-orange-50 font-semibold border border-orange-200 hover:bg-orange-100 transition-colors duration-200 rounded-full" variant="ghost">
                        {job?.jobType}
                    </Badge>
                    <Badge className="px-3 py-1 text-purple-700 bg-purple-50 font-semibold border border-purple-200 hover:bg-purple-100 transition-colors duration-200 rounded-full" variant="ghost">
                        💰 {job?.salary}LPA
                    </Badge>
                </div>

                {/* Action Buttons - EXACT SAME FUNCTIONALITY */}
                <div className='flex items-center gap-3'>
                    <Button 
                        onClick={() => navigate(`/description/${job?._id}`)} 
                        variant="outline"
                        className="flex-1 border-2 border-gray-300 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700 transition-all duration-300 font-semibold rounded-xl"
                    >
                        Details
                    </Button>
                    
                </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-500/5 via-purple-500/5 to-transparent rounded-full transform translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-700"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-500/5 via-pink-500/5 to-transparent rounded-full transform -translate-x-12 translate-y-12 group-hover:scale-150 transition-transform duration-700"></div>
        </div>
    )
}

export default Job