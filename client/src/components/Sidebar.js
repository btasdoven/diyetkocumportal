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
import DashboardIcon from "@material-ui/icons/Dashboard";
import SettingsIcon from "@material-ui/icons/Settings";
import ChatIcon from "@material-ui/icons/Chat";
import HistoryIcon from "@material-ui/icons/History";
import PeopleIcon from "@material-ui/icons/People";
import AppsIcon from "@material-ui/icons/Apps";
import StoreIcon from "@material-ui/icons/Store";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from '@material-ui/core/MenuItem';
import FolderSpecialIcon from "@material-ui/icons/FolderSpecial";
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";

import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';

import Typography from "@material-ui/core/Typography";

import { withRouter } from 'react-router'

import Tooltip from '@material-ui/core/Tooltip';

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

  state = {
    openProfileMenu: true,
    user: JSON.parse(localStorage.getItem('user'))
  }

  render() {

    const { open, classes, location } = this.props;

    console.log('Sidebar')
    console.log(location);
    console.log(open);

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
                  <Avatar className={classes.avatar} alt={this.state.user.name} src={this.state.user.url} />
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
              {/* <ListItem button >
                <Typography variant="overline">AYARLAR</Typography>
              </ListItem> */}
              <ListItem button onClick={this.props.logout}>
                <Typography variant="overline">ÇIKIŞ YAP</Typography>
              </ListItem>
            </List>
          </Collapse>
              
          <Divider />
          <List dense={true}>
            {/* <ListItem button component={Link} to='/' selected={location.pathname === '/'}>
              <ListItemIcon>
                <DashboardIcon color="primary"/>
              </ListItemIcon>
              <Typography variant="overline">Ana Sayfa</Typography>
            </ListItem> */}
              
            <ListItem button component={Link} to='/c' selected={location.pathname === '/c'}>
              <ListItemIcon>
                <PeopleIcon color="primary"/>
              </ListItemIcon>
              <Typography variant="overline">Danışanlarım</Typography>
            </ListItem>

            {/* <ListItem button component={Link} to='/m' selected={location.pathname === '/m'}>
              <ListItemIcon>
                <ChatIcon color="primary"/>
              </ListItemIcon>
              <Typography variant="overline">Mesajlarım</Typography>
              { 
                this.state.user.id == 5 && 
                <ListItemSecondaryAction>
                  <Badge badgeContent={2} color="secondary">
                  </Badge>
                </ListItemSecondaryAction>
              }
            </ListItem> */}

            <ListItem button component={Link} to='/r' selected={location.pathname === '/r'}>
              <ListItemIcon>
                <CalendarTodayIcon color="primary"/>
              </ListItemIcon>
              <Typography variant="overline">RANDEVULARIM</Typography>
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

export default withStyles(styles)(withRouter(Sidebar));
