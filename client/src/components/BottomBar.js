import React from "react";
import classNames from "classnames";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import SettingsIcon from "@material-ui/icons/Settings";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import HistoryIcon from "@material-ui/icons/History";
import PeopleIcon from "@material-ui/icons/People";
import FolderSpecialIcon from "@material-ui/icons/FolderSpecial";
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
  stickToBottom: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
    height: theme.spacing(7),
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
      elevation={2}
    >
        <BottomNavigationAction 
          label="Storage"
          icon={<StoreIcon />}
          component={Link}
          to="/"
        />
        <BottomNavigationAction 
          label="Calendar"
          icon={<CalendarTodayIcon />}
          component={Link}
          to="/share"
        />
        <BottomNavigationAction 
          label="Projects"
          icon={<FolderSpecialIcon />}
          component={Link}
          to="/history"
        />
    </BottomNavigation>
  );
};

export default withStyles(styles)(withRouter(BottomBar));
