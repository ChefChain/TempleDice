import React from 'react';
import { FaDollarSign, FaWallet } from 'react-icons/fa';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-logo">
        <img src="/assets/images/Asset2.png" alt="LiveWager Logo" className="logo" />
        <div className="logo-text">
          <span>Live</span>
          <span className="bold">wager</span>
          <span className="dot">.</span>
          <span className="bold">io</span>
        </div>
      </div>
      <div className="header-icons">
        <FaDollarSign style={{ color: 'rgb(133, 216, 133)' }} />
        <span className="balance-display">1000.00</span>
        <FaWallet />
        {/* Login Button */}
        <button id="login-button">Login</button>
      </div>
    </header>
  );
};

export default Header;
