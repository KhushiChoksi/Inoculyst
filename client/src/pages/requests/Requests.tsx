import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/InventoryContext.tsx";

import EmployeeRequests from './EmployeeRequests.tsx';
import PendingRequests from './PendingRequests.tsx';

export default function Requests() {

    const { accountType, setAccountType } = useUser();

    useEffect(() => {
        const savedAccountType = localStorage.getItem('accountType');
        if (savedAccountType) {
          setAccountType(savedAccountType as 'owner' | 'pharmacist' | 'assistant' | 'technician' | null);
        }
      }, [setAccountType]);

    if (accountType === 'owner' || accountType === 'pharmacist') {
        return <PendingRequests />;
      } else if (accountType === 'technician') {
        return <EmployeeRequests />;
      }
}

    // return (
    //     <div> 
    //     <div className='bg-background'></div>
    //     <div className='flex items-center justify-between mt-4'>
    //     <div className='font-bold indent-6 text-2xl'>Pending Requests </div>
    //          </div>
    //          <div className='font-normal text-sm mt-4 indent-6'>List of pending requests</div>
    //     </div>
    // );
