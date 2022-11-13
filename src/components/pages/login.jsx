import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import React, { useState } from 'react';
import Button from '../layout/buttons/Button.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { authLogin, authRegister } from '../../redux/features/user/authActions.js';
import { adminResponse, getAccount } from '../../redux/features/user/accountActions.js';
import { Navigate, useNavigate } from 'react-router-dom';
import { selectUserToken } from '../../redux/features/user/userSlice.js';
import MyTextInput from '../form/myTextInput.jsx';
import swal from '@sweetalert/with-react';

const Login = () => {
  const [screen, setScreen] = useState('login');
  const token = useSelector(selectUserToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleScreen = () => {
    screen === 'login' ? setScreen('register') : setScreen('login');
  };

  const schema = Yup.object({
    firstName: Yup.string().max(20, 'Maximo 20 caracteres').required('Requerido'),
    lastName: Yup.string().max(20, 'Maximo 20 caracteres').required('Requerido'),
    email: Yup.string().email('Email Invalido').required('Requerido'),
    password: Yup.string()
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/,
        'Debe tener minimo 8 caracteres (mayuscula, minuscula, numero y caracter especial)',
        {
          excludeEmptyString: true
        }
      )
      .required('Requerido'),
    confirmPass: Yup.string()
      .required('Requerido')
      .min(8, 'Minimo 8 caracteres')
      .oneOf([Yup.ref('password'), null], 'No coincide con Contraseña')
  });

  async function handleLogin(formValues) {
    let response;
    if (screen === 'register') {
      const { confirmPass, ...rest } = formValues;
      response = await dispatch(authRegister({ ...rest }));
      if (response.type === 'auth/register/fulfilled') {
        swal({
          buttons: false,
          timer: 3000,
          icon: 'success',
          title: 'Bienvenido'
        });
        navigate('/');
      } else {
        swal({
          buttons: false,
          timer: 3000,
          icon: 'error',
          title: 'Credenciales Incorrectas'
        });
      }
    } else {
      const { email, password } = formValues;
      response = await dispatch(authLogin({ email, password }));
      await dispatch(adminResponse());
      dispatch(getAccount());
      if (response.type === 'auth/login/fulfilled') {
        swal({
          buttons: false,
          timer: 3000,
          icon: 'success',
          text: 'Bienvenido'
        });
        navigate('/');
      } else {
        swal({
          buttons: false,
          timer: 3000,
          icon: 'error',
          title: 'Credenciales Incorrectas'
        });
      }
    }
  }

  return (
    <>
      {token && <Navigate to={'/'} />}
      <div className="md:flex px-2 md:px-8 md:py-4 gap-4 min-h-main">
        <img
          className="md:w-1/2 object-contain top-0 mb-6 -z-10"
          src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          alt=""
        />
        <div className="flex flex-col items-start justify-center w-full">
          <h1 className="ml-2 text-2xl">Bienvenido a AlkyBank</h1>
          <h2 className="ml-2 text-xl my-4">
            {screen === 'register' ? 'Aqui puedes registrarte' : 'Ingresa con tu usuario'}
          </h2>
          <Formik
            initialValues={{
              firstName: '',
              lastName: '',
              email: '',
              password: '',
              confirmPass: ''
            }}
            validationSchema={
              screen === 'register' ? schema : schema.omit(['firstName', 'lastName', 'confirmPass'])
            }
            onSubmit={(values, { setSubmitting, resetForm }) => {
              handleLogin(values);
              setTimeout(() => {
                setSubmitting(false);
                resetForm({
                  values: {
                    firstName: '',
                    lastName: '',
                    email: '',
                    password: '',
                    confirmPass: ''
                  }
                });
              }, 100);
            }}>
            {({ handleSubmit, isSubmitting }) => (
              <form className="flex-col px-4 w-full">
                {screen === 'register' && (
                  <>
                    <MyTextInput label="Nombre" name="firstName" type="text" placeholder="" />
                    <ErrorMessage name="firstName">
                      {(msg) => <p className="text-red-500">{msg}</p>}
                    </ErrorMessage>
                    <MyTextInput label="Apellido" name="lastName" type="text" placeholder="" />
                    <ErrorMessage name="lastName">
                      {(msg) => <p className="text-red-500">{msg}</p>}
                    </ErrorMessage>
                  </>
                )}
                <MyTextInput
                  label="Email"
                  name="email"
                  type="email"
                  placeholder=""
                  autoComplete="email"
                />
                <ErrorMessage name="email">
                  {(msg) => <p className="text-red-500">{msg}</p>}
                </ErrorMessage>
                <MyTextInput
                  label="Contraseña"
                  name="password"
                  type="password"
                  placeholder=""
                  autoComplete="current-password"
                />
                <ErrorMessage name="password">
                  {(msg) => <p className="text-red-500">{msg}</p>}
                </ErrorMessage>
                {screen === 'register' && (
                  <>
                    <MyTextInput
                      label="Confirmar Contraseña"
                      name="confirmPass"
                      type="password"
                      autoComplete="current-password"
                      placeholder=""
                    />
                    <ErrorMessage name="confirmPass">
                      {(msg) => <p className="text-red-500">{msg}</p>}
                    </ErrorMessage>
                  </>
                )}
                <Button type="submit" onClick={handleSubmit} disabled={isSubmitting}>
                  {screen === 'register' ? 'Registrarse' : 'Ingresar'}
                </Button>
              </form>
            )}
          </Formik>
          <p className="self-end mt-16 mr-4">
            {screen === 'login' ? 'No tienes usuario?' : 'Ya tienes usuario?'}
            <button
              onClick={handleScreen}
              className="mx-1 text-indigo-600 font-medium hover:text-indigo-400">
              {screen === 'login' ? 'Registrate' : 'Ingresa aqui'}
            </button>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
