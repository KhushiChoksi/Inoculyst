// // import React, { useEffect, useState } from 'react';

// // interface Request {
// //   Batch_Number: string;
// //   Requested_Quantity: number;
// //   Status: string;
// //   Request_Type: string;
// //   Vaccine_Name: string;
// //   Requested_By: string;
// // }

// // const RequestTable: React.FC = () => {
// //   const [pendingRequests, setPendingRequests] = useState<Request[]>([]);

// //   useEffect(() => {
// //     const fetchPendingRequests = async () => {
// //       try {
// //         const response = await fetch('http://localhost:8080/requests/pending');
// //         const result = await response.json();
// //         setPendingRequests(result);
// //       } catch (error) {
// //         console.error('Error fetching pending requests:', error);
// //       }
// //     };

// //     fetchPendingRequests();
// //   }, []);

// //   const handleApprove = async (requestId: string) => {
// //     try {
// //       const response = await fetch(`http://localhost:8080/requests/${requestId}/status`, {
// //         method: 'PUT',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify({ status: 'Approved' }),
// //       });

// //       if (response.ok) {
// //         alert('Request approved!');
// //         // Re-fetch pending requests after approval
// //         setPendingRequests(pendingRequests.filter((r) => r.Batch_Number !== requestId));
// //       } else {
// //         alert('Failed to approve request.');
// //       }
// //     } catch (error) {
// //       console.error('Error approving request:', error);
// //     }
// //   };

// //   const handleReject = async (requestId: string) => {
// //     try {
// //       const response = await fetch(`http://localhost:8080/requests/${requestId}`, {
// //         method: 'DELETE',
// //       });

// //       if (response.ok) {
// //         alert('Request rejected!');
// //         // Remove rejected request from state
// //         setPendingRequests(pendingRequests.filter((r) => r.Batch_Number !== requestId));
// //       } else {
// //         alert('Failed to reject request.');
// //       }
// //     } catch (error) {
// //       console.error('Error rejecting request:', error);
// //     }
// //   };

// //   return (
// //     <div className="p-8">
// //       <h2 className="text-xl font-semibold mb-4">Pending Update Requests</h2>
// //       <table className="table-auto w-full border border-gray-300">
// //         <thead>
// //           <tr>
// //             <th className="px-4 py-2 text-left">Batch Number</th>
// //             <th className="px-4 py-2 text-left">Requested Quantity</th>
// //             <th className="px-4 py-2 text-left">Vaccine Name</th>
// //             <th className="px-4 py-2 text-left">Actions</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {pendingRequests.length > 0 ? (
// //             pendingRequests.map((request) => (
// //               <tr key={request.Batch_Number} className="border-t border-gray-200">
// //                 <td className="px-4 py-2">{request.Batch_Number}</td>
// //                 <td className="px-4 py-2">{request.Requested_Quantity}</td>
// //                 <td className="px-4 py-2">{request.Vaccine_Name}</td>
// //                 <td className="px-4 py-2">
// //                   <button
// //                     onClick={() => handleApprove(request.Batch_Number)}
// //                     className="bg-dark1 text-white px-4 py-1 rounded hover:bg-dark_green mr-2"
// //                   >
// //                     Approve
// //                   </button>
// //                   <button
// //                     onClick={() => handleReject(request.Batch_Number)}
// //                     className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
// //                   >
// //                     Reject
// //                   </button>
// //                 </td>
// //               </tr>
// //             ))
// //           ) : (
// //             <tr>
// //               <td colSpan={4} className="text-center py-4">No pending requests.</td>
// //             </tr>
// //           )}
// //         </tbody>
// //       </table>
// //     </div>
// //   );
// // };

// // export default RequestTable;

// import React, { useEffect, useState } from 'react';

// interface Request {
//   id: number;
//   batchNumber: string;
//   requestedQuantity: number;
//   status: string;
// }

// const RequestTable: React.FC = () => {
//   const [requests, setRequests] = useState<Request[]>([]);

//   useEffect(() => {
//     // Fetch all current requests from the backend
//     const fetchRequests = async () => {
//       try {
//         const response = await fetch('http://localhost:8080/requests');
//         const data = await response.json();
//         setRequests(data);
//       } catch (error) {
//         console.error('Error fetching requests:', error);
//       }
//     };

//     fetchRequests();
//   }, []);

