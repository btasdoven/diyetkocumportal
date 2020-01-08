import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { connect } from "react-redux";

import Diary from "./containers/Diary/DiaryView";
import Apps from "./containers/Apps";
import UserSearch from "./containers/UserSearch/UserSearch";
import MyProfile from "./containers/MyProfile/MyProfile";
import ProjectList from "./containers/Project/ProjectList";
import Project from "./containers/Project/Project";
import Signin from "./containers/Signin";
import Register from "./containers/Register/Register";
import LandingPage from "./containers/LandingPage";

import CircularProgress from '@material-ui/core/CircularProgress';
import MainLayout from "./layouts/MainLayout";
import EmptyLayout from "./layouts/EmptyLayout";
import MainLayoutBottomNav from "./layouts/MainLayoutBottomNav";
import MaterialList from "./containers/MyStorage/MaterialList"
import withWidth from '@material-ui/core/withWidth';

const NotFound = () => {
  return <div>NotFound</div>;
};


const DashboardRoute = withWidth()(({ width, component: Component, ...rest }) => {

  return (
    <Route
      {...rest}
      render={matchProps => 
        true //width != 'xs' && width != 'sm'
          ? (
            <MainLayout permanentDrawer={width != 'xs' && width != 'sm' ? true : false}>
              <Component {...matchProps} />
            </MainLayout>
          ) : (
            <MainLayoutBottomNav component={Component} {...matchProps} />
          )}
    />
  );
});

const EmptyRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={matchProps => (
        <EmptyLayout>
          <Component {...matchProps} />
        </EmptyLayout>
      )}
    />
  );
};

class App extends Component {

  render() {
    const { settings } = this.props;

    return (
      <MuiThemeProvider theme={settings.theme}>
        <CssBaseline />
        <div style={{ height: "100vh" }}>
          <Router>
            {localStorage.getItem('user') ? (
              <Switch>
                <DashboardRoute exact path="/" component={MyProfile} />
                <DashboardRoute exact path="/d" component={MyProfile} />
                <DashboardRoute path="/m" component={MyProfile} />
                <DashboardRoute path="/r" component={MyProfile} />
                <DashboardRoute path="/f" component={MyProfile} />
                <Route path="/signin" render={() => <Redirect to="/" />} />
                <EmptyRoute component={NotFound} />
              </Switch>
            ) : (
              <Switch>
                <EmptyRoute path="/signup" component={Register} />
                <EmptyRoute path="/signin" component={Signin} />
                <Route exact path="/" render={() => <Redirect to="/signin" />} />
                <Redirect to="/" />
              </Switch>
            )}
          </Router>
        </div>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {};

const mapStateToProps = state => {
  return {
    settings: state.settings,
    auth: state.auth,
  };
};

export default connect(
  mapStateToProps,
  null
)(App);
