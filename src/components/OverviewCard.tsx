import React from 'react';

interface OverviewCardProps {
  total: number;
  active: number;
  deleted: number;
}

const OverviewCard: React.FC<OverviewCardProps> = ({ total, active, deleted }) => {
  return (
    <div className="card bg-base-200 shadow-xl p-6 flex flex-col items-center">
      <h3 className="text-2xl font-semibold text-left w-full text-base-800 mb-6">Overview</h3>
      
      {/* Use flex-wrap to allow wrapping */}
      <div className="flex flex-wrap justify-center items-center gap-4 w-full">
        
        {/* Total Users */}
        <div className="card bg-base-100 shadow-xl w-36 h-36 text-center flex flex-col justify-center items-center">
          <h4 className="text-lg font-semibold text-base-800 mb-2">Total Users</h4>
          <p className="text-xl font-bold text-base-700">{total}</p>
        </div>

        {/* Active Users */}
        <div className="card bg-base-100 shadow-xl w-36 h-36 text-center flex flex-col justify-center items-center">
          <h4 className="text-lg font-semibold text-base-800 mb-2">Active Users</h4>
          <p className="text-xl font-bold text-base-700">{active}</p>
        </div>

        {/* Deleted Users */}
        <div className="card bg-base-100 shadow-xl w-36 h-36 text-center flex flex-col justify-center items-center">
          <h4 className="text-lg font-semibold text-base-800 mb-2">Deleted Users</h4>
          <p className="text-xl font-bold text-base-700">{deleted}</p>
        </div>
      </div>
    </div>
  );
};

export default OverviewCard;
