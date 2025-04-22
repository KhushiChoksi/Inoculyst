// // // // // // // import React, { useState } from "react"; 

// // // // // // // interface Props {
// // // // // // //   batch: {
// // // // // // //     Batch_Number: string;
// // // // // // //     Batch_Quantity: number;
// // // // // // //   };
// // // // // // //   onCancel: () => void;
// // // // // // // }

// // // // // // // const RequestUpdateBatch: React.FC<Props> = ({ batch, onCancel }) => {

// // // // // // //   const [quantity, setQuantity] = useState(batch.Batch_Quantity);
// // // // // // //   const [status, setStatus] = useState("");


// // // // // // // const handleBack = () => {
// // // // // // //     onCancel();
// // // // // // //   };
  
// // // // // // //   const handleSubmit = async () => {
// // // // // // //     try {
// // // // // // //         const response = await fetch(`http://localhost:8080/batches/${batch.Batch_Number}/quantity`, {

// // // // // // //         method: 'PUT',
// // // // // // //         headers: { 'Content-Type': 'application/json' },
// // // // // // //         body: JSON.stringify({ quantity: quantity })
// // // // // // //       });

// // // // // // //       if (!response.ok) throw new Error("Failed to update");

// // // // // // //       setStatus("Batch quantity updated successfully.");
// // // // // // //     } catch (err) {
// // // // // // //       console.error("Update failed:", err);
// // // // // // //       setStatus("Update failed.");
// // // // // // //     }
// // // // // // //   };

// // // // // // //   return (
// // // // // // //     <div className="bg-[#F7F7F2] min-h-screen">
// // // // // // //       <div className=""></div>
// // // // // // //       <div className="flex items-center mt-4">
// // // // // // //         <div className="font-normal indent-6 text-2xl">Inventory</div>
// // // // // // //         <div className="font-normal indent-10 text-2xl mx-2">&gt;</div>
// // // // // // //         <div className="font-bold indent-10 text-2xl text-left mr-6">Update Request</div>
// // // // // // //       </div>

// // // // // // //       <div className="mb-6 mt-6 pl-10">
// // // // // // //         <label className="block mb-1 text-sm font-normal text-dark2">Batch Quantity</label>
// // // // // // //         <input
// // // // // // //           type="number"
// // // // // // //           min="0"
// // // // // // //           value={quantity}
// // // // // // //           onChange={(e) => setQuantity(parseInt(e.target.value))}
// // // // // // //           className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-dark_green"
// // // // // // //         />
// // // // // // //       </div>

// // // // // // //       <button
// // // // // // //         onClick={handleSubmit}
// // // // // // //         className="font-normal text-sm bg-dark1 text-white ml-10 px-4 py-3 rounded hover:bg-dark_green transition-colors"
// // // // // // //       >
// // // // // // //         Send Request
// // // // // // //       </button>
// // // // // // //       <button
// // // // // // //         onClick={handleBack}
// // // // // // //         className="font-normal text-sm bg-dark1 text-white ml-10 px-4 py-3 rounded hover:bg-dark_green transition-colors"
// // // // // // //       >
// // // // // // //         Back to Inventory
// // // // // // //       </button>

// // // // // // //       {status && <div className="mt-4 ml-10 text-sm text-gray-600">{status}</div>}
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // };

// // // // // // // export default RequestUpdateBatch;
// // // // // // ///////////////////////

// // // // // // import React, { useState } from 'react';

// // // // // // interface Props {
// // // // // //   batch: {
// // // // // //     Batch_Number: string;
// // // // // //     Batch_Quantity: number;
// // // // // //     Vaccine_Name: string;
// // // // // //   };
// // // // // //   onCancel: () => void;
// // // // // // }

// // // // // // const RequestUpdateBatch: React.FC<Props> = ({ batch, onCancel }) => {
// // // // // //   const [newQuantity, setNewQuantity] = useState(batch.Batch_Quantity);
// // // // // //   const [message, setMessage] = useState('');

