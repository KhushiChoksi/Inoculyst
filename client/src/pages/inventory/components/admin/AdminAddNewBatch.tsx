import React, { useEffect, useState } from "react";

export default function AdminAddNewBatch() {
  const [vaccineNames, setVaccineNames] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    order_status: "Ordered",
    date_added: new Date().toISOString().split("T")[0],
    batch_quantity: 0,
    expiry_date: "",
    vaccine_name: "",
    pharmacy_name: 'PharmaPlus',
  });

  const [submissionStatus, setSubmissionStatus] = useState("");

  useEffect(() => {
    const fetchVaccineNames = async () => {
      try {
        const response = await fetch('http://localhost:8080/vaccine');
        const data = await response.json();
        const names = data.map((v: any) => v.Vaccine_Name);
        setVaccineNames(names);
      } catch (error) {
        console.error('error:', error);
      }
    };

    fetchVaccineNames();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value.trim() 
    }));
  };
  
  const handleSubmit = async () => {
    if (!formData.vaccine_name) {
      alert("select a vaccine group");
      return;
    }
  
    try {
      const response = await fetch('http://localhost:8080/batches/add-batch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
  
      if (!response.ok) throw new Error("failed to add");
  
      const result = await response.json();
      setSubmissionStatus("Batch added successfully!");
    } catch (error) {
      console.error("error adding", error);
      setSubmissionStatus("failed to add");
    }
  };
  

  return (
    <div className="bg-[#F7F7F2] min-h-screen">
      <div className="p-6 "></div>

      <div className="flex items-center mt-10">
        <div className="font-normal indent-10 text-2xl">Inventory </div>
        <div className="font-normal indent-10 text-2xl mx-2">&gt;</div>
        <div className="font-bold indent-10 text-2xl text-left mr-6">Add New Batch</div>
      </div>

      <div className="flex space-x-10 mt-6 pl-10">
        <div className="mb-6">
          <label className="block mb-1 text-sm font-normal text-dark2">Vaccine Group</label>
          <select
            name="vaccine_name"
            value={formData.vaccine_name}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-dark_green text-sm bg-white"
          >
            <option value="">Select</option>
            {vaccineNames.map((name) => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <label className="block mb-1 text-sm font-normal text-dark2">Order Status</label>
          <select
            name="order_status"
            value={formData.order_status}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-dark_green text-sm bg-white"
          >
            <option value="Ordered">Ordered</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>
      </div>

      <div className="mb-6 pl-10">
        <label className="block mb-1 text-sm font-normal text-dark2">Expiry Date</label>
        <input
          type="date"
          name="expiry_date"
          value={formData.expiry_date}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-dark_green"
        />
      </div>

      <div className="mb-6 pl-10">
        <label className="block mb-1 text-sm font-normal text-dark2">Batch Quantity</label>
        <input
          type="number"
          name="batch_quantity"
          value={formData.batch_quantity}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-dark_green"
        />
      </div>

      <button
        onClick={handleSubmit}
        className="font-normal text-sm bg-dark1 text-white ml-10 px-4 py-3 rounded hover:bg-dark_green transition-colors"
      >
        Add Batch
      </button>

      {submissionStatus && (
        <div className="mt-4 ml-10 text-sm text-gray-600">{submissionStatus}</div>
      )}
    </div>
  );
}

