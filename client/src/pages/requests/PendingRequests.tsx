import React, { useState } from 'react';
import RequestTable from './components/RequestTable.tsx';
import { RequestsProvider } from '../../contexts/RequestsContext.tsx';

const PendingRequests: React.FC = () => {
  const technicianId = 'E001';
  const [pendingRequests, setRequests] = useState<Request[]>([]);


  const fetchAllRequests = async () => {
    try {
      const response = await fetch(`http://localhost:8080/requests`);
      const result = await response.json();
      setRequests(result);
    } catch (error) {
      console.error('Error fetching pending requests:', error);
    }
  };
  
  return (
    <RequestsProvider>
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold mb-4">View Requests</h1>
          <p className="text-gray-600 mb-8">View and update the requests made by technicians.</p>    
          <RequestTable/>
          
        </div>
      </div>
    </RequestsProvider>
  );
};

export default PendingRequests;