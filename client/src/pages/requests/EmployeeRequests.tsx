// import React from "react";

// export default function Requests() {
//     return (
//         <div> 
//         <div className='bg-background'></div>
//         <div className='flex items-center justify-between mt-4'>
//         <div className='font-bold indent-6 text-2xl'>Pending Requests </div>
//              </div>
//              <div className='font-normal text-sm mt-4 indent-6'>List of pending requests</div>
//         </div>
//     );
// }
// // /////////////////////
// import React, { useEffect, useState } from 'react';

// interface Request {
//   Batch_Number: string;
//   Requested_Quantity: number;
//   Status: string;
//   Request_Type: string;
//   Vaccine_Name: string;
//   Requested_By: string;
// }

// const EmployeeRequests: React.FC = () => {
//   const [pendingRequests, setPendingRequests] = useState<Request[]>([]);
//   const technicianID = "T001";  // Replace with the actual technician's ID

//   useEffect(() => {
//     const fetchPendingRequests = async () => {
//       try {
//         const response = await fetch(`http://localhost:8080/requests/pending?requestedBy=${technicianID}`);
//         const result = await response.json();
//         setPendingRequests(result);
//       } catch (error) {
//         console.error('Error fetching pending requests:', error);
//       }
//     };

//     fetchPendingRequests();
//   }, []);

//   const handleCancel = async (requestId: string) => {
//     try {
//       const response = await fetch(`http://localhost:8080/requests/${requestId}`, {
//         method: 'DELETE',
//       });

//       if (response.ok) {
//         alert('Request canceled!');
//         // Remove the canceled request from the state
//         setPendingRequests(pendingRequests.filter((r) => r.Batch_Number !== requestId));
//       } else {
//         alert('Failed to cancel request.');
//       }
//     } catch (error) {
//       console.error('Error canceling request:', error);
//     }
//   };

//   return (
//     <div className="p-8">
//       <h2 className="text-xl font-semibold mb-4">Your Pending Update Requests</h2>
//       <table className="table-auto w-full border border-gray-300">
//         <thead>
//           <tr>
//             <th className="px-4 py-2 text-left">Batch Number</th>
//             <th className="px-4 py-2 text-left">Requested Quantity</th>
//             <th className="px-4 py-2 text-left">Vaccine Name</th>
//             <th className="px-4 py-2 text-left">Status</th>
//             <th className="px-4 py-2 text-left">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {pendingRequests.length > 0 ? (
//             pendingRequests.map((request) => (
//               <tr key={request.Batch_Number} className="border-t border-gray-200">
//                 <td className="px-4 py-2">{request.Batch_Number}</td>
//                 <td className="px-4 py-2">{request.Requested_Quantity}</td>
//                 <td className="px-4 py-2">{request.Vaccine_Name}</td>
//                 <td className="px-4 py-2">{request.Status}</td>
//                 <td className="px-4 py-2">
//                   <button
//                     onClick={() => handleCancel(request.Batch_Number)}
//                     className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
//                   >
//                     Cancel
//                   </button>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan={5} className="text-center py-4">No pending requests.</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default EmployeeRequests;//////////////

// import React, { useState } from 'react';
// import RequestTable from './components/RequestTable';
// import { RequestsProvider } from '../../contexts/RequestsContext';

// const EmployeeRequests: React.FC = () => {
//   const [activeTab, setActiveTab] = useState<'pending' | 'all'>('pending');
  
//   return (
//     <RequestsProvider>
//       <div className="bg-[#F7F7F2] min-h-screen p-6">
//         <div className="max-w-7xl mx-auto">
//           <h1 className="text-2xl font-bold mb-2">Batch Update Requests</h1>
//           <p className="text-gray-600 mb-6">Review and manage batch update requests from technicians</p>
          
//           <div className="bg-white rounded-lg shadow p-6">
//             <div className="flex border-b mb-6">
//               <button
//                 className={`px-4 py-2 font-medium ${activeTab === 'pending' ? 'border-b-2 border-dark1 text-dark1' : 'text-gray-500'}`}
//                 onClick={() => setActiveTab('pending')}
//               >
//                 Pending Requests
//               </button>
//               <button
//                 className={`px-4 py-2 font-medium ${activeTab === 'all' ? 'border-b-2 border-dark1 text-dark1' : 'text-gray-500'}`}
//                 onClick={() => setActiveTab('all')}
//               >
//                 All Requests
//               </button>
//             </div>
            
//             <RequestTable 
//               role="employee" 
//             />
            
//             <div className="mt-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
//               <h3 className="font-medium text-gray-700 mb-2">Information</h3>
//               <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
//                 <li>Accepting a request will update the batch quantity in inventory</li>
//                 <li>Rejected requests will remain in the system for record-keeping</li>
//                 <li>You can delete requests that are no longer needed</li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>
//     </RequestsProvider>
//   );
// };

// export default EmployeeRequests;



