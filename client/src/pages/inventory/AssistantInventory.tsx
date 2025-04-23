import React, { useState } from 'react';
import BatchTable from './components/BatchTable.tsx';
import AssistantBatchDetails from './components/assistant/AssistantBatchDetails.tsx';

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
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete batch.");
    }
  };
  

  return (
    <div className="bg-[#F7F7F2] min-h-screen">
      <div className="">
        {selectedBatch ? (
          <>
            <div className="flex mt-4 p-2">
              <div className="font-normal indent-6 text-2xl">Inventory</div>
              <div className="font-normal indent-4 text-2xl mx-2">&gt;</div>
              <div className="font-bold indent-4 text-2xl text-left mr-6">Batch Details</div>
             
            </div>

            <div className="ml-10 mt-4">
              <AssistantBatchDetails batch={selectedBatch} />
            </div>
            <button
              onClick={handleBack}
              className="float-right mt-4 font-normal text-sm bg-dark1 text-white mr-10 px-4 py-3 rounded hover:bg-dark_green transition-colors">
              Back to Inventory
            </button>
          </>
        ) : (
          <>
            <div className="flex items-center justify-between p-6">
              <div className="flex flex-col">
                <h1 className="text-2xl font-bold mb-4">Inventory</h1>
                <p className="text-gray-600 mb-6">List of batches in your inventory.</p>  
              </div>
            </div>
            <div className="ml-6 mr-0 mt-0">
              <BatchTable onViewDetails={handleViewDetails} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AssistantInventory;

