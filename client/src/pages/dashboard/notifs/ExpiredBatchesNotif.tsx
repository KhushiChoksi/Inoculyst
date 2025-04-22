import React from 'react';
import { AiOutlineWarning } from "react-icons/ai";

// function to display the total expired batches, uses count as a parameter. 

interface expiredBatchesNotif {
  count: number;
}

const ExpiredBatchesNotif: React.FC<expiredBatchesNotif> = ({ count }) => {
    return (
        <div className="w-64 bg-white rounded-3xl border border-[#F0483E] shadow-sm overflow-hidden">
          <div className="p-2 flex flex-col items-center">
            <div className="text-[#F0483E] flex flex-col items-center gap-2 mt-4 text-4xl font-bold">
              <div><AiOutlineWarning size={50}/></div>
              {count}
            </div>
            <div className="mt-2 text-sm text-gray-600">
                Expired Batches
            </div>
          </div>
          <div className="bg-[#F0483E]/30 h-9"></div>
        </div>
      );
    };
  
  export default ExpiredBatchesNotif;