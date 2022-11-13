import BalanceCard from '../cards/BalanceCard.jsx';
import BalanceActions from '../buttons/BalanceActions.jsx';
import DashBoardTitle from './DashBoardTitle.jsx';
import Arrow from '../../svg/Arrow.jsx';
import { useGetLastThreeAccountsQuery } from '../../../redux/features/transaction/transactionSlice.js';
import { Link } from 'react-router-dom';
import { useGetAllAccountsQuery } from '../../../redux/features/transaction/accountSlice.js';
import DashboardUsers from './DashboardUsers.jsx';
import MiniList from '../lists/MiniList.jsx';

function Dashboard() {
  /*
   * useGetAllAccountsQuery: Fetches all accounts from the API
   * Is invoked in the Dashboard Component for performance reasons (cache of RTK Query)
   * */
  useGetAllAccountsQuery('');
  const { data: lastAccounts, isFetching: lastFetching } = useGetLastThreeAccountsQuery();

  return (
    <section className="flex flex-col px-8 gap-8 w-full h-full items-center lg:justify-center lg:-mt-5">
      <DashBoardTitle />
      <div className="flex flex-col w-full gap-8 max-w-xl lg:flex-row lg:max-w-5xl lg:gap-20">
        <div className="w-full flex flex-col flex-wrap justify-between gap-8">
          <div className="w-full bg-neutral-50 flex flex-col gap-12 p-4 rounded-lg shadow-lg">
            <BalanceCard />
            <BalanceActions />
          </div>
          <div className="w-full bg-neutral-50 flex p-4 h-40 rounded-lg flex-wrap shadow-lg">
            <h2 className="text-xl font-semibold text-neutral-500 basis-full">Enviar de nuevo</h2>
            <DashboardUsers isFetching={lastFetching} accounts={lastAccounts} />
          </div>
        </div>
        <div className="h-full w-full bg-neutral-50 p-4 rounded-xl shadow-xl flex flex-col gap-2">
          <h2 className="text-xl font-semibold text-neutral-500">Última actividad</h2>
          <MiniList />
          <Link
            to={'/movements'}
            className="text-md text-blue-600 font-semibold hover:text-indigo-400 transition-all">
            <div className="w-full flex items-center justify-between">
              <p className="text-right">Ver toda tu actividad</p>
              <Arrow />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
