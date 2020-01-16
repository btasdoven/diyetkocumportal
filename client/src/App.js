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
import MesajList from "./containers/Mesajlar/MesajList";
import DanisanView from "./containers/Danisanlar/DanisanView";
import DanisanList from "./containers/Danisanlar/DanisanList";
import AnaSayfaView from "./containers/AnaSayfa/AnaSayfa";
import NewRandevu from "./containers/Randevu/NewRandevu";
import NotImplementedYet from './containers/NotImplementedYet'
import NewLandingPage from './containers/LandingPage/NewLandingPage'

import CircularProgress from '@material-ui/core/CircularProgress';
import MainLayout from "./layouts/MainLayout";
import EmptyLayout from "./layouts/EmptyLayout";
import MainLayoutBottomNav from "./layouts/MainLayoutBottomNav";
import MaterialList from "./containers/MyStorage/MaterialList"
import withWidth from '@material-ui/core/withWidth';
import withTracker from './components/Signin/PageTracker'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import { SnackbarProvider } from 'material-ui-snackbar-provider'

import DateFnsUtils from '@date-io/date-fns';
import trLocale from "date-fns/locale/tr";
import RandevuList from "./containers/Randevu/RandevuList";


const NotFound = () => {
  return <div>NotFound</div>;
};


const DashboardRoute = withTracker(withWidth()(({ width, component: Component, backButton, viewParam, ...rest }) => {

  return (
    <Route
      {...rest}
      render={matchProps => 
        true //width != 'xs' && width != 'sm'
          ? (
            <MainLayout component={Component} viewParam={viewParam} backButton={backButton} permanentDrawer={width != 'xs' && width != 'sm' ? true : false} {...matchProps}>
            </MainLayout>
          ) : (
            <MainLayoutBottomNav component={Component} {...matchProps} />
          )}
    />
  );
}));

const EmptyRoute = withTracker(({ component: Component, ...rest }) => {
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
});

class App extends Component {

  render() {
    const { settings } = this.props;

    return (
      <MuiThemeProvider theme={settings.theme}>
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={trLocale}>
          <SnackbarProvider SnackbarProps={{ autoHideDuration: 3000 }}>
            <CssBaseline />
            <div style={{ height: "100vh" }}>
              <Router>
                {localStorage.getItem('user') ? (
                  <Switch>
                    <Route exact path="/" render={() => <Redirect to="/me" />} />
                    <DashboardRoute exact path="/c" component={DanisanList} />
                    <DashboardRoute exact backButton="/c" path="/c/:danisan" component={DanisanView} />
                    <DashboardRoute exact path="/m" component={MesajList} />
                    <DashboardRoute exact backButton="/m" path="/m/:danisan" viewParam="messages" component={DanisanView} />

                    <EmptyRoute path="/np" component={NewLandingPage} />
                    <EmptyRoute path="/d/:diyetisyenUserName" component={NewRandevu} />
                    
                    <DashboardRoute path="/me" component={MyProfile} />
                    <DashboardRoute path="/r" component={RandevuList} />
                    <DashboardRoute path="/f" component={NotImplementedYet} />
                    <DashboardRoute path="/kd" component={NotImplementedYet} />
                    <Route path="/signin" render={() => <Redirect to="/" />} />
                    <EmptyRoute component={NotFound} />
                  </Switch>
                ) : (
                  <Switch>
                    <EmptyRoute path="/np" component={NewLandingPage} />
                    <EmptyRoute path="/d/:diyetisyenUserName" component={NewRandevu} />
                    <EmptyRoute path="/signup" component={Register} />
                    <EmptyRoute path="/signin" component={Signin} />
                    <Route exact path="/" render={() => <Redirect to="/signin" />} />
                    <Redirect to="/" />
                  </Switch>
                )}
              </Router>
            </div>
          </SnackbarProvider>
        </MuiPickersUtilsProvider>
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
