import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { 
    MapPin, 
    IndianRupee, 
    Clock, 
    Users, 
    Calendar, 
    Briefcase, 
    CheckCircle,
    Building,
    Star,
    TrendingUp
} from 'lucide-react';

const JobDescription = () => {
    const {singleJob} = useSelector(store => store.job);
    const {user} = useSelector(store=>store.auth);
    const isIntiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isIntiallyApplied);

    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {withCredentials:true});
            
            if(res.data.success){
                setIsApplied(true);
                const updatedSingleJob = {...singleJob, applications:[...singleJob.applications,{applicant:user?._id}]}
                dispatch(setSingleJob(updatedSingleJob));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    useEffect(()=>{
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`,{withCredentials:true});
                if(res.data.success){
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(application=>application.applicant === user?._id))
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSingleJob(); 
    },[jobId,dispatch, user?._id]);

    const getApplicantCount = () => {
        const count = singleJob?.applications?.length || 0;
        if (count === 0) return "Be the first applicant";
        if (count === 1) return "1 applicant";
        return `${count} applicants`;
    };

    const getDaysAgo = () => {
        if (!singleJob?.createdAt) return "";
        const createdAt = new Date(singleJob.createdAt);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        const days = Math.floor(timeDifference/(1000*24*60*60));
        return days === 0 ? "Posted today" : `Posted ${days} days ago`;
    };

    return (
        <div className='max-w-6xl mx-auto my-10 p-6'>
            {/* Enhanced Header Section */}
            <div className='bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden mb-8'>
                {/* Gradient Header */}
                <div className="h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
                
                <div className='p-8'>
                    <div className='flex items-start justify-between mb-6'>
                        <div className="flex-1">
                            {/* Job Title with Icon */}
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-3 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl">
                                    <Briefcase className="w-6 h-6 text-blue-600" />
                                </div>
                                <h1 className='font-bold text-3xl text-gray-900 leading-tight'>
                                    {singleJob?.title}
                                </h1>
                            </div>
                            
                            {/* Enhanced Badges */}
                            <div className='flex flex-wrap items-center gap-3'>
                                <Badge className="px-4 py-2 text-blue-700 bg-blue-50 font-semibold border border-blue-200 hover:bg-blue-100 transition-colors duration-200 rounded-full text-sm">
                                    <Users className="w-4 h-4 mr-2" />
                                    {singleJob?.postion} Positions
                                </Badge>
                                <Badge className="px-4 py-2 text-orange-700 bg-orange-50 font-semibold border border-orange-200 hover:bg-orange-100 transition-colors duration-200 rounded-full text-sm">
                                    <Clock className="w-4 h-4 mr-2" />
                                    {singleJob?.jobType}
                                </Badge>
                                <Badge className="px-4 py-2 text-purple-700 bg-purple-50 font-semibold border border-purple-200 hover:bg-purple-100 transition-colors duration-200 rounded-full text-sm">
                                    <IndianRupee  className="w-4 h-4 mr-2" />
                                    {singleJob?.salary}LPA
                                </Badge>
                            </div>
                        </div>
                        
                        {/* Enhanced Apply Button */}
                        <div className="ml-8">
                            <Button
                                onClick={isApplied ? null : applyJobHandler}
                                disabled={isApplied}
                                className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg ${
                                    isApplied 
                                        ? 'bg-green-500 text-white cursor-default hover:scale-100 shadow-green-200' 
                                        : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-purple-200 hover:shadow-xl'
                                }`}
                            >
                                {isApplied ? (
                                    <div className="flex items-center gap-2">
                                        <CheckCircle className="w-5 h-5" />
                                        Already Applied
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2">
                                        <Star className="w-5 h-5" />
                                        Apply Now
                                    </div>
                                )}
                            </Button>
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="flex items-center gap-6 text-sm text-gray-600 bg-gray-50 rounded-xl p-4">
                        <div className="flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-green-600" />
                            <span className="font-medium">{getApplicantCount()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-blue-600" />
                            <span className="font-medium">{getDaysAgo()}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Enhanced Job Description Section */}
            <div className='bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden'>
                {/* Section Header */}
                <div className="bg-gradient-to-r from-gray-50 to-blue-50 px-8 py-6 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <Building className="w-5 h-5 text-blue-600" />
                        </div>
                        <h2 className='text-2xl font-bold text-gray-900'>Job Details</h2>
                    </div>
                </div>

                {/* Enhanced Job Details Grid */}
                <div className='p-8'>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Job Info Items */}
                        {[
                            { label: 'Role', value: singleJob?.title, icon: Briefcase, color: 'blue' },
                            { label: 'Location', value: singleJob?.location, icon: MapPin, color: 'green' },
                            { label: 'Experience', value: `${singleJob?.experience} yrs`, icon: TrendingUp, color: 'purple' },
                            { label: 'Salary', value: `${singleJob?.salary}LPA`, icon: IndianRupee , color: 'orange' },
                            { label: 'Total Applicants', value: singleJob?.applications?.length, icon: Users, color: 'pink' },
                            { label: 'Posted Date', value: singleJob?.createdAt?.split("T")[0], icon: Calendar, color: 'indigo' }
                        ].map((item, index) => (
                            <div key={index} className="group p-6 bg-gray-50 hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 rounded-xl border border-gray-200 hover:border-blue-200 transition-all duration-300">
                                <div className="flex items-start gap-4">
                                    <div className={`p-3 bg-${item.color}-100 rounded-lg group-hover:scale-110 transition-transform duration-300`}>
                                        <item.icon className={`w-5 h-5 text-${item.color}-600`} />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-gray-900 mb-1 text-lg">
                                            {item.label}
                                        </h3>
                                        <p className="text-gray-700 font-medium">
                                            {item.value}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Description Section */}
                    <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <Briefcase className="w-5 h-5 text-blue-600" />
                            </div>
                            <h3 className="font-bold text-xl text-gray-900">Job Description</h3>
                        </div>
                        <p className="text-gray-700 leading-relaxed text-lg">
                            {singleJob?.description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default JobDescription