import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

function ProtectedRoute() {
  // Get the auth token from our global context
  const { authToken } = useContext(AuthContext);

  if (authToken) {
    // If the user is logged in, show the page
    // The <Outlet /> component renders the child route (e.g., ProfilePage)
    return <Outlet />;
  } else {
    // If not logged in, redirect them to the /login page
    // 'replace' stops them from using the "back" button
    return <Navigate to="/login" replace />;
  }
}

export default ProtectedRoute;