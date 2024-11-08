import React from 'react';
import { FaMessage, FaClock, FaWallet, FaHeartPulse, FaGear } from 'react-icons/fa';
import './Footer.css';

const Footer = ({ onWalletToggle }) => {
  return (
    <footer className="footer">
      <span className="items active">
        <img src="/assets/images/Asset2.png" alt="LiveWager Logo" style={{ height: '16px', width: '26px' }} />
      </span>
      <span className="items">
        <FaMessage />
      </span>
      <span className="items clock-toggle">
        <FaClock />
      </span>
      {/* Wallet Icon */}
      <span className="items wallet-toggle" onClick={onWalletToggle}>
        <FaWallet />
      </span>
      <div className="items">
        <FaHeartPulse />
      </div>
      <span className="items">
        <FaGear />
      </span>
    </footer>
  );
};

export default Footer;