//   return (
//     <div className="table-container">
//       <h2>Current Batch Update Requests</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>Batch Number</th>
//             <th>Requested Quantity</th>
//             <th>Status</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {requests.map((request) => (
//             <tr key={request.id}>
//               <td>{request.batchNumber}</td>
//               <td>{request.requestedQuantity}</td>
//               <td>{request.status}</td>
//               <td>
//                 <button
//                   // onClick={() => /* Implement your function to show RequestUpdateBatch */ 
//                 >
//                   Update Request
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default RequestTable;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// import React, { useEffect, useState } from 'react';

// interface Request {
//   id: number;
//   batchNumber: string;
//   requestedQuantity: number;
//   currentQuantity: number;
//   status: string;
// }

// const RequestTable: React.FC = () => {
//   const [requests, setRequests] = useState<Request[]>([]);

//   // useEffect(() => {
//   //   const fetchRequests = async () => {
//   //     try {
//   //       const response = await fetch('http://localhost:8080/requests');
//   //       const result = await response.json();
//   //       setRequests(result);
//   //     } catch (error) {
//   //       console.error('Error fetching requests:', error);
//   //     }
//   //   };

//   //   fetchRequests();
//   // }, []);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [requestsRes, batchesRes] = await Promise.all([
//           fetch('http://localhost:8080/requests'),
//           fetch('http://localhost:8080/batches'),
//         ]);
  
//         const requestsData = await requestsRes.json();
//         const batchesData = await batchesRes.json();
  
//         const batchQuantityMap: Record<string, number> = {};
//         batchesData.forEach((batch: any) => {
//           batchQuantityMap[batch.Batch_Number] = batch.Batch_Quantity;
//         });
  
//         const mergedRequests: Request[] = requestsData.map((req: any) => ({
//           id: req.Request_ID,
//           batchNumber: req.Batch_Number,
//           requestedQuantity: req.Batch_Quantity,
//           currentQuantity: batchQuantityMap[req.Batch_Number] || 0,
//           status: req.Status.toLowerCase(),
//         }));
  
//         setRequests(mergedRequests);
//       } catch (error) {
//         console.error('Error fetching requests or batches:', error);
//       }
//     };
  
//     fetchData();
//   }, []);
  

//   return (
//     <div className="overflow-x-auto">
//       <table className="min-w-full bg-white rounded-lg shadow-md">
//         <thead>
//           <tr className="bg-dark1 text-white">
//             <th className="py-2 px-4 text-left">Request ID</th>
//             <th className="py-2 px-4 text-left">Batch Number</th>
//             <th className="py-2 px-4 text-left">Current Quantity</th>
//             <th className="py-2 px-4 text-left">Requested Quantity</th>
//             <th className="py-2 px-4 text-left">Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {requests.map((req) => (
//             <tr key={req.id} className="border-b">
//               <td className="py-2 px-4">{req.id}</td>
//               <td className="py-2 px-4">{req.batchNumber}</td>
//               <td className="py-2 px-4">{req.currentQuantity}</td>
//               <td className="py-2 px-4">{req.requestedQuantity}</td>
//               <td className="py-2 px-4 capitalize">{req.status}</td>
//             </tr>
//           ))}
//           {requests.length === 0 && (
//             <tr>
//               <td colSpan={5} className="text-center py-4 text-gray-500">
//                 No requests found.
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default RequestTable; /////////////////////////////////////////////////////////////////////////////////////////////

// import React, { useState } from 'react';
// import { useRequests, Request } from '../../../contexts/RequestsContext';

// interface RequestTableProps {
//   role?: 'admin' | 'employee' | 'technician';
//   technicianId?: string;
// }

// const RequestTable: React.FC<RequestTableProps> = ({ role = 'admin', technicianId }) => {
//   const { requests, loading, error, updateRequestStatus, deleteRequest, refreshRequests } = useRequests();
//   const [filter, setFilter] = useState<string>('all');
  
//   // Filter requests based on role and filter state
//   const filteredRequests = requests.filter(request => {
//     // Filter by technician ID if role is technician
//     if (role === 'technician' && technicianId && request.Technician_ID !== technicianId) {
//       return false;
//     }
    
//     // Filter by status
//     if (filter === 'all') return true;
//     return request.Status.toLowerCase() === filter.toLowerCase();
//   });
  
