import React from 'react';
import { RootState } from '../app/store';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom'

interface SecureRouteProps {
  path: string;
}

const SecureRoute: React.FC<SecureRouteProps> = ({ path }) => {
  const { user } = useSelector((state: RootState) => state.auth)

  if (user) {
    return <Navigate to={path} replace />
  }
  
  return <Navigate to="/login" replace />
};

export default SecureRoute
