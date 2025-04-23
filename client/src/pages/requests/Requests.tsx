import React from 'react';
import RequestTable from './components/RequestTable.tsx';
import { RequestsProvider } from '../../contexts/RequestsContext.tsx';
import { useAuthContext } from '../../contexts/AuthContext.tsx';

const Requests: React.FC = () => {
  const { accountType } = useAuthContext();
  
  return ( //same method for showing pages as inventory
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
        
        </div>
      </div>
    </RequestsProvider>
  );
};

export default Requests;