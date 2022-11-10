import BalanceCard from '../balance/BalanceCard.jsx';
import BalanceActions from '../balance/BalanceActions.jsx';
import DashBoardTitle from './DashBoardTitle.jsx';

function Dashboard() {
  return (
    <section className="flex flex-col gap-12 px-8 w-full h-full items-center justify-center">
      <DashBoardTitle />
      <div className="flex flex-col flex-wrap xs:flex-row w-full justify-center items-center">
        <div className="bg-neutral-50 flex flex-col gap-12 shadow-2xl p-4 max-w-sm min-w-xs xs:w-1/2 h-72 rounded-lg">
          <BalanceCard />
          <BalanceActions />
        </div>
        <div className="max-w-sm min-w-xs xs:w-1/2 h-20 bg-red-600">{/*Resume Movements */}</div>
      </div>
    </section>
  );
}

export default Dashboard;
