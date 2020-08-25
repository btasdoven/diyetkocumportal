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
        <MainLayout component={Component} viewParam={viewParam} backButton={backButton} sideBar={true} permanentDrawer={width != 'xs' && width != 'sm' ? true : false} {...matchProps}>
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
        <Suspense fallback={<CircularLoader />}>
          {/* <EmptyLayout> */}
            <Component {...matchProps} />
          {/* </EmptyLayout> */}
        </Suspense>
      )}
    />
  );
});

class App extends Component {

  render() {
    const { settings } = this.props;
    const localUser = localStorage.getItem('user');

    return (
      <MuiThemeProvider theme={settings.theme}>
        <ThemeProvider theme={settings.theme}>
          <MuiPickersUtilsProvider utils={DateFnsUtils} locale={trLocale}>
            <SnackbarProvider SnackbarProps={{ autoHideDuration: 5000 }}>
              <CssBaseline />
              <Router>
                <Switch>
                  <DashboardNonSignedRoute exact path="/signup" component={Register} />
                  <Route path="/d/:diyetisyenUserName" render={(props) => <Redirect to={`/${props.match.params.diyetisyenUserName}`} />}/>
                  {/* <Route path="/diyetisyen/:diyetisyenUserName" render={(props) => <Redirect to={`/${props.match.params.diyetisyenUserName}`} />}/> */}
                  
                  {localUser && <Route exact path="/" render={(props) => <Redirect to={`/t`} />} />}
                  {!localUser && <EmptyRoute exact path="/" component={NewLandingPage2Tracked} />}

                  {localUser && <DashboardRoute exact path="/enler" component={Enler} />}
                  {!localUser && <DashboardNonSignedRoute exact path="/enler" component={Enler} />}

                  {localUser && <DashboardRoute exact path="/blog" component={BlogList} />}
                  {!localUser && <DashboardNonSignedRoute exact path="/blog" component={BlogList} />}

                  {localUser && <DashboardRoute path="/l/:linkId" component={AnemnezFormView} />}
                  {!localUser && <DashboardNonSignedRoute path="/l/:linkId" component={AnemnezFormView} />}

                  {localUser && <Route exact path="/signin" render={() => <Redirect to="/" />} />}
                  {!localUser && <DashboardNonSignedRoute exact path="/signin" component={Signin} />}

                  {localUser && <Route exact path="/fp" render={() => <Redirect to="/" />} />}
                  {!localUser && <EmptyRoute exact path="/fp" component={ForgotPassword} />}
                  
                  {localUser && <Route exact path="/rp/:linkId" render={() => <Redirect to="/" />} />}
                  {!localUser && <EmptyRoute path="/rp/:linkId" component={ResetPassword} />}

                  {localUser && <DashboardRoute exact path="/home" component={Dashboard} />}
                  {localUser && <DashboardRoute exact path="/status" component={ProfileStatus} />}
                  {localUser && <DashboardRoute exact path="/cmt" component={CommentList} />}
                  {localUser && <DashboardRoute exact path="/c" component={DanisanList} />}
                  {localUser && <DashboardRoute exact backButton="/c" path="/c/:danisan" component={DanisanView} />}
                  {localUser && <DashboardRoute exact path="/m" component={MesajList} />}
                  {localUser && <DashboardRoute exact backButton="/m" path="/m/:danisan" viewParam="messages" component={DanisanView} />}
                  {localUser && <DashboardRoute exact path="/c/:danisan/measurements" viewParam="measurements" component={DanisanView} />}
                  {localUser && <DashboardRoute exact path="/t" component={Calendar} />}
                  {localUser && <DashboardRoute exact path="/r" component={RandevuList} />}
                  {localUser && <DashboardRoute exact backButton="/r" path="/r/:danisan/messages" viewParam="messages" component={DanisanView} />}
                  {localUser && <DashboardRoute exact backButton="/r" path="/r/:date/:time" component={RandevuView} />}
                  {localUser && <DashboardRoute exact path="/me" component={MyProfile} />}
                  {localUser && <DashboardRoute exact path="/nimda" component={AdminView} />}

                  {localUser && <DashboardRoute exact path="/:diyetisyenUserName" component={NewRandevu} />}
                  {!localUser && <DashboardNonSignedRoute exact path="/:diyetisyenUserName" component={NewRandevu} />}
                  
                  {localUser && <DashboardRoute exact path="/:diyetisyenUserName/blog/:postName" component={BlogPage} />}
                  {!localUser && <DashboardNonSignedRoute exact path="/:diyetisyenUserName/blog/:postName" component={BlogPage} />}

                  {localUser && <DashboardRoute exact path="/:diyetisyenUserName/anket" component={NewCommentPage} />}
                  {!localUser && <DashboardNonSignedRoute exact path="/:diyetisyenUserName/anket" component={NewCommentPage} />}

                  {localUser && <EmptyRoute component={NotFound} />}
                  {!localUser && <Redirect to="/" />}
                </Switch>
              </Router>
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
