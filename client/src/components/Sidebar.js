import Avatar from "@material-ui/core/Avatar";
import Badge from "@material-ui/core/Badge";
import Collapse from '@material-ui/core/Collapse';
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CalendarTodayIcon from '@material-ui/icons/CalendarTodayOutlined';
import DashboardIcon from "@material-ui/icons/DashboardOutlined";
import EventAvailableIcon from '@material-ui/icons/EventAvailableOutlined';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PeopleIcon from "@material-ui/icons/PeopleOutlined";
import RateReviewOutlinedIcon from '@material-ui/icons/RateReviewOutlined';
import StarsRoundedIcon from '@material-ui/icons/StarsRounded';
import classNames from "classnames";
import React from "react";
import { connect } from "react-redux";
import { withRouter } from 'react-router';
import { WhatsappIcon } from "react-share";
import { bindActionCreators } from "redux";
import { userService } from '../services/user.service';
import { getDietitianAppointments } from '../store/reducers/api.dietitianAppointments';
import { getDietitianComments } from '../store/reducers/api.dietitianComments';
import { getDietitianProfile } from '../store/reducers/api.dietitianProfile';
import { getMessagePreviews } from '../store/reducers/api.messagePreviews';
import ExtendedLink from "./ExtendedLink";






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

function isMobileOrTablet() {
  return /(android|iphone|ipad|mobile)/i.test(navigator.userAgent);
}

