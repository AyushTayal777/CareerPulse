import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';
import { Code, Database, BarChart3, Palette, Layers } from 'lucide-react';

const category = [
    { name: "Frontend Developer", icon: Code, color: "from-blue-500 to-cyan-500" },
    { name: "Backend Developer", icon: Database, color: "from-green-500 to-emerald-500" },
    { name: "Data Science", icon: BarChart3, color: "from-purple-500 to-violet-500" },
    { name: "Graphic Designer", icon: Palette, color: "from-pink-500 to-rose-500" },
    { name: "FullStack Developer", icon: Layers, color: "from-orange-500 to-red-500" }
]

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className="py-16 bg-gradient-to-b from-white to-gray-50">
            <div className="max-w-6xl mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                        Explore by <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Category</span>
                    </h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Discover opportunities tailored to your expertise and interests
                    </p>
                </div>

                {/* Carousel */}
                <Carousel className="w-full max-w-5xl mx-auto">
                    <CarouselContent className="-ml-2 md:-ml-4">
                        {category.map((cat, index) => {
                            const IconComponent = cat.icon;
                            return (
                                <CarouselItem key={index} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                                    <div className="group cursor-pointer" onClick={() => searchJobHandler(cat.name)}>
                                        <div className="relative bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-gray-200 hover:-translate-y-2">
                                            {/* Gradient background on hover */}
                                            <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                                            
                                            {/* Icon */}
                                            <div className={`relative w-12 h-12 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                                <IconComponent className="w-6 h-6 text-white" />
                                            </div>
                                            
                                            {/* Category Name */}
                                            <h3 className="font-semibold text-gray-800 text-lg mb-2 group-hover:text-gray-900 transition-colors">
                                                {cat.name}
                                            </h3>
                                            
                                            {/* Description */}
                                            <p className="text-gray-500 text-sm mb-4 group-hover:text-gray-600 transition-colors">
                                                {getDescription(cat.name)}
                                            </p>
                                            
                                            {/* Button */}
                                            <Button 
                                                variant="outline" 
                                                className="w-full rounded-xl border-gray-200 hover:border-gray-300 group-hover:bg-gray-50 transition-all duration-300 font-medium"
                                            >
                                                Explore Jobs
                                                <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
                                            </Button>
                                        </div>
                                    </div>
                                </CarouselItem>
                            );
                        })}
                    </CarouselContent>
                    
                    {/* Navigation Buttons */}
                    <CarouselPrevious className="hidden sm:flex -left-12 w-10 h-10 border-2 border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 transition-all duration-300" />
                    <CarouselNext className="hidden sm:flex -right-12 w-10 h-10 border-2 border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 transition-all duration-300" />
                </Carousel>

                {/* Mobile Navigation Dots */}
                <div className="flex justify-center mt-8 sm:hidden">
                    <div className="flex space-x-2">
                        {category.map((_, index) => (
                            <div key={index} className="w-2 h-2 rounded-full bg-gray-300"></div>
                        ))}
                    </div>
                </div>

                {/* View All Categories Button */}
                <div className="text-center mt-12">
                    <Button 
                        onClick={() => searchJobHandler("")}
                        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                    >
                        View All Categories
                    </Button>
                </div>
            </div>
        </div>
    )
}

// Helper function for descriptions
const getDescription = (category) => {
    const descriptions = {
        "Frontend Developer": "Build amazing user interfaces and experiences",
        "Backend Developer": "Create robust server-side applications",
        "Data Science": "Analyze data to drive business insights",
        "Graphic Designer": "Design visual content that captivates",
        "FullStack Developer": "Master both frontend and backend development"
    };
    return descriptions[category] || "Explore opportunities in this field";
}

export default CategoryCarousel