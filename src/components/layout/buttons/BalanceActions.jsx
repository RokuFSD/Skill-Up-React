import { Link } from 'react-router-dom';
import Button from './Button.jsx';
import ShoppingBagSvg from '../../svg/ShoppingBag.jsx';
import CashSvg from '../../svg/Cash.jsx';

function BalanceActions() {
  return (
    <div className="w-full flex items-center justify-center gap-1 xs:gap-2">
      <Link to="/send" className="text-center h-12 w-full">
        <Button style="primary" extraClasses={'h-full w-full text-xs md:text-base '}>
          <CashSvg />
          Enviar
        </Button>
      </Link>
      <Link to="/balance/spent" className="text-center h-12 w-full">
        <Button style="neutral" extraClasses={'h-full w-full text-xs md:text-base'}>
          <ShoppingBagSvg />
          Nuevo Gasto
        </Button>
      </Link>
    </div>
  );
}

export default BalanceActions;
