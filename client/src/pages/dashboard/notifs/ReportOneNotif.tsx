import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface ExpiredBatch {
  A_Expired_Batches: string;
}

const ReportOneNotif: React.FC = () => {
  const [expiredBatches, setExpiredBatches] = useState<ExpiredBatch[]>([]);
  const [message, setMessage] = useState("");

  const getExpiredBatches = async() => {
    try {
        const expiredBatchesRes = await axios.get('http://localhost:8080/analytics/expired-batches');
        setExpiredBatches(expiredBatchesRes.data);
    }
    catch (error) {
        console.error("Couldn't get the list of expired batches: ", error);
        setMessage('Failed to load list of expired batches');
    }
  };

  useEffect(() => {
    getExpiredBatches();
  }, []); 

  if (expiredBatches.length === 0) {
    return <div className="text-gray-500"> No expired batches </div>;
  }

  return (
    <div>

        <ul className = "space-y-3">
            {expiredBatches.map((batch, index) => (
                <li key={index} className="p-3 bg-red-50 border border-red-200 rounded-md flex items-center">
                    <div className="h-2 w-2 bg-red-500 rounded-full mr-3"> </div>
                    <span className ="font-medium"> Batch ID: {batch.A_Expired_Batches}</span>
                </li>
            ))}
        </ul>
    </div>
  );
};

export default ReportOneNotif;