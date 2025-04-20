import React from 'react';


interface batchNotif {
  count: number;
}

const BatchNotif: React.FC<batchNotif> = ({ count }) => {
  return (
      <div className="w-64 bg-white rounded-3xl border border-dark1 shadow-sm overflow-hidden">
        <div className="p-6 flex flex-col items-center">
          <div className="mt-4 text-4xl font-bold">
            {count}
          </div>
          <div className="mt-2 text-sm text-gray-600">
            Batches Available
          </div>
        </div>
        <div className="bg-dark1/30 h-9"></div>
      </div>
    );
  };

export default BatchNotif;