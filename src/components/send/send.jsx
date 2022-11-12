import { useState } from 'react';
import SendPage from '../../pages/SendPage';
import useDimensions from '../../utils/useDimensions';
import Button from '../button/Button';
import Modal from '../modal';
import MoneyForm from '../moneyForm/moneyForm';

const Send = () => {
  const { width, height } = useDimensions();
  const [show, setShow] = useState(false);
  let screen = width < height ? 'PORTRAIT' : 'LANDSCAPE';

  const handleToggle = () => {
    setShow(!show);
  };

  return (
    <MoneyForm screen="send">
      <>
        {screen === 'PORTRAIT' ? (
          <>
            <Button type="primary" onClick={handleToggle}>
              Usuarios
            </Button>
            {show && (
              <Modal handleToggle={handleToggle}>
                <SendPage />
              </Modal>
            )}
          </>
        ) : (
          <SendPage />
        )}
      </>
    </MoneyForm>
  );
};

export default Send;
