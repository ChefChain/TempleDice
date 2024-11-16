'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import { Bell as BellIcon } from '@phosphor-icons/react/dist/ssr/Bell';
import { List as ListIcon } from '@phosphor-icons/react/dist/ssr/List';
import { MagnifyingGlass as MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass';
import { useTranslation } from 'react-i18next';

import { useDialog } from '@/hooks/use-dialog';
import { usePopover } from '@/hooks/use-popover';

import { languageFlags, LanguagePopover } from '../language-popover';
import { MobileNav } from '../mobile-nav';
import { NotificationsPopover } from '../notifications-popover';
import { SearchDialog } from '../search-dialog';
import { UserPopover } from '../user-popover/user-popover';

export function MainNav({ items }) {
  const [openNav, setOpenNav] = React.useState(false);

  return (
    <React.Fragment>
      <Box
        component="header"
        sx={{
          '--MainNav-background': 'var(--mui-palette-background-default)',
          '--MainNav-divider': 'var(--mui-palette-divider)',
          bgcolor: 'var(--MainNav-background)',
          left: 0,
          position: 'sticky',
          pt: { lg: 'var(--Layout-gap)' },
          top: 0,
          width: '100%',
          zIndex: 'var(--MainNav-zIndex)',
        }}
      >
        <Box
          sx={{
            borderBottom: '1px solid #17191c',
            display: 'flex',
            flex: '1 1 auto',
            minHeight: 'var(--MainNav-height)',
            px: { xs: 2, lg: 3 },
            py: 1,
          }}
        >
          <Stack direction="row" spacing={2} sx={{ alignItems: 'center', flex: '1 1 auto' }}>
            <IconButton
              onClick={() => {
                setOpenNav(true);
              }}
              sx={{ display: { lg: 'none' } }}
            >
              <ListIcon />
            </IconButton>
            <SearchButton />
          </Stack>
          <Stack
            direction="row"
            spacing={2}
            sx={{ alignItems: 'center', flex: '1 1 auto', justifyContent: 'flex-end' }}
          >
            <NotificationsButton />
            <Divider
              flexItem
              orientation="vertical"
              sx={{ borderColor: 'var(--MainNav-divider)', display: { xs: 'none', lg: 'block' } }}
            />
            <LanguageSwitch />
            {/* <appkit-button /> */}
            {/* <MetaMaskButton /> */}
            <UserButton />
          </Stack>
        </Box>
      </Box>
      <MobileNav
        items={items}
        onClose={() => {
          setOpenNav(false);
        }}
        open={openNav}
      />
    </React.Fragment>
  );
}

function SearchButton() {
  const dialog = useDialog();

  return (
    <React.Fragment>
      <Tooltip title="Search">
        <IconButton onClick={dialog.handleOpen} sx={{ display: { xs: 'none', lg: 'inline-flex' } }}>
          <MagnifyingGlassIcon />
        </IconButton>
      </Tooltip>
      <SearchDialog onClose={dialog.handleClose} open={dialog.open} />
    </React.Fragment>
  );
}

function NotificationsButton() {
  const popover = usePopover();

  return (
    <React.Fragment>
      <Tooltip title="Notifications">
        <Badge
          color="error"
          sx={{ '& .MuiBadge-dot': { borderRadius: '50%', height: '10px', right: '6px', top: '6px', width: '10px' } }}
          variant="dot"
        >
          <IconButton onClick={popover.handleOpen} ref={popover.anchorRef}>
            <BellIcon />
          </IconButton>
        </Badge>
      </Tooltip>
      <NotificationsPopover anchorEl={popover.anchorRef.current} onClose={popover.handleClose} open={popover.open} />
    </React.Fragment>
  );
}

// function MetaMaskButton() {
//   const [walletAddress, setWalletAddress] = useState('');
//   const [depositAmount, setDepositAmount] = useState('');
//   const [withdrawAmount, setWithdrawAmount] = useState('');
//   const [transactionHash, setTransactionHash] = useState('');
//   const [connected, setConnected] = useState(false);

//   // Recipient address (your wallet or contract)
//   const recipientAddress = '0xYourRecipientAddress'; // Replace with your address
//   const contractAddress = '0xYourContractAddress'; // Replace with your contract address
//   const contractAbi = [
//     // Replace with your contract's ABI
//     'function withdraw(address payable _to, uint256 _amount) public',
//   ];

//   const handleConnect = async () => {
//     console.log('Connecting MetaMask...');
//     const address = await connectMetaMask();
//     if (address) {
//       setWalletAddress(address);
//       setConnected(true);
//     }
//   };

//   const handleDeposit = async () => {
//     if (!depositAmount) {
//       alert('Please enter an amount to deposit.');
//       return;
//     }
//     const txHash = await deposit(recipientAddress, depositAmount);
//     if (txHash) {
//       setTransactionHash(txHash);
//     }
//   };

//   const handleWithdraw = async () => {
//     if (!withdrawAmount) {
//       alert('Please enter an amount to withdraw.');
//       return;
//     }
//     const txHash = await withdraw(contractAddress, contractAbi, withdrawAmount);
//     if (txHash) {
//       setTransactionHash(txHash);
//     }
//   };

//   return (
//     <Box
//         sx={{
//           backgroundColor: 'background.paper',
//           borderRadius: 1,
//           boxShadow: 1,
//           p: 3,
//         }}
//       >
//         <Typography variant="h5" sx={{ mb: 2 }}>
//           Wallet Integration
//         </Typography>

//         {!connected ? (
//           <Button variant="contained" onClick={handleConnect}>
//             Connect MetaMask
//           </Button>
//         ) : (
//           <Typography variant="body1">Connected Wallet: {walletAddress}</Typography>
//         )}

//         {/* Deposit Section */}
//         <Box sx={{ mt: 3 }}>
//           <Typography variant="h6">Deposit</Typography>
//           <TextField
//             label="Amount in ETH"
//             variant="outlined"
//             value={depositAmount}
//             onChange={(e) => setDepositAmount(e.target.value)}
//             sx={{ mt: 1 }}
//           />
//           <Button variant="contained" onClick={handleDeposit} sx={{ mt: 1 }}>
//             Deposit
//           </Button>
//         </Box>

//         {/* Withdraw Section */}
//         <Box sx={{ mt: 3 }}>
//           <Typography variant="h6">Withdraw</Typography>
//           <TextField
//             label="Amount in ETH"
//             variant="outlined"
//             value={withdrawAmount}
//             onChange={(e) => setWithdrawAmount(e.target.value)}
//             sx={{ mt: 1 }}
//           />
//           <Button variant="contained" onClick={handleWithdraw} sx={{ mt: 1 }}>
//             Withdraw
//           </Button>
//         </Box>

//         {/* Transaction Hash */}
//         {transactionHash && (
//           <Typography variant="body2" sx={{ mt: 2 }}>
//             Transaction Hash: {transactionHash}
//           </Typography>
//         )}
//       </Box>
//   )
// }

function LanguageSwitch() {
  const { i18n } = useTranslation();
  const popover = usePopover();
  const language = i18n.language || 'en';
  const flag = languageFlags[language];

  return (
    <React.Fragment>
      <Tooltip title="Language">
        <IconButton
          onClick={popover.handleOpen}
          ref={popover.anchorRef}
          sx={{ display: { xs: 'none', lg: 'inline-flex' } }}
        >
          <Box sx={{ height: '24px', width: '24px' }}>
            <Box alt={language} component="img" src={flag} sx={{ height: 'auto', width: '100%' }} />
          </Box>
        </IconButton>
      </Tooltip>
      <LanguagePopover anchorEl={popover.anchorRef.current} onClose={popover.handleClose} open={popover.open} />
    </React.Fragment>
  );
}

const user = {
  id: 'USR-000',
  name: 'Sofia Rivers',
  avatar: 'avatar',
  email: 'sofia@devias.io',
};

function UserButton() {
  const popover = usePopover();

  return (
    <React.Fragment>
      <Box
        component="button"
        onClick={popover.handleOpen}
        ref={popover.anchorRef}
        sx={{ border: 'none', background: 'transparent', cursor: 'pointer', p: 0 }}
      >
        <Badge
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          color="success"
          sx={{
            '& .MuiBadge-dot': {
              border: '2px solid var(--MainNav-background)',
              borderRadius: '50%',
              bottom: '6px',
              height: '12px',
              right: '6px',
              width: '12px',
            },
          }}
          variant="dot"
        >
          <Avatar src={user.avatar} />
        </Badge>
      </Box>
      <UserPopover anchorEl={popover.anchorRef.current} onClose={popover.handleClose} open={popover.open} />
    </React.Fragment>
  );
}