// // // // // //   const handleSubmit = async (e: React.FormEvent) => {
// // // // // //     e.preventDefault();

// // // // // //     if (newQuantity <= 0 || isNaN(newQuantity)) {
// // // // // //         setMessage("Please enter a valid quantity.");
// // // // // //         return;
// // // // // //       }

// // // // // //     // const requestData = {
// // // // // //     //   Batch_Number: batch.Batch_Number,
// // // // // //     //   Requested_Quantity: newQuantity,
// // // // // //     //   Status: 'Pending',
// // // // // //     //   Request_Type: 'Update Quantity',
// // // // // //     //   Vaccine_Name: batch.Vaccine_Name,
// // // // // //     //   Requested_By: 'T001', 
// // // // // //     // };

// // // // // //     const requestData = {
// // // // // //         batch_number: batch.Batch_Number,
// // // // // //         batch_quantity: newQuantity,
// // // // // //         status: 'Pending',
// // // // // //         Request_Type: 'Update Quantity',
// // // // // //         vaccine_name: batch.Vaccine_Name,
// // // // // //         Requested_By: 'T001', 
// // // // // //       };

// // // // // //     console.log("Request Data:", requestData);

// // // // // //     try {
// // // // // //       const response = await fetch('http://localhost:8080/requests/add-request', {
// // // // // //         method: 'POST',
// // // // // //         headers: { 'Content-Type': 'application/json' },
// // // // // //         body: JSON.stringify(requestData),
// // // // // //       });

// // // // // //       if (response.ok) {
// // // // // //         setMessage('Update request submitted successfully.');
// // // // // //       } else {
// // // // // //         setMessage('Failed to submit request.');
// // // // // //       }
// // // // // //     } catch (error) {
// // // // // //       console.error('Request failed:', error);
// // // // // //       setMessage('An error occurred.');
// // // // // //     }
// // // // // //   };

// // // // // //   return (
// // // // // //     <div className="p-8">
// // // // // //       <h2 className="text-xl font-semibold mb-4">Request Quantity Update</h2>
// // // // // //       <div className="mb-4">
// // // // // //         <label className="block mb-2">Current Quantity: {batch.Batch_Quantity}</label>
// // // // // //         <input
// // // // // //           type="number"
// // // // // //           value={newQuantity}
// // // // // //           onChange={(e) => setNewQuantity(parseInt(e.target.value))}
// // // // // //           className="border p-2 w-full"
// // // // // //         />
// // // // // //       </div>
// // // // // //       <div className="flex gap-4">
// // // // // //         <button
// // // // // //           onClick={handleSubmit}
// // // // // //           className="bg-dark1 text-white px-4 py-2 rounded hover:bg-dark_green"
// // // // // //         >
// // // // // //           Submit Request
// // // // // //         </button>
// // // // // //         <button
// // // // // //           onClick={onCancel}
// // // // // //           className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
// // // // // //         >
// // // // // //           Cancel
// // // // // //         </button>
// // // // // //       </div>
// // // // // //       {message && <p className="mt-4 text-sm text-blue-600">{message}</p>}
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // export default RequestUpdateBatch;

// // // // // import React, { useState } from 'react';

// // // // // interface RequestUpdateBatchProps {
// // // // //   requestId: number;
// // // // //   onCancel: () => void;
// // // // // }

// // // // // const RequestUpdateBatch: React.FC<RequestUpdateBatchProps> = ({ requestId, onCancel }) => {
// // // // //   const [newBatchSize, setNewBatchSize] = useState<number | string>('');

// // // // //   const handleSubmit = async () => {
// // // // //     if (typeof newBatchSize !== 'number' || newBatchSize <= 0) {
// // // // //       alert('Please enter a valid batch size');
// // // // //       return;
// // // // //     }

// // // // //     try {
// // // // //       // Submit the updated batch size to the backend
// // // // //       const response = await fetch(`http://localhost:8080/requests/${requestId}/status`, {
// // // // //         method: 'PUT',
// // // // //         body: JSON.stringify({ requestedQuantity: newBatchSize }),
// // // // //         headers: { 'Content-Type': 'application/json' },
// // // // //       });

// // // // //       if (response.ok) {
// // // // //         alert('Request updated successfully');
// // // // //         onCancel(); // Close the update form after successful submission
// // // // //       } else {
// // // // //         alert('Failed to update request');
// // // // //       }
// // // // //     } catch (error) {
// // // // //       console.error('Error updating request:', error);
// // // // //     }
// // // // //   };

// // // // //   return (
// // // // //     <div>
// // // // //       <h3>Update Request</h3>
// // // // //       <label htmlFor="newBatchSize">New Batch Size:</label>
// // // // //       <input
// // // // //         id="newBatchSize"
// // // // //         type="number"
// // // // //         value={newBatchSize}
// // // // //         onChange={(e) => setNewBatchSize(Number(e.target.value))}
// // // // //       />
// // // // //       <button onClick={handleSubmit}>Submit</button>
// // // // //       <button onClick={onCancel}>Cancel</button>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default RequestUpdateBatch;

// // // // import React, { useState } from 'react';
// // // // import axios from 'axios';

// // // // interface RequestUpdateBatchProps {
// // // //   batch: {
// // // //     Batch_Number: string;
// // // //     Order_status: string;
// // // //     Date_Added: string;
// // // //     Batch_Quantity: number;
// // // //     Expiry_Date: string;
// // // //     Vaccine_Name: string;
// // // //   };
// // // //   onCancel: () => void;
// // // // }

// // // // const RequestUpdateBatch: React.FC<RequestUpdateBatchProps> = ({ batch, onCancel }) => {
// // // //   const [newQuantity, setNewQuantity] = useState('');

// // // //   // const handleSubmit = async (e: React.FormEvent) => {
// // // //   //   e.preventDefault();

// // // //   //   try {
// // // //   //     const response = await axios.post('http://localhost:8080/requests/add-request', {
// // // //   //       batchNumber: batch.Batch_Number,
// // // //   //       requestedQuantity: parseInt(newQuantity),
// // // //   //       currentQuantity: batch.Batch_Quantity,
// // // //   //       status: 'pending'
// // // //   //     });

// // // //   //     if (response.status === 200) {
// // // //   //       alert('Request submitted successfully!');
// // // //   //       onCancel(); // Go back after submission
// // // //   //     } else {
// // // //   //       alert('Failed to submit request');
// // // //   //     }
// // // //   //   } catch (error) {
// // // //   //     console.error('Error submitting request:', error);
// // // //   //     alert('An error occurred while submitting the request');
// // // //   //   }
// // // //   // };

// // // //   const handleSubmit = async (e: React.FormEvent) => {
// // // //     e.preventDefault();
  
// // // //     try {
// // // //       const payload = {
// // // //         batchNumber: batch.Batch_Number,
// // // //         currentQuantity: batch.Batch_Quantity,
// // // //         requestedQuantity: parseInt(newQuantity),
// // // //         status: "pending", // This might be required by backend
// // // //       };
  
// // // //       const response = await axios.post('http://localhost:8080/requests/add-request', payload);
  
// // // //       if (response.status === 200) {
// // // //         alert('Request submitted successfully!');
// // // //         onCancel(); // Return to batch details
// // // //       } else {
// // // //         alert('Failed to submit request');
// // // //       }
// // // //     } catch (error: any) {
// // // //       console.error('Error submitting request:', error);
// // // //       alert(error?.response?.data || 'An error occurred while submitting the request');
// // // //     }
// // // //   };
  

// // // //   return (
// // // //     <div className="bg-[#F7F7F2] min-h-screen p-10">
// // // //       <div className="font-bold text-2xl mb-4">Request Batch Quantity Update</div>
// // // //       <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
// // // //         <div className="mb-4">
// // // //           <label className="block text-sm font-semibold mb-1">Batch Number</label>
// // // //           <input
// // // //             type="text"
// // // //             value={batch.Batch_Number}
// // // //             disabled
// // // //             className="w-full p-2 border rounded bg-gray-100"
// // // //           />
// // // //         </div>
// // // //         <div className="mb-4">
// // // //           <label className="block text-sm font-semibold mb-1">Current Quantity</label>
// // // //           <input
// // // //             type="number"
// // // //             value={batch.Batch_Quantity}
// // // //             disabled
// // // //             className="w-full p-2 border rounded bg-gray-100"
// // // //           />
// // // //         </div>
// // // //         <div className="mb-4">
// // // //           <label className="block text-sm font-semibold mb-1">Requested New Quantity</label>
// // // //           <input
// // // //             type="number"
// // // //             value={newQuantity}
// // // //             onChange={(e) => setNewQuantity(e.target.value)}
// // // //             className="w-full p-2 border rounded"
// // // //             required
// // // //           />
// // // //         </div>
// // // //         <div className="flex justify-between">
// // // //           <button
// // // //             type="submit"
// // // //             className="font-normal text-sm bg-dark1 text-white px-4 py-2 rounded hover:bg-dark_green transition-colors"
// // // //           >
// // // //             Submit Request
// // // //           </button>
// // // //           <button
// // // //             type="button"
// // // //             onClick={onCancel}
// // // //             className="font-normal text-sm bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition-colors"
// // // //           >
// // // //             Cancel
// // // //           </button>
// // // //         </div>
// // // //       </form>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default RequestUpdateBatch;

// // // import React, { useState } from 'react';
// // // import axios from 'axios';

// // // interface RequestUpdateBatchProps {
// // //   batch: {
// // //     Batch_Number: string;
// // //     Batch_Quantity: number;
// // //   };
// // //   onCancel: () => void;
// // // }

// // // const RequestUpdateBatch: React.FC<RequestUpdateBatchProps> = ({ batch, onCancel }) => {
// // //   const [newQuantity, setNewQuantity] = useState('');

// // //   const handleSubmit = async (e: React.FormEvent) => {
// // //     e.preventDefault();

// // //     const payload = {
// // //       batchNumber: batch.Batch_Number,
// // //       currentQuantity: batch.Batch_Quantity,
// // //       requestedQuantity: parseInt(newQuantity),
// // //       status: 'pending',
// // //     };

// // //     try {
// // //       console.log('Sending payload:', payload); // optional debug
// // //       const response = await axios.post('http://localhost:8080/requests/add-request', payload);

// // //       if (response.status === 200) {
// // //         alert('Request submitted successfully!');
// // //         onCancel();
// // //       } else {
// // //         alert('Failed to submit request');
// // //       }
// // //     } catch (error: any) {
// // //       console.error('Error submitting request:', error);
// // //       alert(error?.response?.data || 'An error occurred while submitting the request');
// // //     }
// // //   };

// // //   return (
// // //     <div className="bg-[#F7F7F2] min-h-screen">
// // //       <div className="ml-10 mt-4 mr-6">
// // //         <div className="text-2xl font-bold">Request Update</div>
// // //         <form onSubmit={handleSubmit} className="mt-6">
// // //           <div className="mb-4">
// // //             <label className="block text-sm font-medium mb-1">Current Quantity</label>
// // //             <input
// // //               type="text"
// // //               value={batch.Batch_Quantity}
// // //               disabled
// // //               className="border border-gray-300 px-4 py-2 rounded w-full bg-gray-100"
// // //             />
// // //           </div>
// // //           <div className="mb-4">
// // //             <label className="block text-sm font-medium mb-1">New Quantity</label>
// // //             <input
// // //               type="number"
// // //               value={newQuantity}
// // //               onChange={(e) => setNewQuantity(e.target.value)}
// // //               required
// // //               className="border border-gray-300 px-4 py-2 rounded w-full"
// // //             />
// // //           </div>
// // //           <div className="flex space-x-4">
// // //             <button
// // //               type="submit"
// // //               className="bg-dark1 text-white px-4 py-2 rounded hover:bg-dark_green transition-colors"
// // //             >
// // //               Submit Request
// // //             </button>
// // //             <button
// // //               type="button"
// // //               onClick={onCancel}
// // //               className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 transition-colors"
// // //             >
// // //               Cancel
// // //             </button>
// // //           </div>
// // //         </form>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default RequestUpdateBatch;

