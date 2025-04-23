import React, { useEffect, useState } from 'react';

interface Props {
  batch: {
    Batch_Number: string;
    Expiry_Date: string;
    Batch_Quantity: number;
    Vaccine_Name: string;
  };
}

const TechnicianBatchDetails: React.FC<Props> = ({ batch }) => {
  const [vaccineDetails, setVaccineDetails] = useState<any | null>(null);
  const [ingredients, setIngredients] = useState<string[]>([]);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const vaccineRes = await fetch('http://localhost:8080/vaccine');
        const vaccineList = await vaccineRes.json();

        const foundVaccine = vaccineList.find(
          (v: any) => v.Vaccine_Name === batch.Vaccine_Name
        );

        setVaccineDetails(foundVaccine || null);

        const ingredientsRes = await fetch('http://localhost:8080/vaccine/ingredients');
        const ingredientsList = await ingredientsRes.json();

        const vaccineIngredients = ingredientsList
          .filter((i: any) => i.Vaccine_Name === batch.Vaccine_Name)
          .map((i: any) => i.V_Active_Ingredients);

        setIngredients(vaccineIngredients);
      } catch (err) {
        console.error('Error fetching vaccine details:', err);
      }
    };

    fetchDetails();
  }, [batch]);

  if (!vaccineDetails) return <div>Loading...</div>;

  return (
    <div>
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-6">Batch Number: {batch.Batch_Number}</h2>

        <div className="grid grid-cols-2 gap-4 px-1 pr-10">
          <div className="bg-white border border-gray-300 rounded shadow-sm">
            <div className="border-b border-gray-300 p-4">
              <h1 className="text-ml font-semibold text-gray-800">Vaccine</h1>
            </div>
            <div className="p-4">
              <p className="mb-1"><strong>Name:</strong> {batch.Vaccine_Name}</p>
              <p><strong>Brand:</strong> {vaccineDetails.Brand_Name}</p>
            </div>
          </div>

          <div className="bg-white border border-gray-300 rounded shadow-sm">
            <div className="border-b border-gray-300 p-4">
              <h1 className="text-ml font-semibold text-gray-800">Batch</h1>
            </div>
            <div className="p-4">
              <p className="mb-1"><strong>Size:</strong> {batch.Batch_Quantity}</p>
              <p><strong>Expiry Date:</strong> {new Date(batch.Expiry_Date).toLocaleDateString()}</p>
            </div>
          </div>

          <div className="bg-white border border-gray-300 rounded shadow-sm">
            <div className="border-b border-gray-300 p-4">
              <h1 className="text-ml font-semibold text-gray-800">Diseases</h1>
            </div>
            <div className="p-4">
              <p>{vaccineDetails.Diseases}</p>
            </div>
          </div>

          <div className="bg-white border border-gray-300 rounded shadow-sm">
            <div className="border-b border-gray-300 p-4">
              <h1 className="text-ml font-semibold text-gray-800">Ingredients</h1>
            </div>
            <div className="p-4">
              <p>{ingredients.join(', ')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnicianBatchDetails;
