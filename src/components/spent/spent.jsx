import MiniList from '../list/MiniList';
import MoneyForm from '../moneyForm/moneyForm';

const Spent = () => {
  return (
    <MoneyForm screen="spent">
      <div>
        <h2>Ultimos Gastos</h2>
        <MiniList limit={5} type="payment" />
      </div>
    </MoneyForm>
  );
};

export default Spent;