//////////////////////////////////////////////////////////////////

// import React, { useEffect, useState } from 'react';

// interface Request {
//   Batch_Number: string;
//   Request_ID: string;
//   Batch_Quantity: number;
//   Status: string;
//   Request_Type: string;
//   Vaccine_Name: string;
//   Requested_By: string;
// }

// const EmployeeRequests: React.FC = () => {
//   const [pendingRequests, setPendingRequests] = useState<Request[]>([]);
//   const technicianID = "";

//   useEffect(() => {
//     const fetchPendingRequests = async () => {
//       try {
//         const response = await fetch(`http://localhost:8080/requests/?requestedBy=${technicianID}`);
//         const result = await response.json();
//         setPendingRequests(result);
//       } catch (error) {
//         console.error('Error fetching pending requests:', error);
//       }
//     };

//     fetchPendingRequests();
//   }, []);

//   const handleCancel = async (requestId: string) => {
//     try {
//       const response = await fetch(`http://localhost:8080/requests/${requestId}`, {
//         method: 'DELETE',
//       });

//       if (response.ok) {
//         alert('Request canceled!');

//         // remove the canceled request from the state
//         setPendingRequests(pendingRequests.filter((r) => r.Request_ID !== requestId));
//       } else {
//         alert('Failed to cancel request.');
//       }
//     } catch (error) {
//       console.error('Error canceling request:', error);
//     }
//   };

//   return (
//     <div className="p-8">
//       <h2 className="text-xl font-semibold mb-4">Your Batch Update Requests</h2>
//       <table className="table-auto w-full border border-gray-300">
//         <thead>
//           <tr>
//             <th className="px-4 py-2 text-left">Request ID</th>
//             <th className="px-4 py-2 text-left">Batch Number</th>
//             <th className="px-4 py-2 text-left">Requested Quantity</th>
//             <th className="px-4 py-2 text-left">Vaccine Name</th>
//             <th className="px-4 py-2 text-left">Status</th>
//             <th className="px-4 py-2 text-left">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {pendingRequests.length > 0 ? (
//             pendingRequests.map((request) => (
//               <tr key={request.Batch_Number} className="border-t border-gray-200">
//                 <td className="px-4 py-2">{request.Request_ID}</td>
//                 <td className="px-4 py-2">{request.Batch_Number}</td>
//                 <td className="px-4 py-2">{request.Batch_Quantity}</td>
//                 <td className="px-4 py-2">{request.Vaccine_Name}</td>
//                 <td className="px-4 py-2">{request.Status}</td>
//                 <td className="px-4 py-2">
//                   <button
//                     onClick={() => handleCancel(request.Request_ID)}
//                     className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
//                   >
//                     Close
//                   </button>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan={5} className="text-center py-4">No pending requests.</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default EmployeeRequests;

import React, { useEffect, useState } from 'react';

interface Request {
  Batch_Number: string;
  Request_ID: string;
  Batch_Quantity: number;
  Status: string;
  Request_Type: string;
  Vaccine_Name: string;
  Requested_By: string;
}

const EmployeeRequests: React.FC = () => {
  const [pendingRequests, setPendingRequests] = useState<Request[]>([]);
  const technicianID = "";

  useEffect(() => {
    const fetchPendingRequests = async () => {
      try {
        const response = await fetch(`http://localhost:8080/requests/?requestedBy=${technicianID}`);
        const result = await response.json();
        setPendingRequests(result);
      } catch (error) {
        console.error('Error fetching pending requests:', error);
      }
    };

    fetchPendingRequests();
  }, []);

  const handleCancel = async (requestId: string) => {
    try {
      const response = await fetch(`http://localhost:8080/requests/${requestId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Request canceled!');

        // remove the canceled request from the state
        setPendingRequests(pendingRequests.filter((r) => r.Request_ID !== requestId));
      } else {
        alert('Failed to cancel request.');
      }
    } catch (error) {
      console.error('Error canceling request:', error);
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-xl font-semibold mb-4">Your Batch Update Requests</h2>
      <table className="table-auto w-full border border-gray-300">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left">Request ID</th>
            <th className="px-4 py-2 text-left">Batch Number</th>
            <th className="px-4 py-2 text-left">Requested Quantity</th>
            <th className="px-4 py-2 text-left">Vaccine Name</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {pendingRequests.length > 0 ? (
            pendingRequests.map((request) => (
              <tr key={request.Batch_Number} className="border-t border-gray-200">
                <td className="px-4 py-2">{request.Request_ID}</td>
                <td className="px-4 py-2">{request.Batch_Number}</td>
                <td className="px-4 py-2">{request.Batch_Quantity}</td>
                <td className="px-4 py-2">{request.Vaccine_Name}</td>
                <td className="px-4 py-2">{request.Status}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleCancel(request.Request_ID)}
                    className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
                  >
                    Close
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center py-4">No pending requests.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeRequests;