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
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import CircularProgress from '@material-ui/core/CircularProgress';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { getMaterialHeaders } from '../../store/reducers/api.materialHeaders';

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
  },
  backButton: {
    transform: 'rotate(90deg)',
    color: "white"
  }
});

const getPageTitle = (props) => {
  const pathname = props.location.pathname;

  if (pathname === '/') {
    return "My Storage"
  } else if (pathname === '/history') {
    return "Calendar"
  } else if (pathname === '/projects') {
    return "Projects"
  }

  // } else if (pathname.startsWith('/projects/')) {
  //   return props.apiMaterialHeaders.items[props.match.params.projectId].id;
  // }

  return undefined;
}

class Header extends React.Component  {

  constructor(props) {
      super(props)

      this.shouldShowLoader = this.shouldShowLoader.bind(this);

      this.state = {
          anchorEl: null
      }
  }

  shouldShowLoader() {
    return false;
    // if (this.props.location.pathname.startsWith('/projects/') && 
    //     this.props.match.params.projectId != undefined)
    // {
    //   const projectId = this.props.match.params.projectId;
    //   if (this.props.apiMaterialHeaders.items == undefined ||
    //       this.props.apiMaterialHeaders.items[projectId] == undefined) {
    //     return true;
    //   }
    // }

    // return false;
  }

  componentDidMount() {
    // if (this.props.location.pathname.startsWith('/projects/') && 
    //     this.props.match.params.projectId != undefined)
    // {
    //   const userId = JSON.parse(localStorage.getItem('user')).id;
    //   const projectId = this.props.match.params.projectId;
    //   if (this.props.apiMaterialHeaders.items == undefined ||
    //       this.props.apiMaterialHeaders.items[projectId] == undefined)
    //   {
    //       this.props.getMaterialHeaders(userId);
    //   }
    // }
}

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  render() {
    const { classes, location } = this.props;
    const showLoader = this.shouldShowLoader();
    
    return (
      <span>
        {/* { showLoader && renderLoadingButton(classes) } */}
        { !showLoader &&
          <AppBar className={classes.appBar} position="fixed">
            <Toolbar disableGutters={true} classes={{ root: classes.toolbarRoot }}>
              {this.props.backButton && (
                <IconButton
                  className={classes.backButton}
                  onClick={() => this.props.history.goBack()}
                >
                  <ExpandMoreIcon />
                </IconButton>
              )}
              {!this.props.backButton && (
                <a href='/'>
                  <img src="/static/favicon.png" style={{marginRight: '10px', marginLeft: '10px', height:'40px'}}/>
                </a>
              )}
              <Typography
                variant="h6"
                color="inherit"
                noWrap
                className={classes.title}
              >
                {this.props.title || getPageTitle(this.props) || ''} 
                {/* getPageTitle(this.props)} */}
              </Typography>

              {/* <IconButton color="inherit">
                <Badge badgeContent={4} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton> */}
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
            </Toolbar>
          </AppBar>
        }
      </span>
    );
  }
}

const mapStateToProps = state => {
  return {
    apiMaterialHeaders: state.apiMaterialHeaders,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getMaterialHeaders: (userId) => getMaterialHeaders(userId),
    },
    dispatch
  );
};

export default withStyles(styles)(withRouter(Header));