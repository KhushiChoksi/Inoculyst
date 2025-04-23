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
    throw new Error('error');
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
      const allRequestsResponse = await axios.get<Request[]>('http://localhost:8080/requests'); //routes for getting
      
      const pendingRequestsResponse = await axios.get<Request[]>('http://localhost:8080/requests/pending');
      
      let filteredRequests = allRequestsResponse.data;
      if (accountType === 'technician') {
        filteredRequests = allRequestsResponse.data.filter(req => req.Technician_ID === userID); //only show technician the requests they made
      }
      
      setRequests(filteredRequests);
      setPendingRequests(pendingRequestsResponse.data);
      setError(null);
    } catch (err) {
      setError('fetch error');
    } finally {
      setLoading(false);
    }
  };

  const refreshRequests = async () => {
    await fetchRequests();
  };

  const updateRequestStatus = async (requestId: string, status: string) => {
    if (accountType !== 'admin') {
      setError('you cannot approve or reject requests');
      return;
    }
    
    try {
      await axios.put(`http://localhost:8080/requests/${requestId}/status`, { status });

      if (status === 'Accepted') {
        await axios.post('http://localhost:8080/requests/update-batch-with-requests');
        
        await axios.post('http://localhost:8080/requests/update-pending-requests');
      }

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
        const requestToDelete = requests.find(req => req.Request_ID === requestId);
        
        if (!requestToDelete) {
          throw new Error('request not found');
        }
        
        if (requestToDelete.Technician_ID !== userID) {
          throw new Error('you can only delete your own requests');
        }
        
        if (requestToDelete.Status === 'Pending') {
          throw new Error('you cannot delete pending requests');
        }
      }
      
      await axios.delete(`http://localhost:8080/requests/${requestId}`);
      await refreshRequests();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete request';
      setError(errorMessage);
      console.error('error deleting request:', err);
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
