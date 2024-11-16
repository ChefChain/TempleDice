'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import { useColorScheme } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import { GearSix as GearSixIcon } from '@phosphor-icons/react/dist/ssr/GearSix';

import { setSettings as setPersistedSettings } from '@/lib/settings/set-settings';
import { useSettings } from '@/hooks/use-settings';

import { SettingsDrawer } from './settings-drawer';
import { useAppKit } from '@reown/appkit/react';
import { Wallet } from '@phosphor-icons/react/dist/ssr';
import Image from 'next/image';


export function SettingsButton() {
  const { settings } = useSettings();
  const { mode, setMode } = useColorScheme();
  const router = useRouter();
  const { open, close } = useAppKit();

  const [openDrawer, setOpenDrawer] = React.useState(false);

  const handleUpdate = async (values) => {
    const { mode: newMode, ...other } = values;

    if (newMode) {
      setMode(newMode);
    }

    const updatedSettings = { ...settings, ...other };

    await setPersistedSettings(updatedSettings);

    // Refresh the router to apply the new settings.
    router.refresh();
  };

  const handleReset = async () => {
    setMode(null);

    await setPersistedSettings({});

    // Refresh the router to apply the new settings.
    router.refresh();
  };

  return (
    <React.Fragment>
      <Tooltip title="Wallet Connection">
        <Box
          component="button"
          onClick={() => {
            open();
          }}
          sx={{
            border: 'none',
            borderRadius: '50%',
            bottom: 0,
            cursor: 'pointer',
            display: 'inline-flex',
            m: 4,
            p: '10px',
            position: 'fixed',
            right: 0,
            zIndex: 'var(--mui-zIndex-speedDial)',
          }}
        >
          <Image src="/wallet.png" width={40} height={40} alt="wallet" />
        </Box>
      </Tooltip>
      <SettingsDrawer
        onClose={() => {
          setOpenDrawer(false);
        }}
        onReset={handleReset}
        onUpdate={handleUpdate}
        open={openDrawer}
        values={{ ...settings, mode }}
      />
    </React.Fragment>
  );
}
