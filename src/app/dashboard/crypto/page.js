import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';

import { config } from '@/config';
import { dayjs } from '@/lib/dayjs';
import { AccountUpgrade } from '@/components/dashboard/crypto/account-upgrade';
import { CreditCard } from '@/components/dashboard/crypto/credit-card';
import { CurrencyConverter } from '@/components/dashboard/crypto/currency-converter';
import { CurrentBalance } from '@/components/dashboard/crypto/current-balance';
import { DigitalWallet } from '@/components/dashboard/crypto/digital-wallet';
import { Transactions } from '@/components/dashboard/crypto/transactions';

export const metadata = { title: `Crypto | Dashboard | ${config.site.name}` };

export default function Page() {
  return (
    <Box
      sx={{
        maxWidth: 'var(--Content-maxWidth)',
        m: 'var(--Content-margin)',
        p: 'var(--Content-padding)',
        width: 'var(--Content-width)',
      }}
    >
      <Stack spacing={4}>
        {/* Added player at the top */}
        <Box
          sx={{
            backgroundColor: 'background.paper',
            borderRadius: 1,
            boxShadow: 1,
            p: 2,
          }}
        >
          {/* The iframe container */}
          <Box sx={{ width: '100%' }}>
            <Box
              sx={{
                position: 'relative',
                paddingTop: '56.25%', // 16:9 Aspect Ratio
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
        </Box>

        <Grid container spacing={4}>
          <Grid size={{sm:12, md:5}}>
            <Box
              sx={{
                display: 'grid',
                gap: 3,
                gridTemplateColumns: '1fr', // Make all components 100% width
                height: '375px', // Set a minimum height for flexibility
              }}
            >
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
            </Box>
          </Grid>

          <Grid size={{xs:12, sm:12, md:7}}>
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
          <Grid size={12}>
            <Box
              sx={{
                display: 'grid',
                gap: 3,
                gridTemplateColumns: '1fr', // Make all components 100% width
                height: '350px', // Set a minimum height for flexibility
              }}
            >
              <AccountUpgrade />
            </Box>
          </Grid>
        </Grid>
      </Stack>
    </Box>
  );
}