// // import React, { useState } from 'react';

// // // interface Props {
// // //   onCancel: () => void;
// // // }

// // interface RequestUpdateBatchProps {
// //   batch: {
// //     Batch_Number: string;
// //     Batch_Quantity: number;
// //   };
// //   onCancel: () => void;
// // }

// // const RequestUpdateBatch: React.FC<RequestUpdateBatchProps> = ({ batch, onCancel }) => {
// //   const [newQuantity, setNewQuantity] = useState('');
// //   const [formData, setFormData] = useState({
// //       // order_status: "Ordered",
// //       // date_added: new Date().toISOString().split("T")[0],
// //       batch_quantity: 0,
// //       expiry_date: "",
// //       vaccine_name: "",
// //       // pharmacy_name: 'PharmaPlus',
// //     });

// //   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
// //       const { name, value } = e.target;
// //       setFormData((prev) => ({
// //         ...prev,
// //         [name]: value.trim() 
// //       }));
// //     };

// //   // const handleSubmit = async (e: React.FormEvent) => {
// //   //   e.preventDefault();

// //   //   const payload = {
// //   //     Batch_Number: batch.Batch_Number,
// //   //     Current_Quantity: batch.Batch_Quantity,
// //   //     Requested_Quantity: parseInt(newQuantity),
// //   //     Status: 'pending',
// //   //   };

// //   //   try {
// //   //     console.log('Sending payload:', payload);
// //   //     const response = await axios.post('http://localhost:8080/requests/add-request', payload);

// //   //     if (response.status === 200) {
// //   //       alert('Request submitted successfully!');
// //   //       onCancel();
// //   //     } else {
// //   //       alert('Failed to submit request');
// //   //     }
// //   //   } catch (error: any) {
// //   //     console.error('Error submitting request:', error);
// //   //     alert(error?.response?.data || 'An error occurred while submitting the request');
// //   //   }
// //   // };

// //   // const handleSubmit = async (e: React.FormEvent) => {
// //   //   e.preventDefault();
  
// //   //   const payload = {
// //   //     Batch_Number: batch.Batch_Number,
// //   //     Current_Quantity: batch.Batch_Quantity,
// //   //     Requested_Quantity: parseInt(newQuantity),
// //   //     Status: 'pending',
// //   //     Request_Type: 'quantity',
// //   //   };
  
// //   //   try {
// //   //     console.log('Sending payload:', payload);
// //   //     const response = await axios.post('http://localhost:8080/requests/add-request', payload);
  
// //   //     if (response.status === 200) {
// //   //       alert('Request submitted successfully!');
// //   //       onCancel();
// //   //     } else {
// //   //       alert('Failed to submit request');
// //   //     }
// //   //   } catch (error: any) {
// //   //     console.error('Error submitting request:', error);
// //   //     alert(error?.response?.data || 'An error occurred while submitting the request');
// //   //   }
// //   // };

// //   // const handleSubmit = async () => {
  
// //   //   try {
// //   //     const response = await fetch('http://localhost:8080/requests/add-request', {
// //   //       method: 'POST',
// //   //       headers: { 'Content-Type': 'application/json' },
// //   //       body: JSON.stringify(formData)
// //   //     });
  
// //   //     if (!response.ok) throw new Error("failed req");
  
