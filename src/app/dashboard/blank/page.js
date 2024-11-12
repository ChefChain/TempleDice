import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';


import { config } from '@/config';
import { dayjs } from '@/lib/dayjs';
import { DigitalWallet } from '@/components/dashboard/crypto/digital-wallet';
import { Transactions } from '@/components/dashboard/crypto/transactions';

export default function Page() {
  // SVG paths for dice faces 1 to 4
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
      width="100%"
      height="100%"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Dice background */}
      <rect x="0" y="0" width="20" height="20" rx="3" ry="3" fill="none" stroke={color} strokeWidth="1" />
      {/* Dots based on value */}
      {dicePaths[value]}
    </svg>
  );

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#1a1a1a',
      }}
    >
      {/* The iframe container */}
      <Box sx={{ width: '100%' }}>
        <Box
          sx={{
            position: 'relative',
            paddingTop: '56.25%',
          }}
        >
          <iframe
            src="https://viewer.millicast.com?streamId=eFxcvk/myStreamName"
            allowFullScreen
            style={{
              border: 'none',
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
            }}
          ></iframe>
        </Box>
      </Box>

      <Grid
            size={{
              md: 8,
              xs: 12,
            }}
          >
            <Transactions
              transactions={[
                {
                  id: 'TX-003',
                  description: 'Buy BTC',
                  type: 'add',
                  balance: 643,
                  currency: 'BTC',
                  amount: 0.2105,
                  createdAt: dayjs().subtract(2, 'day').subtract(1, 'hour').subtract(32, 'minute').toDate(),
                },
                {
                  id: 'TX-002',
                  description: 'Buy BTC',
                  type: 'add',
                  balance: 2344,
                  currency: 'BTC',
                  amount: 0.1337,
                  createdAt: dayjs().subtract(3, 'day').subtract(1, 'hour').subtract(43, 'minute').toDate(),
                },
                {
                  id: 'TX-001',
                  description: 'Sell BTC',
                  type: 'sub',
                  balance: 4805,
                  currency: 'BTC',
                  amount: 0.2105,
                  createdAt: dayjs().subtract(6, 'day').subtract(1, 'hour').subtract(32, 'minute').toDate(),
                },
              ]}
            />
          </Grid>

      <DigitalWallet
                amount={0.7568}
                color="var(--mui-palette-primary-main)"
                currency="BTC"
                data={[
                  56, 61, 64, 60, 63, 61, 60, 68, 66, 64, 77, 60, 65, 51, 72, 80, 74, 67, 77, 83, 94, 95, 89, 100, 94,
                  104, 101, 105, 104, 103, 107, 120,
                ]}
                diff={34.1}
                trend="up"
                value={16213.2}
              />

      {/* Row of Cards with Dice Icons */}
      <Box
        sx={{
          m: 2,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          flexWrap: 'nowrap',
          overflowX: 'auto',
        }}
      >
        {[1, 2, 3, 4].map((value, index) => (
          <Card
            key={value}
            sx={{
              backgroundColor: '#2e2e2e',
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              p: '11px',
              flex: '1 1 auto',
              mx: 1,
              minWidth: '60px',
              maxWidth: '120px',
            }}
          >
            <Box
              sx={{
                width: '100%',
                aspectRatio: '1',
                color: index === 3 ? 'red' : '#f0f0f0', // Make the 4th dice red
              }}
            >
              <DiceIcon value={value} color={index === 3 ? 'red' : 'currentColor'} />
            </Box>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
