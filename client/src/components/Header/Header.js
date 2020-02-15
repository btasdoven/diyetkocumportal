import React from "react";
import { Link } from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/NotificationsOutlined";
import PersonIcon from "@material-ui/icons/Person";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from 'react-router'
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import CircularProgress from '@material-ui/core/CircularProgress';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import DeleteIcon from '@material-ui/icons/Delete';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { getDietitianAppointments } from '../../store/reducers/api.dietitianAppointments';
import { getMessagePreviews } from '../../store/reducers/api.messagePreviews';
import HeaderNotifDialog from './HeaderNotifDialog'

const styles = theme => ({
  toolbarRoot: {
    minHeight: theme.spacing(7),
    paddingRight: theme.spacing(1),
    paddingLeft: theme.spacing(1), 
    justifyContent: 'space-between'
  },
  icon: {
    width: theme.spacing(3.5),
    height: theme.spacing(3.5),
    margin: theme.spacing(1.25),
    display: 'flex'
  },
  title: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
  },
  appBar: {
  },
  appBarShifted: {
    left: '240px',
    width: `calc(100% - 240px)`,
  },
  backButton: {
    transform: 'rotate(90deg)',
    color: "white"
  },
  menuButton: {
    color: "white"
  },
  avatar: {
    width: theme.spacing(3.25),
    height: theme.spacing(3.25),
  },
});

const getPageTitle = (props) => {
  const pathname = props.location.pathname;

  if (pathname === '/') {
    return "ANA SAYFA"
  } else if (pathname === '/me') {
    return "PROFİLİM"
  } else if (pathname === '/c') {
    return "DANIŞANLARIM"
  } else if (pathname === '/m') {
    return "MESAJLARIM"
  } else if (pathname === '/r') {
    return "RANDEVULARIM"
  } else if (pathname === '/f') {
    return "FİNANSLARIM"
  } else if (pathname === '/kd') {
    return "KAYITLI DİYETLERİM"
  }

  return undefined;
}

class Header extends React.Component  {

  constructor(props) {
      super(props);

      this.isLoaded = this.isLoaded.bind(this);

      this.state = {
          anchorEl: null,
          user: JSON.parse(localStorage.getItem('user'))
      }
  }
    
  isLoaded() {
    if (this.state.user == undefined) {
      return false;
    }

    var loaded = 
      this.props.apiMessagePreviews[this.state.user.id] != undefined &&
      this.props.apiMessagePreviews[this.state.user.id].isGetLoading != true &&
      this.props.apiMessagePreviews[this.state.user.id].data != undefined;

    var loaded2 = 
      this.props.apiDietitianAppointments != undefined &&
      this.props.apiDietitianAppointments[this.state.user.id] != undefined &&
      this.props.apiDietitianAppointments[this.state.user.id].isGetLoading != true &&
      this.props.apiDietitianAppointments[this.state.user.id].data != undefined;

    console.log(loaded);
    console.log(loaded2);
    return loaded && loaded2;
  }

  componentDidMount() {
    if (!this.isLoaded() && this.state.user) {
      this.props.getMessagePreviews(this.state.user.id);
      this.props.getDietitianAppointments(this.state.user.id);
    }
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  render() {
    const { classes } = this.props;
  
    var showLoader = !this.isLoaded();
    var showBadge = false;
    var pendingAppts = 0;
    var unreadMsgs = showLoader 
      ? 0 
      : Object.keys(this.props.apiMessagePreviews[this.state.user.id].data).map((u) => this.props.apiMessagePreviews[this.state.user.id].data[u].unread).reduce((a,b) => a+b, 0);

    if (!showLoader) {
      var appts = this.props.apiDietitianAppointments[this.state.user.id].data;
      pendingAppts = Object.keys(appts).map((u) => Object.keys(appts[u].data).map((t) => appts[u].data[t].status == "pending" ? 1 : 0).reduce((a,b) => a+b, 0)).reduce((a,b) => a+b, 0);
    }

    if (pendingAppts > 0 || unreadMsgs > 0) {
      showBadge = true;
    }

    return (
      <AppBar color="inherit" elevation={0} className={this.props.permanentDrawer ? classes.appBarShifted : classes.appBar} position="fixed">
        <Toolbar classes={{ root: classes.toolbarRoot }}>
          {this.props.backButton && (
            <IconButton
              className={classes.backButton}
              //onClick={() => this.props.history.goBack()}
              component={Link}
              to={this.props.backButton}
              onClick={this.props.onBackButtonClick}
            >
              <ExpandMoreIcon color="primary"/>
            </IconButton>
          )}
          {!this.props.backButton && this.props.noButton != true && (
            <IconButton
              
              className={classes.menuButton}
              onClick={() => this.props.handleOpenDrawer()}
            >
              <Badge variant="dot" badgeContent={showBadge ? 1 : 0} color="secondary">
                <MenuIcon color="primary"/>
              </Badge>
            </IconButton>
          )}

          {/* <a href='/' >
            <img src="/static/favicon.png" className={classes.icon} />
          </a> */}

          <Typography
            variant="button"
            color="primary"
            noWrap
            className={classes.title}
            style={{fontSize: '1.125em', position: 'absolute', marginLeft: '48px', marginRight: '48px', width: 'calc(100% - 112px)'}}
          >
            {this.props.title || getPageTitle(this.props) || ''}
          </Typography>
{/* 
          {this.props.noButton != true && this.state.user && (
            <IconButton onClick={() => this.setState({notifDialogOpen: true})} color="inherit">
              <Badge variant="dot" badgeContent={4} color="secondary">
                <NotificationsIcon color="primary"/>
              </Badge>
            </IconButton>
          )} */}

          {/* <IconButton onClick={this.handleClick} color="inherit">
            <Badge badgeContent={1} color="secondary">
              <Avatar className={classes.avatar} alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            </Badge>
          </IconButton> */}
          {/* <Menu
            id="long-menu"
            anchorEl={this.state.anchorEl}
            open={this.state.anchorEl ? true : false}
            onClose={() => this.setState({anchorEl: null})}
          >
            <MenuItem onClick={this.props.logout}>
              <ListItemIcon>
                  <ExitToAppIcon fontSize="small"/>
              </ListItemIcon>
              <Typography variant="inherit">Çıkış yap</Typography>
              <ListItemText inset primary="Çıkış yap" />
            </MenuItem>
          </Menu> */}
        </Toolbar>

        <HeaderNotifDialog open={this.state.notifDialogOpen} handleClose={() => this.setState({notifDialogOpen: false})}/>
      </AppBar>
    );
  }
}

const mapStateToProps = state => {
  return {
    apiMessagePreviews: state.apiMessagePreviews,
    apiDietitianAppointments: state.apiDietitianAppointments,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getDietitianAppointments: (userId, date) => getDietitianAppointments(userId, date),
      getMessagePreviews: (userId) => getMessagePreviews(userId),
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(withRouter(Header)));