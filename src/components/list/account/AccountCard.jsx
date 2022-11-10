import Profile from '../../svg/Profile.jsx';

function AccountCard({ userId, userData }) {

  return (
    <div className='w-full flex items-center gap-5 py-2 border-b border-neutral-300 h-20 pl-5
    transition-all
    will-change-auto
    hover:cursor-pointer
    hover:scale-105
    '>
      <div className='flex items-center justify-center rounded-full bg-neutral-200 p-3'>
        <Profile />
      </div>
      <div className='basis-4/6'>
        <p className='text-md'>{userData?.first_name} {userData?.last_name}</p>
        <p className='text-neutral-600'>{userData?.email}</p>
      </div>
      <div className='text-right flex items-center gap-2'>
        <p className='text-xs'>ID : {userId}</p>
      </div>
    </div>
  );
}

export default AccountCard;
