import BalanceCard from '../balance/BalanceCard.jsx';
import BalanceActions from '../balance/BalanceActions.jsx';
import DashBoardTitle from './DashBoardTitle.jsx';

function Dashboard() {
  return (
    <section className='flex flex-col gap-12 h-full px-52'>
      <DashBoardTitle />
      <div className='flex w-full'>
        <div className='bg-neutral-50 flex flex-col gap-12 shadow-2xl p-4 w-96 h-72 rounded-lg'>
          <BalanceCard />
          <BalanceActions />
        </div>
        <div className='w-96'>
          {/*Resume Movements */}
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
