import { useDispatch, useSelector } from 'react-redux';
import { selectUser, selectLoading, selectError, selectBalance, selectOnMovement } from './userSlice.js';
import { authLogin } from './authActions';
import { getAccount } from './accountActions.js';
import { deposit, transaction, withdraw } from './balanceActions.js';
import { userLogout } from './userSlice.js';
import Button from '../../components/button/Button.jsx';

/* This component is used to test the authSlice and authActions. */

function AuthDisplay() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const balance = useSelector(selectBalance);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const loadingMovement = useSelector(selectOnMovement);

  const userMock = {
    email: 'emiruiz@test.com',
    password: 'alkemyreact'
  };

  const incrementAmount = {
    amount: 200,
    accountId: 55,
    concept: 'New test string'
  };

  const reduceAmount = {
    amount: 300,
    type: 'payment',
    concept: 'New test string',
    accountId: 55
  };

  async function withDraw({ amount, accountId, concept, type }) {
    await dispatch(withdraw({ amount, accountId }));
    await dispatch(transaction({ amount, type, concept, accountId, toAccountId: accountId }));
  }

  async function handleLogin() {
    await dispatch(authLogin(userMock));
    await dispatch(getAccount());
  }

  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Auth Display</h1>
      {loading && <div>Loading...</div>}
      {user && user.account ? (
          <>
            <h1>{balance}</h1>
            <p>
              {user.first_name} {user.last_name}
            </p>
            <Button loading={loadingMovement} onClick={() => dispatch(deposit(incrementAmount))}>
              Deposit
            </Button>
            <Button loading={loadingMovement} onClick={() => withDraw(reduceAmount)} type='neutral'>
              Withdraw
            </Button>
            <Button onClick={() => dispatch(userLogout())} type='error'>
              Logout
            </Button>
          </>
        ) :
        <>
          <p>Not logged in</p>
          <Button loading={loading} type='success' onClick={() => handleLogin()}>Login</Button>
        </>
      }
    </div>
  );
}

export default AuthDisplay;
