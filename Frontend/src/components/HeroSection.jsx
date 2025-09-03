import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    const popularSearches = ["Software Engineer", "Product Manager", "Data Scientist", "Designer"];

    return (
        <div className='min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-gray-50 to-white pt-20'>
            <div className='text-center max-w-5xl mx-auto px-4'>
                <div className='flex flex-col gap-8 my-10'>
                    {/* Badge */}
                    <span className='inline-flex items-center mx-auto px-5 py-2 rounded-full bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700 font-semibold text-sm border border-purple-100 shadow-sm'>
                        🏆 No. 1 Job Hunt Platform
                    </span>

                    {/* Main Heading */}
                    <h1 className='text-4xl md:text-6xl font-bold leading-tight'>
                        <span className="text-gray-800">
                            Search, Apply & 
                        </span>
                        <br />
                        <span className="text-gray-800">
                            Get Your{' '}
                        </span>
                        <span className='bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent'>
                            Dream Jobs
                        </span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-gray-600 text-lg md:text-xl font-medium leading-relaxed max-w-2xl mx-auto">
                        Your dream career is just a few clicks away. 
                        <span className="text-purple-600 font-semibold"> Search, apply, and transform your future today.</span>
                    </p>

                    {/* Search Bar */}
                    <div className='max-w-2xl mx-auto'>
                        <div className='flex bg-white shadow-lg border border-gray-200 pl-6 pr-2 py-3 rounded-full items-center gap-4 hover:shadow-xl transition-shadow duration-300'>
                            <Search className='h-5 w-5 text-gray-400' />
                            <input
                                type="text"
                                placeholder='Find your dream job... (e.g., Software Engineer)'
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className='outline-none border-none w-full text-lg placeholder-gray-400'
                                onKeyPress={(e) => e.key === 'Enter' && searchJobHandler()}
                            />
                            <Button 
                                onClick={searchJobHandler} 
                                className="rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-6 py-3 transition-all duration-300 hover:scale-105"
                            >
                                Search
                            </Button>
                        </div>
                    </div>

                    {/* Popular Searches */}
                    <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
                        <span className="text-gray-500 text-sm font-medium">Popular:</span>
                        {popularSearches.map((search, index) => (
                            <button
                                key={index}
                                onClick={() => setQuery(search)}
                                className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full hover:text-purple-600 transition-all duration-200"
                            >
                                {search}
                            </button>
                        ))}
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto">
                        <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
                            <div className="text-3xl font-bold text-purple-600">10+</div>
                            <div className="text-gray-600 font-medium mt-1">Active Jobs</div>
                        </div>
                        <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
                            <div className="text-3xl font-bold text-pink-600">50+</div>
                            <div className="text-gray-600 font-medium mt-1">Happy Candidates</div>
                        </div>
                        <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
                            <div className="text-3xl font-bold text-blue-600">10+</div>
                            <div className="text-gray-600 font-medium mt-1">Top Companies</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeroSection