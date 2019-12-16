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
import FolderSpecialIcon from "@material-ui/icons/FolderSpecial";

import Typography from "@material-ui/core/Typography";

import { withRouter } from 'react-router'

import Tooltip from '@material-ui/core/Tooltip';

const drawerWidth = 240;

const styles = theme => ({
  drawerPaper: {
    position: "fixed",
    top: theme.spacing(8),
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
    width: theme.spacing(7)
  },
  drawerPaperOpen: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing(21)
  },
  text: {

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
          !open && classes.drawerPaperClose,
          open && classes.drawerPaperOpen
        )
      }}
      open={open}
    >
      <List>
        {/* <Link to="/materials">
          <Tooltip title="Storage" placement="right">
            <ListItem button selected={location.pathname === '/materials'}>
              <ListItemIcon>
                  <StoreIcon />
              </ListItemIcon>
              <ListItemText primary="Storage" />
            </ListItem>
          </Tooltip>
        </Link> */}
        <Link to="/">
          <Tooltip title="Kişisel Veri İşleme Envanter" placement="right">
            <ListItem button selected={location.pathname === '/'}>
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText disableTypography primary={<Typography type="body2">Kişisel Veri İşleme Envanter</Typography>} />
            </ListItem>
          </Tooltip>
        </Link>
        {/* <Link to="/projects">
          <Tooltip title="Projects" placement="right">
            <ListItem button selected={location.pathname === '/projects'}>
              <ListItemIcon>
                <FolderSpecialIcon />
              </ListItemIcon>
              <ListItemText primary="Projects" />
            </ListItem>
          </Tooltip>
        </Link> */}
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
