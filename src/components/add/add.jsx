import MiniList from '../list/MiniList';
import MoneyForm from '../moneyForm/moneyForm';

const Add = () => {
  return (
    <MoneyForm screen="add">
      <div>
        <h2>Ultimas Cargas</h2>
        <MiniList limit={5} type="topup" />
      </div>
    </MoneyForm>
  );
};

export default Add;
