import BalanceCard from '../balance/BalanceCard.jsx';
import BalanceActions from '../balance/BalanceActions.jsx';
import DashBoardTitle from './DashBoardTitle.jsx';
import ItemScroll from '../list/ItemScroll.jsx';
import TransactionCard from '../list/transaction/TransactionCard.jsx';
import SkeletonTransaction from '../skeleton/SkeletonTransaction.jsx';
import Arrow from '../svg/Arrow.jsx';
import {
  useGetLastThreeAccountsQuery,
  useGetTransactionsQuery
} from '../../features/transaction/transactionSlice.js';
import { Link } from 'react-router-dom';
import { useGetAllAccountsQuery } from '../../features/transaction/accountSlice.js';
import DashboardUsers from './DashboardUsers.jsx';

function Dashboard() {
  useGetAllAccountsQuery('');
  const { data, isFetching } = useGetTransactionsQuery(1);
  const { data: lastAccounts, isFetching: lastFetching } = useGetLastThreeAccountsQuery();

  return (
    <section className="flex flex-col gap-12 px-8 w-full h-full items-center">
      <DashBoardTitle />
      <div className="flex flex-col w-full gap-8">
        <div className="flex flex-col flex-wrap justify-between gap-8">
          <div className="w-full bg-neutral-50 flex flex-col gap-12 p-4 rounded-lg shadow-lg">
            <BalanceCard />
            <BalanceActions />
          </div>
          <div className="w-full bg-neutral-50 flex p-4 h-40 rounded-lg flex-wrap shadow-lg">
            <h2 className="text-xl font-semibold text-neutral-500 basis-full">Send again</h2>
            <DashboardUsers isFetching={lastFetching} accounts={lastAccounts} />
          </div>
        </div>
        <div className="bg-neutral-50 p-4 rounded-xl shadow-xl">
          <h2 className="text-xl font-semibold text-neutral-500">Last activity</h2>
          {isFetching ? (
            <ItemScroll large>
              {[...Array(5)].map((_, index) => (
                <SkeletonTransaction key={index} />
              ))}
            </ItemScroll>
          ) : (
            <ItemScroll large>
              {data.data?.slice(0, 5).map((transaction) => (
                <TransactionCard key={transaction.id} {...transaction} />
              ))}
            </ItemScroll>
          )}
          <Link
            to={'/movements'}
            className="text-indigo-600 font-semibold hover:text-indigo-400 transition-all">
            <div className="w-full flex items-center justify-between">
              <p className="text-right">See all your movements</p>
              <Arrow />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
