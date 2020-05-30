import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { connect } from "react-redux";

import MyProfile from "./containers/MyProfile/MyProfile";
import ProfileStatus from "./containers/MyProfile/Status";
import CommentList from "./containers/MyProfile/Comments";
import NewCommentPage from './containers/MyProfile/NewCommentPage';
import Signin from "./containers/Signin/Signin2";
import Register from "./containers/Register/Register2";
import MesajList from "./containers/Mesajlar/MesajList";
import DanisanView from "./containers/Danisanlar/DanisanView";
import DanisanList from "./containers/Danisanlar/DanisanList";
import NewRandevu from "./containers/Randevu/NewRandevu";
import BlogPage from "./containers/Randevu/BlogPage";
import RandevuView from "./containers/Randevu/RandevuView";
import NotImplementedYet from './containers/NotImplementedYet'
import RandevuList from "./containers/Randevu/RandevuList";
import Enler from "./containers/Blog/Enler";
import BlogList from "./containers/Blog/BlogList";
import NewLandingPage from './containers/LandingPage/NewLandingPage'
import NewLandingPage2 from './containers/LandingPage/NewLandingPage2'
import AnemnezFormView from './containers/AnemnezForm/AnemnezFormView'

import MainLayout from "./layouts/MainLayout";
import EmptyLayout from "./layouts/EmptyLayout";
import MainLayoutBottomNav from "./layouts/MainLayoutBottomNav";
import withWidth from '@material-ui/core/withWidth';
import withTracker from './components/Signin/PageTracker'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import { SnackbarProvider } from 'material-ui-snackbar-provider'
import DiyetisyenListView from './containers/Randevu/DiyetisyenListView'
import ForgotPassword from './containers/Register/ForgotPassword'
import ResetPassword from './containers/Register/ResetPassword'
import AdminView from './containers/Admin/AdminView'
import Dashboard from './containers/Dashboard/Dashboard'

import DateFnsUtils from '@date-io/date-fns';
import trLocale from "date-fns/locale/tr";

import {Helmet} from "react-helmet";

const NotFound = () => {
  return <div>NotFound</div>;
};


const NewLandingPageTracked = withTracker(NewLandingPage);
const NewLandingPage2Tracked = withTracker(NewLandingPage2);

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

const DashboardNonSignedRoute = withTracker(withWidth()(({ width, component: Component, backButton, viewParam, ...rest }) => {

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
        <ThemeProvider theme={settings.theme}>
          <MuiPickersUtilsProvider utils={DateFnsUtils} locale={trLocale}>
            <SnackbarProvider SnackbarProps={{ autoHideDuration: 5000 }}>
              <CssBaseline />

              {/* <div style={{ height: "100vh" }}> */}
                <Router>
                  {localStorage.getItem('user') ? (
                    <Switch>
                      <DashboardRoute path="/enler" component={Enler} />
                      <DashboardRoute path="/blog" component={BlogList} />
                      <DashboardRoute exact path="/" component={Dashboard} />
                      <DashboardRoute exact path="/status" component={ProfileStatus} />

                      <DashboardRoute exact path="/c" component={DanisanList} />
                      <DashboardRoute exact backButton="/c" path="/c/:danisan" component={DanisanView} />
                      
                      <DashboardRoute exact path="/cmt" component={CommentList} />

                      <DashboardRoute exact path="/m" component={MesajList} />
                      <DashboardRoute exact backButton="/m" path="/m/:danisan" viewParam="messages" component={DanisanView} />

                      <DashboardRoute path="/l/:linkId" component={AnemnezFormView} />
                      
                      <Route path="/d/:diyetisyenUserName" render={(props) => <Redirect to={`/${props.match.params.diyetisyenUserName}`} />}/>

                      <DashboardRoute exact path="/r" component={RandevuList} />
                      <DashboardRoute exact backButton="/r" path="/r/:danisan/messages" viewParam="messages" component={DanisanView} />
                      <DashboardRoute exact backButton="/r" path="/r/:date/:time" component={RandevuView} />

                      <DashboardRoute path="/me" component={MyProfile} />
                      {/* <DashboardRoute path="/f" component={NotImplementedYet} />
                      <DashboardRoute path="/kd" component={NotImplementedYet} /> */}

                      <EmptyRoute path="/signup" component={Register} />
                      <Route path="/fp" render={() => <Redirect to="/" />} />
                      <Route path="/rp" render={() => <Redirect to="/" />} />
                      <Route path="/signin" render={() => <Redirect to="/" />} />

                      <DashboardRoute exact path="/nimda" component={AdminView} />
                      <DashboardRoute exact path="/:diyetisyenUserName" component={NewRandevu} />
                      <DashboardRoute exact path="/:diyetisyenUserName/blog/:postName" component={BlogPage} />
                      <DashboardRoute exact path="/:diyetisyenUserName/anket" component={NewCommentPage} />
                      <EmptyRoute component={NotFound} />
                    </Switch>
                  ) : (
                    <Switch>
                      <DashboardNonSignedRoute path="/enler" component={Enler} />
                      <DashboardNonSignedRoute path="/blog" component={BlogList} />
                      
                      <DashboardNonSignedRoute path="/l/:linkId" component={AnemnezFormView} />

                      <Route path="/d/:diyetisyenUserName" render={(props) => <Redirect to={`/${props.match.params.diyetisyenUserName}`} />}/>

                      <DashboardNonSignedRoute path="/signup" component={Register} />
                      <DashboardNonSignedRoute path="/signin" component={Signin} />
                      <EmptyRoute path="/fp" component={ForgotPassword} />
                      <EmptyRoute path="/rp/:linkId" component={ResetPassword} />
                      <Route exact path="/" component={NewLandingPage2Tracked} />
                      <DashboardNonSignedRoute exact path="/:diyetisyenUserName" component={NewRandevu} />
                      <DashboardNonSignedRoute exact path="/:diyetisyenUserName/blog/:postName" component={BlogPage} />
                      <DashboardNonSignedRoute exact path="/:diyetisyenUserName/anket" component={NewCommentPage} />
                      <Redirect to="/" />
                    </Switch>
                  )}
                </Router>
              {/* </div> */}
            </SnackbarProvider>
          </MuiPickersUtilsProvider>
        </ThemeProvider>
      </MuiThemeProvider>
    );
  }
}

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
