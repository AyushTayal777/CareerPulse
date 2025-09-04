import React, { useEffect, useState } from 'react'
import { Filter, MapPin, Code, DollarSign, X } from 'lucide-react'

// Mock components for demonstration
const RadioGroup = ({ value, onValueChange, children }) => (
  <div onChange={(e) => onValueChange(e.target.value)}>{children}</div>
)
const RadioGroupItem = ({ value, id }) => (
  <input type="radio" value={value} id={id} name="filter" className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
)
const Label = ({ htmlFor, children }) => (
  <label htmlFor={htmlFor} className="text-sm font-medium text-gray-700 cursor-pointer">{children}</label>
)

const fitlerData = [
    {
        fitlerType: "Location",
        array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
    },
    {
        fitlerType: "Industry", 
        array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
    },
    {
        fitlerType: "Salary",
        array: ["0-40k", "42-1lakh", "1lakh to 5lakh"]
    },
]

// Icon mapping for filter types
const getFilterIcon = (filterType) => {
    switch(filterType) {
        case 'Location': return <MapPin className="w-5 h-5 text-blue-500" />
        case 'Industry': return <Code className="w-5 h-5 text-purple-500" />
        case 'Salary': return <DollarSign className="w-5 h-5 text-green-500" />
        default: return <Filter className="w-5 h-5 text-gray-500" />
    }
}

const FilterCard = ({ onFilterChange }) => {
    const [filters, setFilters] = useState({
        Location: '',
        Industry: '',
        Salary: ''
    });
    
    const changeHandler = (value, filterType) => {
        const newFilters = {
            ...filters,
            [filterType]: filters[filterType] === value ? '' : value // Toggle selection
        };
        setFilters(newFilters);
        
        // Pass filters back to parent component
        if (onFilterChange) {
            onFilterChange({
                location: newFilters.Location,
                industry: newFilters.Industry,
                salary: newFilters.Salary
            });
        }
    }
    
    const clearAllFilters = () => {
        const clearedFilters = {
            Location: '',
            Industry: '',
            Salary: ''
        };
        setFilters(clearedFilters);
        
        if (onFilterChange) {
            onFilterChange({
                location: '',
                industry: '',
                salary: ''
            });
        }
    }
    
    const hasActiveFilters = Object.values(filters).some(filter => filter !== '');
    
    return (
        <div className='w-full bg-white border border-gray-200 rounded-lg shadow-sm'>
            <div className="p-6">
                {/* Header with Clear All */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-gray-100 rounded-lg">
                            <Filter className="w-5 h-5 text-gray-600" />
                        </div>
                        <h1 className='text-xl font-bold text-gray-800'>
                            Filter Jobs
                        </h1>
                    </div>
                    
                    {hasActiveFilters && (
                        <button 
                            onClick={clearAllFilters}
                            className="flex items-center gap-1 px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors"
                        >
                            <X className="w-3 h-3" />
                            Clear All
                        </button>
                    )}
                </div>
                
                {/* Divider */}
                <hr className="border-gray-200 mb-6" />
                
                {/* Filter Sections */}
                {fitlerData.map((data, index) => (
                    <div key={index} className="mb-6 last:mb-0">
                        {/* Filter Type Header */}
                        <div className="flex items-center gap-3 mb-4">
                            {getFilterIcon(data.fitlerType)}
                            <h2 className='font-semibold text-lg text-gray-800'>
                                {data.fitlerType}
                            </h2>
                            {filters[data.fitlerType] && (
                                <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                                    Active
                                </span>
                            )}
                        </div>
                        
                        {/* Filter Options */}
                        <div className="space-y-2 ml-8">
                            {data.array.map((item, idx) => {
                                const itemId = `${data.fitlerType}-${idx}`;
                                const isSelected = filters[data.fitlerType] === item;
                                
                                return (
                                    <div 
                                        key={idx} 
                                        className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                                            isSelected 
                                                ? 'bg-blue-50 border border-blue-200' 
                                                : 'hover:bg-gray-50 border border-transparent'
                                        }`}
                                        onClick={() => changeHandler(item, data.fitlerType)}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={isSelected}
                                            onChange={() => {}} // Handled by div click
                                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                        />
                                        <Label 
                                            htmlFor={itemId} 
                                            className={`flex-1 ${
                                                isSelected 
                                                    ? 'text-blue-700 font-medium' 
                                                    : 'text-gray-700'
                                            }`}
                                        >
                                            {item}
                                        </Label>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
                
                {/* Active Filters Summary */}
                {hasActiveFilters && (
                    <div className="mt-6 pt-4 border-t border-gray-200">
                        <div className="text-sm text-gray-600 mb-3">
                            <span className="font-medium">Active Filters:</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {Object.entries(filters).map(([type, value]) => 
                                value && (
                                    <span 
                                        key={type}
                                        className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full"
                                    >
                                        {value}
                                        <button 
                                            onClick={() => changeHandler(value, type)}
                                            className="hover:bg-blue-200 rounded-full p-0.5"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </span>
                                )
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default FilterCard