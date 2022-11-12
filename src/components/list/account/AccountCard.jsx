import Profile from '../../svg/Profile.jsx';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectDestinyAccount,
  setDestinyAccount
} from '../../../features/transaction/transactionSlice.js';
import { useState } from 'react';

function AccountCard({ userId, userData, handleToggle }) {
  const selectedAccount = useSelector(selectDestinyAccount);
  const [selected, setSelected] = useState(false);
  const dispatch = useDispatch();

  function handleClick() {
    dispatch(setDestinyAccount(userId));
    handleToggle ? handleToggle() : null;
  }

  return (
    <div
      className={`w-full flex justify-between items-center border-b border-blue-300 h-20 p-1 xs:pl-3 pr-4
    transition-all
    will-change-auto
    hover:cursor-pointer
    hover:scale-95
    ${selectedAccount === userId ? 'text-blue-600 font-bold' : ''}
     `}
      onClick={() => handleClick()}>
      <div className="bg-neutral-100 flex items-center justify-center rounded-full p-3">
        <Profile />
      </div>
      <div className="basis-auto mr-auto ml-2 xs:ml-5">
        <p className="text-md">
          {userData?.first_name} {userData?.last_name}
        </p>
        <p className="text-neutral-700 font-normal">{userData?.email}</p>
      </div>
      <div className="">
        <p className="text-xs">ID : {userId}</p>
      </div>
    </div>
  );
}

export default AccountCard;