function whatsappLink() {
  console.log(isMobileOrTablet());
  
  return (
    'https://' +
    (isMobileOrTablet() ? 'api' : 'web') +
    '.whatsapp.com/send?phone=19712177653'
  );
}

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
    var loaded = true;
      // this.props.apiMessagePreviews[this.state.user.id] != undefined &&
      // this.props.apiMessagePreviews[this.state.user.id].isGetLoading != true &&
      // this.props.apiMessagePreviews[this.state.user.id].data != undefined;

    var loaded2 = 
      this.props.apiDietitianAppointments != undefined &&
      this.props.apiDietitianAppointments[this.state.user.id] != undefined &&
      this.props.apiDietitianAppointments[this.state.user.id].isGetLoading != true &&
      this.props.apiDietitianAppointments[this.state.user.id].data != undefined;

    var loaded3 = 
      this.props.apiDietitianComments != undefined &&
      this.props.apiDietitianComments[this.state.user.id] != undefined &&
      this.props.apiDietitianComments[this.state.user.id].isGetLoading != true &&
      this.props.apiDietitianComments[this.state.user.id].data != undefined;

    var loaded4 = this.props.apiDietitianProfile != undefined &&
      this.props.apiDietitianProfile[this.state.user.id] != undefined &&
      this.props.apiDietitianProfile[this.state.user.id].isGetLoading != true &&
      this.props.apiDietitianProfile[this.state.user.id].data != undefined;

    return loaded && loaded2 && loaded3 && loaded4;
  }

  componentDidMount() {
    if (!this.isLoaded()) {
      // this.props.getMessagePreviews(this.state.user.id);
      this.props.getDietitianAppointments(this.state.user.id);
      this.props.getDietitianComments(this.state.user.id);
      this.props.getDietitianProfile(this.state.user.id);
    }
  }

  render() {
    const { open, classes, location } = this.props;
    
    var showLoader = !this.isLoaded();

    var pendingComments = 0;
    var pendingAppts = 0;
    // var unreadMsgs = 0;

    if (!showLoader) {
      var appts = this.props.apiDietitianAppointments[this.state.user.id].data;
      pendingAppts = Object.keys(appts).filter(u => appts[u].data != undefined).map((u) => Object.keys(appts[u].data).map((t) => appts[u].data[t].status == "pending" ? 1 : 0).reduce((a,b) => a+b, 0)).reduce((a,b) => a+b, 0);

      // unreadMsgs = Object.keys(this.props.apiMessagePreviews[this.state.user.id].data).filter((u) => this.props.apiMessagePreviews[this.state.user.id].data[u].unread).length;

      pendingComments = Object.keys(this.props.apiDietitianComments[this.state.user.id].data).filter(c => this.props.apiDietitianComments[this.state.user.id].data[c].status == 'pending').length;
    }

    const dietitianProfile = showLoader ? undefined : this.props.apiDietitianProfile[this.state.user.id].data;
    const dietitianProfilePictureUrl = dietitianProfile == undefined ? this.state.user.url : dietitianProfile.url64

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
                  <Avatar className={classes.avatar} alt={this.state.user.name} src={userService.getStaticFileUri(dietitianProfilePictureUrl)} />
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
              <ListItem button component={ExtendedLink} to={`/${this.state.user.id}`} selected={location.pathname === `/${this.state.user.id}`}>
                <Typography variant="overline">KİŞİSEL SAYFAM</Typography>
              </ListItem>
              {/* <ListItem button component={ExtendedLink} to='/me' selected={location.pathname === '/me'}>
                <Typography variant="overline">PROFİLİM</Typography>
              </ListItem> */}
              <ListItem button component={ExtendedLink} to='/status' selected={location.pathname === '/status'}>
                <Typography variant="overline">PREMIUM</Typography>
                <ListItemIcon style={{marginLeft: '4px', color: 'orange'}}>
                  <StarsRoundedIcon fontSize="small"/>
                </ListItemIcon>
              </ListItem>
              <ListItem button component={ExtendedLink} to='/blog' selected={location.pathname === '/blog'}>
                <Typography variant="overline">BLOG YAZILARI</Typography>
              </ListItem>
            </List>
          </Collapse>
              
          <Divider />
          <List dense={true} style={{paddingRight: '8px'}}>
            <ListItem style={{borderTopRightRadius: '32px', borderBottomRightRadius: '32px'}} button component={ExtendedLink} to='/home' selected={location.pathname == '/home'}>
              <ListItemIcon style={{minWidth: '40px'}}>
                <DashboardIcon color="primary"/>
              </ListItemIcon>
              <Typography variant="overline">Ana Sayfa</Typography>
            </ListItem>
              
            <ListItem style={{borderTopRightRadius: '32px', borderBottomRightRadius: '32px'}} button component={ExtendedLink} to='/c' selected={location.pathname == '/c' || location.pathname.startsWith('/c/')}>
              <ListItemIcon style={{minWidth: '40px'}}>
                <PeopleIcon fontSize="small" color="primary"/>
              </ListItemIcon>
              <Typography variant="overline">Danışanlarım</Typography>
            </ListItem>
{/* 
            <ListItem style={{borderTopRightRadius: '32px', borderBottomRightRadius: '32px'}} button component={ExtendedLink} to='/m' selected={location.pathname != '/me' && location.pathname.startsWith('/m')}>
              <ListItemIcon style={{minWidth: '40px'}}>
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
            </ListItem> */}

            <ListItem style={{borderTopRightRadius: '32px', borderBottomRightRadius: '32px'}} button component={ExtendedLink} to='/t' selected={location.pathname == '/t' || location.pathname.startsWith('/t/')}>
              <ListItemIcon style={{minWidth: '40px'}}>
                <CalendarTodayIcon fontSize="small" color="primary"/>
              </ListItemIcon>
              <Typography variant="overline">TAKVİMİM</Typography>
            </ListItem>

            <ListItem style={{borderTopRightRadius: '32px', borderBottomRightRadius: '32px'}} button component={ExtendedLink} to='/r' selected={location.pathname == '/r' || location.pathname.startsWith('/r/')}>
              <ListItemIcon style={{minWidth: '40px'}}>
                <EventAvailableIcon fontSize="small" color="primary"/>
              </ListItemIcon>
              <Typography variant="overline">RANDEVU İSTEKLERİ</Typography>
              { 
                pendingAppts > 0 && 
                <ListItemSecondaryAction>
                  <Badge badgeContent={pendingAppts} color="secondary">
                  </Badge>
                </ListItemSecondaryAction>
              }
            </ListItem>

            <ListItem style={{borderTopRightRadius: '32px', borderBottomRightRadius: '32px'}} button component={ExtendedLink} to='/cmt' selected={location.pathname == '/cmt' || location.pathname.startsWith('/cmt/')}>
              <ListItemIcon style={{minWidth: '40px'}}>
                <RateReviewOutlinedIcon fontSize="small" color="primary"/>
              </ListItemIcon>
              <Typography variant="overline">DANIŞAN GÖRÜŞLERİ</Typography>
              { 
                <ListItemSecondaryAction>
                  <Badge badgeContent={pendingComments} color="secondary">
                  </Badge>
                </ListItemSecondaryAction>
              }
            </ListItem>

          {/* </List>
          <Divider />
          <List dense={true}> */}
            {/* <ListItem button component={ExtendedLink} to='/f' selected={location.pathname === '/f'}>
              <ListItemIcon>
                <CreditCardIcon color="primary"/>
              </ListItemIcon>
              <Typography variant="overline">FİNANSLARIM</Typography>
            </ListItem>
            <ListItem button component={ExtendedLink} to='/kd' selected={location.pathname === '/kd'}>
              <ListItemIcon>
                <BookmarkBorderIcon color="primary"/>
              </ListItemIcon>
              <Typography variant="overline">KAYITLI DİYETLERİM</Typography>
            </ListItem> */}
          </List>

          <List dense={true} style={{marginTop: 'auto'}}>
              <ListItem button onClick={() => window.open(whatsappLink(), '_blank')}>
                <ListItemIcon style={{marginLeft: '0', minWidth: '36px'}}>
                  <WhatsappIcon round={true} bgStyle={{fill: "transparent"}} iconFillColor="rgb(44, 183, 66)" size={28}/>
                </ListItemIcon>
                <Typography variant="overline">CANLI YARDIM</Typography>
              </ListItem>
              {/* <ListItem button >
                <Typography variant="overline">AYARLAR</Typography>
              </ListItem> */}
              <ListItem button onClick={this.props.logout}>
                <ListItemIcon color="primary" style={{marginLeft: '0', minWidth: '36px'}}>
                  <ExitToAppIcon />
                </ListItemIcon>
                <Typography variant="overline">ÇIKIŞ YAP</Typography>
              </ListItem>
            </List>
        </Drawer>
    );
  }
};

const mapStateToProps = state => {
  return {
    apiMessagePreviews: state.apiMessagePreviews,
    apiDietitianAppointments: state.apiDietitianAppointments,
    apiDietitianComments: state.apiDietitianComments,
    apiDietitianProfile: state.apiDietitianProfile,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getDietitianProfile: (userId) => getDietitianProfile(userId),
      getDietitianAppointments: (userId, date) => getDietitianAppointments(userId, date),
      getDietitianComments: (userId) => getDietitianComments(userId),
      getMessagePreviews: (userId) => getMessagePreviews(userId),
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(withRouter(Sidebar)));
