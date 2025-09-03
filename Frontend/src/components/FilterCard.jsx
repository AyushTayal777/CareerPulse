import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Filter, MapPin, Code, DollarSign } from 'lucide-react'

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

// Mock redux
const setSearchedQuery = (query) => ({ type: 'SET_SEARCHED_QUERY', payload: query })

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

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const dispatch = (action) => console.log('Dispatch:', action);
    
    const changeHandler = (value) => {
        setSelectedValue(value);
    }
    
    useEffect(()=>{
        dispatch(setSearchedQuery(selectedValue));
    },[selectedValue]);
    
    return (
        <div className='w-full bg-white border border-gray-200 rounded-lg shadow-sm'>
            <div className="p-6">
                {/* Simple Header */}
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-gray-100 rounded-lg">
                        <Filter className="w-5 h-5 text-gray-600" />
                    </div>
                    <h1 className='text-xl font-bold text-gray-800'>
                        Filter Jobs
                    </h1>
                </div>
                
                {/* Simple Divider */}
                <hr className="border-gray-200 mb-6" />
                
                <RadioGroup value={selectedValue} onValueChange={changeHandler}>
                    {
                        fitlerData.map((data, index) => (
                            <div key={index} className="mb-6 last:mb-0">
                                {/* Simple Filter Type Header */}
                                <div className="flex items-center gap-3 mb-4">
                                    {getFilterIcon(data.fitlerType)}
                                    <h2 className='font-semibold text-lg text-gray-800'>
                                        {data.fitlerType}
                                    </h2>
                                </div>
                                
                                {/* Simple Options */}
                                <div className="space-y-2 ml-8">
                                    {
                                        data.array.map((item, idx) => {
                                            const itemId = `id${index}-${idx}`
                                            const isSelected = selectedValue === item
                                            return (
                                                <div key={idx} className={`flex items-center space-x-3 p-2 rounded cursor-pointer ${isSelected ? 'bg-blue-50' : 'hover:bg-gray-50'}`}>
                                                    <RadioGroupItem value={item} id={itemId} />
                                                    <Label htmlFor={itemId} className={`flex-1 ${isSelected ? 'text-blue-700 font-medium' : 'text-gray-700'}`}>
                                                        {item}
                                                    </Label>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        ))
                    }
                </RadioGroup>
                
                {/* Simple Footer */}
                {selectedValue && (
                    <div className="mt-6 pt-4 border-t border-gray-200">
                        <div className="text-sm text-gray-600">
                            <span>Active Filter: <span className="font-medium text-blue-600">{selectedValue}</span></span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default FilterCard