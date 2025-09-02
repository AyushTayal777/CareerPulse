import React,{ useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'


const skills = ["Html", "css", "JavaScript", "React", "Nodejs", "Express", "MongoDB"]

const Profile = () => {
    const [open, setOpen] =useState(false);
    const isResume = true;
    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8'>
                <div className='flex justify-between'>

                    <div className='flex items-center gap-4'>
                        <Avatar className='h-24 w-24'>
                            <AvatarImage src="https://imgs.search.brave.com/ZQh7RksxRlvJzRu0GAT2aa2VkJGJDwObGl3SsJyKHUo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/dmVjdG9yc3RvY2su/Y29tL2kvNTAwcC8x/Ni8yNi9zb2NpYWwt/bWVkaWEtbG9nb3Mt/Y29sbGVjdGlvbi12/ZWN0b3ItMjQwMTE2/MjYuanBn" alt='profile' />

                        </Avatar>
                        <div>

                            <h1 className='font-medium text-xl'>Full Name</h1>
                            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nobis quidem, officia ipsum illum sapiente velit laudantium sint distinctio et quasi?</p>
                        </div>

                    </div>
                    < Button onClick={()=> setOpen(true)} className='text-right' variant="outline"><Pen /></Button>

                </div>
                <div className='my-5'>
                    <div className='flex ietms-center gap-3 my-2'>
                        <Mail />
                        <span>ayushtayal685@gmail.com</span>
                    </div>
                    <div className='flex ietms-center gap-3 my-2'>
                        <Contact />
                        <span>1234567890</span>
                    </div>
                </div>
                <div className='my-5'>
                    <h1>Skills</h1>
                    <div className='flex items-center gap-1'>

                        {
                            skills.length != 0 ? skills.map((item, index) => <Badge key={index}>{item}</Badge>) : <span>NA</span>
                        }
                    </div>
                </div>
                <div className='grid w-full max-w-sm items-center gap-1.5'>
                    <Label className='text-md font-bold'>Resume</Label>
                    {
                        isResume ? <a target="blank" href="https://docs.google.com/document/d/1Y9H3p3vU6n0mXgW8r4u0uX7x7k8vX4Y5/edit" className='text-blue-600 hover-underline cursor-pointer'>View Resume</a> : <span className='text-gray-500'>NA</span>
                    }

                </div>


            </div>
            <div className='max-w-4xl mx-auto bg-white rounded-2xl'>
                <h1 className='font-bold text-lg my-5'>Applied Jobs</h1>
                <AppliedJobTable />

            </div>
            <UpdateProfileDialog open={open} setOpen={setOpen}/>

        </div>
    )
}

export default Profile