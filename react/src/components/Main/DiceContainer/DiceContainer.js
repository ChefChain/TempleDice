import React from 'react';
import { FaRotate } from 'react-icons/fa';
import './DiceContainer.css';

const DiceContainer = ({ diceValues, onDiceClick, onReset }) => {
  const getDiceCharacter = (value) => {
    const diceChars = ['?', '?', '?', '?', '?', '?'];
    return diceChars[value - 1];
  };

  return (
    <div className="dice-main">
      <div className={dice-container}>
        {diceValues.map((value, index) => (
          <span
            key={index}
            className={dice }
            data-value={value}
            data-red={index === 3 ? 'true' : 'false'}
            onClick={() => onDiceClick(index)}
          >
            {getDiceCharacter(value)}
          </span>
        ))}
      </div>
      <button className="refresh-btn" onClick={onReset}>
        <FaRotate style={{ fontSize: '20px' }} />
      </button>
    </div>
  );
};

export default DiceContainer;
