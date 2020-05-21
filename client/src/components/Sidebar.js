import React from "react";
import classNames from "classnames";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/DashboardOutlined";
import SettingsIcon from "@material-ui/icons/Settings";
import ChatIcon from "@material-ui/icons/ChatOutlined";
import HistoryIcon from "@material-ui/icons/History";
import PeopleIcon from "@material-ui/icons/PeopleOutlined";
import AppsIcon from "@material-ui/icons/Apps";
import StoreIcon from "@material-ui/icons/Store";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from '@material-ui/core/MenuItem';
import FolderSpecialIcon from "@material-ui/icons/FolderSpecial";
import CalendarTodayIcon from '@material-ui/icons/CalendarTodayOutlined';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import StarsRoundedIcon from '@material-ui/icons/StarsRounded';

import { userService } from '../services/user.service'

import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';

import Typography from "@material-ui/core/Typography";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from 'react-router'

import Tooltip from '@material-ui/core/Tooltip';
import { getDietitianAppointments } from '../store/reducers/api.dietitianAppointments';
import { getMessagePreviews } from '../store/reducers/api.messagePreviews';

const drawerWidth = 240;

const styles = theme => ({
  drawerPaper: {
    position: "fixed",
    //top: theme.spacing(6),
    whiteSpace: "nowrap",
    width: drawerWidth,
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
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    //width: theme.spacing(21)
  },
  text: {

  }
});

class Sidebar extends React.Component {

  constructor(props) {
    super(props)

    this.isLoaded = this.isLoaded.bind(this);

    this.state = {
      openProfileMenu: true,
      user: JSON.parse(localStorage.getItem('user'))
    }
  }
    
  isLoaded() {
    var loaded = 
      this.props.apiMessagePreviews[this.state.user.id] != undefined &&
      this.props.apiMessagePreviews[this.state.user.id].isGetLoading != true &&
      this.props.apiMessagePreviews[this.state.user.id].data != undefined;

    var loaded2 = 
      this.props.apiDietitianAppointments != undefined &&
      this.props.apiDietitianAppointments[this.state.user.id] != undefined &&
      this.props.apiDietitianAppointments[this.state.user.id].isGetLoading != true &&
      this.props.apiDietitianAppointments[this.state.user.id].data != undefined;

    return loaded && loaded2;
  }

  componentDidMount() {
    if (!this.isLoaded()) {
      this.props.getMessagePreviews(this.state.user.id);
      this.props.getDietitianAppointments(this.state.user.id);
    }
  }

