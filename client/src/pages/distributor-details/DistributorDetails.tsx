import React from 'react';
import { useDistributorDetails } from '../../hooks/useDistributorsDetails.tsx';

const DistributorDetails: React.FC = () => {
    const {distributors, message, searchFunction, setSearchFunction} = useDistributorDetails();

    const filteredDistributors = distributors.filter(distributor => {
        if(!searchFunction) return true;
        const toLowerCase = searchFunction.toLowerCase();

        return (
            distributor.Name.toLowerCase().includes(toLowerCase) ||
            distributor.Phone_number.toLowerCase().includes(toLowerCase) ||
            distributor.Email.toLowerCase().includes(toLowerCase)
        );
    });

    return (
        <div className="p-6 bg-[#F7F7F2] min-h-screen">
            <h1 className="text-2xl font-bold mb-4">Distributor Details</h1>
            <p className="text-gray-600 mb-8">List of Distributors</p>
            <div className="mb-6">
                <input className="w-80 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-light_green"
                        type="text"
                        placeholder="Search"
                        value={searchFunction}
                        onChange={(e) => setSearchFunction(e.target.value)}/>
            </div>

            <div className="overflow-x-auto border border-gray-300 rounded-md">
                <table className="min-w-full divide-y divide-[gray-300]">
                    <thead className="bg-[#FFFFFF]">
                        <tr>
                            <th className="px-6 py-3 text-left text-s font-medium text-black-500 tracking-wider cursor-pointer">
                                <div className="flex items-center">
                                    Name
                                </div>
                            </th>
                            <th className="px-6 py-3 text-left text-s font-medium text-black-500 tracking-wider cursor-pointer">
                                <div className="flex items-center">
                                    Phone Number
                                </div>
                            </th>
                            <th className="px-6 py-3 text-left text-s font-medium text-black-500 tracking-wider cursor-pointer">
                                <div className="flex items-center">
                                    Email
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-[#FFFFFF] divide-y divide-gray-200">
                        {filteredDistributors.map((distributor, index) => (
                            <tr key={index} className="hover:bg-light_green">
                            <td className="px-6 py-4 whitespace-nowrap">{distributor.Name}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{distributor.Phone_number}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{distributor.Email}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
};

export default DistributorDetails;