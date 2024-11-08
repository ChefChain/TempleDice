import React from 'react';
import './ScrollingBar.css';

const ScrollingBar = ({ bets }) => {
  return (
    <div className="scrolling-bar">
      {bets.map((bet) => (
        <div
          key={bet.id}
          className={\et \ \\}
        >
          <strong>{bet.username}</strong> bet <span></span>
          {bet.outcome && <span className="outcome"> - {bet.outcome}</span>}
        </div>
      ))}
    </div>
  );
};

export default ScrollingBar;
