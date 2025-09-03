import React from 'react'
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';
import { Briefcase, TrendingUp, Clock } from 'lucide-react';

const LatestJobs = () => {
    const {allJobs} = useSelector(store=>store.job);
        
    return (
        <div className='py-16 bg-gradient-to-b from-gray-50 to-white'>
            <div className='max-w-7xl mx-auto px-4'>
                {/* Section Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 text-purple-700 rounded-full text-sm font-medium mb-4">
                        <TrendingUp className="w-4 h-4" />
                        Hot Opportunities
                    </div>
                    <h1 className='text-3xl md:text-4xl font-bold text-gray-800 mb-4'>
                        <span className='bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent'>Latest & Top</span> Job Openings
                    </h1>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Discover fresh opportunities from top companies. Updated daily with the newest positions in the market.
                    </p>
                </div>

                {/* Jobs Grid */}
                {allJobs.length <= 0 ? (
                    // Empty State
                    <div className="text-center py-16">
                        <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                            <Briefcase className="w-12 h-12 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">No Jobs Available Yet</h3>
                        <p className="text-gray-600 mb-6">Check back soon for exciting new opportunities!</p>
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 text-purple-600 rounded-lg text-sm font-medium">
                            <Clock className="w-4 h-4" />
                            New jobs added daily
                        </div>
                    </div>
                ) : (
                    <>
                        {/* Jobs Grid */}
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12'>
                            {allJobs?.slice(0,6).map((job) => (
                                <LatestJobCards key={job._id} job={job}/>
                            ))}
                        </div>
                        
                        {/* View More Section */}
                        {allJobs.length > 6 && (
                            <div className="text-center">
                                <div className="bg-white rounded-xl p-8 shadow-md border border-gray-100">
                                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                        Want to see more opportunities?
                                    </h3>
                                    <p className="text-gray-600 mb-6">
                                        We have {allJobs.length - 6}+ more jobs waiting for you
                                    </p>
                                    <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                                        View All Jobs
                                    </button>
                                </div>
                            </div>
                        )}
                        
                        {/* Stats Bar */}
                        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="text-center bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                                <div className="text-2xl font-bold text-purple-600 mb-1">
                                    {allJobs.length}+
                                </div>
                                <div className="text-gray-600 text-sm font-medium">
                                    Total Jobs Available
                                </div>
                            </div>
                            <div className="text-center bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                                <div className="text-2xl font-bold text-pink-600 mb-1">
                                    24h
                                </div>
                                <div className="text-gray-600 text-sm font-medium">
                                    Updated Every Day
                                </div>
                            </div>
                            <div className="text-center bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                                <div className="text-2xl font-bold text-blue-600 mb-1">
                                    10+
                                </div>
                                <div className="text-gray-600 text-sm font-medium">
                                    Partner Companies
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default LatestJobs