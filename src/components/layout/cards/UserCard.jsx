import SkeletonUser from '../skeletons/SkeletonUser.jsx';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setDestinyAccount } from '../../../redux/features/transaction/transactionSlice.js';
import { useGetUserAccountQuery } from '../../../redux/features/transaction/accountSlice.js';

function UserCard({ id, userId }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { data, isFetching } = useGetUserAccountQuery(userId);

  function handleClick(){
    dispatch(setDestinyAccount(id))
    navigate('/send')
  }

  if (isFetching) return <SkeletonUser />;

  return (
    <div className='w-24 p-2 flex flex-col items-center gap-2 hover:cursor-pointer' onClick={() => handleClick()}>
      <div className='w-12 h-12 rounded-full bg-neutral-200'></div>
      <div className='flex flex-col gap-2'>
        <p className='text-sm text-neutral-700 text-center'>{data?.first_name}</p>
      </div>
    </div>
  );
}

export default UserCard;

