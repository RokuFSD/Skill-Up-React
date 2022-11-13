import alkemyLogo from "../../../assets/alkemy_logo.png"
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { authLogin } from '../../../redux/features/user/authActions.js';
import { selectUserToken, userLogout } from '../../../redux/features/user/userSlice.js';
import Button from '../buttons/Button.jsx';
import { useScroll } from '../../../utils/useScroll.js';

const Header = () => {
  const close = 'scale-y-0';
  const open = 'scale-y-100';
  const [toggle, setToggle] = useState(close);
  const token = useSelector(selectUserToken);
  const dispatch = useDispatch();
  const scrollOffset = useScroll();

  const handleToggle = (route) => {
    toggle === close ? setToggle(open) : setToggle(close);
    route === '/login' ? dispatch(userLogout()) : null;
  };

  const handleLogin = async () => {
    try {
      await dispatch(
        authLogin({
          email: import.meta.env.VITE_ADMIN_USER,
          password: import.meta.env.VITE_ADMIN_PASS
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className="container h-12 ">
      <nav
        className={`flex fixed top-0 w-full justify-between items-center h-12 px-4 py-4 bgblack z-10 transition-all duration-400 ${
          scrollOffset > 0 ? 'bg-gray-200 opacity-95' : null
        }`}>
        <img src={alkemyLogo} className="logo" alt="logo" />
        <h1
          className={`font-black text-3xl text-gray-200 tracking-widest ${
            scrollOffset > 0 && 'text-sky-500'
          }`}>
          AlkyBank
        </h1>
        <div
          className={`flex absolute transform ${toggle} origin-top-right items-end w-60 h-screen fixed top-12 right-0 flex-col gap-8 py-12 pr-8 pl-12 shadow-xl rounded-tl-xl ease-in-out transition-all duration-300 bg-gradient-to-tr from-cyan-400 to-cyan-100`}>
          {[
            ['Balance', '/'],
            ['Carga de Saldo', '/balance/add'],
            ['Gastos', '/balance/spent'],
            ['Movimientos', '/movements'],
            ['Envio de Dinero', '/send'],
            ['Cerrar Sesion', '/login']
          ].map(([name, route]) => {
            return (
              <NavLink
                onClick={() => handleToggle(route)}
                to={route}
                key={route}
                className="rounded-2xl px-4 py-1 hover:bg-black hover:text-white">
                {name}
              </NavLink>
            );
          })}
        </div>
        {token ? (
          <button
            onClick={handleToggle}
            className={`flex justify-center items-center w-12 h-12 ${
              toggle === open ? 'bg-cyan-400' : 'bg-transparent'
            }`}>
            <div className={`${toggle === open ? null : 'space-y-2'}`}>
              <span
                className={`block w-8 h-0.5 bg-black animate-pulse transition ease transform duration-300 ${
                  toggle === open ? 'rotate-45' : null
                }`}
              />
              <span
                className={
                  toggle === open
                    ? null
                    : `block w-8 h-0.5 bg-black animate-pulse transition ease transform duration-300`
                }
              />
              <span
                className={`block w-8 h-0.5 bg-black animate-pulse transition ease transform duration-300 ${
                  toggle === open ? '-rotate-45 -translate-y-0.5' : null
                }`}
              />
            </div>
          </button>
        ) : (
          <Button type="primary" onClick={handleLogin}>
            Inicio
          </Button>
        )}
      </nav>
    </header>
  );
};

export default Header;
