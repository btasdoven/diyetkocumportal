import queryString from 'query-string'
import React, { Fragment, Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Redirect } from "react-router-dom";
import { withSnackbar } from 'material-ui-snackbar-provider'

import { withRouter } from 'react-router'
import Header from "../components/Header";
import { logout, relogin } from "../store/reducers/authenticate";

import CircularLoader from "../components/CircularLoader"

import moment from "moment";
import 'moment/locale/tr'

const Sidebar = React.lazy(() => import("../components/Sidebar"));

moment.locale('tr')

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: "flex",
    height: '100%',
  },
  content: {
    flexGrow: 1,
    marginTop: theme.spacing(7),
    overflowX: "hidden",
  },
  contentHeadless: {
    flexGrow: 1,
    overflowX: "hidden",
  },
  contentShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  }
});

class MainLayout extends Component {
  state = {
    open: false,
    titleFromComp: undefined,
    user: JSON.parse(localStorage.getItem('user')),
  };

  handleOpenDrawer = () => {
    this.setState(prevState => {
      return { open: true };
    });
  };

  handleCloseDrawer = () => {
    this.setState(prevState => {
      return { open: false };
    });
  };

  handleToggleDrawer = () => {
    this.setState(prevState => {
      return { open: !prevState.open };
    });
  };

  componentWillUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      // console.log('reset title from ' + this.state.titleFromComp)
      this.setState({ titleFromComp: undefined, onBackButtonClickFromComp: undefined, backButtonFromComp: undefined})
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.handleCloseDrawer();

      if (this.state.user != undefined && 
          this.state.user.premium_until != undefined &&
          moment(this.state.user.premium_until) < moment.utc()) {
        this.props.snackbar.showMessage(
          'Premium üyeliğinizi yenilemeniz gerekmektedir.',
          //'Undo', () => handleUndo()
        )
      }
    }
  }

  componentDidMount() {
    if (this.state.user) {
      if (this.state.user.premium_until == undefined || moment(this.state.user.premium_until) < moment.utc()) {
        this.props.relogin(this.state.user.id, this.state.user)
        this.setState({ resetLoginInfo: Date.now() })
      }
    }
  }

  render() {
    const { classes, component: Component, ...rest } = this.props;
    
    // console.log('redirect', this.state.user, this.props.location)

    if (this.props.location.pathname != '/status' &&
        this.props.location.pathname != '/campaign' &&
        this.state.user != undefined && 
        this.state.user.premium_until != undefined &&
        moment(this.state.user.premium_until) < moment.utc()) {
    // console.log('redirecting...')
      return (<Redirect to="/status" />)
    }

    const headless = queryString.parse(this.props.location.search).headless

    // console.log('sidebar', 'mainlay', this.props)

    if (headless) {
      return (
        <div className={classes.root}>
          <main
            className={classes.contentHeadless}
          >
            <React.Suspense fallback={<CircularLoader />}>
              <Component 
                {...rest} 
                userId={this.state.user ? this.state.user.id : undefined} 
                setBackButton={(f) => this.setState({backButtonFromComp: f})}
                setOnBackButtonClick={(f) => this.setState({onBackButtonClickFromComp: f})}
                setTitle={(title) => this.setState({ titleFromComp: title })} />
            </React.Suspense>
          </main>
        </div>
      )
    } else {
      return (
        <Fragment>
          <div className={classes.root}>
            <Header
              sideBar={this.props.sideBar}
              permanentDrawer={this.props.permanentDrawer} 
              backButton={this.state.backButtonFromComp || this.props.backButton}
              onBackButtonClick={this.state.onBackButtonClickFromComp || this.props.onBackButtonClick}
              logout={this.props.logout}
              handleOpenDrawer={this.state.user && this.props.sideBar != false ? this.handleToggleDrawer : undefined}
              title={this.state.titleFromComp}
            />
            <main
              className={classNames(classes.content, {
                [classes.contentShift]: this.props.permanentDrawer && this.state.user && this.props.sideBar != false
              })}
            >
              <React.Suspense fallback={<CircularLoader />}>
                <Component 
                  {...rest} 
                  userId={this.state.user ? this.state.user.id : undefined} 
                  setBackButton={(f) => this.setState({backButtonFromComp: f})}
                  setOnBackButtonClick={(f) => this.setState({onBackButtonClickFromComp: f})}
                  setTitle={(title) => this.setState({ titleFromComp: title })} />
              </React.Suspense>
            </main>
          </div>
          
          {this.state.user && this.props.sideBar != false &&
              <React.Suspense fallback={<CircularLoader />}>
                <Sidebar 
                  permanentDrawer={this.props.permanentDrawer} 
                  logout={this.props.logout}
                  open={this.props.permanentDrawer ? true : this.state.open} handleClose={this.handleCloseDrawer} drawerWidth={drawerWidth} />
              </React.Suspense>
          }
        </Fragment>
      );
    }
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      logout: () => logout(),
      relogin: (username, userInfo) => relogin(username, userInfo)
    },
    dispatch
  );
};

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(withSnackbar()(withRouter(MainLayout))));
