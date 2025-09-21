// import React, { useState } from 'react';
// import { Link as RouterLink } from 'react-router-dom';
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   Button,
//   Box,
//   IconButton,
//   Menu,
//   MenuItem,
//   Stack,
// } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';

// // This is a new component for the responsive navigation bar
// const ResponsiveAppBar = ({ isAuthenticated, username, handleLogout }) => {
//   const [anchorElNav, setAnchorElNav] = useState(null);

//   const handleOpenNavMenu = (event) => {
//     setAnchorElNav(event.currentTarget);
//   };

//   const handleCloseNavMenu = () => {
//     setAnchorElNav(null);
//   };

//   return (
//     <AppBar position="static" sx={{ background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)', boxShadow: 'none' }}>
//       <Toolbar>
//         {/* Mobile menu icon and logo */}
//         <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
//           <IconButton
//             size="large"
//             aria-label="menu"
//             aria-controls="menu-appbar"
//             aria-haspopup="true"
//             onClick={handleOpenNavMenu}
//             color="inherit"
//           >
//             <MenuIcon />
//           </IconButton>
//           <Menu
//             id="menu-appbar"
//             anchorEl={anchorElNav}
//             anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
//             keepMounted
//             transformOrigin={{ vertical: 'top', horizontal: 'left' }}
//             open={Boolean(anchorElNav)}
//             onClose={handleCloseNavMenu}
//             sx={{ display: { xs: 'block', md: 'none' } }}
//           >
//             {isAuthenticated ? (
//               [
//                 <MenuItem key="username">
//                   <Typography textAlign="center">Welcome, {username}!</Typography>
//                 </MenuItem>,
//                 <MenuItem key="logout" onClick={handleLogout}>
//                   <Typography textAlign="center">Logout</Typography>
//                 </MenuItem>
//               ]
//             ) : (
//               [
//                 <MenuItem key="login" component={RouterLink} to="/login" onClick={handleCloseNavMenu}>
//                   <Typography textAlign="center">Login</Typography>
//                 </MenuItem>,
//                 <MenuItem key="signup" component={RouterLink} to="/signup" onClick={handleCloseNavMenu}>
//                   <Typography textAlign="center">Sign Up</Typography>
//                 </MenuItem>
//               ]
//             )}
//           </Menu>
//         </Box>

//         {/* Desktop and Mobile Logo */}
//         <Typography
//           variant="h5"
//           noWrap
//           component={RouterLink}
//           to="/"
//           sx={{
//             mr: 2,
//             display: { xs: 'flex', md: 'flex' },
//             flexGrow: { xs: 1, md: 0 },
//             fontWeight: 'bold',
//             color: 'inherit',
//             textDecoration: 'none',
//           }}
//         >
//           NorseAI
//         </Typography>

//         {/* Desktop links/buttons */}
//         <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }} />
//         <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
//           {isAuthenticated ? (
//             <Stack direction="row" spacing={2} alignItems="center">
//               <AccountCircleIcon sx={{ fontSize: 30 }} />
//               <Typography variant="subtitle1">Welcome, {username}!</Typography>
//               <Button color="inherit" onClick={handleLogout} sx={{ border: '2px solid', '&:hover': { bgcolor: 'white', color: '#667eea' } }}>
//                 Logout
//               </Button>
//             </Stack>
//           ) : (
//             <Stack direction="row" spacing={2}>
//               <Button component={RouterLink} to="/login" color="inherit" sx={{ border: '2px solid', '&:hover': { bgcolor: 'white', color: '#667eea' } }}>
//                 Login
//               </Button>
//               <Button component={RouterLink} to="/signup" sx={{ bgcolor: 'white', color: '#667eea', '&:hover': { bgcolor: '#f0f0f0' } }}>
//                 Sign Up
//               </Button>
//             </Stack>
//           )}
//         </Box>
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default ResponsiveAppBar;

import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Logo from '../common/Logo';

const pages = ['Home'];
const settings = ['Profile', 'Account', 'Home', 'Admin','Logout'];

function ResponsiveAppBar() {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (page) => {
    setAnchorElNav(null);
    if (page === 'Home') {
      navigate('/dashboard');
    }
    // if (page === 'Assessment') {
    //   navigate('/assessment');
    // }
  };

  const handleCloseUserMenu = (setting) => {
    setAnchorElUser(null);
    if (setting === 'Profile') {
      navigate('/profile');
    }
    if (setting === 'Account') {
      navigate('/account');
    }
    if (setting === 'Home') {
      navigate('/dashboard');
    }
    if (setting === 'Admin') {
      navigate('/admin');
    }
    if (setting === 'Logout') {
      navigate('/logout');
    }
  };

  return (
    <AppBar position="sticky" sx={{ top: 0, zIndex: 1100 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}>
            <Logo />
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={() => handleCloseNavMenu(page)}>
                  <Typography sx={{ textAlign: 'center' }}>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}>
            <Logo />
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => handleCloseNavMenu(page)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={() => handleCloseUserMenu(setting)}>
                  <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;