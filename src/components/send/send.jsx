import SendPage from '../../pages/SendPage';
import MoneyForm from '../moneyForm/moneyForm';

const Send = () => {
  return (
    <MoneyForm screen="send">
      <SendPage />
    </MoneyForm>
  );
};

export default Send;
