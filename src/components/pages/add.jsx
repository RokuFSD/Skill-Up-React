import MiniList from '../layout/lists/MiniList.jsx';
import MoneyForm from '../form/moneyForm.jsx';

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
