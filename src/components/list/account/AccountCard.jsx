import Profile from '../../svg/Profile.jsx';
import { useDispatch } from 'react-redux';
import { setDestinyAccount } from '../../../features/transaction/transactionSlice.js';

function AccountCard({ userId, userData }) {
  const dispatch = useDispatch();

  return (
    <div
      className="w-4/5 flex justify-between items-center gap-4 py-2 border-b border-neutral-300 h-20 pl-5
    transition-all
    will-change-auto
    hover:cursor-pointer
    hover:scale-105
    "
      onClick={() => dispatch(setDestinyAccount(userId))}>
      <div className="flex items-center justify-center rounded-full bg-neutral-200 p-3">
        <Profile />
      </div>
      <div className="">
        <p className="text-md">
          {userData?.first_name} {userData?.last_name}
        </p>
        <p className="text-neutral-600">{userData?.email}</p>
      </div>
      <div className="content-end">
        <p className="text-xs">ID : {userId}</p>
      </div>
    </div>
  );
}

export default AccountCard;
