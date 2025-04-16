import React from 'react';


interface vaccineNotif {
  count: number;
}

const VaccineNotif: React.FC<vaccineNotif> = ({ count }) => {
  return (
      <div className="w-64 bg-white rounded-3xl border border-dark1 shadow-sm overflow-hidden">
        <div className="p-6 flex flex-col items-center">
          <div className="mt-4 text-4xl font-bold">
            {count}
          </div>
          <div className="mt-2 text-sm text-gray-600">
            Vaccines Available
          </div>
        </div>
        <div className="bg-dark1/30 h-9"></div>
      </div>
    );
  };

export default VaccineNotif;