// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useUser } from "../../contexts/InventoryContext.tsx";

// import EmployeeRequests from './EmployeeRequests.tsx';
// import PendingRequests from './PendingRequests.tsx';

// export default function Requests() {

//     const { accountType, setAccountType } = useUser();

//     useEffect(() => {
//         const savedAccountType = localStorage.getItem('accountType');
//         if (savedAccountType) {
//           setAccountType(savedAccountType as 'owner' | 'pharmacist' | 'assistant' | 'technician' | null);
//         }
//       }, [setAccountType]);

//     if (accountType === 'owner' || accountType === 'pharmacist') {
//         return <PendingRequests />;
//       } else if (accountType === 'technician') {
//         return <EmployeeRequests />;
//       }
// }

//     // return (
//     //     <div> 
//     //     <div className='bg-background'></div>
//     //     <div className='flex items-center justify-between mt-4'>
//     //     <div className='font-bold indent-6 text-2xl'>Pending Requests </div>
//     //          </div>
//     //          <div className='font-normal text-sm mt-4 indent-6'>List of pending requests</div>
//     //     </div>
//     // );

import React from 'react';
import RequestTable from './components/RequestTable.tsx';
import { RequestsProvider } from '../../contexts/RequestsContext.tsx';
import { useAuthContext } from '../../contexts/AuthContext.tsx';

const Requests: React.FC = () => {
  const { accountType } = useAuthContext();
  
  return (
    <RequestsProvider>
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold mb-4">View Requests</h1>
          {accountType === 'admin' ? (
            <p className="text-gray-600 mb-8">View all requests in the system.</p>
          ) : (
            <p className="text-gray-600 mb-8">View your requests and their current status.</p>
          )}
          <RequestTable />
          <div className="mt-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="font-medium text-gray-700 mb-2">Request Status Information</h3>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
              <li><span className="font-medium text-yellow-700">Pending</span>: The request is waiting for an admin's review.</li>
              <li><span className="font-medium text-green-700">Accepted</span>: The request has been approved and the batch has been updated.</li>
              <li><span className="font-medium text-red-700">Rejected</span>: The request was not approved.</li>
              {accountType === 'technician' && (
                <li className="mt-2">You can delete accepted or rejected requests to remove them from your view.</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </RequestsProvider>
  );
};

export default Requests;