import React from 'react';
import alkemyLogo from '../../../assets/alkemy_logo.png'

const Footer = () => {
  return (
    <footer className="flex w-full fixed items-center justify-center bottom-0 bg-sky-50">
      <img src={alkemyLogo} className="logo" alt="logo" />
      <h6 className="text-sm">©2022 | Made by ResilientDevs™</h6>
    </footer>
  );
};

export default Footer;
