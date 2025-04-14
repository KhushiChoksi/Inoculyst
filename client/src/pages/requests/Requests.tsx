import React from "react";

export default function Requests() {
    return (
        <div> 
        <div className='bg-background p-6 h-20'></div>
        <div className='flex items-center justify-between mt-10'>
        <div className='font-bold indent-10 text-2xl'>Pending Requests </div>
             </div>
             <div className='font-normal text-sm mt-4 indent-10'>List of pending requests</div>
        </div>
    );
}