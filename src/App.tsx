import React, { useEffect } from 'react';
import Sidebar from './components/Sidebar';
import { Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './app/store';
import { fetchUsers } from './features/Users/usersSlice';
import { fetchOverview, fetchRegionDistribution, fetchRegistrationTrend, fetchUserStatus } from './features/Analytics/analyticsSlice';

const App: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();


  // Dispatch fetch actions on component mount
  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchOverview());
    dispatch(fetchRegistrationTrend());
    dispatch(fetchUserStatus());
    dispatch(fetchRegionDistribution());
  }, [dispatch]);

  useEffect(() => {
  }, [dispatch]);

  return (
    <>
      {/* Use grid-cols-[auto_1fr] with no gap between columns */}
      <div className="grid grid-cols-[auto_1fr] gap-0 m-0 p-0">
        <Sidebar />
        <div className="m-0 p-0">  {/* Ensure no margin/padding */}
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default App;
