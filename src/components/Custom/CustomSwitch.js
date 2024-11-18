import * as React from 'react';
import { Switch } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledSwitch = styled(Switch)(({ theme }) => ({
  width: 60,
  height: 34,
  padding: 0,
  display: 'flex',
  position: 'relative',
  '& .MuiSwitch-switchBase': {
    padding: 5,
    transform: 'translateX(2px)',
    '&.Mui-checked': {
      transform: 'translateX(26px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: 'var(--mui-palette-success-main)',
        opacity: 1,
      },
    },
  },
  '& .MuiSwitch-thumb': {
    width: 23,
    height: 23,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
  },
  '& .MuiSwitch-track': {
    borderRadius: '9999px',
    backgroundColor: '#bdbdbd',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));

export function CustomSwitch({ checked, onChange, ...props }) {
  return <StyledSwitch checked={checked} onChange={onChange} {...props} />;
}
