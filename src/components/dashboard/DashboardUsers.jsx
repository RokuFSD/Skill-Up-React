import UserCard from './UserCard.jsx';
import SkeletonUser from '../skeleton/SkeletonUser.jsx';

function DashboardUsers({ isFetching, accounts }) {
  if (isFetching) {
    return (
      <div className='flex w-full'>
        {[...Array(4)].map((_, index) => (
          <SkeletonUser key={index}/>
        ))}
      </div>
    );
  }

  if(!accounts?.length) {
    return (
      <div className='flex w-full'>
        <p className='text-center text-neutral-500 dark:text-neutral-400 text-xl font-semibold w-full'>
          No hay cuentas recientes
        </p>
      </div>
    );
  }
  return (
    <div className='flex w-full'>
      {accounts?.map((account) => (
          <UserCard key={account.id} {...account} />
        )
      )}
    </div>
  );
}

export default DashboardUsers;

