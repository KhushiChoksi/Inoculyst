import React from "react";
import VaccineCard from './notifs/VaccineNotif.tsx'; 

export default function Dashboard() {
    return (
        <div className=" p-6 bg-[#F7F7F2]">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            <p className="text-gray-600 mb-8">A quick data overview of the inventory.</p>    
            <div className="p-4">
                <VaccineCard count={3} />
            </div>
        </div>
        
    );
}