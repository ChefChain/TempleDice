import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export function SplitLayout({ children }) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', lg: '1fr 800px' },
        minHeight: '100%',
      }}
    >
      <Box
        sx={{
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'var(--mui-palette-background-level1)',
          display: { xs: 'none', lg: 'flex' },
          flexDirection: 'column',
          p: 3,
        }}
      >
        <Stack spacing={4} sx={{ maxWidth: '700px' }}>
          <Stack spacing={1}>
            <Typography variant="h4">Hello!</Typography>
            <Typography color="text.secondary">
              Welcome to the jungle with ready-to-use MUI components developed with one common goal in
              mind: help you build faster & beautiful applications.
            </Typography>
          </Stack>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              mt: 4,
            }}
          >
            <a href="/">
              <img
                alt="LiveWager Logo"
                src="/assets/livewager.svg"
                style={{ maxWidth: '100%', height: 'auto' }}
              />
            </a>
          </Box>
        </Stack>
      </Box>
      <Box
        sx={{
          boxShadow: 'var(--mui-shadows-8)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
            flex: '1 1 auto',
            justifyContent: 'center',
            p: 3,
          }}
        >
          <Box sx={{ maxWidth: '420px', width: '100%' }}>{children}</Box>
        </Box>
      </Box>
    </Box>
  );
}

