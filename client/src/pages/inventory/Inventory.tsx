// import React from "react";

// export default function Inventory() {
//     return (
//         <div> 
//         <div className='bg-background p-6 h-20'></div>
//         <div className='flex items-center justify-between mt-10'>
//         <div className='font-bold indent-10 text-2xl'>Inventory </div>
//             <button className=
//             'font-normal text-sm bg-dark1 text-white mr-6 px-4 py-3 rounded hover:bg-dark_green transition-colors'>+ Add New Item</button>
//              </div>
//              <div className='font-normal text-sm mt-2 indent-10'>List of batches available</div>
//         </div>
//     );
// }

// //this page will need to route to admin inventory or assistant or technician

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/InventoryContext.tsx";

import AdminInventory from './AdminInventory.tsx';
import AssistantInventory from './AssistantInventory.tsx';
import TechnicianInventory from './TechnicianInventory.tsx';

export default function Inventory() {

    // const navigate = useNavigate();
    const { accountType } = useUser();

    // const [shouldRenderFallback, setShouldRenderFallback] = useState(false);

    // useEffect(() => {
    //     if (accountType === 'admin') {
    //         navigate('/inventory/admin');
    //     } else if (accountType === 'assistant') {
    //         navigate('/inventory/assistant');
    //     } else if (accountType === 'technician') {
    //         navigate('/inventory/technician');
    //     } else {
    //         setShouldRenderFallback(true);
    //     }
    // }, [accountType, navigate]);

    // if (!shouldRenderFallback) {
    //     return null;
    // }

    if (accountType === 'owner' || accountType === 'pharmacist') {
        return <AdminInventory />;
      } else if (accountType === 'assistant') {
        return <AssistantInventory />;
      } else if (accountType === 'technician') {
        return <TechnicianInventory />;
      }

    // return (
    //     <div> 
    //     <div className='bg-background p-6 h-20'></div>
    //     <div className='flex items-center justify-between mt-10'>
    //     <div className='font-bold indent-10 text-2xl'>Inventory </div>
    //         <button className=
    //         'font-normal text-sm bg-dark1 text-white mr-6 px-4 py-3 rounded hover:bg-dark_green transition-colors'>+ Add New Item</button>
    //          </div>
    //          <div className='font-normal text-sm mt-2 indent-10'>List of batches available</div>
    //     </div>
    // );
}

//this page will need to route to admin inventory or assistant or technician