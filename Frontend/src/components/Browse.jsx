import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';

// const randomJobs = [1, 2,45];

const Browse = () => {
    useGetAllJobs();
    const {allJobs} = useSelector(store=>store.job);
    const dispatch = useDispatch();
    useEffect(()=>{
        return ()=>{
            dispatch(setSearchedQuery(""));
        }
    },[])
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
            <Navbar />
            
            {/* Enhanced Container */}
            <div className="relative overflow-hidden pt-20">
                {/* Background Effects */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-pink-600/5"></div>
                <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute top-0 right-0 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
                
                <div className='max-w-7xl mx-auto px-6 py-12 relative z-10'>
                    {/* Enhanced Header */}
                    <div className="text-center mb-12">
                        <h1 className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent mb-6'>
                            Search Results ({allJobs.length})
                        </h1>
                        
                        <div className="flex items-center justify-center gap-6 text-gray-600 mb-8">
                            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-200/50">
                                <span className="font-semibold text-2xl text-blue-600">{allJobs.length}</span>
                                <span>Opportunities Available</span>
                            </div>
                        </div>
                        
                        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto"></div>
                    </div>
                    
                    {/* Enhanced Job Grid */}
                    <div className="relative">
                        {/* Grid Background Pattern */}
                        <div className="absolute inset-0 opacity-20">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-full">
                                {Array.from({ length: 6 }).map((_, i) => (
                                    <div key={i} className="border border-blue-100/50 rounded-xl"></div>
                                ))}
                            </div>
                        </div>
                        
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10'>
                            {
                                allJobs.map((job, index) => {
                                    return (
                                        <div key={job._id} 
                                             className="group transform transition-all duration-500 hover:scale-105"
                                             style={{ 
                                                 animationDelay: `${index * 100}ms`,
                                                 animation: 'fadeInUp 0.6s ease-out forwards'
                                             }}>
                                            <div className="relative">
                                                {/* Card Glow Effect */}
                                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                                
                                                {/* Enhanced Job Card Wrapper */}
                                                <div className="relative bg-white/90 backdrop-blur-sm border border-white/50 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
                                                    {/* Gradient Top Border */}
                                                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
                                                    
                                                    {/* Card Content */}
                                                    <div className="p-2 relative z-10">
                                                        <Job key={job._id} job={job}/>
                                                    </div>
                                                    
                                                    {/* Hover Overlay */}
                                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        
                        {/* Enhanced Empty State */}
                        {allJobs.length === 0 && (
                            <div className="text-center py-20">
                                <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg"></div>
                                </div>
                                <h3 className="text-2xl font-semibold text-gray-800 mb-2">No Jobs Found</h3>
                                <p className="text-gray-600 mb-6">Try adjusting your search criteria or browse all available positions.</p>
                            </div>
                        )}
                    </div>
                    
                    {/* Bottom Decorative Elements */}
                    <div className="flex justify-center mt-16">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                            <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                        </div>
                    </div>
                </div>
            </div>
            
            <style jsx>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
    )
}

export default Browse