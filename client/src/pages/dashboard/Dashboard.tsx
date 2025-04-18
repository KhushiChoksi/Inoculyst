import React from "react";
import VaccineCard from './notifs/VaccineNotif.tsx'; 
import ExpiredBatchesCard from './notifs/ExpiredBatchesNotif.tsx';
import UpcomingExpiryCard from './notifs/UpcomingExpiryNotif.tsx';

export default function Dashboard() {
    return (
        <div>
            <div className=" p-6 bg-[#F7F7F2]">
                <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
                <p className="text-gray-600 mb-8">A quick data overview of the inventory.</p>    
            </div>

            <div className = "p-g bg-[#F7F7F2] flex items-center justify-center">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-20 mb-8">
                    <VaccineCard count={298} />
                    <ExpiredBatchesCard count={1} />
                    <UpcomingExpiryCard count={1} />
                </div>
            </div>
            <div className="p-6 bg-light_green/50">
        <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1 border border-gray-300 rounded shadow-sm bg-white">
                <div className="border-b border-gray-300 p-4">
                    <h1 className="text-ml font-semibold text-gray-800">Quick Report</h1>
                </div>
                    <div className="p-4 h-96">hi</div>
                </div>

                <div className="flex-1 border border-gray-300 rounded shadow-sm bg-white">
                    <div className="border-b border-gray-300 p-4">
                        <h1 className="text-ml font-semibold text-gray-800">Quick Report</h1>
                    </div>
                    <div className="p-4 h-96">hi</div>
                </div>
            </div>
        </div>

        </div>
    );
}