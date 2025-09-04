import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen, User, FileText, Award, Briefcase, Download, ExternalLink, Calendar, Star } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'

// const skills = ["Html", "Css", "Javascript", "Reactjs"]
const isResume = true;

const Profile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const {user} = useSelector(store=>store.auth);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <Navbar />
            
            {/* Enhanced Profile Header Card */}
            <div className='max-w-5xl mx-auto pt-24 my-8 p-8'>
                <div className='bg-white/80 backdrop-blur-sm border border-white/50 rounded-3xl shadow-2xl overflow-hidden relative group'>
                    {/* Gradient Background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-3xl"></div>
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
                    
                    <div className="relative z-10 p-8">
                        {/* Profile Header */}
                        <div className='flex justify-between items-start mb-8'>
                            <div className='flex items-center gap-6'>
                                {/* Enhanced Avatar */}
                                <div className="relative group/avatar">
                                    <Avatar className="h-28 w-28 ring-4 ring-blue-100 group-hover/avatar:ring-blue-200 transition-all duration-300">
                                        <AvatarImage 
                                            src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg" 
                                            alt="profile"
                                            className="object-cover"
                                        />
                                    </Avatar>
                                    <div className="absolute inset-0 bg-blue-500/10 rounded-full opacity-0 group-hover/avatar:opacity-100 transition-opacity duration-300 blur-lg"></div>
                                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 border-4 border-white rounded-full flex items-center justify-center">
                                        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                                    </div>
                                </div>
                                
                                <div className="space-y-2">
                                    <h1 className='font-bold text-3xl text-gray-900 bg-gradient-to-r from-gray-800 to-blue-800 bg-clip-text text-transparent'>
                                        {user?.fullname}
                                    </h1>
                                    <p className="text-gray-600 text-lg leading-relaxed max-w-md">
                                        {user?.profile?.bio || "Professional seeking new opportunities"}
                                    </p>
                                    <div className="flex items-center gap-2 text-sm text-gray-500">
                                        <Calendar className="w-4 h-4" />
                                        <span>Member since 2024</span>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Enhanced Edit Button */}
                            <Button 
                                onClick={() => setOpen(true)} 
                                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-blue-200 transition-all duration-300 transform hover:scale-105" 
                                variant="outline"
                            >
                                <Pen className="w-4 h-4 mr-2" />
                                Edit Profile
                            </Button>
                        </div>

                        {/* Contact Information Grid */}
                        <div className='grid md:grid-cols-2 gap-4 mb-8'>
                            <div className='flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-blue-100/50 rounded-xl border border-blue-200/50 hover:shadow-md transition-all duration-300 group/contact'>
                                <div className="p-3 bg-blue-500 rounded-lg group-hover/contact:scale-110 transition-transform duration-300">
                                    <Mail className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 font-medium">Email Address</p>
                                    <span className="text-gray-900 font-semibold">{user?.email}</span>
                                </div>
                            </div>
                            
                            <div className='flex items-center gap-4 p-4 bg-gradient-to-r from-green-50 to-green-100/50 rounded-xl border border-green-200/50 hover:shadow-md transition-all duration-300 group/contact'>
                                <div className="p-3 bg-green-500 rounded-lg group-hover/contact:scale-110 transition-transform duration-300">
                                    <Contact className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 font-medium">Phone Number</p>
                                    <span className="text-gray-900 font-semibold">{user?.phoneNumber}</span>
                                </div>
                            </div>
                        </div>

                        {/* Enhanced Skills Section */}
                        <div className='mb-8 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200/50'>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-purple-100 rounded-lg">
                                    <Award className="w-5 h-5 text-purple-600" />
                                </div>
                                <h2 className='text-xl font-bold text-gray-900'>Skills & Expertise</h2>
                            </div>
                            <div className='flex flex-wrap gap-3'>
                                {user?.profile?.skills?.length !== 0 ? (
                                    user?.profile?.skills.map((item, index) => (
                                        <Badge 
                                            key={index} 
                                            className="px-4 py-2 bg-white border-2 border-purple-200 text-purple-700 font-semibold hover:bg-purple-50 hover:border-purple-300 transition-all duration-200 rounded-full text-sm"
                                        >
                                            <Star className="w-3 h-3 mr-1" />
                                            {item}
                                        </Badge>
                                    ))
                                ) : (
                                    <span className="text-gray-500 italic">No skills added yet</span>
                                )}
                            </div>
                        </div>

                        {/* Enhanced Resume Section */}
                        <div className='p-6 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl border border-orange-200/50'>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-orange-100 rounded-lg">
                                    <FileText className="w-5 h-5 text-orange-600" />
                                </div>
                                <Label className="text-xl font-bold text-gray-900">Resume</Label>
                            </div>
                            
                            {isResume && user?.profile?.resume ? (
                                <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-orange-200 hover:shadow-md transition-all duration-300 group/resume">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-orange-100 rounded-lg">
                                            <Download className="w-4 h-4 text-orange-600" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900">{user?.profile?.resumeOriginalName}</p>
                                            <p className="text-sm text-gray-500">PDF Document</p>
                                        </div>
                                    </div>
                                    <a 
                                        target='blank' 
                                        href={user?.profile?.resume} 
                                        className='flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold hover:underline transition-colors duration-200'
                                    >
                                        View Resume
                                        <ExternalLink className="w-4 h-4" />
                                    </a>
                                </div>
                            ) : (
                                <div className="p-4 bg-white rounded-lg border border-gray-200 text-center">
                                    <p className="text-gray-500 italic">No resume uploaded</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Enhanced Applied Jobs Section */}
            <div className='max-w-5xl mx-auto mb-8 p-8'>
                <div className='bg-white/80 backdrop-blur-sm border border-white/50 rounded-3xl shadow-2xl overflow-hidden'>
                    <div className="bg-gradient-to-r from-gray-50 to-blue-50 px-8 py-6 border-b border-gray-200">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <Briefcase className="w-6 h-6 text-blue-600" />
                            </div>
                            <h2 className='font-bold text-2xl text-gray-900'>Applied Jobs</h2>
                        </div>
                    </div>
                    
                    <div className="p-8">
                        <AppliedJobTable />
                    </div>
                </div>
            </div>

            {/* Profile Update Dialog */}
            <UpdateProfileDialog open={open} setOpen={setOpen}/>
        </div>
    )
}

export default Profile