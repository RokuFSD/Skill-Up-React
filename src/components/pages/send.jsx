import { useState } from 'react';
import SendPage from './SendPage.jsx';
import useDimensions from '../../utils/useDimensions.js';
import Button from '../layout/buttons/Button.jsx';
import Modal from '../modal.jsx';
import MoneyForm from '../form/moneyForm.jsx';
import { useSelector } from 'react-redux';
import { selectDestinyAccount } from '../../redux/features/transaction/transactionSlice.js';

const Send = () => {
  const { width, height } = useDimensions();
  const [show, setShow] = useState(false);
  let screen = width < height ? 'PORTRAIT' : 'LANDSCAPE';

  const handleToggle = () => {
    setShow(!show);
  };

  const destinyAccount = useSelector(selectDestinyAccount);
  return (
    <>
      <MoneyForm screen="send" destinyAccount={destinyAccount}>
        {screen === 'PORTRAIT' ? (
          <>
            <Button type="primary" onClick={handleToggle}>
              Usuarios
            </Button>
            {show && (
              <Modal handleToggle={handleToggle}>
                <SendPage {...{ handleToggle }} />
              </Modal>
            )}
          </>
        ) : (
          <SendPage />
        )}
      </MoneyForm>
    </>
  );
};

export default Send;
