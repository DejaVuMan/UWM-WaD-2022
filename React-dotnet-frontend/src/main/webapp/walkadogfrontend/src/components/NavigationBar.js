import * as React from "react";
import { useDispatch, useSelector} from "react-redux";
import {Link} from 'react-router-dom';
import {logoutUser} from "../services/index";

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
import AdbIcon from '@mui/icons-material/Adb';
import '../assets/css/Style.css';
const NavigationBar = () => {

    const [anchorElNav, setAnchorElNav] = React.useState(null);
     const [anchorElUser, setAnchorElUser] = React.useState(null);

    const auth = useSelector((state) => state.auth)
    const dispatch = useDispatch();
    //const { setAuth, user } = useAuth();

    const logout = () => {
        //setAuth(false);
        console.log("Logged out.")
        dispatch(logoutUser())
    }

    const authedUserItems = {'Show Dogs':"/dogs", 'List Trainers':"/users/trainers"};
    const authedTrainerItems = {'List Users':"users", 'Add Reservations':"/reservations/add"}; // Show Current Reservations?

    const authedSettings = {'Profile':"/edit/"+ localStorage.getItem('loggedId'), 'Account':"#", 'Logout':"/logout"};

    const unAuthedItems = {'Login':"login"};
    const unAuthedSettings = {'Login':"login"};

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    }
    
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const renderUserTrainerButtons = () => {
      if(auth.isLoggedIn)
      {
        if(auth.isTrainer)
        {
          return(
            Object.entries(authedTrainerItems).map(([idx, value]) => (
              <Link to={value} key={idx}>
                  <Button
                      onClick={handleCloseNavMenu}
                      sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                      {idx}
                  </Button>
              </Link>
          ))
          )
        }
        return(
          Object.entries(authedUserItems).map(([idx, value]) => (
            <Link to={value} key={idx}>
                <Button
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                >
                    {idx}
                </Button>
            </Link>
        ))
        )
      }
      return(
        Object.entries(unAuthedItems).map(([idx, value]) => (
          <Link to={value} key={idx}>
              <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
              >
                  {idx}
              </Button>
          </Link>
      ))
      )
    }

    console.log("Logging Auth value(s) from NavBar")
    console.log(auth)

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
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
            Walk-A-Dog
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
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {Object.entries(auth.isLoggedIn ? authedUserItems : unAuthedItems).map(([idx, value]) => (
                <Link to={value} key={idx}>
                  <MenuItem key={idx} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{idx}</Typography>
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
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
            Walk-A-Dog
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}> 
            {renderUserTrainerButtons()}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open authedSettings">
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
              {Object.entries(auth.isLoggedIn ? authedSettings : unAuthedSettings).map(([idx, value]) => (
                <Link to={value} key={idx}>
                    <MenuItem onClick={value === '/logout' ? logout : handleCloseUserMenu}>
                    <Typography textAlign="center">{idx}</Typography>
                    </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavigationBar;
