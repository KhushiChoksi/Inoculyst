// import React from "react";

// export default function Inventory() {
//     return (
//         <div> 
//         <div className='bg-background p-6 h-20'></div>
//         <div className='flex items-center justify-between mt-10'>
//         <div className='font-bold indent-10 text-2xl'>Inventory </div>
//              </div>
//              <div className='font-normal text-sm mt-2 indent-10'>List of batches available</div>
//         </div>
//     );
// }

import React, { useState } from 'react';
import BatchTable from './components/BatchTable.tsx';
import AssistantBatchDetails from './components/assistant/AssistantBatchDetails.tsx';
// import AdminAddNewBatch from './components/admin/AdminAddNewBatch.tsx';
// import AdminUpdateBatch from './components/admin/AdminUpdateBatch.tsx';
// import AdminReturnBatch from "./components/admin/AdminReturnBatch.tsx";


interface Batch {
  Batch_Number: string;
  Order_status: string;
  Date_Added: string;
  Batch_Quantity: number;
  Expiry_Date: string;
  Vaccine_Name: string;
}

const AssistantInventory: React.FC = () => {
  const [selectedBatch, setSelectedBatch] = useState<Batch | null>(null);
  const [isAddNewBatchVisible, setAddNewBatchVisible] = useState(false);
  const [isUpdateBatchVisible, setUpdateBatchVisible] = useState(false); 
  const [selectedReturnBatch, setSelectedReturnBatch] = useState<string | null>(null);
//   const adminID = localStorage.getItem("id"); ///////
const adminID = "A002"


  const handleBack = () => {
    setSelectedBatch(null);
  };

  const handleViewDetails = (batch: Batch) => {
    setSelectedBatch(batch);
  };

  const handleAddNewBatch = () => {
    setAddNewBatchVisible(true);
  };

  const handleUpdateBatch = () => {
    setUpdateBatchVisible(true); 
  };

// if (isAddNewBatchVisible) {
//     return <AdminAddNewBatch onCancel={() => setAddNewBatchVisible(false)} />;
//   }
  

// if (isUpdateBatchVisible && selectedBatch)
//     return <AdminUpdateBatch batch={selectedBatch} onCancel={() => setUpdateBatchVisible(false)} />;
  
const handleDeleteBatch = async () => {
    if (!selectedBatch) return;
  
    const confirmed = window.confirm("Are you sure you want to delete this batch?");
    if (!confirmed) return;
  
    try {
      const response = await fetch(`http://localhost:8080/batches/${selectedBatch.Batch_Number}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) throw new Error("Failed to delete batch");
  
      alert("Batch deleted successfully.");
    //   setSelectedBatch(null); 
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete batch.");
    }
  };
  
//   if (selectedReturnBatch) {
//     return (
//       <AdminReturnBatch
//         batchNumber={selectedReturnBatch}
//         adminID={adminID}
//         onCancel={() => setSelectedReturnBatch(null)}
//       />
//     );
//   }
  

  return (
    <div className="bg-[#F7F7F2] min-h-screen">
      <div className="">
        {selectedBatch ? (
          <>
            <div className="flex mt-4">
              <div className="font-normal indent-6 text-2xl">Inventory</div>
              <div className="font-normal indent-10 text-2xl mx-2">&gt;</div>
              <div className="font-bold indent-10 text-2xl text-left mr-6">Batch Details</div>
              {/* <button
                onClick={handleUpdateBatch}
                className="ml-auto font-normal text-sm bg-dark1 text-white mr-6 px-4 py-3 rounded hover:bg-dark_green transition-colors"
              >
                Update Batch
              </button> */}

              {/* <button onClick={() => setSelectedReturnBatch(selectedBatch.Batch_Number)} className="font-normal text-sm bg-dark1 text-white mr-6 px-4 py-3 rounded hover:bg-dark_green transition-colors">
                Return Batch
              </button> */}
              {/* <button onClick={handleDeleteBatch} className="font-normal text-sm bg-dark1 text-white mr-6 px-4 py-3 rounded hover:bg-red1 transition-colors">
                Delete Batch
              </button> */}
            </div>

            <div className="ml-10 mt-4">
              <AssistantBatchDetails batch={selectedBatch} />
            </div>
            <button
              onClick={handleBack}
              className="float-right mt-4 font-normal text-sm bg-dark1 text-white mr-6 px-4 py-3 rounded hover:bg-dark_green transition-colors">
              Back to Inventory
            </button>
          </>
        ) : (
          <>
            <div className="flex items-center justify-between mt-4">
              <div className="font-bold ml-6 text-2xl">Inventory</div>
              {/* <button
                onClick={handleAddNewBatch}
                className="font-normal text-sm bg-dark1 text-white mr-6 px-4 py-3 rounded hover:bg-dark_green transition-colors"
              >
                + Add New Batch
              </button> */}
            </div>
            <div className="font-normal text-sm mt-2 ml-6">List of batches available</div>
            <div className="ml-10 mr-6 mt-4">
              <BatchTable onViewDetails={handleViewDetails} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AssistantInventory;

