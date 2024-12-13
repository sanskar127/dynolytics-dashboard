// pages/AnalyticsDashboard.tsx
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { AnalyticsState } from "../../types/types"
import Navbar from '../../components/Navbar'
import OverviewCard from '../../components/OverviewCard'
import UserRegistrationTrend from '../../components/UserRegistrationTrend'
import ActiveInactiveChart from '../../components/ActiveInactiveChart'
import RegionChart from '../../components/RegionChart'
import 'chart.js/auto' // Auto-register Chart.js components

const AnalyticsDashboard: React.FC = () => {
  const { overview, registrationTrend, userStatus, regionDistribution, loading, error } = useSelector((state: { analytics: AnalyticsState }) => state.analytics)

  const [dateRange, setDateRange] = useState<{ start: string; end: string }>({ start: '2024-01-01', end: '2024-12-31' })
  const [regionFilter, setRegionFilter] = useState('All')

  // Calculate user stats
  const totalUsers = overview?.totalUsers || 0
  const activeUsers = userStatus?.active || 0
  const deletedUsers = overview?.deletedUsers || 0

  // Charts data
  const lineChartData = {
    labels: registrationTrend.map((item) => item.month),
    datasets: [{ label: 'User Registrations', data: registrationTrend.map((item) => item.registrations), borderColor: 'rgba(75,192,192,1)', fill: false }]
  }

  const activeInactiveData = {
    labels: ['Active', 'Inactive'],
    datasets: [{ data: [activeUsers, totalUsers - activeUsers], backgroundColor: ['#36A2EB', '#FF6384'] }]
  }

  // Filter region data
  const filteredRegionData = regionDistribution?.filter((item) => regionFilter === 'All' || item.region === regionFilter) || []
  const regionData = filteredRegionData.reduce((acc, item) => {
    acc[item.region] = item.count
    return acc
  }, {} as Record<string, number>)

  const barChartData = {
    labels: Object.keys(regionData),
    datasets: [{ label: 'Users by Region', data: Object.values(regionData), backgroundColor: '#42A5F5' }]
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div>
      {/* Navbar */}
      <Navbar
        title="Analytics Dashboard"
        element1={
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-neutral m-1">Click</div>
            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
              <li>
                <span className="text-base-800">From: </span>
                <input
                  type="date"
                  className="input"
                  value={dateRange.end}
                  onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                />
              </li>
              <li>
                <span className="text-base-800">to: </span>
                <input
                  type="date"
                  className="input"
                  value={dateRange.start}
                  onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                />
              </li>
            </ul>
          </div>
        }
        element2={
          <select
            className="select"
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

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
        <div className="col-span-2 flex-1">
          <OverviewCard total={totalUsers} active={activeUsers} deleted={deletedUsers} />
        </div>

        <div className="col-span-4">
          <RegionChart data={barChartData} />
        </div>

        <div className="col-span-5 lg:col-span-4">
          <UserRegistrationTrend data={lineChartData} />
        </div>

        <div className="col-span-2">
          <ActiveInactiveChart data={activeInactiveData} />
        </div>
      </div>
    </div>
  )
}

export default AnalyticsDashboard
