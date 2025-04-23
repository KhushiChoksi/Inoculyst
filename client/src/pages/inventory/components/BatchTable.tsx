import React, { useEffect, useState } from 'react';

interface Batch {
  Batch_Number: string;
  Order_status: string;
  Date_Added: string;
  Batch_Quantity: number;
  Expiry_Date: string;
  Vaccine_Name: string;
}

interface Props {
  onViewDetails: (batch: Batch) => void;
}

const BatchTable: React.FC<Props> = ({ onViewDetails }) => {
  const [batches, setBatches] = useState<Batch[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/batches');
        const result = await response.json();
        setBatches(result);
      } catch (error) {
        console.error('Error fetching batch data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="overflow-x-auto border border-gray-300 rounded-md mr-6">
      <table className="min-w-full divide-y divide-[gray-300]">
        <thead className='bg-[#FFFFFF]'>
          <tr>
            <th className="px-6 py-3 text-left text-s font-medium text-black-500 tracking-wider cursor-pointer">Batch Number</th>
            <th className="px-6 py-3 text-left text-s font-medium text-black-500 tracking-wider cursor-pointer">Order Status</th>
            <th className="px-6 py-3 text-left text-s font-medium text-black-500 tracking-wider cursor-pointer">Date Added</th>
            <th className="px-6 py-3 text-left text-s font-medium text-black-500 tracking-wider cursor-pointert">Quantity</th>
            <th className="px-6 py-3 text-left text-s font-medium text-black-500 tracking-wider cursor-pointer">Expiry Date</th>
            <th className="px-6 py-3 text-left text-s font-medium text-black-500 tracking-wider cursor-pointert">Vaccine</th>
            <th className="px-6 py-3 text-left text-s font-medium text-black-500 tracking-wider cursor-pointer">Actions</th>
          </tr>
        </thead>
        <tbody className='bg-[#FFFFFF] divide-y divide-gray-200'>
          {batches.map((batch) => (
            <tr key={batch.Batch_Number} className="hover:bg-light_green">
              <td className="px-6 py-4 whitespace-nowrap">{batch.Batch_Number}</td>
              <td className="px-6 py-4 whitespace-nowrap">{batch.Order_status}</td>
              <td className="px-6 py-4 whitespace-nowrap">{new Date(batch.Date_Added).toLocaleDateString()}</td>
              <td className="px-6 py-4 whitespace-nowrap">{batch.Batch_Quantity}</td>
              <td className="px-6 py-4 whitespace-nowrap">{new Date(batch.Expiry_Date).toLocaleDateString()}</td>
              <td className="px-6 py-4 whitespace-nowrap">{batch.Vaccine_Name}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  onClick={() => onViewDetails(batch)}
                  className="bg-dark1 text-white px-3 py-1 rounded hover:bg-dark_green text-sm"
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BatchTable;
