import { withStyles } from "@material-ui/core/styles";
import React from "react";
import { connect } from "react-redux";
import { withRouter } from 'react-router';
import { bindActionCreators } from "redux";
import { getDietitianAppointments } from '../../store/reducers/api.dietitianAppointments';
import { getMessagePreviews } from '../../store/reducers/api.messagePreviews';
import HeaderV2 from './HeaderV2';

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
    return undefined
  } else if (pathname === '/me') {
    return "Profilim"
  } else if (pathname === '/c') {
    return "Danışanlarım"
  } else if (pathname === '/cmt') {
    return "Danışan Görüşleri"
  } else if (pathname === '/m') {
    return "Mesajlarım"
  } else if (pathname === '/r') {
    return "Randevu İstekleri"
  } else if (pathname === '/t') {
    return "Takvimim"
  } else if (pathname === '/signin') {
    return 'Diyetisyen Girişi'
  } else if (pathname === '/signup') {
    return 'Diyetisyen Kaydı'
  }

  return undefined;
}

class Header extends React.Component  {

  constructor(props) {
      super(props);

      this.isLoaded = this.isLoaded.bind(this);
      this.handleNotifDialog = this.handleNotifDialog.bind(this)

      this.state = {
          anchorEl: null,
          user: JSON.parse(localStorage.getItem('user')),
          notifDialogOpen: false
      }
  }
    
  isLoaded() {
    if (this.state.user == undefined) {
      return false;
    }

    var loaded = true;
      // this.props.apiMessagePreviews[this.state.user.id] != undefined &&
      // this.props.apiMessagePreviews[this.state.user.id].isGetLoading != true &&
      // this.props.apiMessagePreviews[this.state.user.id].data != undefined;

    var loaded2 = 
      this.props.apiDietitianAppointments != undefined &&
      this.props.apiDietitianAppointments[this.state.user.id] != undefined &&
      this.props.apiDietitianAppointments[this.state.user.id].isGetLoading != true &&
      this.props.apiDietitianAppointments[this.state.user.id].data != undefined;

    return loaded && loaded2;
  }

  handleNotifDialog(open) {
    if (this.state.t) {
      clearInterval(this.state.t)
    }

    this.setState({
      t: undefined,
      notifDialogOpen: open,
    })

    localStorage.setItem('intro_dialog', true);
  }

  componentDidMount() {
    if (!this.isLoaded() && this.state.user && this.props.noButton != true && !this.props.backButton) {
      // this.props.getMessagePreviews(this.state.user.id);
      this.props.getDietitianAppointments(this.state.user.id);
    }

    // if (this.state.t != undefined) {
    //   clearInterval(this.state.t)
    // }

    // var didDialogOpen =  localStorage.getItem('intro_dialog');

    // if (didDialogOpen == 'true')
    //   return;
    
    // var t = setTimeout(() => {
    //   this.handleNotifDialog(true);
    // }, 3000);

    // this.setState({
    //   timeoutInt: t,
    // })
  }

  componentWillUnmount() {
    if (this.state.t != undefined) {
      clearInterval(this.state.t);
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
    var unreadMsgs = 0;
      // showLoader 
      //   ? 0 
      //   : Object.keys(this.props.apiMessagePreviews[this.state.user.id].data).map((u) => this.props.apiMessagePreviews[this.state.user.id].data[u].unread).reduce((a,b) => a+b, 0);

    if (!showLoader) {
      var appts = this.props.apiDietitianAppointments[this.state.user.id].data;
      pendingAppts = Object.keys(appts).filter(u => appts[u].data != undefined).map((u) => Object.keys(appts[u].data).map((t) => appts[u].data[t].status == "pending" ? 1 : 0).reduce((a,b) => a+b, 0)).reduce((a,b) => a+b, 0);
    }

    if (pendingAppts > 0 || unreadMsgs > 0) {
      showBadge = true;
    }

    // console.log('sidebar', 'header', this.props)

    return (
      <HeaderV2 static
        title={this.props.title || getPageTitle(this.props) || ''}
        backButton={this.props.backButton}
        noButton={this.props.noButton}
        onBackButtonClick={this.props.onBackButtonClick}
        permanentDrawer={this.props.permanentDrawer}
        sideBar={this.props.sideBar}
        showBadge={showBadge}
        overrideMenuClick={this.props.handleOpenDrawer}
      />
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