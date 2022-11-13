import { memo, useEffect, useRef, useState } from 'react';
import { formatDate } from '../../../utils/functionUtils.js';
import ShoppingBag from '../../svg/ShoppingBag.jsx';
import Profile from '../../svg/Profile.jsx';
import { useModifyTransactionMutation } from '../../../redux/features/transaction/transactionSlice.js';
import PencilSvg from '../../svg/Pencil.jsx';
import CrossSvg from '../../svg/Cross.jsx';

function TransactionCard({
  id,
  date,
  amount,
  concept,
  type,
  to_account_id,
  accountId,
  editable = false
}) {
  const inputRef = useRef(null);
  const [editing, setEditing] = useState(false);
  const [newConcept, setNewConcept] = useState(concept);
  const isExpense = type === 'payment' && to_account_id === accountId;
  const isTransfer = type === 'payment' && to_account_id !== accountId;
  const [modifyTransaction, { isLoading: isUpdating }] = useModifyTransactionMutation();

  function handleClick() {
    setEditing(!editing);
  }

  function handleSubmit() {
    modifyTransaction({
      id,
      data: { date, amount, concept: newConcept, type, to_account_id, accountId }
    });
    setEditing(!editing);
    setNewConcept('');
  }

  useEffect(() => {
    if (!editing) return;
    inputRef.current?.focus();
  }, [editing]);

  return (
    <div className="w-full flex items-center gap-5 py-2 border-b border-blue-300 h-20 px-6">
      <div className="flex items-center justify-center bg-white rounded-full p-3">
        {isExpense ? <ShoppingBag /> : <Profile />}
      </div>
      <div className="w-full text-sm md:text-base">
        {editing ? (
          <input
            ref={inputRef}
            placeholder={concept}
            onChange={(e) => setNewConcept(e.target.value)}
            className="w-20 border-none outline-none placeholder-black bg-transparent md:w-full"
          />
        ) : (
          <p>{concept}</p>
        )}
        {editable ? (
          !editing ? (
            <p
              className="pt-2 hover:text-blue-400 transition-all hover:cursor-pointer "
              onClick={() => handleClick()}>
              <PencilSvg />
            </p>
          ) : (
            <div className="flex items-center pt-2 gap-2">
              <p
                className="hover:cursor-pointer hover:text-green-600 transition-all"
                onClick={() => handleSubmit()}>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"></path>
                </svg>
              </p>
              <p
                className="hover:cursor-pointer hover:text-red-400 transition-all"
                onClick={() => setEditing(false)}>
                <CrossSvg />
              </p>
            </div>
          )
        ) : null}
      </div>
      <div className="text-right w-2/3">
        <p
          className={`${
            isExpense || isTransfer ? 'text-red-400' : 'text-green-500'
          } font-semibold`}>
          <span>{isExpense || isTransfer ? '-' : '+'}$</span>
          {amount}
        </p>
        <p className="text-sm">{formatDate(date)}</p>
      </div>
    </div>
  );
}

export default memo(TransactionCard);
