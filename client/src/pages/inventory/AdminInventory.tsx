import React from "react";

export default function Inventory() {
    return (
        <div> 
        <div className='bg-background p-6 h-20'></div>
        <div className='flex items-center justify-between mt-10'>
        <div className='font-bold indent-10 text-2xl'>Inventory </div>
            <button className=
            'font-normal text-sm bg-dark1 text-white mr-6 px-4 py-3 rounded hover:bg-dark_green transition-colors'>+ Add New Batch</button>
             </div>
             <div className='font-normal text-sm mt-2 indent-10'>List of batches available</div>
        </div>
    );
}
