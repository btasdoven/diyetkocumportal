import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
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

const links = [
  {
    path: '/s',
    label: 'Search Users',
    icon: SearchIcon
  },
  {
    path: '/u',
    label: 'My Profile',
    icon: AccountCircleIcon,
  }
]


const BottomBar = props => {
  const { classes, location } = props;

  var selected = -1;
  if (location.pathname.indexOf('/s') != -1)
    selected = 0;
  else if (location.pathname == '/u') {
    selected = 1;
  }

  return (
    <BottomNavigation
      value={selected}
      showLabels={true}
      className={classes.stickToBottom}
      component={Paper}
      elevation={2}
    >
        { links.map((l, idx) => {
            const DashboardRoute = ({ component: Component, ...rest }) => {
              return (
                  <Component {...rest} />
              );
            };
            return (<BottomNavigationAction 
              key={idx}
              label={l.label}
              icon={<DashboardRoute component={l.icon} color={selected == idx ? "primary" : "inherit"}/>}
              component={Link}
              to={l.path}
              color={selected == idx ? "primary" : "inherit"}
            />)
          })
        }
    </BottomNavigation>
  );
};

export default withStyles(styles)(withRouter(BottomBar));
