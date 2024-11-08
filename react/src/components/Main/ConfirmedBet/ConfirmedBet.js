import React from 'react';
import { FaLock } from 'react-icons/fa';
import './ConfirmedBet.css';

const ConfirmedBet = ({ betAmount, betState, onBetClick, houseDice }) => {
  const getDiceCharacter = (value) => {
    const diceChars = ['?', '?', '?', '?', '?', '?'];
    return diceChars[value - 1];
  };

  return (
    <div className="confirmedbet-main">
      <div className="price">
        <p className="amount">
          $ <span>{betAmount}</span>
        </p>
      </div>
      <div className={\utton bet-button state-\\} onClick={onBetClick}>
        <span>
          {betState === 0
            ? 'PLACE BET'
            : betState === 1
            ? 'CONFIRM BET'
            : betState === 2
            ? 'BET CONFIRMED'
            : betState === 3
            ? 'NO MORE BETS'
            : betState === 4
            ? 'DICE ROLLING'
            : 'RESULTS'}
        </span>
        {betState !== 5 && <FaLock />}
        {/* Display house dice when showing results */}
        {betState === 5 && (
          <div className="dice-display">
            {houseDice.map((value, index) => (
              <span key={index} className="dice">
                {getDiceCharacter(value)}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ConfirmedBet;
