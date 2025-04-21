// import React from "react";

// export default function Inventory() {
//     return (
//         <div> 
//         <div className='bg-background p-6 h-20'></div>
//         <div className='flex items-center justify-between mt-10'>
//         <div className='font-bold indent-10 text-2xl'>Inventory </div>
//             <button className=
//             'font-normal text-sm bg-dark1 text-white mr-6 px-4 py-3 rounded hover:bg-dark_green transition-colors'>+ Add New Batch</button>
//              </div>
//              <div className='font-normal text-sm mt-2 indent-10'>List of batches available</div>
//         </div>
//     );
// }

import React, { useState } from 'react';
import BatchTable from './components/BatchTable.tsx';
import AdminBatchDetails from './components/admin/AdminBatchDetails.tsx';
import AdminAddNewBatch from './components/admin/AdminAddNewBatch.tsx';
import AdminUpdateBatch from './components/admin/AdminUpdateBatch.tsx'; // ✅ new import

interface Batch {
  Batch_Number: string;
  Order_status: string;
  Date_Added: string;
  Batch_Quantity: number;
  Expiry_Date: string;
  Vaccine_Name: string;
}

const AdminInventory: React.FC = () => {
  const [selectedBatch, setSelectedBatch] = useState<Batch | null>(null);
  const [isAddNewBatchVisible, setAddNewBatchVisible] = useState(false);
  const [isUpdateBatchVisible, setUpdateBatchVisible] = useState(false); // ✅ new state

  const handleViewDetails = (batch: Batch) => {
    setSelectedBatch(batch);
  };

  const handleAddNewBatch = () => {
    setAddNewBatchVisible(true);
  };

  const handleUpdateBatch = () => {
    setUpdateBatchVisible(true); // ✅ show update component
  };

  if (isAddNewBatchVisible) return <AdminAddNewBatch />;
  if (isUpdateBatchVisible && selectedBatch) return <AdminUpdateBatch batch={selectedBatch} />; // ✅

  return (
    <div className="bg-[#F7F7F2] min-h-screen">
      <div className="p-6">
        {selectedBatch ? (
          <>
            <div className="flex mt-4">
              <div className="font-normal indent-10 text-2xl">Inventory</div>
              <div className="font-normal indent-10 text-2xl mx-2">&gt;</div>
              <div className="font-bold indent-10 text-2xl text-left mr-6">Batch Details</div>
              <button
                onClick={handleUpdateBatch}
                className="ml-auto font-normal text-sm bg-dark1 text-white mr-6 px-4 py-3 rounded hover:bg-dark_green transition-colors"
              >
                ✎ Update Batch
              </button>
            </div>
            <div className="ml-10 mt-4">
              <AdminBatchDetails batch={selectedBatch} />
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center justify-between mt-4">
              <div className="font-bold ml-10 text-2xl">Inventory</div>
              <button
                onClick={handleAddNewBatch}
                className="font-normal text-sm bg-dark1 text-white mr-6 px-4 py-3 rounded hover:bg-dark_green transition-colors"
              >
                + Add New Batch
              </button>
            </div>
            <div className="font-normal text-sm mt-2 ml-10">List of batches available</div>
            <div className="ml-10 mr-6 mt-4">
              <BatchTable onViewDetails={handleViewDetails} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminInventory;
