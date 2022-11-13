import { useSelector } from 'react-redux';
import { selectBalance, selectOnMovement } from '../../../redux/features/user/userSlice.js';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import EyeSvg from '../../svg/Eye.jsx';
import Button from '../buttons/Button.jsx';

function BalanceCard() {
  const loading = useSelector(selectOnMovement);
  const balance = useSelector(selectBalance);
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);
  return (
    <div className="w-full bg-gradient-to-br from-neutral-800 via-neutral-800 to-neutral-600 h-40 flex px-3 pt-3 flex-wrap rounded-xl shadow-xl">
      <div className="w-full">
        <h2 className="text-md font-semibold text-neutral-500">Tu saldo</h2>
      </div>
      <div className="w-full">
        <div className="flex w-full justify-between items-center">
          <div className="relative flex items-center w-3/4">
            <Button
              style={'transparent'}
              extraClasses={'absolute right-0 bottom-2 w-5 h-5'}
              onClick={() => setIsBalanceVisible(!isBalanceVisible)}>
              <EyeSvg open={isBalanceVisible} />
            </Button>
            <p className="text-xl">
              {isBalanceVisible ? (
                <span
                  className={`text-neutral-100 text-3xl ${
                    isBalanceVisible ? 'animate-fade-in' : ''
                  }`}>
                  ${loading ? <span className="animate-pulse ml-1">Calculando...</span> : balance}
                </span>
              ) : (
                <span className="text-neutral-100 text-3xl">********</span>
              )}
            </p>
          </div>
          <Link to='add'>
            <Button style={'premium'} extraClasses={'w-10 h-10 px-0 py-0'}>
              +
            </Button>
          </Link>
        </div>
      </div>
      <div className="w-full text-right h-1">
        <p className="text-neutral-400 text-xs">AlkyBank</p>
      </div>
    </div>
  );
}

export default BalanceCard;