// //   //     const result = await response.json();
// //   //     setNewQuantity("Batch added successfully!");
// //   //   } catch (error) {
// //   //     console.error("error adding", error);
// //   //     setNewQuantity("failed to add");
// //   //   }
// //   // };
  
// //   const handleSubmit = async () => {
// //   const response = await fetch("http://localhost:8080/requests/add-request", {
// //     method: "POST",
// //     headers: {
// //       "Content-Type": "application/json",
// //     },
// //     body: JSON.stringify({formData}),
// //   });
  
// //   if (!response.ok) {
// //     const text = await response.text();
// //     console.error("Server responded with:", response.status, text);
// //     throw new Error("Failed to send request");
// //   }
// // }

// //   return (
// //     <div className="bg-[#F7F7F2] min-h-screen">
// //       <div className="ml-10 mt-4 mr-6">
// //         <div className="text-2xl font-bold">Request Update</div>
// //         {/* <form onSubmit={handleSubmit} className="mt-6"> */}
// //           <div className="mb-4">
// //             <label className="block text-sm font-medium mb-1">Current Quantity</label>
// //             <input
// //               type="text"
// //               value={batch.Batch_Quantity}
// //               disabled
// //               className="border border-gray-300 px-4 py-2 rounded w-full bg-gray-100"
// //             />
// //           </div>
// //           <div className="mb-4">
// //             <label className="block text-sm font-medium mb-1">New Quantity</label>
// //             <input
// //               type="number"
// //               name="batch_quantity"
// //               value={formData.batch_quantity}
// //               onChange={handleChange}
// //               required
// //               className="border border-gray-300 px-4 py-2 rounded w-full"
// //             />
// //           </div>
// //           <div className="flex space-x-4">
// //             <button onClick={handleSubmit}
// //               type="button"
// //               className="bg-dark1 text-white px-4 py-2 rounded hover:bg-dark_green transition-colors"
// //             >
// //               Submit Request
// //             </button>
// //             <button
// //               type="button"
// //               onClick={onCancel}
// //               className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 transition-colors"
// //             >
// //               Cancel
// //             </button>
// //           </div>
// //         {/* </form> */}
// //       </div>
// //     </div>
// //   );
// // };

// // export default RequestUpdateBatch;

// import React, { useState } from 'react';

// interface Batch {
//   Batch_Number: string;
//   Order_status: string;
//   Date_Added: string;
//   Batch_Quantity: number;
//   Expiry_Date: string;
//   Vaccine_Name: string;
//   Pharmacy_Name?: string;
// }

// interface Props {
//   batch: Batch;
//   onCancel: () => void;
// }

// const RequestUpdateBatch: React.FC<Props> = ({ batch, onCancel }) => {
//   const [newQuantity, setNewQuantity] = useState<number>(batch.Batch_Quantity);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const technicianID = 'E001'; 

//   const handleSubmit = async () => {
//     if (newQuantity === batch.Batch_Quantity) {
//       setError('Please enter a different quantity than the current one.');
//       return;
//     }

//     setLoading(true);
//     setError('');

//     const requestBody = {
//       Request_ID: `${technicianID}${batch.Batch_Number}`,
//       Technician_ID: technicianID,
//       Batch_Number: batch.Batch_Number,
//       Status: 'Pending',
//       Order_status: batch.Order_status,
//       Date_Added: batch.Date_Added,
//       Batch_Quantity: newQuantity,
//       Expiry_Date: batch.Expiry_Date,
//       Vaccine_Name: batch.Vaccine_Name,
//       Pharmacy_Name: batch.Pharmacy_Name || 'PharmaPlus', 
//     };

//     try {

//       try {
//         console.log("Submitting request with:", {
//           batchId: batch.id,
//           requestedQuantity: parseInt(quantity),
//         });

//       const response = await fetch('http://localhost:8080/requests/add-request', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(requestBody),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to submit update request.');
//       }

