import React, { useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Loader2, User, Mail, Phone, FileText, Award, Upload, X, CheckCircle } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const UpdateProfileDialog = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false);
    const { user } = useSelector(store => store.auth);
    const [uploadedFile, setUploadedFile] = useState(null);

    const [input, setInput] = useState({
        fullname: user?.fullname || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        bio: user?.profile?.bio || "",
        skills: user?.profile?.skills?.map(skill => skill) || "",
        file: user?.profile?.resume || ""
    });
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
        setUploadedFile(file);
    }

    const removeFile = () => {
        setInput({ ...input, file: "" });
        setUploadedFile(null);
        // Reset file input
        const fileInput = document.getElementById('file');
        if (fileInput) fileInput.value = '';
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("bio", input.bio);
        formData.append("skills", input.skills);
        if (input.file) {
            formData.append("file", input.file);
        }
        try {
            setLoading(true);
            const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally{
            setLoading(false);
        }
        setOpen(false);
        console.log(input);
    }

    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto" onInteractOutside={() => setOpen(false)}>
                    {/* Enhanced Header */}
                    <DialogHeader className="space-y-4 pb-6">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl">
                                <User className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                                <DialogTitle className="text-2xl font-bold text-gray-900">Update Profile</DialogTitle>
                                <p className="text-gray-600 mt-1">Keep your profile information up to date</p>
                            </div>
                        </div>
                        <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                    </DialogHeader>

                    <form onSubmit={submitHandler}>
                        <div className='space-y-6 py-4'>
                            {/* Personal Information Section */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="p-2 bg-blue-100 rounded-lg">
                                        <User className="w-4 h-4 text-blue-600" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
                                </div>

                                {/* Full Name */}
                                <div className='space-y-2'>
                                    <Label htmlFor="fullname" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                        <User className="w-4 h-4" />
                                        Full Name
                                    </Label>
                                    <Input
                                        id="fullname"
                                        name="fullname"
                                        type="text"
                                        value={input.fullname}
                                        onChange={changeEventHandler}
                                        className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                                        placeholder="Enter your full name"
                                    />
                                </div>

                                {/* Email */}
                                <div className='space-y-2'>
                                    <Label htmlFor="email" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                        <Mail className="w-4 h-4" />
                                        Email Address
                                    </Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={input.email}
                                        onChange={changeEventHandler}
                                        className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                                        placeholder="Enter your email address"
                                    />
                                </div>

                                {/* Phone Number */}
                                <div className='space-y-2'>
                                    <Label htmlFor="phoneNumber" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                        <Phone className="w-4 h-4" />
                                        Phone Number
                                    </Label>
                                    <Input
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        type="tel"
                                        value={input.phoneNumber}
                                        onChange={changeEventHandler}
                                        className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                                        placeholder="Enter your phone number"
                                    />
                                </div>
                            </div>

                            {/* Professional Information Section */}
                            <div className="space-y-4 pt-4 border-t border-gray-200">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="p-2 bg-purple-100 rounded-lg">
                                        <Award className="w-4 h-4 text-purple-600" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900">Professional Information</h3>
                                </div>

                                {/* Bio */}
                                <div className='space-y-2'>
                                    <Label htmlFor="bio" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                        <FileText className="w-4 h-4" />
                                        Professional Bio
                                    </Label>
                                    <Input
                                        id="bio"
                                        name="bio"
                                        value={input.bio}
                                        onChange={changeEventHandler}
                                        className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                                        placeholder="Tell us about yourself..."
                                    />
                                </div>

                                {/* Skills */}
                                <div className='space-y-2'>
                                    <Label htmlFor="skills" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                        <Award className="w-4 h-4" />
                                        Skills
                                    </Label>
                                    <Input
                                        id="skills"
                                        name="skills"
                                        value={input.skills}
                                        onChange={changeEventHandler}
                                        className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                                        placeholder="e.g., JavaScript, React, Node.js (comma separated)"
                                    />
                                    <p className="text-xs text-gray-500">Separate skills with commas</p>
                                </div>
                            </div>

                            {/* Resume Upload Section */}
                            <div className="space-y-4 pt-4 border-t border-gray-200">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="p-2 bg-green-100 rounded-lg">
                                        <Upload className="w-4 h-4 text-green-600" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900">Resume</h3>
                                </div>

                                <div className='space-y-2'>
                                    <Label htmlFor="file" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                        <FileText className="w-4 h-4" />
                                        Upload Resume (PDF)
                                    </Label>
                                    
                                    {/* File Upload Area */}
                                    <div className="relative">
                                        <Input
                                            id="file"
                                            name="file"
                                            type="file"
                                            accept="application/pdf"
                                            onChange={fileChangeHandler}
                                            className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 focus:border-blue-500 transition-colors duration-200"
                                        />
                                        
                                        {/* File Upload Status */}
                                        {uploadedFile && (
                                            <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <CheckCircle className="w-4 h-4 text-green-600" />
                                                        <span className="text-sm font-medium text-green-800">
                                                            {uploadedFile.name}
                                                        </span>
                                                        <span className="text-xs text-green-600">
                                                            ({(uploadedFile.size / 1024 / 1024).toFixed(2)} MB)
                                                        </span>
                                                    </div>
                                                    <Button
                                                        type="button"
                                                        onClick={removeFile}
                                                        variant="ghost"
                                                        size="sm"
                                                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <p className="text-xs text-gray-500">Only PDF files are allowed (Max 5MB)</p>
                                </div>
                            </div>
                        </div>

                        {/* Enhanced Footer */}
                        <DialogFooter className="pt-6 border-t border-gray-200">
                            <div className="flex gap-3 w-full">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setOpen(false)}
                                    className="flex-1 py-3 border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all duration-200"
                                    disabled={loading}
                                >
                                    Cancel
                                </Button>
                                {loading ? (
                                    <Button disabled className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                                        <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                        Updating...
                                    </Button>
                                ) : (
                                    <Button 
                                        type="submit" 
                                        className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-blue-200 transition-all duration-300"
                                    >
                                        <CheckCircle className="w-4 h-4 mr-2" />
                                        Update Profile
                                    </Button>
                                )}
                            </div>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default UpdateProfileDialog