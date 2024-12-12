// src/App.tsx

import React, { useState } from 'react';
import { Line, Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import 'chart.js/auto'; // Auto-register Chart.js components
import { format } from 'date-fns';

// Register necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

const mockUsers = [
  { id: 1, status: 'active', region: 'North America', registrationDate: '2024-01-15' },
  { id: 2, status: 'inactive', region: 'Europe', registrationDate: '2024-02-01' },
  { id: 3, status: 'active', region: 'North America', registrationDate: '2024-03-10' },
  { id: 4, status: 'deleted', region: 'Asia', registrationDate: '2024-04-05' },
  { id: 5, status: 'active', region: 'Europe', registrationDate: '2024-05-22' },
  { id: 6, status: 'inactive', region: 'Africa', registrationDate: '2024-06-14' },
];

const AnalyticsDashboard: React.FC = () => {
  // Filter States
  const [dateRange, setDateRange] = useState<{ start: string; end: string }>({
    start: '2024-01-01',
    end: '2024-12-31',
  });
  const [regionFilter, setRegionFilter] = useState('All');

  // Calculate Total, Active, and Deleted Users
  const totalUsers = mockUsers.length;
  const activeUsers = mockUsers.filter(user => user.status === 'active').length;
  const deletedUsers = mockUsers.filter(user => user.status === 'deleted').length;

  // Registration Trend: Line Chart Data
  const registrationTrend = mockUsers.reduce((acc, user) => {
    const month = format(new Date(user.registrationDate), 'yyyy-MM');
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const lineChartData = {
    labels: Object.keys(registrationTrend),
    datasets: [{
      label: 'User Registrations',
      data: Object.values(registrationTrend),
      borderColor: 'rgba(75,192,192,1)',
      fill: false,
    }]
  };

  // Active vs Inactive Users: Pie Chart Data
  const activeInactiveData = {
    labels: ['Active', 'Inactive'],
    datasets: [{
      data: [activeUsers, totalUsers - activeUsers],
      backgroundColor: ['#36A2EB', '#FF6384'],
    }]
  };

  // Users by Region: Bar Chart Data
  const regionData = mockUsers.reduce((acc, user) => {
    if (regionFilter === 'All' || user.region === regionFilter) {
      acc[user.region] = (acc[user.region] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  const barChartData = {
    labels: Object.keys(regionData),
    datasets: [{
      label: 'Users by Region',
      data: Object.values(regionData),
      backgroundColor: '#42A5F5',
    }]
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-semibold text-center text-gray-800 mb-8">Analytics Dashboard</h1>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="card bg-white shadow-lg p-6 text-center">
          <h3 className="text-xl font-semibold text-gray-600">Total Users</h3>
          <p className="text-2xl font-bold">{totalUsers}</p>
        </div>
        <div className="card bg-white shadow-lg p-6 text-center">
          <h3 className="text-xl font-semibold text-gray-600">Active Users</h3>
          <p className="text-2xl font-bold">{activeUsers}</p>
        </div>
        <div className="card bg-white shadow-lg p-6 text-center">
          <h3 className="text-xl font-semibold text-gray-600">Deleted Users</h3>
          <p className="text-2xl font-bold">{deletedUsers}</p>
        </div>
      </div>

      {/* Date Range Filter */}
      <div className="flex items-center space-x-4 mb-8">
        <input
          type="date"
          className="input input-bordered input-primary"
          value={dateRange.start}
          onChange={e => setDateRange({ ...dateRange, start: e.target.value })}
        />
        <span>to</span>
        <input
          type="date"
          className="input input-bordered input-primary"
          value={dateRange.end}
          onChange={e => setDateRange({ ...dateRange, end: e.target.value })}
        />
      </div>

      {/* Region Filter */}
      <div className="mb-8">
        <select
          className="select select-bordered select-primary w-full max-w-xs"
          onChange={e => setRegionFilter(e.target.value)}
          value={regionFilter}
        >
          <option value="All">All Regions</option>
          <option value="North America">North America</option>
          <option value="Europe">Europe</option>
          <option value="Asia">Asia</option>
          <option value="Africa">Africa</option>
        </select>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Registration Trend (Line Chart) */}
        <div className="card bg-white shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-600 mb-4">User Registration Trend</h3>
          <Line data={lineChartData} />
        </div>

        {/* Active vs Inactive Users (Pie Chart) */}
        <div className="card bg-white shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-600 mb-4">Active vs Inactive Users</h3>
          <Pie data={activeInactiveData} />
        </div>
      </div>

      {/* Users by Region (Bar Chart) */}
      <div className="card bg-white shadow-lg p-6 mt-8">
        <h3 className="text-xl font-semibold text-gray-600 mb-4">Users by Region</h3>
        <Bar data={barChartData} />
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
