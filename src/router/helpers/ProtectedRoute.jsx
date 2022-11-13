import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/features/user/userSlice.js';

function ProtectedRoute() {
  const user = useSelector(selectUser);
  return !user ? <Navigate to={'/login'} /> : <Outlet />;
}

export default ProtectedRoute;
