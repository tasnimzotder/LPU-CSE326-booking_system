import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Switch,
  FormControlLabel,
  FormGroup,
  MenuItem,
  Menu,
  Link
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  appbar_root: {
    background: '#0052D4',
    background: '-webkit-linear-gradient(to right, #6FB1FC, #4364F7, #0052D4)',
    background: 'linear-gradient(to right, #6FB1FC, #4364F7, #0052D4)'
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

function Header() {
  const classes = useStyles();
  const [auth, setAuth] = React.useState(true);
  const [anchorE1, setAnchorE1] = React.useState(null);
  const open = Boolean(anchorE1);

  const handleChange = event => {
    setAuth(event.target.checked);
  };

  const handleMenu = event => {
    setAnchorE1(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorE1(null);
  };

  return (
    <div className={classes.root}>
      {/* <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={auth}
              onChange={handleChange}
              aria-label='login switch'
            />
          }
          label={auth ? 'Logout' : 'Login'}
        />
      </FormGroup> */}
      <FormGroup>
        <AppBar className={classes.appbar_root} position='fixed'>
          <Toolbar>
            <IconButton
              edge='start'
              className={classes.menuButton}
              color='inherit'
              aria-label='menu'
            >
              <MenuIcon />
            </IconButton>
            <Typography variant='h6' className={classes.title}>
              {/* Home */}
              <Link href="/" color='inherit' >Home</Link>
            </Typography>
            {auth && (
              <div>
                <IconButton
                  aria-label='account of current user'
                  aria-controls='menu-appbar'
                  aria-haspopup='true'
                  onClick={handleMenu}
                  color='inherit'
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id='menu-appbar'
                  anchorEl={anchorE1}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                  <MenuItem onClick={handleClose}>Account</MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </FormGroup>
    </div>
  );
}

export default Header;
