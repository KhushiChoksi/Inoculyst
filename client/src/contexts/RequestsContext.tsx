// import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
// import axios from 'axios';

// export interface Request {
//   Request_ID: string;
//   Technician_ID: string;
//   Batch_Number: string;
//   Status: string;
//   Order_status: string;
//   Date_Added: string;
//   Batch_Quantity: number;
//   Expiry_Date: string;
//   Vaccine_Name: string;
//   Pharmacy_Name: string;
// }

// interface RequestsContextType {
//   requests: Request[];
//   pendingRequests: Request[];
//   loading: boolean;
//   error: string | null;
//   refreshRequests: () => Promise<void>;
//   updateRequestStatus: (requestId: string, status: string) => Promise<void>;
//   deleteRequest: (requestId: string) => Promise<void>;
// }

// export const RequestsContext = createContext<RequestsContextType | undefined>(undefined);

// export const useRequests = () => {
//   const context = useContext(RequestsContext);
//   if (context === undefined) {
//     throw new Error('useRequests must be used within a RequestsProvider');
//   }
//   return context;
// };

// interface RequestsProviderProps {
//   children: ReactNode;
// }

// export const RequestsProvider: React.FC<RequestsProviderProps> = ({ children }) => {
//   const [requests, setRequests] = useState<Request[]>([]);
//   const [pendingRequests, setPendingRequests] = useState<Request[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   const fetchRequests = async () => {
//     try {
//       const [allResponse, pendingResponse] = await Promise.all([
//         axios.get<Request[]>('http://localhost:8080/requests'),
//         axios.get<Request[]>('http://localhost:8080/requests/pending')
//       ]);
      
//       setRequests(allResponse.data);
//       setPendingRequests(pendingResponse.data);
//       setError(null);
//     } catch (err) {
//       setError('Failed to fetch requests');
//       console.error('Error fetching requests:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const refreshRequests = async () => {
//     setLoading(true);
//     await fetchRequests();
//   };

//   const updateRequestStatus = async (requestId: string, status: string) => {
//     try {
//       await axios.put(`http://localhost:8080/requests/${requestId}/status`, { status });
      
//       // If status is "Accepted", update batch table
//       if (status === 'Accepted') {
//         await axios.post('http://localhost:8080/requests/update-batch-with-requests');
//       }
      
//       // Refresh requests after update
//       await refreshRequests();
//     } catch (err) {
//       setError('Failed to update request status');
//       console.error('Error updating request status:', err);
//       throw err;
//     }
//   };

//   const deleteRequest = async (requestId: string) => {
//     try {
//       await axios.delete(`http://localhost:8080/requests/${requestId}`);
//       await refreshRequests();
//     } catch (err) {
//       setError('Failed to delete request');
//       console.error('Error deleting request:', err);
//       throw err;
//     }
//   };

//   useEffect(() => {
//     fetchRequests();
//   }, []);

//   const value = {
//     requests,
//     pendingRequests,
//     loading,
//     error,
//     refreshRequests,
//     updateRequestStatus,
//     deleteRequest
//   };

//   return <RequestsContext.Provider value={value}>{children}</RequestsContext.Provider>;
// };

// export default RequestsProvider;

import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import axios from 'axios';
import { useAuthContext } from './AuthContext.tsx';

export interface Request {
  Request_ID: string;
  Technician_ID: string;
  Batch_Number: string;
  Status: string;
  Order_status: string;
  Date_Added: string;
  Batch_Quantity: number;
  Expiry_Date: string;
  Vaccine_Name: string;
  Pharmacy_Name: string;
}

interface RequestsContextType {
  requests: Request[];
  pendingRequests: Request[];
  loading: boolean;
  error: string | null;
  refreshRequests: () => Promise<void>;
  updateRequestStatus: (requestId: string, status: string) => Promise<void>;
  deleteRequest: (requestId: string) => Promise<void>;
}

export const RequestsContext = createContext<RequestsContextType | undefined>(undefined);

export const useRequests = () => {
  const context = useContext(RequestsContext);
  if (context === undefined) {
    throw new Error('useRequests must be used within a RequestsProvider');
  }
  return context;
};

interface RequestsProviderProps {
  children: ReactNode;
}

export const RequestsProvider: React.FC<RequestsProviderProps> = ({ children }) => {
  const [requests, setRequests] = useState<Request[]>([]);
  const [pendingRequests, setPendingRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { accountType, userID } = useAuthContext();

  const fetchRequests = async () => {
    setLoading(true);
    try {
      // Use the correct endpoints based on your API
      const allRequestsResponse = await axios.get<Request[]>('http://localhost:8080/requests');
      
      // For pending requests, use the dedicated endpoint
      const pendingRequestsResponse = await axios.get<Request[]>('http://localhost:8080/requests/pending');
      
      // Filter requests for technicians if needed
      let filteredRequests = allRequestsResponse.data;
      if (accountType === 'technician') {
        filteredRequests = allRequestsResponse.data.filter(req => req.Technician_ID === userID);
      }
      
      setRequests(filteredRequests);
      setPendingRequests(pendingRequestsResponse.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching requests:', err);
      setError('Failed to fetch requests');
    } finally {
      setLoading(false);
    }
  };

  const refreshRequests = async () => {
    await fetchRequests();
  };

  const updateRequestStatus = async (requestId: string, status: string) => {
    // Only admins can update status
    if (accountType !== 'admin') {
      setError('Only administrators can approve or reject requests');
      return;
    }
    
    try {
      // Use the correct endpoint for updating status
      await axios.put(`http://localhost:8080/requests/${requestId}/status`, { status });

      //If status is "Accepted", update batch table
      if (status === 'Accepted') {
        await axios.post('http://localhost:8080/requests/update-batch-with-requests');
        
        // Also refresh the pending requests table
        await axios.post('http://localhost:8080/requests/update-pending-requests');
      }

      // Refresh requests after update
      await refreshRequests();
    } catch (err) {
      console.error('Error updating request status:', err);
      setError('Failed to update request status');
      throw err;
    }
  };

  const deleteRequest = async (requestId: string) => {
    try {
      if (accountType === 'technician') {
        // Find the request to check if it belongs to this technician
        const requestToDelete = requests.find(req => req.Request_ID === requestId);
        
        // Only allow technicians to delete their own requests that are already processed
        if (!requestToDelete) {
          throw new Error('Request not found');
        }
        
        if (requestToDelete.Technician_ID !== userID) {
          throw new Error('You can only delete your own requests');
        }
        
        if (requestToDelete.Status === 'Pending') {
          throw new Error('You cannot delete pending requests');
        }
      }
      
      // Use the correct endpoint for deleting a request
      await axios.delete(`http://localhost:8080/requests/${requestId}`);
      await refreshRequests();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete request';
      setError(errorMessage);
      console.error('Error deleting request:', err);
      throw err;
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [accountType, userID]);

  const value = {
    requests,
    pendingRequests,
    loading,
    error,
    refreshRequests,
    updateRequestStatus,
    deleteRequest
  };

  return <RequestsContext.Provider value={value}>{children}</RequestsContext.Provider>;
};

export default RequestsProvider;