  render() {
    const { open, classes, location } = this.props;
    
    var showLoader = !this.isLoaded();

    var pendingAppts = 0;
    var unreadMsgs = showLoader 
      ? 0 
      : Object.keys(this.props.apiMessagePreviews[this.state.user.id].data).map((u) => this.props.apiMessagePreviews[this.state.user.id].data[u].unread).reduce((a,b) => a+b, 0);

    if (!showLoader) {
      var appts = this.props.apiDietitianAppointments[this.state.user.id].data;
      pendingAppts = Object.keys(appts).map((u) => Object.keys(appts[u].data).map((t) => appts[u].data[t].status == "pending" ? 1 : 0).reduce((a,b) => a+b, 0)).reduce((a,b) => a+b, 0);
    }

    return (
        <Drawer
          variant={this.props.permanentDrawer ? "permanent" : "temporary"}
          classes={{
            paper: classNames(
              classes.drawerPaper,
              //!open && classes.drawerPaperClose,
              open && classes.drawerPaperOpen
            )
          }}
          open={open}
          onClose={this.props.handleClose}
        >

          <List dense={true} disablePadding>
            <ListItem button onClick={() => this.setState({openProfileMenu: !this.state.openProfileMenu})}>
              <ListItemIcon>
                {/* <Badge badgeContent={1} color="secondary"> */}
                  <Avatar className={classes.avatar} alt={this.state.user.name} src={userService.getStaticFileUri(this.state.user.url)} />
                {/* </Badge> */}
              </ListItemIcon>
              <Typography>{this.state.user.name}</Typography>
              {/* <ListItemSecondaryAction>
                  {this.state.openProfileMenu ? <ExpandLess /> : <ExpandMore />}
              </ListItemSecondaryAction> */}
            </ListItem>
          </List>
          <Collapse in={this.state.openProfileMenu} timeout="auto" unmountOnExit>
            <List dense={true}>
              <ListItem button component={Link} to='/me' selected={location.pathname === '/me'}>
                <Typography variant="overline">PROFİLİM</Typography>
              </ListItem>
              <ListItem button component={Link} to='/status' selected={location.pathname === '/status'}>
                <Typography variant="overline">PREMIUM</Typography>
                <ListItemIcon style={{marginLeft: '4px', color: 'orange'}}>
                  <StarsRoundedIcon fontSize="small"/>
              </ListItemIcon>
              </ListItem>
              <ListItem button component={Link} to='/blog' selected={location.pathname === '/blog'}>
                <Typography variant="overline">BLOG YAZILARI</Typography>
              </ListItem>
              {/* <ListItem button >
                <Typography variant="overline">AYARLAR</Typography>
              </ListItem> */}
              <ListItem button onClick={this.props.logout}>
                <Typography variant="overline">ÇIKIŞ YAP</Typography>
              </ListItem>
            </List>
          </Collapse>
              
          <Divider />
          <List dense={true} style={{paddingRight: '8px'}}>
            <ListItem button component={Link} to='/' selected={location.pathname === '/'}>
              <ListItemIcon>
                <DashboardIcon color="primary"/>
              </ListItemIcon>
              <Typography variant="overline">Ana Sayfa</Typography>
            </ListItem>
              
            <ListItem style={{borderTopRightRadius: '32px', borderBottomRightRadius: '32px'}} button component={Link} to='/c' selected={location.pathname.startsWith('/c')}>
              <ListItemIcon>
                <PeopleIcon fontSize="small" color="primary"/>
              </ListItemIcon>
              <Typography variant="overline">Danışanlarım</Typography>
            </ListItem>

            <ListItem style={{borderTopRightRadius: '32px', borderBottomRightRadius: '32px'}} button component={Link} to='/m' selected={location.pathname != '/me' && location.pathname.startsWith('/m')}>
              <ListItemIcon>
                <ChatIcon fontSize="small" color="primary"/>
              </ListItemIcon>
              <Typography variant="overline">Mesajlarım</Typography>
              { 
                unreadMsgs > 0 && 
                <ListItemSecondaryAction>
                  <Badge badgeContent={unreadMsgs} color="secondary">
                  </Badge>
                </ListItemSecondaryAction>
              }
            </ListItem>

            <ListItem style={{borderTopRightRadius: '32px', borderBottomRightRadius: '32px'}} button component={Link} to='/r' selected={location.pathname.startsWith('/r')}>
              <ListItemIcon>
                <CalendarTodayIcon fontSize="small" color="primary"/>
              </ListItemIcon>
              <Typography variant="overline">RANDEVULARIM</Typography>
              { 
                pendingAppts > 0 && 
                <ListItemSecondaryAction>
                  <Badge badgeContent={pendingAppts} color="secondary">
                  </Badge>
                </ListItemSecondaryAction>
              }
            </ListItem>

          {/* </List>
          <Divider />
          <List dense={true}> */}
            {/* <ListItem button component={Link} to='/f' selected={location.pathname === '/f'}>
              <ListItemIcon>
                <CreditCardIcon color="primary"/>
              </ListItemIcon>
              <Typography variant="overline">FİNANSLARIM</Typography>
            </ListItem>
            <ListItem button component={Link} to='/kd' selected={location.pathname === '/kd'}>
              <ListItemIcon>
                <BookmarkBorderIcon color="primary"/>
              </ListItemIcon>
              <Typography variant="overline">KAYITLI DİYETLERİM</Typography>
            </ListItem> */}
          </List>
        </Drawer>
    );
  }
};

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
)(withStyles(styles)(withRouter(Sidebar)));
