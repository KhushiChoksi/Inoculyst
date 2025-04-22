import React, { useState } from "react"; 

interface Props {
  batch: {
    Batch_Number: string;
    Batch_Quantity: number;
  };
  onCancel: () => void;
}

const AdminUpdateBatch: React.FC<Props> = ({ batch, onCancel }) => {

  const [quantity, setQuantity] = useState(batch.Batch_Quantity);
  const [status, setStatus] = useState("");


const handleBack = () => {
    onCancel();
  };
  
  const handleSubmit = async () => {
    try {
        const response = await fetch(`http://localhost:8080/batches/${batch.Batch_Number}/quantity`, {

        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity: quantity })
      });

      if (!response.ok) throw new Error("Failed to update");

      setStatus("Batch quantity updated successfully.");
    } catch (err) {
      console.error("Update failed:", err);
      setStatus("Update failed.");
    }
  };

  return (
    <div className="bg-[#F7F7F2] min-h-screen">
      <div className=""></div>
      <div className="flex items-center mt-4">
        <div className="font-normal indent-6 text-2xl">Inventory</div>
        <div className="font-normal indent-10 text-2xl mx-2">&gt;</div>
        <div className="font-bold indent-10 text-2xl text-left mr-6">Update Batch</div>
      </div>

      <div className="mb-6 mt-6 pl-10">
        <label className="block mb-1 text-sm font-normal text-dark2">Batch Quantity</label>
        <input
          type="number"
          min="0"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-dark_green"
        />
      </div>

      <button
        onClick={handleSubmit}
        className="font-normal text-sm bg-dark1 text-white ml-10 px-4 py-3 rounded hover:bg-dark_green transition-colors"
      >
        Confirm Update
      </button>
      <button
        onClick={handleBack}
        className="font-normal text-sm bg-dark1 text-white ml-10 px-4 py-3 rounded hover:bg-dark_green transition-colors"
      >
        Back to Inventory
      </button>

      {status && <div className="mt-4 ml-10 text-sm text-gray-600">{status}</div>}
    </div>
  );
};

export default AdminUpdateBatch;