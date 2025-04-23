import React, { useState } from 'react';
import BatchTable from './components/BatchTable.tsx';
import TechnicianBatchDetails from './components/technician/TechnicianBatchDetails.tsx';
import RequestUpdateBatch from './components/technician/RequestUpdateBatch.tsx';


interface TechnicianBatch {
  Batch_Number: string;
  Order_status: string;
  Date_Added: string;
  Batch_Quantity: number;
  Expiry_Date: string;
  Vaccine_Name: string;
  Pharmacy_Name: string;
}

const TechnicianInventory: React.FC = () => {
  const [selectedBatch, setSelectedBatch] = useState<TechnicianBatch | null>(null);
  const [isUpdateBatchVisible, setUpdateBatchVisible] = useState(false); 

const adminID = "A002"


  const handleBack = () => {
    setSelectedBatch(null);
  };

  const handleViewDetails = (batch: any) => {
    const techBatch: TechnicianBatch = { ...batch, Pharmacy_Name: "Unknown" };
    setSelectedBatch(techBatch);
  };

  const handleRequestUpdateBatch = () => {
    setUpdateBatchVisible(true); 
  };


if (isUpdateBatchVisible && selectedBatch)
    return <RequestUpdateBatch batchh={selectedBatch} onCancel={() => setUpdateBatchVisible(false)} />;
  

  return (
    <div className="bg-[#F7F7F2] min-h-screen">
      <div className="">
        {selectedBatch ? (
          <>
            <div className="flex mt-4 p-2">
              <div className="font-normal indent-6 text-2xl">Inventory</div>
              <div className="font-normal indent-4 text-2xl mx-2">&gt;</div>
              <div className="font-bold indent-4 text-2xl text-left mr-6">Batch Details</div>
              <button
                onClick={handleRequestUpdateBatch}
                className="ml-auto font-normal text-sm bg-dark_green text-white mr-6 px-4 py-3 rounded hover:bg-dark1 transition-colors"
              >
                Update Request
              </button>

            </div>

            <div className="ml-10 mt-4">
              <TechnicianBatchDetails batch={selectedBatch} />
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

export default TechnicianInventory;

