import DateFnsUtils from '@date-io/date-fns';
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider } from "@material-ui/core/styles";
import withWidth from '@material-ui/core/withWidth';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { ThemeProvider } from "@material-ui/styles";
import trLocale from "date-fns/locale/tr";
import { SnackbarProvider } from 'material-ui-snackbar-provider';
import React, { Component, Suspense } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import CircularLoader from "./components/CircularLoader";
import withTracker from './components/Signin/PageTracker';
import EmptyLayout from "./layouts/EmptyLayout";
import MainLayout from "./layouts/MainLayout";

const MyProfile = React.lazy(() => import( "./containers/MyProfile/MyProfile"))
const ProfileStatus = React.lazy(() => import( "./containers/MyProfile/Status"))
const CommentList = React.lazy(() => import( "./containers/MyProfile/Comments"))
const NewCommentPage = React.lazy(() => import( './containers/MyProfile/NewCommentPage'))
const Signin = React.lazy(() => import( "./containers/Signin/Signin2"))
const Register = React.lazy(() => import( "./containers/Register/Register2"))
const MesajList = React.lazy(() => import( "./containers/Mesajlar/MesajList"))
const DanisanView = React.lazy(() => import( "./containers/Danisanlar/DanisanView"))
const DanisanList = React.lazy(() => import( "./containers/Danisanlar/DanisanList"))
const NewRandevu = React.lazy(() => import( "./containers/Randevu/NewRandevu"))
const BlogPage = React.lazy(() => import( "./containers/Randevu/BlogPage"))
const RandevuView = React.lazy(() => import( "./containers/Randevu/RandevuView"))
const RandevuList = React.lazy(() => import( "./containers/Randevu/RandevuList"))
const Enler = React.lazy(() => import( "./containers/Blog/Enler"))
const BlogList = React.lazy(() => import( "./containers/Blog/BlogList"))
const AnemnezFormView = React.lazy(() => import( './containers/AnemnezForm/AnemnezFormView'))

const ForgotPassword = React.lazy(() => import('./containers/Register/ForgotPassword'))
const ResetPassword = React.lazy(() => import('./containers/Register/ResetPassword'))
const AdminView = React.lazy(() => import('./containers/Admin/AdminView'))
const Dashboard = React.lazy(() => import('./containers/Dashboard/Dashboard'))
const NewLandingPage2 = React.lazy(() => import('./containers/LandingPage/NewLandingPage2'));
const Calendar = React.lazy(() => import("./containers/Randevu/Calendar"));

const NotFound = () => {
  return <div>NotFound</div>;
};

const NewLandingPage2Tracked = withTracker(NewLandingPage2);

const DashboardRoute = withTracker(withWidth()(({ width, component: Component, backButton, viewParam, ...rest }) => {

  return (
    <Route
      {...rest}
      render={matchProps => 
        <MainLayout component={Component} viewParam={viewParam} backButton={backButton} sideBar={true} permanentDrawer={width != 'xs' && width != 'sm' ? true : false} {...matchProps}>
        </MainLayout>
      }
    />
  );
}));

const DashboardNonSignedRoute = withTracker(withWidth()(({ width, component: Component, backButton, viewParam, ...rest }) => {

  return (
    <Route
      {...rest}
      render={matchProps => 
        <MainLayout component={Component} viewParam={viewParam} backButton={backButton} sideBar={false} permanentDrawer={width != 'xs' && width != 'sm' ? true : false} {...matchProps}>
        </MainLayout>
      }
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
                        <DashboardRoute exact path="/enler" component={Enler} />
                        <DashboardRoute exact path="/blog" component={BlogList} />
                        <Route exact path="/" render={(props) => <Redirect to={`/t`} />} />
                        <DashboardRoute exact path="/home" component={Dashboard} />
                        <DashboardRoute exact path="/status" component={ProfileStatus} />

                        <DashboardRoute exact path="/c" component={DanisanList} />
                        <DashboardRoute exact backButton="/c" path="/c/:danisan" component={DanisanView} />
                        
                        <DashboardRoute exact path="/cmt" component={CommentList} />

                        <DashboardRoute exact path="/m" component={MesajList} />
                        <DashboardRoute exact backButton="/m" path="/m/:danisan" viewParam="messages" component={DanisanView} />

                        <DashboardRoute path="/l/:linkId" component={AnemnezFormView} />
                        
                        <Route path="/d/:diyetisyenUserName" render={(props) => <Redirect to={`/${props.match.params.diyetisyenUserName}`} />}/>

                        <DashboardRoute exact path="/t" component={Calendar} />
                        <DashboardRoute exact path="/r" component={RandevuList} />
                        <DashboardRoute exact backButton="/r" path="/r/:danisan/messages" viewParam="messages" component={DanisanView} />
                        <DashboardRoute exact backButton="/r" path="/r/:date/:time" component={RandevuView} />

                        <DashboardRoute exact path="/me" component={MyProfile} />
                        {/* <DashboardRoute path="/f" component={NotImplementedYet} />
                        <DashboardRoute path="/kd" component={NotImplementedYet} /> */}

                        <DashboardNonSignedRoute path="/signup" component={Register} />
                        <Route exact path="/fp" render={() => <Redirect to="/" />} />
                        <Route exact path="/rp" render={() => <Redirect to="/" />} />
                        <Route exact path="/signin" render={() => <Redirect to="/" />} />

                        <DashboardRoute exact path="/nimda" component={AdminView} />
                        <DashboardRoute exact path="/:diyetisyenUserName" component={NewRandevu} />
                        <DashboardRoute exact path="/:diyetisyenUserName/blog/:postName" component={BlogPage} />
                        <DashboardRoute exact path="/:diyetisyenUserName/anket" component={NewCommentPage} />
                        <EmptyRoute component={NotFound} />
                      </Switch>
                    ) : (
                      <Suspense fallback={<CircularLoader />}>
                        <Switch>
                          <DashboardNonSignedRoute exact path="/enler" component={Enler} />
                          <DashboardNonSignedRoute exact path="/blog" component={BlogList} />
                          
                          <DashboardNonSignedRoute path="/l/:linkId" component={AnemnezFormView} />

                          <Route path="/d/:diyetisyenUserName" render={(props) => <Redirect to={`/${props.match.params.diyetisyenUserName}`} />}/>

                          <DashboardNonSignedRoute exact path="/signup" component={Register} />
                          <DashboardNonSignedRoute exact path="/signin" component={Signin} />
                          <EmptyRoute exact path="/fp" component={ForgotPassword} />
                          <EmptyRoute path="/rp/:linkId" component={ResetPassword} />
                          <Route exact path="/" component={NewLandingPage2Tracked} />
                          <DashboardNonSignedRoute exact path="/:diyetisyenUserName" component={NewRandevu} />
                          <DashboardNonSignedRoute exact path="/:diyetisyenUserName/blog/:postName" component={BlogPage} />
                          <DashboardNonSignedRoute exact path="/:diyetisyenUserName/anket" component={NewCommentPage} />
                          <Redirect to="/" />
                        </Switch>
                      </Suspense>
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
