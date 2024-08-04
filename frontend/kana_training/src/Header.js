import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <img src="/RJ_CI.png" alt="Logo" />
        <span className="title">50 音練習</span>
      </div>
    </header>
  );
};

export default Header;