//   const handleStatusChange = async (requestId: string, newStatus: string) => {
//     try {
//       await updateRequestStatus(requestId, newStatus);
//     } catch (err) {
//       console.error('Failed to update status:', err);
//     }
//   };
  
//   const handleDeleteRequest = async (requestId: string) => {
//     if (window.confirm('Are you sure you want to delete this request?')) {
//       try {
//         await deleteRequest(requestId);
//       } catch (err) {
//         console.error('Failed to delete request:', err);
//       }
//     }
//   };
  
//   if (loading) return <div className="text-center py-4">Loading requests...</div>;
//   if (error) return <div className="text-red-500 text-center py-4">{error}</div>;
  
//   return (
//     <div className="overflow-x-auto">
//       <div className="mb-4 flex justify-between items-center">
//         <div>
//           <label htmlFor="statusFilter" className="mr-2">Filter by Status:</label>
//           <select
//             id="statusFilter"
//             value={filter}
//             onChange={(e) => setFilter(e.target.value)}
//             className="border rounded px-2 py-1"
//           >
//             <option value="all">All</option>
//             <option value="pending">Pending</option>
//             <option value="accepted">Accepted</option>
//             <option value="rejected">Rejected</option>
//           </select>
//         </div>
//         <button 
//           onClick={() => refreshRequests()} 
//           className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded"
//         >
//           Refresh
//         </button>
//       </div>
      
//       <table className="min-w-full bg-white border-collapse">
//         <thead>
//           <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
//             <th className="py-3 px-6 text-left">Request ID</th>
//             <th className="py-3 px-6 text-left">Batch Number</th>
//             <th className="py-3 px-6 text-left">Vaccine</th>
//             <th className="py-3 px-6 text-left">Quantity</th>
//             <th className="py-3 px-6 text-left">Date Added</th>
//             <th className="py-3 px-6 text-left">Status</th>
//             {(role === 'admin' || role === 'employee') && (
//               <th className="py-3 px-6 text-center">Actions</th>
//             )}
//           </tr>
//         </thead>
//         <tbody className="text-gray-600 text-sm">
//           {filteredRequests.length === 0 ? (
//             <tr>
//               <td colSpan={role === 'technician' ? 6 : 7} className="py-4 px-6 border-b text-center">
//                 No requests found
//               </td>
//             </tr>
//           ) : (
//             filteredRequests.map((request) => (
//               <tr key={request.Request_ID} className="border-b hover:bg-gray-50">
//                 <td className="py-3 px-6 text-left">{request.Request_ID}</td>
//                 <td className="py-3 px-6 text-left">{request.Batch_Number}</td>
//                 <td className="py-3 px-6 text-left">{request.Vaccine_Name}</td>
//                 <td className="py-3 px-6 text-left">{request.Batch_Quantity}</td>
//                 <td className="py-3 px-6 text-left">
//                   {new Date(request.Date_Added).toLocaleDateString()}
//                 </td>
//                 <td className="py-3 px-6 text-left">
//                   <span className={`
//                     px-2 py-1 rounded-full text-xs font-semibold
//                     ${request.Status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : ''}
//                     ${request.Status === 'Accepted' ? 'bg-green-100 text-green-800' : ''}
//                     ${request.Status === 'Rejected' ? 'bg-red-100 text-red-800' : ''}
//                   `}>
//                     {request.Status}
//                   </span>
//                 </td>
//                 {(role === 'admin' || role === 'employee') && (
//                   <td className="py-3 px-6 text-center">
//                     {request.Status === 'Pending' && (
//                       <div className="flex justify-center space-x-2">
//                         <button
//                           onClick={() => handleStatusChange(request.Request_ID, 'Accepted')}
//                           className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded text-xs"
//                         >
//                           Accept
//                         </button>
//                         <button
//                           onClick={() => handleStatusChange(request.Request_ID, 'Rejected')}
//                           className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs"
//                         >
//                           Reject
//                         </button>
//                       </div>
//                     )}
//                     <button
//                       onClick={() => handleDeleteRequest(request.Request_ID)}
//                       className="bg-gray-500 hover:bg-gray-600 text-white px-2 py-1 rounded text-xs mt-1"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 )}
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default RequestTable;

