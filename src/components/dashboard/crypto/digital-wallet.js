'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { DotsThree as DotsThreeIcon } from '@phosphor-icons/react/dist/ssr/DotsThree';
import { TrendDown as TrendDownIcon } from '@phosphor-icons/react/dist/ssr/TrendDown';
import { TrendUp as TrendUpIcon } from '@phosphor-icons/react/dist/ssr/TrendUp';
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

import { NoSsr } from '@/components/core/no-ssr';

const currencyIcons = {
  BTC: '/assets/logo-btc.svg',
  ETH: '/assets/logo-eth.svg',
  BNB: '/assets/logo-bnb.svg',
};

// SVG paths for dice faces 1 to 4 with rounded corners and thicker lines
const dicePaths = {
  1: (
    <circle cx="10" cy="10" r="2" fill="currentColor" />
  ),
  2: (
    <>
      <circle cx="6" cy="6" r="2" fill="currentColor" />
      <circle cx="14" cy="14" r="2" fill="currentColor" />
    </>
  ),
  3: (
    <>
      <circle cx="5" cy="5" r="2" fill="currentColor" />
      <circle cx="10" cy="10" r="2" fill="currentColor" />
      <circle cx="15" cy="15" r="2" fill="currentColor" />
    </>
  ),
  4: (
    <>
      <circle cx="6" cy="6" r="2" fill="currentColor" />
      <circle cx="14" cy="6" r="2" fill="currentColor" />
      <circle cx="6" cy="14" r="2" fill="currentColor" />
      <circle cx="14" cy="14" r="2" fill="currentColor" />
    </>
  ),
};

// DiceIcon component that accepts a value prop
const DiceIcon = ({ value, color = 'currentColor' }) => (
  <svg
    width='100%'
    height='100%'
    viewBox='0 0 20 20'
    xmlns='http://www.w3.org/2000/svg'
  >
    {/* Dice background with rounded corners and thicker stroke */}
    <rect x='1' y='1' width='18' height='18' rx='4' ry='4' fill='none' stroke={color} strokeWidth='2' />
    {/* Dots based on value */}
    {dicePaths[value]}
  </svg>
);

export function DigitalWallet({ amount, color, data: dataRaw, currency, diff, trend, value }) {
  const chartHeight = 100;

  const data = dataRaw.map((item, index) => ({ name: index, value: item }));

  return (
    <Card>
      {/* Wallet Info */}
      <Stack direction='row' spacing={3} sx={{ alignItems: 'flex-start', pt: 2, px: 2 }}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography color='text.secondary' variant='h6'>
            <Typography color='text.primary' component='span' variant='inherit'>
              {amount}
            </Typography>{' '}
            {currency}
          </Typography>
          <Typography color='text.secondary' variant='body2'>
            {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)}
          </Typography>
        </Stack>
        <IconButton>
          <DotsThreeIcon weight='bold' />
        </IconButton>
      </Stack>

      {/* Chart */}
      <Box sx={{ pt: 3 }}>
        <NoSsr fallback={<Box sx={{ height: `${chartHeight}px` }} />}>
          <ResponsiveContainer height={chartHeight} width='100%'>
            <AreaChart data={data} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id={`area-wallet-${currency}`} x1='0' x2='0' y1='0' y2='1'>
                  <stop offset='0' stopColor={color} stopOpacity={0.1} />
                  <stop offset='100%' stopColor={color} stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis axisLine={false} dataKey='name' hide type='category' />
              <YAxis axisLine={false} hide type='number' />
              <Area
                animationDuration={300}
                dataKey='value'
                fill={`url(#area-wallet-${currency})`}
                fillOpacity={1}
                name='Income'
                stroke={color}
                strokeWidth={2}
                type='monotone'
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
          justifyContent: 'space-between',
          gap: '8px', // Reduced gap between dice boxes (50% smaller)
        }}
      >
        {[1, 2, 3, 4].map((value, index) => (
          <Card
            key={value}
            sx={{
              backgroundColor: 'transparent', // Transparent background
              boxShadow: 'none', // Remove any shadow
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '8px', // Reduced padding (50% smaller)
              flexBasis: 'calc(25% - 8px)', // Ensure four cards fit in one row with spacing
            }}
          >
            <Box
              sx={{
                width: '100%',
                aspectRatio: '1', // Maintain square aspect ratio for dice icons
                color: index === 3 ? 'red' : '#f0f0f0', // Make the fourth dice red
              }}
            >
              <DiceIcon value={value} color={index === 3 ? 'red' : undefined} />
            </Box>
          </Card>
        ))}
      </Box>

      {/* Currency and Trend Info */}
      <Box sx={{ pb: 2, px: 2 }}>
        <Stack direction='row' spacing={2} sx={{ alignItems: 'center' }}>
          <Box component='img' src={currencyIcons[currency]} sx={{ height: 'auto', flex: '0 0 auto', width: '40px' }} />
          <div>
            <Typography variant='subtitle2'>{currency}/USD</Typography>
            <Stack
              direction='row'
              spacing={0.5}
              sx={{
                alignItems: 'center',
                color:
                  trend === 'up'
                    ? 'var(--mui-palette-success-main)'
                    : 'var(--mui-palette-error-main)',
              }}
            >
              {trend === 'up' ? (
                <TrendUpIcon fontSize='var(--icon-fontSize-md)' />
              ) : (
                <TrendDownIcon fontSize='var(--icon-fontSize-md)' />
              )}
              <Typography color='inherit' variant='body2'>
                {new Intl.NumberFormat('en-US', {
                  style: 'percent',
                  maximumFractionDigits: 2,
                }).format(diff / 100)}
              </Typography>
            </Stack>
          </div>
        </Stack>
      </Box>
    </Card>
  );
}