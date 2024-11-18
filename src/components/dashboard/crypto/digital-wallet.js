'use client';

import * as React from 'react';
import { keyframes } from '@emotion/react';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { DotsThree as DotsThreeIcon } from '@phosphor-icons/react/dist/ssr/DotsThree';
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

import { NoSsr } from '@/components/core/no-ssr';
import { CustomSwitch } from '@/components/Custom/CustomSwitch';
import ScrollingBar from '@/components/Custom/Scroller';

const currencyIcons = {
  BTC: '/assets/logo-btc.svg',
  ETH: '/assets/logo-eth.svg',
  BNB: '/assets/logo-bnb.svg',
};

// SVG paths for dice faces 1 to 4 with rounded corners and thicker lines
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

// DiceIcon component that accepts a value prop
function DiceIcon({ value, color = 'currentColor' }) {
  return (
    <svg width="100%" height="100%" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      {/* Dice background with rounded corners and thicker stroke */}
      <rect x="1" y="1" width="18" height="18" rx="4" ry="4" fill="none" stroke={color} strokeWidth="2" />
      {/* Dots based on value */}
      {dicePaths[value]}
    </svg>
  );
}

const buttonState = [
  { state: 1, text: 'Place Bet', color: 'rgba(221 231 238 / 0.08)' },
  { state: 2, text: 'Confirm Bet', color: '#0f1012' },
  { state: 3, text: 'Bet Confirmed', color: 'var(--mui-palette-success-main)' },
  { state: 4, text: 'No More Bets', color: 'var(--mui-palette-error-main)' },
];

export function DigitalWallet({ amount, color, data: dataRaw, currency, diff, trend, value }) {
  const chartHeight = 100;

  const data = dataRaw.map((item, index) => ({ name: index, value: item }));
  const [diceNumber, setDiceNumber] = React.useState([1, 2, 3, 6]);
  const [activeButton, setActiveButton] = React.useState({
    state: 1,
    text: 'Place Bet',
    color: 'rgba(221 231 238 / 0.08)',
  });

  const handleDiceClick = (index) => {
    const newDiceNumber = [...diceNumber];
    newDiceNumber[index] = newDiceNumber[index] >= 6 ? 1 : newDiceNumber[index] + 1;
    setDiceNumber(newDiceNumber);
  };

  const handleButtonState = (index) => {
    setActiveButton(buttonState[index >= 4 ? 0 : index]);
  };

  const blinkBorder = keyframes`
  0% { border-color: transparent; }
  50% { border-color: ${activeButton.color}; }
  100% { border-color: transparent; }
`;

  const blinkButton = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0.2; }
  100% { opacity: 1; }
