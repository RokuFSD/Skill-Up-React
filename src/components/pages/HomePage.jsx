import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/features/user/userSlice.js';
import { Navigate } from 'react-router-dom';

function HomePage() {
  const user = useSelector(selectUser);
  return !user ? <Navigate to={'/home'} /> : <Navigate to={'/balance'} />;
}

export default HomePage;
