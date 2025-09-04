import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Search, Filter, Briefcase, TrendingUp } from 'lucide-react';

const Jobs = () => {
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    useEffect(() => {
        if (searchedQuery) {
            const filteredJobs = allJobs.filter((job) => {
                return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.location.toLowerCase().includes(searchedQuery.toLowerCase())
            })
            setFilterJobs(filteredJobs)
        } else {
            setFilterJobs(allJobs)
        }
    }, [allJobs, searchedQuery]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
            <Navbar />
            
            {/* Page Header */}
            <div className="bg-white border-b border-gray-200 shadow-sm">
                <div className='max-w-7xl mx-auto px-4 py-8'>
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                                {searchedQuery ? (
                                    <>
                                        Search Results for{' '}
                                        <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                            "{searchedQuery}"
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                            All Jobs
                                        </span>{' '}
                                        Available
                                    </>
                                )}
                            </h1>
                            <p className="text-gray-600">
                                {filterJobs.length} {filterJobs.length === 1 ? 'job' : 'jobs'} found
                                {searchedQuery && ` for "${searchedQuery}"`}
                            </p>
                        </div>
                        
                        {/* Mobile Filter Toggle */}
                        <button
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                            className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors duration-300"
                        >
                            <Filter className="w-4 h-4" />
                            Filters
                        </button>
                    </div>

                    {/* Search Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                    <Briefcase className="w-5 h-5 text-purple-600" />
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-purple-600">{filterJobs.length}</div>
                                    <div className="text-purple-700 text-sm font-medium">Jobs Available</div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-pink-50 rounded-xl p-4 border border-pink-100">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
                                    <TrendingUp className="w-5 h-5 text-pink-600" />
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-pink-600">24h</div>
                                    <div className="text-pink-700 text-sm font-medium">Fresh Updates</div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <Search className="w-5 h-5 text-blue-600" />
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-blue-600">5+</div>
                                    <div className="text-blue-700 text-sm font-medium">Companies</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className='max-w-7xl mx-auto px-4 py-8'>
                <div className='flex gap-8'>
                    {/* Filter Sidebar */}
                    <div className={`${isFilterOpen ? 'block' : 'hidden'} lg:block w-full lg:w-80 flex-shrink-0`}>
                        <div className="sticky top-24">
                            <FilterCard />
                        </div>
                    </div>

                    {/* Jobs Grid */}
                    <div className="flex-1">
                        {filterJobs.length <= 0 ? (
                            // Empty State
                            <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
                                <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                                    <Search className="w-12 h-12 text-gray-400" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-2">No Jobs Found</h3>
                                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                                    {searchedQuery 
                                        ? `No jobs match your search for "${searchedQuery}". Try different keywords or adjust your filters.`
                                        : "No jobs are currently available. Check back soon for new opportunities!"
                                    }
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <button 
                                        onClick={() => window.location.reload()}
                                        className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 hover:scale-105"
                                    >
                                        Refresh Jobs
                                    </button>
                                    <button 
                                        onClick={() => setIsFilterOpen(true)}
                                        className="px-6 py-3 bg-white border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-all duration-300"
                                    >
                                        Adjust Filters
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6'>
                                {filterJobs.map((job, index) => (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ 
                                            duration: 0.4,
                                            delay: index * 0.1,
                                            ease: "easeOut"
                                        }}
                                        key={job?._id}
                                        className="group"
                                    >
                                        <Job job={job} />
                                    </motion.div>
                                ))}
                            </div>
                        )}

                        {/* Load More Button */}
                        {filterJobs.length > 0 && filterJobs.length >= 12 && (
                            <div className="text-center mt-12">
                                <button className="bg-white border-2 border-gray-200 hover:border-purple-300 text-gray-700 hover:text-purple-600 font-semibold px-8 py-3 rounded-xl transition-all duration-300 hover:scale-105">
                                    Load More Jobs
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Filter Overlay */}
            {isFilterOpen && (
                <div 
                    className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={() => setIsFilterOpen(false)}
                ></div>
            )}
        </div>
    )
}

export default Jobs