import MiniList from '../layout/lists/MiniList.jsx';
import MoneyForm from '../form/moneyForm.jsx';

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
