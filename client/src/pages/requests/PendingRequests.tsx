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

// import React from 'react';
// import RequestTable from './components/RequestTable';
// import { RequestsProvider } from '../../contexts/RequestsContext';

// const TechnicianRequests: React.FC = () => {
//   // This would typically come from authentication context
//   const technicianId = 'E001';
  
//   return (
//     <RequestsProvider>
//       <div className="bg-[#F7F7F2] min-h-screen p-6">
//         <div className="max-w-7xl mx-auto">
//           <h1 className="text-2xl font-bold mb-2">My Batch Update Requests</h1>
//           <p className="text-gray-600 mb-6">View and track your batch update requests</p>
          
//           <div className="bg-white rounded-lg shadow p-6">
//             <RequestTable 
//               role="technician"
//               technicianId={technicianId}
//             />
            
//             <div className="mt-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
//               <h3 className="font-medium text-gray-700 mb-2">Request Status Information</h3>
//               <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
//                 <li><span className="font-medium text-yellow-700">Pending</span>: Your request is waiting for review</li>
//                 <li><span className="font-medium text-green-700">Accepted</span>: Your request has been approved and the batch has been updated</li>
//                 <li><span className="font-medium text-red-700">Rejected</span>: Your request was not approved</li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>
//     </RequestsProvider>
//   );
// };

// export default TechnicianRequests;