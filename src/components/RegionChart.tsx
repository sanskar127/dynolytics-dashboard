// components/RegionChart.tsx
import React from 'react';
import { Bar } from 'react-chartjs-2';

interface RegionChartProps {
  data: any;
}

const RegionChart: React.FC<RegionChartProps> = ({ data }) => {
  return (
    <div className="col-span-2 card bg-base-200 shadow-xl p-6">
      <h3 className="text-xl font-semibold text-base-800 mb-4">Users by Region</h3>
      <Bar data={data} />
    </div>
  );
};

export default RegionChart;
