import React, {useState} from 'react'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import useStyles from './../styles/navbar.style'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MailIcon from '@material-ui/icons/Mail';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
// import SearchIcon from '@material-ui/icons/Search';
// import InputBase from '@material-ui/core/InputBase';
import MoreIcon from '@material-ui/icons/MoreVert';
// import {Link, NavLink} from 'react-router-dom'
import AdapterLink from './LinkTalkit.js';

const Navbar = (props) => {
  // * Css
  const classes = useStyles();
  const menuId = 'primary-search-account-menu';
  // * States
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);  
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  // * Hanlders 
  const  handleProfileMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const  handleMobileMenuClose = () => setMobileMoreAnchorEl(null);
  const  handleMenuClose = () => setAnchorEl(null);
  const  handleMobileMenuOpen = (event) => setMobileMoreAnchorEl(event.currentTarget);
  // * Menú element Web
  const renderMenu = ( 
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}>
      <MenuItem onClick={handleMenuClose} component={AdapterLink} to="/dashboard/profile">Profile</MenuItem>
      {props.isTeacher && <MenuItem onClick={handleMenuClose} component={AdapterLink} to="/dashboard/">DashBoard</MenuItem>}
      <MenuItem onClick={handleMenuClose} component={AdapterLink} to="/">Log out</MenuItem>
    </Menu>
  );
  // * Menú element Mobil
  const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}>
        <MenuItem>
          <IconButton aria-label="Show 4 new mails" color="inherit">
            <Badge badgeContent={4} color="secondary">
              <MailIcon />
            </Badge>
          </IconButton>
          <p>Messages</p>
        </MenuItem>
        <MenuItem>
          <IconButton aria-label="Show 11 new notifications" color="inherit">
            <Badge badgeContent={11} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <p>Notifications</p>
        </MenuItem>
        <MenuItem onClick={handleProfileMenuOpen}>
          <IconButton
            aria-label="Account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit">
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      </Menu>
    );

return (
    <React.Fragment>
        <Toolbar className={classes.toolbar}>
          <IconButton edge="start" color="inherit" aria-label="Open drawer" onClick={props.handle}
            className={props.classes} >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={props.titleClass}>
            {props.title}
          </Typography>

          <div className={classes.grow} />
          {/* //* Section Desktop */}
          <div className={classes.sectionDesktop}>
            <IconButton aria-label="Show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="secondary">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton aria-label="Show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="Account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"  >
              <AccountCircle />
            </IconButton>
          </div>
          {/* //* Section Mobile */}
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="Show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit" >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      {renderMobileMenu}
      {renderMenu}
    </React.Fragment>
  );
}

export default Navbar