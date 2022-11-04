import React, { useState } from 'react';

const Header = () => {
  const close = 'scale-x-0';
  const open = 'scale-x-100';
  const [toggle, setToggle] = useState(close);

  const handleToggle = () => {
    toggle === close ? setToggle(open) : setToggle(close);
  };
  return (
    <header className="container h-12">
      <nav className="flex fixed top-0 w-full justify-between items-center h-12 px-4 py-4 bg-white z-10">
        <img src={'./assets/alkemy_logo.jpg'} className="logo" alt="logo" />
        <h1 className="font-bold text-2xl">AlkyBank</h1>
        <div
          className={`flex absolute transform ${toggle} origin-right items-end w-60 fixed top-12 right-0 flex-col gap-8 py-12 pr-8 pl-12 shadow-xl rounded-lg ease-in-out transition-all duration-300 bg-gradient-to-tr from-cyan-300 to-cyan-200`}>
          {[
            ['Home', '/home'],
            ['Carga de Saldo', '/carga'],
            ['Gastos', '/gastos'],
            ['Balance', '/balance'],
            ['Movimientos', '/movimientos'],
            ['Envio de Dinero', '/envio']
          ].map(([name, route]) => {
            return (
              <a
                key={route}
                href="#"
                className="rounded-2xl px-4 py-1 hover:bg-gray-600 hover:text-white">
                {name}
              </a>
            );
          })}
        </div>
        <button
          onClick={handleToggle}
          className={`flex justify-center items-center w-12 h-12 ${
            toggle === open ? 'bg-cyan-200' : 'bg-transparent'
          }`}>
          <div className={`${toggle === open ? null : 'space-y-2'}`}>
            <span
              className={`block w-8 h-0.5 bg-gray-600 animate-pulse transition ease transform duration-300 ${
                toggle === open ? 'rotate-45' : null
              }`}
            />
            <span
              className={
                toggle === open
                  ? null
                  : `block w-8 h-0.5 bg-gray-600 animate-pulse transition ease transform duration-300`
              }
            />
            <span
              className={`block w-8 h-0.5 bg-gray-600 animate-pulse transition ease transform duration-300 ${
                toggle === open ? '-rotate-45 -translate-y-0.5' : null
              }`}
            />
          </div>
        </button>
      </nav>
    </header>
  );
};

export default Header;
