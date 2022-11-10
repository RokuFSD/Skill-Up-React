import BalanceCard from '../balance/BalanceCard.jsx';
import BalanceActions from '../balance/BalanceActions.jsx';
import DashBoardTitle from './DashBoardTitle.jsx';
import TransactionList from '../list/transaction/TransactionList.jsx';
import TransactionCard from '../list/transaction/TransactionCard.jsx';
import SkeletonTransaction from '../skeleton/SkeletonTransaction.jsx';
import Arrow from '../svg/Arrow.jsx';
import { useGetTransactionsQuery } from '../../features/movement/transactionSlice.js';
import { Link } from 'react-router-dom';
import { useGetAllAccountsQuery } from '../../features/movement/accountSlice.js';

function Dashboard() {
  useGetAllAccountsQuery('');
  const { data, isFetching } = useGetTransactionsQuery(1);

  return (
    <section className='flex flex-col gap-12 h-full px-52'>
      <DashBoardTitle />
      <div className='flex w-full justify-center gap-20'>
        <div className='bg-neutral-50 flex flex-col gap-12 shadow-2xl p-4 w-96 h-72 rounded-lg'>
          <BalanceCard />
          <BalanceActions />
        </div>
        <div className='bg-neutral-50 p-4 rounded-xl shadow-xl'>
          <h2 className='text-xl font-semibold text-neutral-500'>Last activity</h2>
          {isFetching ? (
            <TransactionList large>
              {[...Array(5)].map((_, index) => (
                <SkeletonTransaction key={index} />
              ))}
            </TransactionList>
          ) : (
            <TransactionList large>
              {data.data?.slice(0, 5).map((transaction) => (
                <TransactionCard key={transaction.id} {...transaction} />
              ))}
            </TransactionList>
          )}
          <Link to={'/movements'} className='text-indigo-600 font-semibold hover:text-indigo-400 transition-all'>
            <div className='w-full flex items-center justify-between'>
              <p className='text-right'>See all your movements</p>
              <Arrow />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
