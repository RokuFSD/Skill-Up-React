import SendPage from '../../pages/SendPage';
import MoneyForm from '../moneyForm/moneyForm';

const Add = () => {
  return (
    <MoneyForm screen="add">
      <SendPage />
    </MoneyForm>
  );
};

export default Add;
