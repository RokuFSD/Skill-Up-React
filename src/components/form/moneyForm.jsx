import React, { useEffect } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Button from '../layout/buttons/Button.jsx';
import MyTextInput from './myTextInput.jsx';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectAccount,
  selectError,
  selectSuccess,
  setError,
  setSuccess
} from '../../redux/features/user/userSlice.js';
import { deposit, transaction, withdraw } from '../../redux/features/user/balanceActions.js';
import { removeDestinyAccount } from '../../redux/features/transaction/transactionSlice.js';
import { setDestinyAccount } from '../../redux/features/transaction/transactionSlice.js';
import swal from 'sweetalert';

const MoneyForm = ({ screen, destinyAccount, children = null }) => {
  const dispatch = useDispatch();
  const error = useSelector(selectError);
  const success = useSelector(selectSuccess);
  let userAccount = useSelector(selectAccount);
  let moneyAction;
  let type;
  let concept;

  switch (screen) {
    case 'add':
      moneyAction = 'Ingresar';
      type = 'topup';
      concept = 'Carga de Saldo';
      break;
    case 'spent':
      moneyAction = 'Utilizar';
      type = 'payment';
      concept = 'Gastos Personales';
      break;
    case 'send':
      moneyAction = 'Enviar';
      type = 'payment';
      concept = 'Envio de Dinero';
      userAccount = 0;
      break;
  }

  const schema = Yup.object({
    concept: Yup.string().min(5, 'Incompleto').required('Requerido'),
    type: Yup.string().oneOf(['topup', 'payment']).required('Requerido'),
    amount: Yup.number().moreThan(0, 'Debe ser mayor a 0').required('Requerido'),
    toAccount: Yup.number()
      .moreThan(0, 'Nº de Cuenta Invalido')
      .required('Debe ingresar cuenta de destino')
  });

  error &&
    swal({
      buttons: false,
      timer: 3000,
      icon: 'error',
      title: 'Error en Transaccion'
    }).then(() => {
      dispatch(setError(''));
    });

  success &&
    swal({
      buttons: false,
      timer: 3000,
      icon: 'success',
      title: 'Transaccion Exitosa'
    }).then(() => {
      dispatch(setSuccess(false));
    });
  return (
    <div className="container mt-12 flex flex-col justify-center items-center">
      <h1>{moneyAction} dinero</h1>
      <div className="flex flex-col sm:flex-row items-center justify-around w-full mt-8 gap-8 ">
        <Formik
          enableReinitialize={true}
          initialValues={{
            concept,
            type,
            amount: 0,
            toAccount: screen === 'send' && destinyAccount ? destinyAccount : userAccount
          }}
          validationSchema={screen === 'send' ? schema : schema.omit(['toAccount'])}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            const { toAccount, amount, ...rest } = values;
            switch (screen) {
              case 'add':
                dispatch(deposit({ amount, ...rest }));
                break;
              case 'spent':
                dispatch(withdraw({ amount }));
                dispatch(transaction({ screen, amount, ...rest }));
                break;
              case 'send':
                dispatch(deposit(values));
                dispatch(transaction({ screen, toAccount, amount, ...rest }));
                break;
            }
            console.log(values);
            resetForm();
            dispatch(removeDestinyAccount());
            setTimeout(() => {
              setSubmitting(false);
            }, 100);
          }}>
          {({ handleSubmit, isSubmitting }) => (
            <form className="flex flex-col justify-center items-center w-3/4 xs:max-w-1/2">
              <MyTextInput label="Concepto" type="text" name="concept" />
              {screen === 'send' && (
                <MyTextInput
                  label="Cuenta de Destino"
                  type="number"
                  name="toAccount"
                  onChange={(e) => dispatch(setDestinyAccount(+e.target.value))}
                />
              )}
              <MyTextInput label="Monto $" type="number" min="1" name="amount" />
              <Button type="submit" onClick={handleSubmit} disabled={isSubmitting}>
                {screen !== 'send' ? 'Cargar' : 'Enviar'}
              </Button>
            </form>
          )}
        </Formik>
        {children}
      </div>
    </div>
  );
};

export default MoneyForm;
