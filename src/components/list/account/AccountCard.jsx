import Profile from '../../svg/Profile.jsx';
import { useDispatch } from 'react-redux';
import { setDestinyAccount } from '../../../features/transaction/transactionSlice.js';
import { useState } from 'react';

function AccountCard({ userId, userData, handleToggle }) {
  const [selected, setSelected] = useState(false);
  const dispatch = useDispatch();

  return (
    <div
      className={`w-full flex justify-between items-center border-b border-neutral-300 h-20 p-1 xs:pl-3 pr-4
    transition-all
    will-change-auto
    hover:cursor-pointer
    hover:scale-95
    ${selected && 'bg-gray-400'}
    `}
      onClick={() => {
        dispatch(setDestinyAccount(userId));
        setSelected(!selected);
        handleToggle();
      }}>
      <div className="flex items-center justify-center rounded-full bg-neutral-200 p-0 xs:p-3">
        <Profile />
      </div>
      <div className="basis-auto mr-auto ml-2 xs:ml-5">
        <p className="text-md">
          {userData?.first_name} {userData?.last_name}
        </p>
        <p className="text-neutral-600">{userData?.email}</p>
      </div>
      <div className="">
        <p className="text-xs">ID : {userId}</p>
      </div>
    </div>
  );
}

export default AccountCard;
