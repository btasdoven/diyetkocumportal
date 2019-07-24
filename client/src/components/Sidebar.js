import React from "react";
import classNames from "classnames";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import SettingsIcon from "@material-ui/icons/Settings";
import HistoryIcon from "@material-ui/icons/History";
import PeopleIcon from "@material-ui/icons/People";
import AppsIcon from "@material-ui/icons/Apps";
import StoreIcon from "@material-ui/icons/Store";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from '@material-ui/core/MenuItem';

import { withRouter } from 'react-router'

import Tooltip from '@material-ui/core/Tooltip';

const drawerWidth = 240;

const styles = theme => ({
  drawerPaper: {
    position: "fixed",
    top: theme.spacing.unit * 8,
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing.unit * 7
  }
});

const Sidebar = props => {
  const { open, classes, location } = props;

  console.log('Sidebar')
  console.log(location);
  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: classNames(
          classes.drawerPaper,
          !open && classes.drawerPaperClose
        )
      }}
      open={open}
    >
      <List>
        <Link to="/">
          <Tooltip title="Dashboard" placement="right">
            <ListItem button selected={location.pathname === '/'}>
              <ListItemIcon>
                  <StoreIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
          </Tooltip>
        </Link>
        <Link to="/share">
          <Tooltip title="Sharing" placement="right">
            <ListItem button selected={location.pathname === '/share'}>
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Sharing" />
            </ListItem>
          </Tooltip>
        </Link>
        <Link to="/history">
          <Tooltip title="History" placement="right">
            <ListItem button selected={location.pathname === '/history'}>
              <ListItemIcon>
                <HistoryIcon />
              </ListItemIcon>
              <ListItemText primary="History" />
            </ListItem>
          </Tooltip>
        </Link>
        {/* <Link to="/apps">
          <Tooltip title="Applications" placement="right">
            <ListItem button selected={location.pathname === '/apps'}>
              <ListItemIcon>
                <AppsIcon />
              </ListItemIcon>
              <ListItemText primary="Applications" />
            </ListItem>
          </Tooltip>
        </Link> */}
      </List>
    </Drawer>
  );
};

export default withStyles(styles)(withRouter(Sidebar));
