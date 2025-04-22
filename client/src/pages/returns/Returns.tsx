import React from 'react';
import { useReturns } from '../../hooks/useReturns.tsx';

const Returns: React.FC = () => {
    const {returns, message, searchFunction, setSearchFunction} = useReturns();

    //use the search function and make sure its doing everything with a lowercase so that its easier
    const filteredReturns = returns.filter(returnItem => {
        if(!searchFunction) return true;
        const toLowerCase = searchFunction.toLowerCase();

        return (
            returnItem.Return_ID.toLowerCase().includes(toLowerCase) ||
            returnItem.Admin_ID.toLowerCase().includes(toLowerCase) ||
            returnItem.Distributor_Name.toLowerCase().includes(toLowerCase) ||
            returnItem.Batch_Number.toLowerCase().includes(toLowerCase)
        );
    });

    //display the table 
    return (
        <div className="p-6 bg-[#F7F7F2] min-h-screen">
             {/* search function */}
            <h1 className="text-2xl font-bold mb-4">Returns</h1>
            <p className="text-gray-600 mb-8">List of Returns</p>
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
                                    Return ID
                                </div>
                            </th>
                            <th className="px-6 py-3 text-left text-s font-medium text-black-500 tracking-wider cursor-pointer">
                                <div className="flex items-center">
                                    Admin ID
                                </div>
                            </th>
                            <th className="px-6 py-3 text-left text-s font-medium text-black-500 tracking-wider cursor-pointer">
                                <div className="flex items-center">
                                    Distributor Name
                                </div>
                            </th>
                            <th className="px-6 py-3 text-left text-s font-medium text-black-500 tracking-wider cursor-pointer">
                                <div className="flex items-center">
                                    Batch Number
                                </div>
                            </th>
                        </tr>
                    </thead>
                    {/* table contents using the search filter */}
                    <tbody className="bg-[#FFFFFF] divide-y divide-gray-200">
                        {filteredReturns.map((returnItem, index) => (
                            <tr key={index} className="hover:bg-light_green">
                            <td className="px-6 py-4 whitespace-nowrap">{returnItem.Return_ID}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{returnItem.Admin_ID}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{returnItem.Distributor_Name}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{returnItem.Batch_Number}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
};

export default Returns;