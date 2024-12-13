import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Line, Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import Navbar from '../../components/Navbar';
import 'chart.js/auto'; // Auto-register Chart.js components
import { AnalyticsState } from "../../types/types"

// Register necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

const AnalyticsDashboard: React.FC = () => {
  const { overview, registrationTrend, userStatus, regionDistribution, loading, error } = useSelector((state: { analytics: AnalyticsState }) => state.analytics);

  const [dateRange, setDateRange] = useState<{ start: string; end: string }>({ start: '2024-01-01', end: '2024-12-31' });
  const [regionFilter, setRegionFilter] = useState('All');

  

  // Calculate user stats
  const totalUsers = overview?.totalUsers || 0;
  const activeUsers = userStatus?.active || 0;
  const deletedUsers = overview?.deletedUsers || 0;

  // Charts data
  const lineChartData = {
    labels: registrationTrend.map((item) => item.month),
    datasets: [{ label: 'User Registrations', data: registrationTrend.map((item) => item.registrations), borderColor: 'rgba(75,192,192,1)', fill: false }]
  };

  const activeInactiveData = {
    labels: ['Active', 'Inactive'],
    datasets: [{ data: [activeUsers, totalUsers - activeUsers], backgroundColor: ['#36A2EB', '#FF6384'] }]
  };

  const filteredRegionData = regionDistribution.filter((item) => regionFilter === 'All' || item.region === regionFilter);
  const regionData = filteredRegionData.reduce((acc, item) => {
    acc[item.region] = item.count;
    return acc;
  }, {} as Record<string, number>);

  const barChartData = {
    labels: Object.keys(regionData),
    datasets: [{ label: 'Users by Region', data: Object.values(regionData), backgroundColor: '#42A5F5' }]
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {/* Navbar */}
      <Navbar
        title='Analytics Dashboard'
        element1={
          <div className="flex items-center space-x-4">
            <input
              type="date"
              className="input input-bordered input-primary"
              value={dateRange.start}
              onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
            />
            <span className="text-base-800">to</span>
            <input
              type="date"
              className="input input-bordered input-primary"
              value={dateRange.end}
              onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
            />
          </div>
        }

        element2={
          <select
            className="select select-bordered select-primary"
            value={regionFilter}
            onChange={(e) => setRegionFilter(e.target.value)}
          >
            <option value="All">All Regions</option>
            <option value="North America">North America</option>
            <option value="Europe">Europe</option>
            <option value="Asia">Asia</option>
            <option value="Africa">Africa</option>
          </select>
        }
      />

      {/* Overview and User Registration Trend - Side by Side */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mt-6">
        {/* Overview Cards */}
        <div className="col-span-2 card bg-base-200 shadow-xl p-6">
          <h3 className="text-xl font-semibold text-base-800 mb-4">Overview</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="card bg-base-100 shadow-xl p-6 text-center">
              <h3 className="text-xl font-semibold text-base-800">Total Users</h3>
              <p className="text-2xl font-bold">{totalUsers}</p>
            </div>
            <div className="card bg-base-100 shadow-xl p-6 text-center">
              <h3 className="text-xl font-semibold text-base-800">Active Users</h3>
              <p className="text-2xl font-bold">{activeUsers}</p>
            </div>
            <div className="card bg-base-100 shadow-xl p-6 text-center">
              <h3 className="text-xl font-semibold text-base-800">Deleted Users</h3>
              <p className="text-2xl font-bold">{deletedUsers}</p>
            </div>
          </div>
        </div>

        {/* User Registration Trend */}
        <div className="col-span-3 card bg-base-200 shadow-xl p-6">
          <h3 className="text-xl font-semibold text-base-800 mb-4">User Registration Trend</h3>
          <Line data={lineChartData} />
        </div>
      </div>

      {/* Active vs Inactive Users and Users by Region - Side by Side */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
        <div className="col-span-2 card bg-base-200 shadow-xl p-6">
          <h3 className="text-xl font-semibold text-base-800 mb-4">Users by Region</h3>
          <Bar data={barChartData} />
        </div>
        <div className="col-span-1 card bg-base-200 shadow-xl p-6">
          <h3 className="text-xl font-semibold text-base-800 mb-4">Active vs Inactive Users</h3>
          <Pie data={activeInactiveData} />
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
