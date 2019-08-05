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

import Share from "./containers/Share";
import Diary from "./containers/Diary/DiaryView";
import Apps from "./containers/Apps";
import ProjectList from "./containers/Project/ProjectList";
import Project from "./containers/Project/Project";
import Signin from "./containers/Signin";
import Register from "./containers/Register/Register";
import LandingPage from "./containers/LandingPage";
import LinkViewer from "./containers/LinkViewer";

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
        width != 'xs' && width != 'sm'
          ? (
            <MainLayout>
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
  state = {
    auth: false
  };

  render() {
    const { settings, auth } = this.props;
    const shouldUseBottomNav = true;//useMediaQuery(settings.theme.breakpoints.down('sm'));

    return (
      <MuiThemeProvider theme={settings.theme}>
        <CssBaseline />
        <div style={{ height: "100vh" }}>
          <Router>
            {localStorage.getItem('user') ? (
              <Switch>
                <DashboardRoute bottomNav={shouldUseBottomNav} exact path="/" component={Diary} />
                <DashboardRoute bottomNav={shouldUseBottomNav} exact path="/projects/:projectId" component={Project} />
                <DashboardRoute bottomNav={shouldUseBottomNav} path="/projects" component={ProjectList} />
                <DashboardRoute bottomNav={shouldUseBottomNav} path="/materials" component={MaterialList} />
                <Route path="/signin" render={() => <Redirect to="/" />} />
                <EmptyRoute component={NotFound} />
              </Switch>
            ) : (
              <Switch>
                <EmptyRoute path="/signup" component={Register} />
                <EmptyRoute path="/signin" component={Signin} />
                <EmptyRoute path="/links/:userId/:linkId" component={LinkViewer} />
                <EmptyRoute exact path="/" component={LandingPage} />
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
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  null
)(App);
