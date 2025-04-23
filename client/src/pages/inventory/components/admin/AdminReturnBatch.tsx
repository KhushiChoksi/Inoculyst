import React, { useEffect, useState } from "react"; 

interface Props {
  batchNumber: string;
  adminID: string;
  onCancel: () => void;
}

interface Distributor {
  Name: string;
}

const AdminReturnBatch: React.FC<Props> = ({ batchNumber, adminID, onCancel }) => {
  const [distributors, setDistributors] = useState<Distributor[]>([]);
  const [selectedDistributor, setSelectedDistributor] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    const fetchDistributors = async () => {
      try {
        const response = await fetch("http://localhost:8080/distributors");
        if (!response.ok) throw new Error("Failed to fetch distributors");
        const data = await response.json();
        setDistributors(data);
      } catch (err) {
        setStatus("Failed to load distributors.");
      }
    };
    fetchDistributors();

  }, []);

const handleReturn = async () => {
    try {
      const response = await fetch('http://localhost:8080/returns/add-returned-batch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          admin_id: adminID,
          distributor_name: selectedDistributor,
          batch_number:batchNumber,
        }),
      });
  

    if (!response.ok) {
        const text = await response.text();
        try {
          const errorData = JSON.parse(text);
          alert(`Failed to return batch: ${errorData.message}`);
        } catch {
          alert(`Failed to return batch: ${text}`);
        }
        return;
      }
      
      const data = await response.json();
      alert('Batch returned successfully!');
    } catch (err) {
      alert('Error: ' + err.message);
    }
    window.location.reload();

  };
  

  return (
    <div className="bg-[#F7F7F2] min-h-screen p-6">
      <div className="text-2xl font-bold mb-6">Return Batch</div>
      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium text-gray-700">Select Distributor</label>
        <select
          className="w-80 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-light_green"
          value={selectedDistributor}
          onChange={(e) => setSelectedDistributor(e.target.value)}
        >
          <option value="">-- Select Distributor --</option>
          {distributors.map((distributor, index) => (
            <option key={index} value={distributor.Name}>
              {distributor.Name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-6">
        <p className="text-sm text-gray-600">Returning Batch Number: <strong>{batchNumber}</strong></p>
      </div>

      <button
        onClick={handleReturn}
        disabled={!selectedDistributor}
        className="font-normal text-sm bg-dark1 text-white px-4 py-3 rounded hover:bg-dark_green transition-colors disabled:opacity-50"
      >
        Submit Return
      </button>
      <button
        onClick={onCancel}
        className="ml-4 font-normal text-sm bg-red1 text-white px-4 py-3 rounded hover:text-dark1 transition-colors"
      >
        Cancel
      </button>

      {status && <div className="mt-4 text-sm text-gray-700">{status}</div>}
    </div>
  );
};

export default AdminReturnBatch;