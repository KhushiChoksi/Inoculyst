import React, { useEffect, useState } from 'react';
import axios from 'axios';

//same as report one, but shows the upcoming expiry list

interface UpcomingExpiryBatch {
    A_Upcoming_expiring_Batches: string;
}

const ReportOneNotif: React.FC = () => {
  const [upcomingExpiry, setupcomingExpiry] = useState<UpcomingExpiryBatch[]>([]);
  const [message, setMessage] = useState("");


  //get the list
  const getUpcomingExpiryBatches = async() => {
    try {
        const upcomingExpiryRes = await axios.get('http://localhost:8080/analytics/expiring-batches');
        setupcomingExpiry(upcomingExpiryRes.data);
    }
    catch (error) {
        console.error("Couldn't get the list of upcoming expiry batches: ", error);
        setMessage('Failed to load list of upcoming expiry batches');
    }
  };

  useEffect(() => {
    getUpcomingExpiryBatches();
  }, []); 

  //if none, then show theres none
  if (upcomingExpiry.length === 0) {
    return <div className="text-gray-500"> No expiring batches </div>;
  }

  //return the design with the list
  return (
    <div>

        <ul className = "space-y-3">
            {upcomingExpiry.map((batch, index) => (
                <li key={index} className="p-3 bg-yellow-50 border border-yellow-200 rounded-md flex items-center">
                    <div className="h-2 w-2 bg-yellow-500 rounded-full mr-3"> </div>
                    <span className ="font-medium"> Batch ID: {batch.A_Upcoming_expiring_Batches}</span>
                </li>
            ))}
        </ul>
    </div>
  );
};

export default ReportOneNotif;