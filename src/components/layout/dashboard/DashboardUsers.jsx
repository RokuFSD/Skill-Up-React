import UserCard from '../cards/UserCard.jsx';
import SkeletonUser from '../skeletons/SkeletonUser.jsx';
import useDimensions from '../../../utils/useDimensions.js';

function DashboardUsers({ isFetching, accounts }) {
  const { height, width } = useDimensions();

  if (isFetching) {
    return (
      <div className="flex w-full">
        {[...Array(3)].map((_, index) => (
          <SkeletonUser key={index} />
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
    <div className="flex w-full">
      {accounts?.map((account, index) => {
        if (width < 350) {
          while (index < 3) {
            return <UserCard key={account.id} {...account} />;
          }
        } else {
          return <UserCard key={account.id} {...account} />;
        }
      })}
    </div>
  );
}

export default DashboardUsers;
