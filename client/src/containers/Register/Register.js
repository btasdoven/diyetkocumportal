import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Review from './Review';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { signup } from "../../store/reducers/authenticate";

import RegisterForm from '../../components/Register'

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Link } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
  root: {
    height: "inherit",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up(400 + theme.spacing(6))]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(7),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`,
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  registerTypo: {
    marginTop: theme.spacing(3),
    textAlign: 'center',
  },
});

const steps = ['','','','','', '','','','',''];

class Register extends React.Component {
  state = {
    activeStep: 0,
    responses: [],
  };

  getStepContent(step) {
    switch (step) {
      case 0:
        return <AddressForm 
          question="Sence andimiz ilkokul ve ortaokulda ders oncesi okutulmali midir?"
          choices={["Okutulmalidir", "Okutulmamalidir"]}
          response={this.state.responses[step]}
          handleResponse={this.handleResponse}
          handleNext={this.handleNext}/>;
      case 1:
        return <AddressForm 
          question="Sence FETO'nun siyasi ayagi ortaya cikartilmali midir?"
          choices={["Cikartirmalidir", "Cikartilmamalidir"]}
          response={this.state.responses[step]}
          handleResponse={this.handleResponse}
          handleNext={this.handleNext}/>;
      case 2:
        return <Review />;
      default:
        throw new Error('Unknown step');
    }
  }

  handleResponse = (response) => {
    this.state.responses[this.state.activeStep] = response;
    this.setState(this.state);
  }

  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1,
    }));
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  render() {
    const { signup, classes, auth } = this.props;
    const { activeStep } = this.state;

    return (
      <React.Fragment>
      <CssBaseline />
        <div className={classes.root}>
        <div className={classes.main}>
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>

            {/* <Typography style={{textAlign:'center'}} component="h2" variant="h5">
              Diyet Koçum Portalına Kaydol
            </Typography> */}

            {(!auth || auth.signedUp != true) && (
              <span>
                <RegisterForm auth={auth} onSubmit={(v) => {
                  console.log(v)
                  signup(v.username, v);
                }} />
                <Typography component="h4" variant="subtitle1" className={classes.registerTypo}>
                  Zaten hesabın var mı?
                </Typography>
                <Button
                  fullWidth
                  variant="contained"
                  color="secondary"
                  component={Link}
                  to="/"
                >
                  GİRİŞ YAP
                </Button> 
              </span>
            )}
            {auth && auth.signedUp == true && (
              <Typography style={{marginTop: '16px', textAlign: 'center'}}>
                Üyeliğiniz başarıyla oluşturuldu. 1 gün içerisinde tarafımızdan onaylandıktan sonra sisteme giriş yapabileceksiniz.
              </Typography>
            )}
            {/* {auth && auth.signedUp == true && (
              <form className={classes.form} noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="fname"
                      name="firstName"
                      variant="outlined"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="lname"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={<Checkbox value="allowExtraEmails" color="primary" />}
                      label="I want to receive inspiration, marketing promotions and updates via email."
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Sign Up
                </Button>
                <Grid container justify="flex-end">
                  <Grid item>
                    <Link href="#" variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </form>
            )} */}
          </Paper>
        </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      signup: signup
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Register));