// import React, { useState } from 'react';
// import { useRequests } from '../../../contexts/RequestsContext.tsx';
// import { useAuthContext } from '../../../contexts/AuthContext.tsx';
// import AdminUpdateBatch from '../../inventory/components/admin/AdminUpdateBatch';

// const RequestTable: React.FC = () => {
//   const { 
//     requests, 
//     loading, 
//     error, 
//     updateRequestStatus,
//     deleteRequest,
//     refreshRequests 
//   } = useRequests();
  
//   const { accountType, userID } = useAuthContext();
//   const [actionInProgress, setActionInProgress] = useState<string | null>(null);
//   const [localError, setLocalError] = useState<string | null>(null);

//   // const handleAccept = async (requestId: string) => {
//   //   try {
//   //     setActionInProgress(requestId);
//   //     setLocalError(null);
//   //     await updateRequestStatus(requestId, 'Accepted');
//   //     // After updating, refresh the requests to get the latest data
//   //     await refreshRequests();
//   //     // No page reload needed - let React handle UI updates
      
      
//   //   } catch (error) {
//   //     console.error('Error accepting request:', error);
//   //     setLocalError('Failed to update request status');
//   //   } finally {
//   //     setActionInProgress(null);
//   //   }
//   // };

//   const handleAccept = async (requestId: string) => {
//     try {
//       setActionInProgress(requestId);
//       setLocalError(null);
  
//       const request = requests.find(req => req.Request_ID === requestId);
//       if (!request) throw new Error("Request not found");
  
//       const updateResponse = await fetch(`http://localhost:8080/batches/${request.Batch_Number}/quantity`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ quantity: request.Batch_Quantity })
//       });
  
//       if (!updateResponse.ok) {
//         throw new Error("Failed to update batch quantity");
//       }
  
//       await updateRequestStatus(requestId, 'Accepted');
  
//       await refreshRequests();
//     } catch (error) {
//       console.error('Error accepting request:', error);
//       setLocalError('Failed to accept and update batch.');
//     } finally {
//       setActionInProgress(null);
//     }
//   };
  

//   const handleReject = async (requestId: string) => {
//     try {
//       setActionInProgress(requestId);
//       setLocalError(null);
//       await updateRequestStatus(requestId, 'Rejected');
//       // After updating, refresh the requests to get the latest data
//       await refreshRequests();
//     } catch (error) {
//       console.error('Error rejecting request:', error);
//       setLocalError('Failed to update request status');
//     } finally {
//       setActionInProgress(null);
//     }
//   };

//   const handleDelete = async (requestId: string) => {
//     try {
//       setActionInProgress(requestId);
//       setLocalError(null);
//       await deleteRequest(requestId);
//       // After deleting, refresh the requests to get the latest data
//       await refreshRequests();
//     } catch (error) {
//       console.error('Error deleting request:', error);
//       setLocalError('Failed to delete request');
//     } finally {
//       setActionInProgress(null);
//     }
//   };

//   if (loading) {
//     return <div className="text-center py-8">Loading requests...</div>;
//   }

