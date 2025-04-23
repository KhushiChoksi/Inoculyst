import React, { useState } from 'react';

interface Props {
  batchh: {
    Batch_Number: string;
    Order_status: string;
    Date_Added: string;
    Batch_Quantity: number;
    Expiry_Date: string;
    Vaccine_Name: string;
    Pharmacy_Name: string;
  };
  onCancel: () => void;
}

const RequestUpdateBatch: React.FC<Props> = ({ batchh: batch, onCancel }) => {
  const [quantity, setQuantity] = useState<number>(batch.Batch_Quantity);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [status, setStatus] = useState("");
  const [success, setSuccess] = useState<boolean>(false);
  
  const handleBack = () => {
    onCancel();
  };

  const technicianId = 'E001';

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    
    const requestBody = {
      technician_id: technicianId,
      batch_number: batch.Batch_Number,
      order_status: "Arrived",
      status: "Pending",
      date_added: new Date().toISOString().split("T")[0], 
      batch_quantity: quantity,
      expiry_date: "2025-04-26",
      vaccine_name: "[COVID-19] VAXZEVRIA",
      pharmacy_name: "PharmaPlus"
    };
  
    console.log("Request payload:", requestBody); 
  
    try {
      const response = await fetch('http://localhost:8080/requests/add-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });
  
      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || "Failed to add request");
      }
  
      setStatus("Request submitted successfully.");
      setSuccess(true);
    } catch (err: any) {
      console.error("Error inserting request:", err.message);
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="bg-[#F7F7F2] min-h-screen p-6">
      <div className="max-w-2xl p-2">
        <div className = "flex justify-between">
      <div className="font-normal text-2xl">Inventory</div>
      <div className="pl-4 font-normal text-2xl">&gt;</div>
      <div className="pl-4 font-normal text-2xl">Batch Details</div>
      <div className="pl-4 font-normal text-2xl mx-2">&gt;</div>
        <div className="pl-4 text-2xl font-bold mb-6">Update Batch Request</div>
        </div>
        
        {success ? (
          <>
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            Request submitted successfully!
          </div> 
          <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 bg-dark1 text-white rounded hover:bg-dark_green"
              >
                Back To Inventory
              </button>
          </>
          
        ) : (
          <div>
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                A request already exists for this batch
              </div>
            )}
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-gray-600">Batch Number:</p>
                <p className="font-medium">{batch.Batch_Number}</p>
              </div>
        
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="quantity">
                New Quantity:
              </label>
              <input
                type="number"
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                min={1}
                className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            
            <div className="flex space-x-4">
            <button onClick={handleSubmit}
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-dark1 text-white rounded hover:bg-dark_green transition-colors"
              >Submit Request
              </button>
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 bg-red1 text-white rounded hover:text-dark1"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestUpdateBatch;