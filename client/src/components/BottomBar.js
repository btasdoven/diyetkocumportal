import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from 'react-router'

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { Paper } from "@material-ui/core";
import Avatar from '@material-ui/core/Avatar';

const styles = theme => ({
  stickToBottom: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
    height: theme.spacing(7),
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  }
});

const StyledIcon = ({ component: Component, ...rest }) => {
  return (
      <Component {...rest} />
  );
};

class BottomBar extends React.Component {
  
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.getSelected = this.getSelected.bind(this);

    this.state = {
      links: [
        {
          pathMatch: '/s',
          path: '/s',
          func: (user, cls) => {
            return {
              label: 'Search Users',
              icon: SearchIcon,
            }
          }
        },
        {
          pathMatch: '/u',
          path: '/u',
          func: (user, cls) => {
            if (user) {
              return {
                label: 'My Profile',
                icon: Avatar,
                otherProps: {
                  src: user._profile.profilePicURL,
                  className: cls.small
                }
              }
            } else {
              return {
                label: 'My Profile',
                icon: AccountCircleIcon,
              }
            }
          }
        }
      ]
    }
  }

  componentDidMount() {
    const selected = this.getSelected();

    if (this.state.links[selected].path != this.props.location.pathname) {
      this.state.links[selected].path = this.props.location.pathname;
      this.setState(this.state);
    }   
  }

  getSelected() {
    for (var i = 0; i < this.state.links.length; ++i) {
      if (this.props.location.pathname.indexOf(this.state.links[i].pathMatch) == 0) {
        return i;
      }
    }

    return -1;
  }

  handleChange(ev, newValue) {
    const selected = this.getSelected();

    if (newValue != selected && this.state.links[selected].path != this.props.location.pathname) {
      this.state.links[selected].path = this.props.location.pathname;
      this.setState(this.state);
    } 
  }
  
  render() {
    const { classes, location } = this.props;
    const selected = this.getSelected();
    const loggedInUser = JSON.parse(localStorage.getItem('userig'));

    return (
      <BottomNavigation
        value={selected}
        showLabels={true}
        className={classes.stickToBottom}
        component={Paper}
        elevation={2}
        onChange={this.handleChange}
      >
          { this.state.links.map((l, idx) => {

              var props = l.func(loggedInUser, classes);

              return (<BottomNavigationAction 
                key={idx}
                label={props.label}
                icon={<StyledIcon component={props.icon} {...props.otherProps} color={selected == idx ? "primary" : "inherit"}/>}
                component={Link}
                to={selected == idx ? location.pathname : l.path}
                color={selected == idx ? "primary" : "inherit"}
              />)
            })
          }
      </BottomNavigation>
    );
  }
};

export default withStyles(styles)(withRouter(BottomBar));
