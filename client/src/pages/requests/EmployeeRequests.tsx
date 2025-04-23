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

        setPendingRequests(pendingRequests.filter((r) => r.Request_ID !== requestId));
      } else {
        alert('Failed to cancel request.');
      }
    } catch (error) {
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