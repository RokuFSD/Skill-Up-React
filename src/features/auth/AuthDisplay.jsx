import { useDispatch, useSelector } from 'react-redux';
import { selectUser, selectLoading, selectError } from './authSlice';
import { authLogin } from './authActions';

/* This component is used to test the authSlice and authActions. */

function AuthDisplay() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const userMock = {
    email: 'emiruiz@test.com',
    password: 'alkemyreact'
  };

  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Auth Display</h1>
      {loading && <div>Loading...</div>}
      {user ? (
        <>
          <p>
            {user.first_name} {user.last_name}
          </p>
        </>
      ) : (
        <>
          <p>Not logged in</p>
          <button onClick={() => dispatch(authLogin(userMock))}>Login</button>
        </>
      )}
    </div>
  );
}

export default AuthDisplay;
