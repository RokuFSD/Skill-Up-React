import { Outlet, Navigate } from 'react-router-dom';

function ProtectedRoute({ user }) {
  return user ? <Navigate to={'/login'} /> : <Outlet />;
}

export default ProtectedRoute;
