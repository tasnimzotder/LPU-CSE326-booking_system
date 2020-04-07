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
  Link,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: 60,
  },
  appbar_root: {
    backgroundColor: '#252e39',
    // background: '#0052D4',
    // background: '-webkit-linear-gradient(to right, #6FB1FC, #4364F7, #0052D4)',
    // background: 'linear-gradient(to right, #6FB1FC, #4364F7, #0052D4)'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  link_home: {
    marginRight: 16,
    color: 'red',
  },
  link_btn: {
    marginLeft: 20,
  },
}));

function AdminHeader() {
  const classes = useStyles();
  const [auth, setAuth] = React.useState(true);
  const [anchorE1, setAnchorE1] = React.useState(null);
  const open = Boolean(anchorE1);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
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
            {/* <IconButton
              edge='start'
              className={classes.menuButton}
              color='inherit'
              aria-label='menu'
            >
              <MenuIcon />
            </IconButton> */}
            <Typography variant='h5' style={{ marginRight: 20 }}>
              <Link href='/' className={classes.link_home}>
                Book Auditorium
              </Link>
            </Typography>
            <Typography variant='h4' style={{ marginRight: 20 }}>
              |
            </Typography>
            <Typography variant='button' className={classes.title}>
              {/* Home */}
              <Link href='/admin' color='inherit'>
                Profile
              </Link>
              {/* <Link
                className={classes.link_btn}
                href='admin/new-audi'
                color='inherit'
              >
                New Audi
              </Link> */}
              <Link
                className={classes.link_btn}
                href='/admin/contacts'
                color='inherit'
              >
                Contacts
              </Link>
              <Link
                className={classes.link_btn}
                href='/admin/bookings'
                color='inherit'
              >
                Bookings
              </Link>
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
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem>
                    <Link href='/admin'>
                      <Typography variant='button'>Admin</Typography>
                    </Link>
                  </MenuItem>
                  {/* <MenuItem onClick={handleClose}>Account</MenuItem> */}
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </FormGroup>
    </div>
  );
}

export default AdminHeader;
