import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { 
    Edit2, 
    MoreHorizontal, 
    Building2, 
    Calendar, 
    Image,
    ExternalLink,
    Users,
    MapPin,
    Globe
} from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const CompaniesTable = () => {
    const { companies, searchCompanyByText } = useSelector(store => store.company);
    const [filterCompany, setFilterCompany] = useState(companies);
    const navigate = useNavigate();

    useEffect(() => {
        const filteredCompany = companies.length >= 0 && companies.filter((company) => {
            if (!searchCompanyByText) {
                return true
            };
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
        });
        setFilterCompany(filteredCompany);
    }, [companies, searchCompanyByText])

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    // Function to handle website visit
    const handleVisitWebsite = (websiteUrl) => {
        if (websiteUrl) {
            // Ensure the URL has a protocol
            let url = websiteUrl;
            if (!url.startsWith('http://') && !url.startsWith('https://')) {
                url = 'https://' + url;
            }
            window.open(url, '_blank', 'noopener,noreferrer');
        } else {
            // Show alert if no website is provided
            alert('No website URL available for this company');
        }
    };

    // Function to handle view jobs navigation
    const handleViewJobs = (companyId, companyName) => {
        // Navigate to jobs page with company filter
        // You can adjust this path based on your routing structure
        navigate(`/jobs?company=${companyId}&companyName=${encodeURIComponent(companyName)}`);
    };

    return (
        <div className="w-full">
            {/* Enhanced Table Container */}
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-white/50 shadow-lg overflow-hidden">
                <Table>
                    <TableCaption className="text-gray-600 font-medium py-4">
                        Complete list of your registered company partners and their details
                    </TableCaption>
                    
                    {/* Enhanced Table Header */}
                    <TableHeader>
                        <TableRow className="bg-gradient-to-r from-gray-50/80 to-blue-50/80 border-b border-gray-200/50 hover:bg-gradient-to-r hover:from-gray-100/80 hover:to-blue-100/80 transition-all duration-200">
                            <TableHead className="font-semibold text-gray-700 py-4">
                                <div className="flex items-center gap-2">
                                    <Image className="w-4 h-4 text-blue-600" />
                                    Company Logo
                                </div>
                            </TableHead>
                            <TableHead className="font-semibold text-gray-700">
                                <div className="flex items-center gap-2">
                                    <Building2 className="w-4 h-4 text-green-600" />
                                    Company Name
                                </div>
                            </TableHead>
                            <TableHead className="font-semibold text-gray-700">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-purple-600" />
                                    Registration Date
                                </div>
                            </TableHead>
                            <TableHead className="text-right font-semibold text-gray-700">
                                Actions
                            </TableHead>
                        </TableRow>
                    </TableHeader>

                    {/* Enhanced Table Body */}
                    <TableBody>
                        {filterCompany?.map((company, index) => (
                            <TableRow 
                                key={company._id}
                                className={`
                                    border-b border-gray-100/50 hover:bg-gradient-to-r hover:from-blue-50/30 hover:to-purple-50/30 
                                    transition-all duration-300 group cursor-pointer
                                    ${index % 2 === 0 ? 'bg-white/30' : 'bg-gray-50/30'}
                                `}
                                onClick={() => navigate(`/admin/companies/${company._id}`)}
                            >
                                {/* Logo Cell */}
                                <TableCell className="py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="relative">
                                            <Avatar className="w-12 h-12 border-2 border-white shadow-lg group-hover:scale-110 transition-transform duration-200">
                                                <AvatarImage 
                                                    src={company.logo} 
                                                    alt={`${company.name} logo`}
                                                    className="object-cover"
                                                />
                                                <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                                                    <Building2 className="w-6 h-6 text-blue-600" />
                                                </div>
                                            </Avatar>
                                            {/* Online indicator */}
                                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full"></div>
                                        </div>
                                    </div>
                                </TableCell>

                                {/* Company Name Cell */}
                                <TableCell>
                                    <div className="flex flex-col gap-1">
                                        <div className="flex items-center gap-2">
                                            <span className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                                                {company.name}
                                            </span>
                                            <ExternalLink className="w-3 h-3 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                                        </div>
                                        <div className="flex items-center gap-4 text-xs text-gray-500">
                                            {company.location && (
                                                <div className="flex items-center gap-1">
                                                    <MapPin className="w-3 h-3" />
                                                    <span>{company.location}</span>
                                                </div>
                                            )}
                                            
                                        </div>
                                    </div>
                                </TableCell>

                                {/* Date Cell */}
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4 text-gray-400" />
                                        <div className="flex flex-col">
                                            <span className="text-gray-700 font-medium">
                                                {formatDate(company.createdAt)}
                                            </span>
                                            <span className="text-xs text-gray-500">
                                                {Math.floor((new Date() - new Date(company.createdAt)) / (1000 * 60 * 60 * 24))} days ago
                                            </span>
                                        </div>
                                    </div>
                                </TableCell>

                                {/* Actions Cell */}
                                <TableCell 
                                    className="text-right"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 group-hover:bg-white group-hover:shadow-md">
                                                <MoreHorizontal className="w-4 h-4 text-gray-600" />
                                            </button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-48 p-2 bg-white/95 backdrop-blur-sm border border-white/50 shadow-xl rounded-xl">
                                            <div className="space-y-1">
                                                <button
                                                    onClick={() => navigate(`/admin/companies/${company._id}`)}
                                                    className="w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-all duration-200 text-left hover:bg-blue-50 hover:text-blue-700 text-gray-700"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                    <span className="font-medium">Edit Company</span>
                                                </button>
                                                
                                                <button
                                                    onClick={() => handleViewJobs(company._id, company.name)}
                                                    className="w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-all duration-200 text-left hover:bg-green-50 hover:text-green-700 text-gray-700"
                                                >
                                                    <Users className="w-4 h-4" />
                                                    <span className="font-medium">View Jobs</span>
                                                </button>
                                                
                                                <button
                                                    onClick={() => handleVisitWebsite(company.website)}
                                                    className="w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-all duration-200 text-left hover:bg-purple-50 hover:text-purple-700 text-gray-700"
                                                    disabled={!company.website}
                                                >
                                                    <Globe className="w-4 h-4" />
                                                    <span className="font-medium">
                                                        {company.website ? 'Visit Website' : 'No Website'}
                                                    </span>
                                                </button>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                {/* Empty State */}
                {(!filterCompany || filterCompany.length === 0) && (
                    <div className="text-center py-12 bg-gradient-to-br from-gray-50/50 to-blue-50/50">
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                                <Building2 className="w-8 h-8 text-blue-500" />
                            </div>
                            <div>
                                <p className="text-gray-600 font-medium">
                                    {searchCompanyByText ? 'No companies match your search' : 'No companies registered yet'}
                                </p>
                                <p className="text-gray-400 text-sm mt-1">
                                    {searchCompanyByText 
                                        ? `Try adjusting your search for "${searchCompanyByText}"`
                                        : 'Start by adding your first company to the platform'
                                    }
                                </p>
                            </div>
                            {searchCompanyByText && (
                                <button
                                    onClick={() => window.location.reload()}
                                    className="mt-2 px-4 py-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
                                >
                                    Clear search and view all
                                </button>
                            )}
                        </div>
                    </div>
                )}

                {/* Table Footer Stats */}
                {filterCompany && filterCompany.length > 0 && (
                    <div className="bg-gradient-to-r from-gray-50/50 to-blue-50/50 px-8 py-4 border-t border-gray-200/50">
                        <div className="flex items-center justify-between text-sm text-gray-600">
                            <div className="flex items-center gap-4">
                                <span>
                                    Showing <span className="font-semibold text-gray-900">{filterCompany.length}</span> 
                                    {searchCompanyByText ? ' filtered' : ''} companies
                                </span>
                                {searchCompanyByText && (
                                    <span className="text-blue-600">
                                        • Filtered by "{searchCompanyByText}"
                                    </span>
                                )}
                            </div>
                            <div className="flex items-center gap-1">
                                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                <span>All companies active</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CompaniesTable