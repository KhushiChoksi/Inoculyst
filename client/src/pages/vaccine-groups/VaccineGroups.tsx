import React from 'react';
import { useVaccineGroups } from '../../hooks/useVaccineGroups.tsx';

const VaccineGroups: React.FC = () => {
    const {vaccinesWithIngredients, message, searchFunction, setSearchFunction} = useVaccineGroups();

    const filteredVaccines = vaccinesWithIngredients.filter(vaccine => {
        if(!searchFunction) return true;
        const toLowerCase = searchFunction.toLowerCase();

        return (
            vaccine.Vaccine_Name.toLowerCase().includes(toLowerCase) ||
            vaccine.Brand_Name.toLowerCase().includes(toLowerCase) ||
            vaccine.Diseases.toLowerCase().includes(toLowerCase) ||           
            (vaccine.V_Active_Ingredients && vaccine.V_Active_Ingredients.toLowerCase().includes(toLowerCase))
        );
    });


    return (
        <div className="p-6 bg-[#F7F7F2] min-h-screen">
            <h1 className = "text-2xl font-bold mb-4">Vaccine Groups</h1>
            <p className = "text-gray-600 mb-8 ">List of Vaccine Groups </p>
            <div className = "mb-6">
                <input className = "w-80 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-light_green"
                        type="text"
                        placeholder="Search"
                        value={searchFunction}
                        onChange={(e) => setSearchFunction(e.target.value)}/>
            </div>

            <div className = "overflow-x-auto border border-gray-300 rounded-md">
                <table className = "min-w-full divide-y divide-[gray-300]">
                    <thead className = "bg-[#FFFFFF]">
                        <tr>
                            <th className = "px-6 py-3 text-left text-s font-medium text-black-500  tracking-wider cursor-pointer">
                                <div className = "flex items-center">
                                    Vaccine Name
                                </div>
                            </th>
                            <th className = "px-6 py-3 text-left text-s font-medium text-black-500  tracking-wider cursor-pointer">
                                <div className = "flex items-center">
                                    Brand Name
                                </div>
                            </th>
                            <th className = "px-6 py-3 text-left text-s font-medium text-black-500 tracking-wider cursor-pointer">
                                <div className = "flex items-center">
                                    Ingredients
                                </div>
                            </th>
                            <th className = "px-6 py-3 text-left text-s font-medium text-black-500 tracking-wider cursor-pointer">
                                <div className = "flex items-center">
                                    For which Diseases
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-[#FFFFFF] divide-y divide-gray-200">
                        {filteredVaccines.map((vaccine, index) => (
                            <tr key={index} className="hover:bg-light_green">
                            <td className="px-6 py-4 whitespace-nowrap">{vaccine.Vaccine_Name}</td>
                            <td className="px-6 py-4 ">{vaccine.Brand_Name}</td>
                            <td className="px-6 py-4">
                                {vaccine.V_Active_Ingredients || 'N/A'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">{vaccine.Diseases}</td>
                            </tr>
                        ))}
                        </tbody>
                </table>

            </div>
        </div>
    )

};

export default VaccineGroups;