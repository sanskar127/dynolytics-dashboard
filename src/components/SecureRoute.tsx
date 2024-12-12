import React from 'react';
import { Navigate } from 'react-router-dom'

// Define the type of props
interface SecureRouteProps {
  path: string;
}

const SecureRoute: React.FC<SecureRouteProps> = ({ path }) => {

  const isAuthenticated = true

  if (!isAuthenticated) {
    // If not authenticated, redirect to the login page
    return <Navigate to="/login" replace />
  }

  // If authenticated, render the secure path
  return <Navigate to={path} replace />
};

export default SecureRoute
