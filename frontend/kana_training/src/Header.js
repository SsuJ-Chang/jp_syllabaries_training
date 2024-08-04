import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();
  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <header className="header" onClick={handleLogoClick}>
      <div className="logo">
        <img src="/RJ_CI.png" alt="Logo" />
        <span className="title">50 音練習</span>
      </div>
    </header>
  );
};

export default Header;
