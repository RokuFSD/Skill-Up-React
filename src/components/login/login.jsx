import { Formik, useField } from 'formik';
import * as Yup from 'yup';
import React, { useState } from 'react';
import Button from '../button/Button';
import { useDispatch } from 'react-redux';
import { authLogin, authRegister } from '../../features/user/authActions';
import { getAccount } from '../../features/user/accountActions';
import { useNavigate } from 'react-router-dom';

const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="flex flex-col rounded-2xl py-3">
      <label className="mx-1 text-lg" htmlFor={props.id || props.name}>
        {label}
      </label>
      <input
        className="border border-gray-400 rounded-full px-2 py-2 w-full sm:w-[80%]"
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? <div className="text-red-500">{meta.error}</div> : null}
    </div>
  );
};

const Login = () => {
  const [screen, setScreen] = useState('login');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleScreen = () => {
    screen === 'login' ? setScreen('register') : setScreen('login');
  };

  const schema = Yup.object({
    firstName: Yup.string().max(15, 'Must be 15 characters or less').required('Requerido'),
    lastName: Yup.string().max(20, 'Must be 20 characters or less').required('Requerido'),
    email: Yup.string().email('Invalid email address').required('Requerido'),
    password: Yup.string()
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/,
        'Debe tener minimo 8 caracteres (Al menos 1 mayuscula, minuscula, numero y caracter especial)',
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
      response.type === 'auth/register/fulfilled'
        ? navigate('/')
        : alert('Credenciales Incorrectas');
    } else {
      const { email, password } = formValues;
      response = await dispatch(authLogin({ email, password }));
      response.type === 'auth/login/fulfilled' ? navigate('/') : alert('Credenciales Incorrectas');
    }
  }

  return (
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
                  <MyTextInput label="Apellido" name="lastName" type="text" placeholder="" />
                </>
              )}
              <MyTextInput label="Email" name="email" type="email" placeholder="" />
              <MyTextInput label="Contraseña" name="password" type="password" placeholder="" />
              {screen === 'register' && (
                <MyTextInput
                  label="Confirmar Contraseña"
                  name="confirmPass"
                  type="password"
                  placeholder=""
                />
              )}
              <Button type="submit" onClick={handleSubmit} disabled={isSubmitting}>
                Enviar
              </Button>
            </form>
          )}
        </Formik>
        <p className="self-end mt-16 mr-4">
          {screen === 'login' ? 'No tienes usuario?' : 'Ya tienes usuario?'}
          <button onClick={handleScreen} className="mx-1 text-cyan-500">
            {screen === 'login' ? 'Registrate' : 'Ingresa aqui'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
