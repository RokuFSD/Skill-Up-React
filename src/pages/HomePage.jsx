import { useSelector } from 'react-redux';
import { selectUser } from '../features/user/userSlice.js';
import { Navigate } from 'react-router-dom';

function HomePage() {
  const user = useSelector(selectUser);
  /* Instead of navigate to login page, we can show a home page with information about the app */
  return !user ? <Navigate to={'/login'} /> : <Navigate to={'/balance'} />;
}

export default HomePage
