import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import axios from 'axios';

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

  const fetchRequests = async () => {
    try {
      const [allResponse, pendingResponse] = await Promise.all([
        axios.get<Request[]>('http://localhost:8080/requests'),
        axios.get<Request[]>('http://localhost:8080/requests/pending')
      ]);
      
      setRequests(allResponse.data);
      setPendingRequests(pendingResponse.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch requests');
      console.error('Error fetching requests:', err);
    } finally {
      setLoading(false);
    }
  };

  const refreshRequests = async () => {
    setLoading(true);
    await fetchRequests();
  };

  const updateRequestStatus = async (requestId: string, status: string) => {
    try {
      await axios.put(`http://localhost:8080/requests/${requestId}/status`, { status });
      
      // If status is "Accepted", update batch table
      if (status === 'Accepted') {
        await axios.post('http://localhost:8080/requests/update-batch-with-requests');
      }
      
      // Refresh requests after update
      await refreshRequests();
    } catch (err) {
      setError('Failed to update request status');
      console.error('Error updating request status:', err);
      throw err;
    }
  };

  const deleteRequest = async (requestId: string) => {
    try {
      await axios.delete(`http://localhost:8080/requests/${requestId}`);
      await refreshRequests();
    } catch (err) {
      setError('Failed to delete request');
      console.error('Error deleting request:', err);
      throw err;
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

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