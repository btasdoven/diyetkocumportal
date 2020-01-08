import React from "react";
import { Link } from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
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
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const styles = theme => ({
  toolbarRoot: {
    paddingRight: theme.spacing(1),
    paddingLeft: theme.spacing(1),
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
    return "Ana Sayfa"
  } else if (pathname === '/d') {
    return "Danışanlarım"
  } else if (pathname === '/m') {
    return "Mesajlarım"
  } else if (pathname === '/r') {
    return "Randevularım"
  } else if (pathname === '/f') {
    return "Finanslarım"
  }

  // } else if (pathname.startsWith('/projects/')) {
  //   return props.apiMaterialHeaders.items[props.match.params.projectId].id;
  // }

  return undefined;
}

class Header extends React.Component  {

  constructor(props) {
      super(props);

      this.state = {
          anchorEl: null
      }
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  render() {
    const { classes } = this.props;
    
    return (
      <AppBar className={this.props.permanentDrawer ? classes.appBarShifted : classes.appBar} position="fixed">
        <Toolbar variant="dense" disableGutters={true} classes={{ root: classes.toolbarRoot }}>
          {this.props.backButton && (
            <IconButton
              className={classes.backButton}
              //onClick={() => this.props.history.goBack()}
              component={Link}
              to={this.props.backButton}
            >
              <ExpandMoreIcon />
            </IconButton>
          )}
          {!this.props.backButton && (
            <IconButton
              className={classes.menuButton}
              onClick={() => this.props.handleOpenDrawer()}
            >
              <MenuIcon />
            </IconButton>
          )}

          {/* <a href='/' >
            <img src="/static/favicon.png" className={classes.icon} />
          </a> */}

          <Typography
            variant="button"
            color="inherit"
            noWrap
            className={classes.title}
          >
            {this.props.title || getPageTitle(this.props) || ''}
          </Typography>

          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          {/* <IconButton onClick={this.handleClick} color="inherit">
            <Badge badgeContent={1} color="secondary">
              <Avatar className={classes.avatar} alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            </Badge>
          </IconButton> */}
          <Menu
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
              {/* <ListItemText inset primary="Çıkış yap" /> */}
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(styles)(withRouter(Header));