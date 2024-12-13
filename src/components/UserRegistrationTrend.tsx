// components/UserRegistrationTrend.tsx
import React from 'react';
import { Line } from 'react-chartjs-2';

interface UserRegistrationTrendProps {
  data: any;
}

const UserRegistrationTrend: React.FC<UserRegistrationTrendProps> = ({ data }) => {
  return (
    <div className="card bg-base-200 shadow-xl p-6">
      <h3 className="text-xl font-semibold text-base-800 mb-4">User Registration Trend</h3>
      <Line data={data} />
    </div>
  );
};

export default UserRegistrationTrend;