//       alert('Request submitted successfully.');
//       onCancel();
//     } catch (err: any) {
//       setError(err.message || 'An unexpected error occurred.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bg-[#F7F7F2] min-h-screen p-10">
//       <div className="font-bold text-2xl mb-4">Request Batch Quantity Update</div>
//       <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-xl">
//         <p className="mb-4"><strong>Batch Number:</strong> {batch.Batch_Number}</p>
//         <p className="mb-4"><strong>Current Quantity:</strong> {batch.Batch_Quantity}</p>

//         <label className="block mb-2 font-medium">New Quantity</label>
//         <input
//           type="number"
//           min={0}
//           value={newQuantity}
//           onChange={(e) => setNewQuantity(Number(e.target.value))}
//           className="w-full p-2 border rounded mb-4"
//         />

//         {error && <p className="text-red-600 mb-4">{error}</p>}

//         <div className="flex justify-end gap-4">
//           <button
//             onClick={onCancel}
//             className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
//             disabled={loading}
//           >
//             Cancel
//           </button>
//           <button
//             onClick={handleSubmit}
//             className="bg-dark1 text-white px-4 py-2 rounded hover:bg-dark_green"
//             disabled={loading}
//           >
//             {loading ? 'Submitting...' : 'Submit Request'}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RequestUpdateBatch;

import React, { useState } from 'react';

interface Props {
  batch: {
    Batch_Number: string;
    Batch_Quantity: number;
  };
  onCancel: () => void;
}

// interface Batch {
//   batch:{
//   Batch_Number: string;
//   Order_status: string;
//   Date_Added: string;
//   Batch_Quantity: number;
//   Expiry_Date: string;
//   Vaccine_Name: string;
//   Pharmacy_Name?: string;
// } }

// interface RequestUpdateBatchProps {
//   batch: Batch;
//   onCancel: () => void;
// }

const RequestUpdateBatch: React.FC<Props> = ({ batch, onCancel }) => {
  const [quantity, setQuantity] = useState<number>(batch.Batch_Quantity);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [status, setStatus] = useState("");
  const [success, setSuccess] = useState<boolean>(false);
  
  const handleBack = () => {
    onCancel();
  };

  // Assuming technician ID would be retrieved from auth context or similar
  // For demo purposes, hardcoding as E001
  const technicianId = 'E001';
  
  const handleSubmit = async () => { //SOMETHING IS NOT WORKING HERE
    
    try {
      
      const response = await fetch('http://localhost:8080/requests/add-request', {
      
        method: 'POST',
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
    <div className="bg-[#F7F7F2] min-h-screen p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6">Update Batch Request</h2>
        
        {success ? (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            Request submitted successfully! Redirecting...
          </div>
        ) : (
          // <form onSubmit={handleSubmit}>
          <div>
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-gray-600">Batch Number:</p>
                <p className="font-medium">{batch.Batch_Number}</p>
              </div>
              {/* <div>
                <p className="text-gray-600">Order Status:</p>
                <p className="font-medium">{batch.Order_status}</p>
              </div> */}
              {/* <div>
                <p className="text-gray-600">Vaccine:</p>
                <p className="font-medium">{batch.Vaccine_Name}</p>
              </div> */}
              {/* <div>
                <p className="text-gray-600">Expiry Date:</p>
                <p className="font-medium">{new Date(batch.Expiry_Date).toLocaleDateString()}</p>
              </div> */}
            </div>
            
            <div className="mb-6">
              {/* <label className="block text-gray-700 mb-2">Current Quantity: {batch.Batch_Quantity}</label> */}
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="quantity">
                New Quantity:
              </label>
              <input
                type="number"
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                min={1}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button onClick={handleSubmit}
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-dark1 text-white rounded hover:bg-dark_green transition-colors"
              >Submit Request
                {/* {loading ? 'Submitting...' : 'Submit Request'} */}
              </button>
            </div>
          </div> //</form>
        )}
      </div>
    </div>
  );
};

export default RequestUpdateBatch;