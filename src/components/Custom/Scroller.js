import React, { useEffect, useRef, useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';

const dicePaths = {
  1: <circle cx="10" cy="10" r="1.5" fill="currentColor" />,
  2: (
    <>
      <circle cx="6" cy="6" r="1.5" fill="currentColor" />
      <circle cx="14" cy="14" r="1.5" fill="currentColor" />
    </>
  ),
  3: (
    <>
      <circle cx="5" cy="5" r="1.5" fill="currentColor" />
      <circle cx="10" cy="10" r="1.5" fill="currentColor" />
      <circle cx="15" cy="15" r="1.5" fill="currentColor" />
    </>
  ),
  4: (
    <>
      <circle cx="6" cy="6" r="1.5" fill="currentColor" />
      <circle cx="14" cy="6" r="1.5" fill="currentColor" />
      <circle cx="6" cy="14" r="1.5" fill="currentColor" />
      <circle cx="14" cy="14" r="1.5" fill="currentColor" />
    </>
  ),
  5: (
    <>
      <circle cx="6" cy="6" r="1.5" fill="currentColor" />
      <circle cx="14" cy="6" r="1.5" fill="currentColor" />
      <circle cx="10" cy="10" r="1.5" fill="currentColor" />
      <circle cx="6" cy="14" r="1.5" fill="currentColor" />
      <circle cx="14" cy="14" r="1.5" fill="currentColor" />
    </>
  ),
  6: (
    <>
      <circle cx="6" cy="6" r="1.5" fill="currentColor" />
      <circle cx="14" cy="6" r="1.5" fill="currentColor" />
      <circle cx="6" cy="10" r="1.5" fill="currentColor" />
      <circle cx="14" cy="10" r="1.5" fill="currentColor" />
      <circle cx="6" cy="14" r="1.5" fill="currentColor" />
      <circle cx="14" cy="14" r="1.5" fill="currentColor" />
    </>
  ),
};

function DiceIcon({ value, color = 'currentColor' }) {
  return (
    <svg width="100%" height="100%" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="1" width="18" height="18" rx="4" ry="4" fill="none" stroke={color} strokeWidth="2" />
      {dicePaths[value]}
    </svg>
  );
}

function ScrollingBar() {
  const scrollingBarRef = useRef(null);
  const [winners, setWinners] = useState([
    {
      name: 'JerinMoo456',
      dice: [
        { value: 1, win: true },
        { value: 2, win: false },
        { value: 4, win: true },
        { value: 6, win: false },
      ],
    },
  ]);
  const [newWinner, setNewWinner] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const winner = {
        name: `Player${Math.floor(Math.random() * 100)}`,
        dice: [
          { value: 1, win: true },
          { value: 2, win: false },
          { value: 4, win: true },
          { value: 6, win: false },
        ],
      };
      setNewWinner(winner);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (newWinner) {
      setWinners((prev) => {
        const updatedBets = [...prev, newWinner];
        if (prev.length > 4) {
          updatedBets.shift();
        }
        return updatedBets;
      });
      setNewWinner(null);
    }
  }, [newWinner]);

  // scroll effect, commented it due to bugs
  //   useEffect(() => {
  //     const scrollingBar = document.querySelector('.scrolling-bar');
  //     if (scrollingBar) {
  //       scrollingBar.scrollTo({
  //         left: scrollingBar.scrollWidth,
  //         behavior: 'smooth',
  //       });
  //     }
  //   }, [winners]);

  return (
    <Box className="scrolling-bar" ref={scrollingBarRef} sx={{ m: 2 }}>
      {winners?.map((bet) => (
        <div key={bet.name} className="bet">
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="body2" component="span" sx={{ flexGrow: 1 }}>
              {bet.name}
            </Typography>
            <Stack direction="row" alignItems="center" spacing={1}>
              {bet?.dice?.map((dice) => (
                <Box key={dice.value} width={12} color={dice.win ? 'var(--mui-palette-success-main)' : undefined}>
                  <DiceIcon value={dice.value} color={dice.win ? 'var(--mui-palette-success-main)' : undefined} />
                </Box>
              ))}
            </Stack>
          </Stack>
        </div>
      ))}
    </Box>
  );
}

export default ScrollingBar;