//   return (
//     <div className="overflow-x-auto">
//       {localError && (
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//           {localError}
//         </div>
//       )}
//       {error && (
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//           {error}
//         </div>
//       )}
//       <table className="min-w-full bg-white">
//         <thead>
//           <tr className="bg-dark1 text-white">
//             <th className="py-2 px-4 text-left">Request ID</th>
//             <th className="py-2 px-4 text-left">Batch Number</th>
//             <th className="py-2 px-4 text-left">Requested Quantity</th>
//             <th className="py-2 px-4 text-left">Status</th>
//             <th className="py-2 px-4 text-left">Order Status</th>
//             <th className="py-2 px-4 text-left">Date Added</th>
//             <th className="py-2 px-4 text-left">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {requests.length > 0 ? (
//             requests.map((req) => (
//               <tr key={req.Request_ID} className="border-b hover:bg-gray-50">
//                 <td className="py-2 px-4">{req.Request_ID}</td>
//                 <td className="py-2 px-4">{req.Batch_Number}</td>
//                 <td className="py-2 px-4">{req.Batch_Quantity}</td>
//                 <td className={`py-2 px-4 capitalize font-medium ${
//                   req.Status === 'Pending' ? 'text-yellow-700' : 
//                   req.Status === 'Accepted' ? 'text-green-700' : 'text-red-700'
//                 }`}>
//                   {req.Status}
//                 </td>
//                 <td className="py-2 px-4">{req.Order_status}</td>
//                 <td className="py-2 px-4">
//                   {new Date(req.Date_Added).toLocaleDateString()}
//                 </td>
//                 <td className="py-2 px-4">
//                   {/* Admin actions: Accept/Reject for pending requests */}
//                   {(accountType === 'owner' || accountType === 'pharmacist') && req.Status === 'Pending' && (
//                     <div className="flex space-x-2">
//                       <button
//                         onClick={() => handleAccept(req.Request_ID)}
//                         disabled={actionInProgress === req.Request_ID}
//                         className={`${
//                           actionInProgress === req.Request_ID ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'
//                         } text-white w-8 h-8 rounded flex items-center justify-center`}
//                         title="Accept Request"
//                       >
//                         {actionInProgress === req.Request_ID ? (
//                           <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                           </svg>
//                         ) : (
//                           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                           </svg>
//                         )}
//                       </button>
//                       <button
//                         onClick={() => handleReject(req.Request_ID)}
//                         disabled={actionInProgress === req.Request_ID}
//                         className={`${
//                           actionInProgress === req.Request_ID ? 'bg-gray-400' : 'bg-red-600 hover:bg-red-700'
//                         } text-white w-8 h-8 rounded flex items-center justify-center`}
//                         title="Reject Request"
//                       >
//                         {actionInProgress === req.Request_ID ? (
//                           <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                           </svg>
//                         ) : (
//                           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                           </svg>
//                         )}
//                       </button>
//                     </div>
//                   )}
                  
//                   {/* Technician actions: Delete for accepted/rejected requests */}
//                   {accountType === 'technician' && userID === req.Technician_ID && 
//                    (req.Status === 'Accepted' || req.Status === 'Rejected') && (
//                     <button
//                       onClick={() => handleDelete(req.Request_ID)}
//                       disabled={actionInProgress === req.Request_ID}
//                       className={`${
//                         actionInProgress === req.Request_ID ? 'bg-gray-400' : 'bg-gray-600 hover:bg-gray-700'
//                       } text-white w-8 h-8 rounded flex items-center justify-center`}
//                       title="Delete Request"
//                     >
//                       {actionInProgress === req.Request_ID ? (
//                         <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                           <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                           <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                         </svg>
//                       ) : (
//                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                         </svg>
//                       )}
//                     </button>
//                   )}
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan={7} className="text-center py-4 text-gray-500">
//                 No requests found.
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default RequestTable;










//////////////////////////////////////////////////////////////////////////////////////////////////////////////////WORKS?

import React, { useState } from 'react';
import { useRequests } from '../../../contexts/RequestsContext.tsx';
import { useAuthContext } from '../../../contexts/AuthContext.tsx';