`;

  return (
    <Card sx={{ width: '100%', height: '100%' }}>
      {/* Winners Scroll bar */}
      <Stack direction="row" spacing={3}>
        <ScrollingBar />
      </Stack>

      {/* Wallet Info */}
      <Stack direction="row" spacing={3} sx={{ alignItems: 'flex-start', pt: 2, px: 2 }}>
        <Stack spacing={1} direction="row" sx={{ flex: '1 1 auto' }}>
          <Card
            rounded="lg"
            sx={{
              display: 'flex',
              alignItems: 'center',
              borderColor: 'var(--mui-palette-success-main)',
              borderWidth: '1px',
              borderStyle: 'solid',
              py: 1,
              px: '2px',
            }}
          >
            <Stack
              spacing={1}
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ flex: '1 1 auto' }}
            >
              <Typography sx={{ color: 'var(--mui-palette-success-main)', fontSize: '0.75rem', pl: 1 }}>
                POT:{' '}
              </Typography>
              <Typography sx={{ fontSize: '0.75rem' }}>777$</Typography>
              <Box
                component="img"
                src={currencyIcons[currency]}
                sx={{ height: 'auto', flex: '0 0 auto', width: '25px' }}
              />
            </Stack>
          </Card>
          <Card
            rounded="lg"
            sx={{
              display: 'flex',
              alignItems: 'center',
              borderColor: 'var(--mui-palette-success-main)',
              borderWidth: '1px',
              borderStyle: 'solid',
              py: 1,
              px: '2px',
            }}
          >
            <Stack
              spacing={1}
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ flex: '1 1 auto' }}
            >
              <Typography sx={{ color: 'var(--mui-palette-success-main)', fontSize: '0.75rem', pl: 1 }}>
                PROGRESSIVE:{' '}
              </Typography>
              <Typography sx={{ fontSize: '0.75rem' }}>12,777$</Typography>
              <Box
                component="img"
                src={currencyIcons[currency]}
                sx={{ height: 'auto', flex: '0 0 auto', width: '25px' }}
              />
            </Stack>
          </Card>
        </Stack>
        <IconButton>
          <DotsThreeIcon weight="bold" />
        </IconButton>
      </Stack>

      {/* Chart */}
      <Box sx={{ pt: 3 }}>
        <NoSsr fallback={<Box sx={{ height: `${chartHeight}px` }} />}>
          <ResponsiveContainer height={chartHeight} width="100%">
            <AreaChart data={data} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id={`area-wallet-${currency}`} x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0" stopColor={color} stopOpacity={0.1} />
                  <stop offset="100%" stopColor={color} stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis axisLine={false} dataKey="name" hide type="category" />
              <YAxis axisLine={false} hide type="number" />
              <Area
                animationDuration={300}
                dataKey="value"
                fill={`url(#area-wallet-${currency})`}
                fillOpacity={1}
                name="Income"
                stroke={color}
                strokeWidth={2}
                type="monotone"
              />
            </AreaChart>
          </ResponsiveContainer>
        </NoSsr>
      </Box>

      {/* Dice Icons Row */}
      <Box
        sx={{
          m: 2,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          height: { xs: '70px', sm: '100px', md: '80px', lg: '100px' },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            gap: { xs: '8px', sm: '20px', lg: '10px' },
            height: '100%',
            width: '100%',
            maxWidth: '100%',
          }}
        >
          {[1, 2, 3, 4].map((key, index) => (
            <Card
              key={key}
              sx={{
                backgroundColor: 'transparent',
                boxShadow: 'none',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: { xs: '6px', sm: '10px' },
                userSelect: 'none',
                width: { xs: '70px', sm: '100px', md: '80px', lg: '100px', xl: '100px' },
                minWidth: { xs: '70px', sm: '100px', md: '80px', lg: '100px', xl: '100px' },
                height: { xs: '70px', sm: '100px', md: '80px', lg: '100px', xl: '100px' },
              }}
            >
              <Box
                sx={{
                  width: { xs: '80%', sm: '90%' },
                  height: { xs: '80%', sm: '90%' },
                  aspectRatio: '1',
                  color: index === 3 ? 'var(--mui-palette-error-main)' : '#f0f0f0',
                  cursor: 'pointer',
                }}
                onClick={() => handleDiceClick(index)}
              >
                <DiceIcon value={diceNumber[index]} color={index === 3 ? 'var(--mui-palette-error-main)' : undefined} />
              </Box>
            </Card>
          ))}
        </Box>
      </Box>

      {/* Currency and Trend Info */}
      <Stack direction="row" spacing={1} m={2} mt={4} sx={{ alignItems: 'center' }}>
        <Card
          sx={{
            p: 0.5,
            backgroundColor: 'transparent',
            boxShadow: 'none',
            borderRadius: '8px',
          }}
        >
          <Stack
            direction="column"
            spacing={0.25}
            sx={{
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1,
              backgroundColor: 'rgba(221 231 238 / 0.08)',
              px: 2.5,
              py: 0.5,
              borderRadius: '6px',
            }}
          >
            <Typography
              variant="body1"
              sx={{
                fontSize: '1.5rem',
                fontWeight: 300,
                lineHeight: 1,
                letterSpacing: '1px',
              }}
            >
              43
            </Typography>
            <Typography
              sx={{
                fontSize: '0.6rem',
                letterSpacing: '1px',
                fontWeight: 100,
                lineHeight: 1,
              }}
            >
              PLAYERS
            </Typography>
          </Stack>
        </Card>
        <Card
          sx={{
            p: 0.5,
            flex: 1,
            backgroundColor: 'transparent',
            boxShadow: 'none',
            borderRadius: '8px',
            border: activeButton.state >= 3 ? `1px solid ${activeButton.color}` : '',
            animation: activeButton.state >= 3 ? `${blinkBorder} 1.5s infinite` : 'none',
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Stack direction="row" sx={{ justifyContent: 'center', alignItems: 'center', flex: 1, gap: '2px' }}>
              <Typography
                sx={{
                  fontSize: '1.5rem',
                  color: activeButton.state === 4 ? activeButton.color : 'var(--mui-palette-success-main)',
                  fontWeight: 300,
                }}
              >
                $
              </Typography>
              <Typography
                sx={{
                  fontSize: '1.5rem',
                  color: activeButton.state === 4 ? activeButton.color : 'var(--mui-palette-success-main)',
                  fontWeight: 800,
                }}
              >
                10
              </Typography>
            </Stack>
            <Button
              disbaled
              sx={{
                p: 1,
                flex: 1,
                fontSize: '16px',
                textTransform: 'uppercase',
                backgroundColor: activeButton.color,
                '&:hover': { backgroundColor: activeButton.color },
                animation: activeButton.state >= 3 ? `${blinkButton} 1.5s infinite` : 'none',
              }}
              color="secondary"
              onClick={() => handleButtonState(activeButton.state)}
            >
              {activeButton.text}
            </Button>
          </Box>
        </Card>
      </Stack>

      <Stack direction="row" spacing={4} m={2} mt={4} sx={{ alignItems: 'center', display: 'flex', pr: 2 }}>
        <Stack direction="row" spacing={3} sx={{ justifyContent: 'start', alignItems: 'center', flex: 1 }}>
          <Typography variant="caption" sx={{ fontWeight: 200, letterSpacing: '1px' }}>
            Progressive
          </Typography>
          <Card
            sx={{
              py: 0.5,
              pl: 1,
              pr: 1.5,
              backgroundColor: 'transparent',
              boxShadow: 'none',
              borderRadius: '9999px',
              border: '1px solid var(--mui-palette-success-main)',
            }}
          >
            <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center' }}>
              <Card
                sx={{
                  height: '1.25rem',
                  width: '1.25rem',
                  backgroundColor: 'var(--mui-palette-success-main)',
                  boxShadow: 'none',
                  borderRadius: '1rem',
                }}
              />
              <Typography variant="body1">+.25</Typography>
            </Stack>
          </Card>
        </Stack>
        <Stack direction="row" flex={1} spacing={4} sx={{ alignItems: 'center', flex: 1, justifyContent: 'flex-end' }}>
          <Typography variant="caption" sx={{ fontWeight: 200, letterSpacing: '1px' }}>
            Auto Bet
          </Typography>
          <CustomSwitch />
        </Stack>
      </Stack>
    </Card>
  );
}
