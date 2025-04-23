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

    try {const request = requests.find(req => req.Request_ID === requestId);
      if (!request) throw new Error("Request not found");
  
        const updateResponse = await fetch(`http://localhost:8080/requests/${requestId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({status:'Accepted'})
      }); 

      console.log("Status response:", updateResponse.status);
  const text = await updateResponse.text();
  console.log("Response body:", text);

    } catch (error) {
      console.error('Error stat:', error);
      setLocalError('Failed to update stat.');
    } finally {
      setActionInProgress(null);
      await refreshRequests();
    } 

    try {
      setActionInProgress(requestId);
      setLocalError(null);
  
      const request = requests.find(req => req.Request_ID === requestId);
      if (!request) throw new Error("Request not found");
  
      const updateResponse = await fetch(`http://localhost:8080/batches/${request.Batch_Number}/quantity`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity: request.Batch_Quantity })
      });
  
      if (!updateResponse.ok) {
        throw new Error("Failed to update batch quantity");
      }
  
    } catch (error) {
      console.error('Error batch:', error);
      setLocalError('Failed  update batch.');
    } finally {
      setActionInProgress(null);
    } 

  };

  const handleReject = async (requestId: string) => {
    
    try {const request = requests.find(req => req.Request_ID === requestId);
      if (!request) throw new Error("Request not found");
  
        const updateResponse = await fetch(`http://localhost:8080/requests/${requestId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({status:'Rejected'})
      }); 

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
    <div className="overflow-x-auto border border-gray-300 rounded-md">
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
      <table className="min-w-full divide-y divide-[gray-300">
        <thead className="bg-[#FFFFFF]">
          <tr>
            <th className="px-6 py-3 text-left text-s font-medium text-black-500 tracking-wider cursor-pointer">Request ID</th>
            <th className="px-6 py-3 text-left text-s font-medium text-black-500 tracking-wider cursor-pointer">Batch Number</th>
            <th className="px-6 py-3 text-left text-s font-medium text-black-500 tracking-wider cursor-pointer">Requested Quantity</th>
            <th className="px-6 py-3 text-left text-s font-medium text-black-500 tracking-wider cursor-pointer">Status</th>
            <th className="px-6 py-3 text-left text-s font-medium text-black-500 tracking-wider cursor-pointer">Order Status</th>
            <th className="px-6 py-3 text-left text-s font-medium text-black-500 tracking-wider cursor-pointer">Date Added</th>
            <th className="px-6 py-3 text-left text-s font-medium text-black-500 tracking-wider cursor-pointer">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-[#FFFFFF] divide-y divide-gray-200">
          {requests.length > 0 ? (
            requests.map((req) => (
              <tr key={req.Request_ID} className="hover:bg-light_green">
                <td className="px-6 py-4 whitespace-nowrap">{req.Request_ID}</td>
                <td className="px-6 py-4 whitespace-nowrap">{req.Batch_Number}</td>
                <td className="px-6 py-4 whitespace-nowrap">{req.Batch_Quantity}</td>
                <td className={`py-2 px-4 capitalize font-medium ${
                  req.Status === 'Pending' ? 'text-[#C89F52]' : 
                  req.Status === 'Accepted' ? 'text-[#899878]' : 'text-[#C85952]'
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
                          actionInProgress === req.Request_ID ? 'bg-gray-400' : 'bg-[#899878] hover:bg-[#4F5E3E]'
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
                          actionInProgress === req.Request_ID ? 'bg-gray-400' : 'bg-[#C85952] hover:bg-[#7E3E3A]'
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




