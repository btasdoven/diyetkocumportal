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
import Card from "@material-ui/core/Card";
import MenuItem from '@material-ui/core/MenuItem';

import { withRouter } from 'react-router'

import Tooltip from '@material-ui/core/Tooltip';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { Paper } from "@material-ui/core";

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
  },
  stickToBottom: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
    height: theme.spacing.unit * 7,
  },
});

const BottomBar = props => {
  const { classes, location } = props;

  const locs = ['/', '/share', '/history']
  const selected = locs.indexOf(location.pathname);

  console.log('BottomBar')
  console.log(location);
  return (
    <BottomNavigation
      value={selected}
      showLabels={true}
      className={classes.stickToBottom}
      component={Paper}
    >
        <BottomNavigationAction 
          label="Dashboard"
          icon={<StoreIcon />}
          component={Link}
          to="/"
        />
        <BottomNavigationAction 
          label="Share"
          icon={<PeopleIcon />}
          component={Link}
          to="/share"
        />
        <BottomNavigationAction 
          label="History"
          icon={<HistoryIcon />}
          component={Link}
          to="/history"
        />
    </BottomNavigation>
  );
};

export default withStyles(styles)(withRouter(BottomBar));
