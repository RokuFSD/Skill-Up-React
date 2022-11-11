import { Link } from 'react-router-dom';
import Button from '../button/Button.jsx';
import ShoppingBagSvg from '../svg/ShoppingBag.jsx';
import CashSvg from '../svg/Cash.jsx';

function BalanceActions() {
  return (
    <div className='w-full flex items-center justify-center gap-2'>
      <Link to='/send' className='text-center h-12 w-full'>
        <Button style='primary' extraClasses={'h-full w-full'}>
          <CashSvg />
          Send
        </Button>
      </Link>
      <Link to='/balance/spent' className='text-center h-12 w-full'>
        <Button style='neutral' extraClasses={'h-full w-full'}>
          <ShoppingBagSvg />
          Expense
        </Button>
      </Link>
    </div>
  );
}

export default BalanceActions;
