import SendPage from '../../pages/SendPage';
import MoneyForm from '../moneyForm/moneyForm';
import { useSelector } from 'react-redux';
import { selectDestinyAccount } from '../../features/transaction/transactionSlice.js';

const Send = () => {
  const destinyAccount = useSelector(selectDestinyAccount);
  return (
    <MoneyForm screen="send" destinyAccount={destinyAccount}>
      <SendPage />
    </MoneyForm>
  );
};

export default Send;
