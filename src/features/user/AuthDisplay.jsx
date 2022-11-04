import { useDispatch, useSelector } from 'react-redux';
import { selectUser, selectLoading, selectError, selectBalance, selectOnMovement } from './userSlice.js';
import { authLogin } from './authActions';
import { getAccount } from './accountActions.js';
import { deposit, transaction, withdraw } from './balanceActions.js';
import { userLogout } from './userSlice.js';

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
          {loadingMovement && <h2 className='underline'>Loading transaction...</h2>}
          <button onClick={() => dispatch(deposit(incrementAmount))}>Deposit on account</button>
          <button onClick={() => withDraw(reduceAmount)}>Remove from account</button>
          <button onClick={() => dispatch(userLogout())}>Log out</button>
        </>
      ) : (
        <>
          <p>Not logged in</p>
          <button onClick={() => handleLogin()}>Login
          </button>

        </>
      )}
    </div>
  );
}

export default AuthDisplay;
