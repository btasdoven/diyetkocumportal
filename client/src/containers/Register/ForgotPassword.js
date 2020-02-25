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
import { requestNewPasswordEmail } from "../../store/reducers/authenticate";

import ForgotPasswordForm from './ForgotPasswordForm'

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

class Register extends React.Component {
  render() {
    const { requestNewPasswordEmail, classes, auth } = this.props;

    return (
      <React.Fragment>
      <CssBaseline />
        <div className={classes.root}>
        <div className={classes.main}>
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>

            <Typography style={{textAlign:'center'}} component="h1" variant="h6">
              Şifremi Unuttum
            </Typography>

            {(!auth || auth.sentForgotPasswordEmail != true) && (
              <span>
                <ForgotPasswordForm auth={auth} onSubmit={(v) => {
                  console.log(v)
                  requestNewPasswordEmail(v.username, v);
                }} />
                {/* <Typography component="h4" variant="subtitle1" className={classes.registerTypo}>
                  Zaten hesabın var mı?
                </Typography>
                <Button
                  fullWidth
                  disableElevation
                  variant="contained"
                  color="secondary"
                  component={Link}
                  to="/signin"
                >
                  GİRİŞ YAP
                </Button>  */}
              </span>
            )}
            {auth && auth.sentForgotPasswordEmail == true && (
              <span>
                <Typography style={{marginTop: '16px', textAlign: 'center'}}>
                  Eğer girdiğin bilgiler sistemimizdeki bilgiler ile eşleşiyorsa sistemimizde kayıtlı olan e-posta adresine şifre yenileme linki gönderilecektir.
                </Typography>
                <Button
                  style={{marginTop: '32px'}}
                  disableElevation
                  fullWidth
                  variant="contained"
                  color="primary"
                  component={Link}
                  to="/"
                >
                  ANA SAYFAYA GERİ DÖN
                </Button> 
              </span>
            )}
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
      requestNewPasswordEmail: requestNewPasswordEmail
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Register));