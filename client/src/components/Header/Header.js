import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/Notifications";
import PersonIcon from "@material-ui/icons/Person";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from 'react-router'

const styles = theme => ({
  toolbarRoot: {
    paddingRight: 24
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36
  },
  title: {
    flexGrow: 1
  }
});

const getPageTitle = (pathname) => {
  if (pathname === '/') {
    return "Profile"
  } else if (pathname === '/share') {
    return "Linked Applications"
  } else if (pathname === '/history') {
    return "History"
  } else if (pathname.startsWith('/links/')) {
    return "View Shared Link As"
  }

  return "xxxxx";
}

const Header = props => {
  const { classes, location } = props;
  return (
    <AppBar position="fixed">
      <Toolbar disableGutters={true} classes={{ root: classes.toolbarRoot }}>
          <img src="/static/favicon.png" style={{marginRight: '10px', marginLeft: '10px', height:'40px'}}/>
        <Typography
          variant="title"
          color="inherit"
          noWrap
          className={classes.title}
        >
          {getPageTitle(location.pathname)}
        </Typography>
        <IconButton color="inherit">
          <Badge badgeContent={4} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <IconButton onClick={props.logout} color="inherit">
          <PersonIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default withStyles(styles)(withRouter(Header));
