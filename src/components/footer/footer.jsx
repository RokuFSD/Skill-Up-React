import React from 'react';

const Footer = () => {
  return (
    <footer className="flex w-full md:fixed items-center justify-center bottom-0 bg-white">
      <img src={'./assets/alkemy_logo.jpg'} className="logo" alt="logo" />
      <h6 className="text-sm">©2022 | Made by ResilientDevs™</h6>
    </footer>
  );
};

export default Footer;
