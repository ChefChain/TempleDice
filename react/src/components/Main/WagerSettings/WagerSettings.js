import React from 'react';
import { FaBitcoin } from 'react-icons/fa';
import './WagerSettings.css';

const WagerSettings = ({ betAmount, onAdjust }) => {
  return (
    <div className="balance-info">
      <div className="info-block">
        <div className="info-first">
          <p style={{ fontWeight: 600 }}>BET Amount:</p>
          <span className="bet-amount" style={{ color: 'rgb(133, 216, 133)', fontWeight: 600, fontSize: '40px' }}>
            
          </span>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span className="amount">0.00023</span>
            <FaBitcoin style={{ fontSize: '30px', color: '#F7931A', transform: 'rotate(-15deg)', marginLeft: '5px' }} />
          </div>
        </div>
        <div className="info-second">
          <span className="adjust-button" onClick={() => onAdjust('half')}>1/2</span>
          <span className="adjust-button" onClick={() => onAdjust('double')}>2X</span>
          <span className="adjust-button active" onClick={() => onAdjust('max')}>MAX</span>
        </div>
        {/* Scroller */}
        <div className="wheel">
          <img src="/assets/images/scroll_wheel.png" alt="Scroller" />
        </div>
        <div className="block">
          <img src="/assets/images/image.png" alt="Scroller" />
        </div>
      </div>
    </div>
  );
};

export default WagerSettings;
