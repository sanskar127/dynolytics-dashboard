// components/ActiveInactiveChart.tsx
import React from 'react';
import { Pie } from 'react-chartjs-2';

interface ActiveInactiveChartProps {
  data: any;
}

const ActiveInactiveChart: React.FC<ActiveInactiveChartProps> = ({ data }) => {
  return (
    <div className="col-span-1 card bg-base-200 shadow-xl p-6">
      <h3 className="text-xl font-semibold text-base-800 mb-4">Active vs Inactive Users</h3>
      <Pie data={data} />
    </div>
  );
};

export default ActiveInactiveChart;
