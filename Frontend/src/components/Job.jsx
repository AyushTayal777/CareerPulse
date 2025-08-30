import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'

const Job = () => {
    return (
        <div className='p-5 rounded-md shadow-xl bg-white border-gray-100'>
            <div className='flex items-center justify-between'>
                <p className='text-sm text-gray-500'>2 Days Ago</p>
                <Button variant="outline" className='rounded-full size="icon'><Bookmark /></Button>
            </div>
            <div className='flex items-center gap-3 my-3'>
                <Button>
                    <Avatar>
                        <AvatarImage src="https://imgs.search.brave.com/ZQh7RksxRlvJzRu0GAT2aa2VkJGJDwObGl3SsJyKHUo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/dmVjdG9yc3RvY2su/Y29tL2kvNTAwcC8x/Ni8yNi9zb2NpYWwt/bWVkaWEtbG9nb3Mt/Y29sbGVjdGlvbi12/ZWN0b3ItMjQwMTE2/MjYuanBn" />
                    </Avatar>
                </Button>
                <div>
                    <h1 className='font-md text-lg'>Company Name</h1>
                    <p className='text-sm text-gray-500'>India</p>
                </div>

            </div>
            <div >
                <h1 className='font-bold text-lg my-2 '>Title</h1>
                <p className='text-sm text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita saepe minima debitis itaque quos est totam molestiae reprehenderit nesciunt nam.</p>

            </div>
            <div className='flex items-center gap-2 mt-4'>
                <Badge className={'text-blue-700 font-bold'} variant="ghost">12 Positions</Badge>
                <Badge className={'text-[#F83002] font-bold'} variant="ghost">Part Time</Badge>
                <Badge className={'text-[#7209B7] font-bold'} variant="ghost">24 LPA</Badge>
            </div>
            <div className='flex items-center gap-4 mt-4'>
                <Button variant="outline">Details</Button>
                <Button className='bg-[#7208b7]'>Save For Later</Button>
            </div>
        </div>
    )
}

export default Job