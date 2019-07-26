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

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import DeleteIcon from '@material-ui/icons/Delete';

import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

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
  },
  appBar: {
  }
});

const getPageTitle = (pathname) => {
  if (pathname === '/') {
    return "My Storage"
  } else if (pathname === '/share') {
    return "Calendar"
  } else if (pathname === '/history') {
    return "Projects"
  } else if (pathname.startsWith('/links/')) {
    return "View Shared Link As"
  }

  return "xxxxx";
}

class Header extends React.Component  {

  constructor(props) {
      super(props)

      this.state = {
          anchorEl: null
      }
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  render() {
    const { classes, location } = this.props;
    return (
      <AppBar className={classes.appBar} position="fixed">
        <Toolbar disableGutters={true} classes={{ root: classes.toolbarRoot }}>
          <a href='/'>
            <img src="/static/favicon.png" style={{marginRight: '10px', marginLeft: '10px', height:'40px'}}/>
          </a>
            <Typography
              variant="h6"
              color="inherit"
              noWrap
              className={classes.title}
            >
              {getPageTitle(location.pathname)}
            </Typography>

          {/* <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton> */}
          <div>
            <IconButton onClick={this.handleClick} color="inherit">
              <PersonIcon />
            </IconButton>
            <Menu
                id="long-menu"
                anchorEl={this.state.anchorEl}
                open={this.state.anchorEl ? true : false}
                onClose={() => this.setState({anchorEl: null})}
            >
                <MenuItem onClick={this.props.logout}>
                    <ListItemIcon>
                        <DeleteIcon />
                    </ListItemIcon>
                    <ListItemText inset primary="Sign out" />
                </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(styles)(withRouter(Header));
