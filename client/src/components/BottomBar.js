import React from "react";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import FolderSpecialIcon from "@material-ui/icons/FolderSpecial";
import StoreIcon from "@material-ui/icons/Store";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from 'react-router'

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { Paper } from "@material-ui/core";

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

  const locs = ['/materials', '/', '/projects']
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
          to="/materials"
        />
        <BottomNavigationAction 
          label="Diary"
          icon={<CalendarTodayIcon />}
          component={Link}
          to="/"
        />
        <BottomNavigationAction 
          label="Projects"
          icon={<FolderSpecialIcon />}
          component={Link}
          to="/projects"
        />
    </BottomNavigation>
  );
};

export default withStyles(styles)(withRouter(BottomBar));
