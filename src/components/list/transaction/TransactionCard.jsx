import { memo } from 'react';
import { formatDate } from '../../../utils/functionUtils.js';
import ShoppingBag from '../../svg/ShoppingBag.jsx';
import Profile from '../../svg/Profile.jsx';

function TransactionCard({ id, date, amount, concept, type, to_account_id, accountId }) {
  const isExpense = type === 'payment';
  const isTransfer = to_account_id !== accountId;

  return (
    <div className='w-full flex items-center gap-5 py-2 border-b border-neutral-300 h-20 pl-5'>
      <div className='flex items-center justify-center rounded-full bg-neutral-200 p-3'>
        {isTransfer ? (
          <ShoppingBag />
        ) : (
          <Profile />
        )}
      </div>
      <div className='basis-3/6'>
        <p>{concept}</p>
      </div>
      <div className='text-right'>
        <p className={`${isExpense ? 'text-red-400' : 'text-green-400'} font-semibold`}>
          <span>{isExpense ? '-' : '+'}$</span>{amount}</p>
        <p className='text-sm'>{formatDate(date)}</p>
      </div>
    </div>
  );
}


export default memo(TransactionCard);
