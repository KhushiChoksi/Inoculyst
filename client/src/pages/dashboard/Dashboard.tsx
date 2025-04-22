import React, { useEffect, useState } from "react";
import BatchCard from './notifs/BatchNotif.tsx'; 
import ExpiredBatchesCard from './notifs/ExpiredBatchesNotif.tsx';
import UpcomingExpiryCard from './notifs/UpcomingExpiryNotif.tsx';
import axios from "axios";
import ReportOneNotif from './notifs/ReportOneNotif.tsx'; 
import ReportTwoNotif from './notifs/ReportTwoNotif.tsx'; 

//function that displays all the notifactions on the page

//get the count
interface Counts {
    total_batches: number;
    expired_batches: number;
    expiring_batches: number;
}


export default function Dashboard() {
    const [counts, setCounts] = useState<Counts>({
        total_batches: 0,
        expired_batches: 0,
        expiring_batches: 0
    });
    const [lastRefreshed, setLastRefreshed] = useState<Date | null>(null);


    //get the count through the route and give it to the functions 
    const getBatchCounts = async () => {
        try {
            const countsRes = await axios.get("http://localhost:8080/analytics/counts");
            const countsInfo = countsRes.data;
            setCounts({
                total_batches: countsInfo.total_batches,
                expired_batches: countsInfo.expired_batches,
                expiring_batches: countsInfo.expiring_batches
            });
        } catch (error) {
            console.error("Couldn't get counts:", error);
        }
    };

    //function to occasionally refresh the page incase anaylitics change -> every 10min
    const refreshAnalytics = async () => {

        try {
            await axios.post('http://localhost:8080/analytics/update/expired');
            await axios.post('http://localhost:8080/analytics/update/upcoming');
            await axios.post('http://localhost:8080/analytics/update/new');

            await getBatchCounts();

            setLastRefreshed(new Date());

        }
        catch (error) {
            console.error("Error refreshing analytics:", error);
        }

    };

    //refreshes and calls the fucntions above
    useEffect(() => {
        getBatchCounts();
        refreshAnalytics();

        const interval = setInterval(() => {
            refreshAnalytics();
        }, 60000); // 10min ..... set to 6000 if you want to test it for one min scenarios. 
        
        return () => clearInterval(interval);
    }, []);

    //design part to return each notifcation card and the lists. 
    return (
        <div>
            <div className="p-6 bg-[#F7F7F2]">
                <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
                <p className="text-gray-600 mb-4">A quick data overview of the inventory.</p>  
            </div>

            <div className = "p-g bg-[#F7F7F2] flex items-center justify-center">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-20 mb-8">
                    <BatchCard count={counts.total_batches} />
                    <ExpiredBatchesCard count={counts.expired_batches} />
                    <UpcomingExpiryCard count={counts.expiring_batches} />
                </div>
            </div>
            <div className="p-6 bg-light_green/50">
        <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1 border border-gray-300 rounded shadow-sm bg-white">
                <div className="border-b border-gray-300 p-4">
                    <h1 className="text-ml font-semibold text-gray-800">List of Expired Batches</h1>
                </div>
                    <div className="p-4 h-96"> <ReportOneNotif/> </div>
                </div>

                <div className="flex-1 border border-gray-300 rounded shadow-sm bg-white">
                    <div className="border-b border-gray-300 p-4">
                        <h1 className="text-ml font-semibold text-gray-800">List of Upcoming Expired Batches</h1>
                    </div>
                    <div className="p-4 h-96"> <ReportTwoNotif/></div>
                </div>
            </div>
        </div>

        </div>
    );
}