const RequestTable: React.FC = () => {
  const { 
    requests, 
    loading, 
    error, 
    updateRequestStatus,
    deleteRequest,
    refreshRequests 
  } = useRequests();
  
  const { accountType, userID } = useAuthContext();
  const [actionInProgress, setActionInProgress] = useState<string | null>(null);
  const [localError, setLocalError] = useState<string | null>(null);

  const handleAccept = async (requestId: string) => {

    ////////////////
    try {const request = requests.find(req => req.Request_ID === requestId);
      if (!request) throw new Error("Request not found");
  
      //const updateResponse = await fetch(`http://localhost:8080/batches/${request.Batch_Number}/quantity`, {
        const updateResponse = await fetch(`http://localhost:8080/requests/${requestId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        //body: JSON.stringify({ quantity: request.Batch_Quantity })
        body: JSON.stringify({status:'Accepted'})
      }); 

      console.log("Status response:", updateResponse.status);
  const text = await updateResponse.text();
  console.log("Response body:", text);

      if (!updateResponse.ok) {
        throw new Error("Failed to update stat");
      }
    } catch (error) {
      console.error('Error stat:', error);
      setLocalError('Failed to update stat.');
    } finally {
      setActionInProgress(null);
      await refreshRequests();
    } 
    ///////////

    // await updateRequestStatus(requestId, 'Accepted');

    try {
      setActionInProgress(requestId);
      setLocalError(null);
  
      const request = requests.find(req => req.Request_ID === requestId);
      if (!request) throw new Error("Request not found");
  
      const updateResponse = await fetch(`http://localhost:8080/batches/${request.Batch_Number}/quantity`, {
        //const updateResponse = await fetch(`http://localhost:8080/requests/${requestId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity: request.Batch_Quantity })
        //body: JSON.stringify({status:'Accepted'})
      });
  
      if (!updateResponse.ok) {
        throw new Error("Failed to update batch quantity");
      }
  
      // await updateRequestStatus(requestId, 'Accepted');
  
      // await refreshRequests();
    } catch (error) {
      console.error('Error batch:', error);
      setLocalError('Failed  update batch.');
    } finally {
      setActionInProgress(null);
    } 

  ///   try {const request = requests.find(req => req.Request_ID === requestId);
  //     if (!request) throw new Error("Request not found");
  
  //     //const updateResponse = await fetch(`http://localhost:8080/batches/${request.Batch_Number}/quantity`, {
  //       const updateResponse = await fetch(`http://localhost:8080/requests/${requestId}/status`, {
  //       method: 'PUT',
  //       headers: { 'Content-Type': 'application/json' },
  //       //body: JSON.stringify({ quantity: request.Batch_Quantity })
  //       body: JSON.stringify({status:'Accepted'})
  //     }); 

  //     console.log("Status response:", updateResponse.status);
  // const text = await updateResponse.text();
  // console.log("Response body:", text);

  //     if (!updateResponse.ok) {
  //       throw new Error("Failed to update stat");
  //     }
  //   } catch (error) {
  //     console.error('Error stat:', error);
  //     setLocalError('Failed to update stat.');
  //   } finally {
  //     setActionInProgress(null);
  //     await refreshRequests();
  ///   } 

  };
  // const handleAccept = async (requestId: string) => {
  //   try {
  //     setActionInProgress(requestId);
  //     setLocalError(null);
  
  //     const request = requests.find(req => req.Request_ID === requestId);
  //     if (!request) throw new Error("Request not found");
  
  //     await updateRequestStatus(requestId, 'Accepted');
  
  //     const quantityResponse = await fetch(`http://localhost:8080/batches/${request.Batch_Number}/quantity`, {
  //       method: 'PUT',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ quantity: request.Batch_Quantity })
  //     });
  
  //     if (!quantityResponse.ok) {
  //       const errorText = await quantityResponse.text();
  //       console.error('Batch update failed:', errorText);
  //       throw new Error("Failed to update batch quantity");
  //     }
  
  //     await refreshRequests();
  //   } catch (error) {
  //     console.error('Error accepting request:', error);
  //     setLocalError('Failed to accept and update batch.');
  //   } finally {
  //     setActionInProgress(null);
  //   }
  // };
  

  const handleReject = async (requestId: string) => {
    // try {
    //   setActionInProgress(requestId);
    //   setLocalError(null);
    //   await updateRequestStatus(requestId, 'Rejected');
    //   await refreshRequests();
    // } catch (error) {
    //   console.error('Error rejecting request:', error);
    //   setLocalError('Failed to update request status');
    // } finally {
    //   setActionInProgress(null);
    // }

    try {const request = requests.find(req => req.Request_ID === requestId);
      if (!request) throw new Error("Request not found");
  
      //const updateResponse = await fetch(`http://localhost:8080/batches/${request.Batch_Number}/quantity`, {
        const updateResponse = await fetch(`http://localhost:8080/requests/${requestId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        //body: JSON.stringify({ quantity: request.Batch_Quantity })
        body: JSON.stringify({status:'Rejected'})
      }); 
      if (!updateResponse.ok) {
        throw new Error("Failed to update stat");
      }
    } catch (error) {
      console.error('Error stat:', error);
      setLocalError('Failed to update stat.');
    } finally {
      setActionInProgress(null);
      await refreshRequests();
    } 

  };





  const handleDelete = async (requestId: string) => {
    try {
      setActionInProgress(requestId);
      setLocalError(null);
      await deleteRequest(requestId);
      await refreshRequests();
    } catch (error) {
      console.error('Error deleting request:', error);
      setLocalError('Failed to delete request');
    } finally {
      setActionInProgress(null);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading requests...</div>;
  }

  return (
    <div className="overflow-x-auto">
      {localError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {localError}
        </div>
      )}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-dark1 text-white">
            <th className="py-2 px-4 text-left">Request ID</th>
            <th className="py-2 px-4 text-left">Batch Number</th>
            <th className="py-2 px-4 text-left">Requested Quantity</th>
            <th className="py-2 px-4 text-left">Status</th>
            <th className="py-2 px-4 text-left">Order Status</th>
            <th className="py-2 px-4 text-left">Date Added</th>
            <th className="py-2 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.length > 0 ? (
            requests.map((req) => (
              <tr key={req.Request_ID} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4">{req.Request_ID}</td>
                <td className="py-2 px-4">{req.Batch_Number}</td>
                <td className="py-2 px-4">{req.Batch_Quantity}</td>
                <td className={`py-2 px-4 capitalize font-medium ${
                  req.Status === 'Pending' ? 'text-yellow-700' : 
                  req.Status === 'Accepted' ? 'text-green-700' : 'text-red-700'
                }`}>
                  {req.Status}
                </td>
                <td className="py-2 px-4">{req.Order_status}</td>
                <td className="py-2 px-4">
                  {new Date(req.Date_Added).toLocaleDateString()}
                </td>
                <td className="py-2 px-4">
                  {(accountType === 'owner' || accountType === 'pharmacist') && req.Status === 'Pending' && (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleAccept(req.Request_ID)}
                        disabled={actionInProgress === req.Request_ID}
                        className={`${
                          actionInProgress === req.Request_ID ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'
                        } text-white w-8 h-8 rounded flex items-center justify-center`}
                        title="Accept Request"
                      >
                        {actionInProgress === req.Request_ID ? (
                          <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </button>
                      <button
                        onClick={() => handleReject(req.Request_ID)}
                        disabled={actionInProgress === req.Request_ID}
                        className={`${
                          actionInProgress === req.Request_ID ? 'bg-gray-400' : 'bg-red-600 hover:bg-red-700'
                        } text-white w-8 h-8 rounded flex items-center justify-center`}
                        title="Reject Request"
                      >
                        {actionInProgress === req.Request_ID ? (
                          <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        )}
                      </button>
                    </div>
                  )}
                  
                  {accountType === 'technician' && userID === req.Technician_ID && 
                   (req.Status === 'Accepted' || req.Status === 'Rejected') && (
                    <button
                      onClick={() => handleDelete(req.Request_ID)}
                      disabled={actionInProgress === req.Request_ID}
                      className={`${
                        actionInProgress === req.Request_ID ? 'bg-gray-400' : 'bg-gray-600 hover:bg-gray-700'
                      } text-white w-8 h-8 rounded flex items-center justify-center`}
                      title="Delete Request"
                    >
                      {actionInProgress === req.Request_ID ? (
                        <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      )}
                    </button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className="text-center py-4 text-gray-500">
                No requests found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RequestTable;

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// import React, { useState } from 'react';
// import { useRequests } from '../../../contexts/RequestsContext.tsx';
// import { useAuthContext } from '../../../contexts/AuthContext.tsx';

// const RequestTable: React.FC = () => {
//   const { 
//     requests, 
//     loading, 
//     error, 
//     updateRequestStatus,
//     deleteRequest,
//     refreshRequests 
//   } = useRequests();
  
//   const { accountType, userID } = useAuthContext();
//   const [actionInProgress, setActionInProgress] = useState<string | null>(null);
//   const [localError, setLocalError] = useState<string | null>(null);

//   const handleAccept = async (requestId: string) => {
//     try {
//       setActionInProgress(requestId);
//       setLocalError(null);
//       await updateRequestStatus(requestId, 'Accepted');
//       // After updating, refresh the requests to get the latest data
//       await refreshRequests();
//       // No page reload needed - let React handle UI updates
//     } catch (error) {
//       console.error('Error accepting request:', error);
//       setLocalError('Failed to update request status');
//     } finally {
//       setActionInProgress(null);
//     }
//   };

//   const handleReject = async (requestId: string) => {
//     try {
//       setActionInProgress(requestId);
//       setLocalError(null);
//       await updateRequestStatus(requestId, 'Rejected');
//       // After updating, refresh the requests to get the latest data
//       await refreshRequests();
//     } catch (error) {
//       console.error('Error rejecting request:', error);
//       setLocalError('Failed to update request status');
//     } finally {
//       setActionInProgress(null);
//     }
//   };

//   const handleDelete = async (requestId: string) => {
//     try {
//       setActionInProgress(requestId);
//       setLocalError(null);
//       await deleteRequest(requestId);
//       // After deleting, refresh the requests to get the latest data
//       await refreshRequests();
//     } catch (error) {
//       console.error('Error deleting request:', error);
//       setLocalError('Failed to delete request');
//     } finally {
//       setActionInProgress(null);
//     }
//   };

//   if (loading) {
//     return <div className="text-center py-8">Loading requests...</div>;
//   }

//   return (
//     <div className="overflow-x-auto">
//       {localError && (
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//           {localError}
//         </div>
//       )}
//       {error && (
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//           {error}
//         </div>
//       )}
//       <table className="min-w-full bg-white">
//         <thead>
//           <tr className="bg-dark1 text-white">
//             <th className="py-2 px-4 text-left">Request ID</th>
//             <th className="py-2 px-4 text-left">Batch Number</th>
//             <th className="py-2 px-4 text-left">Requested Quantity</th>
//             <th className="py-2 px-4 text-left">Status</th>
//             <th className="py-2 px-4 text-left">Order Status</th>
//             <th className="py-2 px-4 text-left">Date Added</th>
//             <th className="py-2 px-4 text-left">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {requests.length > 0 ? (
//             requests.map((req) => (
//               <tr key={req.Request_ID} className="border-b hover:bg-gray-50">
//                 <td className="py-2 px-4">{req.Request_ID}</td>
//                 <td className="py-2 px-4">{req.Batch_Number}</td>
//                 <td className="py-2 px-4">{req.Batch_Quantity}</td>
//                 <td className={`py-2 px-4 capitalize font-medium ${
//                   req.Status === 'Pending' ? 'text-yellow-700' : 
//                   req.Status === 'Accepted' ? 'text-green-700' : 'text-red-700'
//                 }`}>
//                   {req.Status}
//                 </td>
//                 <td className="py-2 px-4">{req.Order_status}</td>
//                 <td className="py-2 px-4">
//                   {new Date(req.Date_Added).toLocaleDateString()}
//                 </td>
//                 <td className="py-2 px-4">
//                   {/* Admin actions: Accept/Reject for pending requests */}
//                   {(accountType === 'owner' || accountType === 'pharmacist') && req.Status === 'Pending' && (
//                     <div className="flex space-x-2">
//                       <button
//                         onClick={() => handleAccept(req.Request_ID)}
//                         disabled={actionInProgress === req.Request_ID}
//                         className={`${
//                           actionInProgress === req.Request_ID ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'
//                         } text-white w-8 h-8 rounded flex items-center justify-center`}
//                         title="Accept Request"
//                       >
//                         {actionInProgress === req.Request_ID ? (
//                           <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                           </svg>
//                         ) : (
//                           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                           </svg>
//                         )}
//                       </button>
//                       <button
//                         onClick={() => handleReject(req.Request_ID)}
//                         disabled={actionInProgress === req.Request_ID}
//                         className={`${
//                           actionInProgress === req.Request_ID ? 'bg-gray-400' : 'bg-red-600 hover:bg-red-700'
//                         } text-white w-8 h-8 rounded flex items-center justify-center`}
//                         title="Reject Request"
//                       >
//                         {actionInProgress === req.Request_ID ? (
//                           <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                           </svg>
//                         ) : (
//                           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                           </svg>
//                         )}
//                       </button>
//                     </div>
//                   )}
                  
//                   {/* Technician actions: Delete for accepted/rejected requests */}
//                   {accountType === 'technician' && userID === req.Technician_ID && 
//                    (req.Status === 'Accepted' || req.Status === 'Rejected') && (
//                     <button
//                       onClick={() => handleDelete(req.Request_ID)}
//                       disabled={actionInProgress === req.Request_ID}
//                       className={`${
//                         actionInProgress === req.Request_ID ? 'bg-gray-400' : 'bg-gray-600 hover:bg-gray-700'
//                       } text-white w-8 h-8 rounded flex items-center justify-center`}
//                       title="Delete Request"
//                     >
//                       {actionInProgress === req.Request_ID ? (
//                         <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                           <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                           <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                         </svg>
//                       ) : (
//                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                         </svg>
//                       )}
//                     </button>
//                   )}
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan={7} className="text-center py-4 text-gray-500">
//                 No requests found.
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default RequestTable;