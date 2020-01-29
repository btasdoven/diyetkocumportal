import React, { PropTypes } from 'react';
import { Field, reduxForm } from "redux-form";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

import classNames from 'classnames';
import CircularProgress from '@material-ui/core/CircularProgress';
import green from '@material-ui/core/colors/green';

import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import { Link } from "react-router-dom";

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
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    marginTop: theme.spacing(3),
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: 'calc(50% - 12px)',
    left: 'calc(50% - 12px)',
  },
  buttonRoot: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '8px',
  },
  buttonWrapper: {
    position: 'relative',
    width: '100%',
  },
  registerTypo: {
    marginTop: theme.spacing(3),
    textAlign: 'center',
  },
});

const renderTextField = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => (
  <TextField
    label={label}
    {...input}
    {...custom}
    error={touched && error != undefined}
    helperText={touched && error ? error : undefined}
  />
)

const required = value => value ? undefined : 'Zorunlu'

class SigninForm extends React.Component {
  constructor(props) {
    super(props)

    this.handleDemoLogin = this.handleDemoLogin.bind(this)
    this.handleLogin = this.handleLogin.bind(this)

    this.state = {
      isDemoLogin: false
    }
  }

  handleLogin() {
    this.setState({isDemoLogin: false})

    setTimeout(() => {
      const submitter = this.props.handleSubmit(this.props.onSubmit);
      submitter();
    }, 0);
  }

  handleDemoLogin() {
    this.props.change("username", "demo");
    this.props.change("password", "1234");
    this.setState({isDemoLogin: true})

    setTimeout(() => {
      const submitter = this.props.handleSubmit(this.props.onSubmit);
      submitter();
    }, 0);
  }

  render() {
    const { auth, handleSubmit, onSubmit, classes } = this.props;

    return (
      <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
        <FormControl margin="normal" fullWidth>
          <Field
            required
            id="username"
            name="username"
            component={renderTextField}
            label="Kullanıcı Adı"
            autoComplete="username"
            autoFocus={false}
            validate={[required]}
          />
        </FormControl>
        <FormControl margin="normal" fullWidth>
          <Field
            required
            id="password"
            name="password"
            type="password"
            component={renderTextField}
            label="Şifre"
            autoComplete="current-password"
            validate={[required]}
          />
        </FormControl>
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Beni hatırla"
        />
        
        {auth && auth.error && (
          <Typography color="error" variant="body1">
              {auth.error}
          </Typography>
        )}

        <div className={classes.buttonRoot}>
        <div className={classes.buttonWrapper}>
          <Button
            onClick={this.handleLogin}
            disableElevation
            fullWidth
            variant="contained"
            color="primary"
            disabled={auth && auth.loggingIn}
          >
            GİRİŞ YAP
          </Button>
          {auth && auth.loggingIn && <CircularProgress size={24} className={classes.buttonProgress} />}
        </div>
        </div>

        <Typography component="h4" variant="subtitle1" className={classes.registerTypo}>
          Hesabın yok mu?
        </Typography>
        {/* <div className={classes.buttonRoot}>
        <div className={classes.buttonWrapper}>
          <Button
            onClick={this.handleDemoLogin}
            fullWidth
            variant="outlined"
            color="primary"
            disabled={auth && auth.loggingIn}
          >
            DEMO GİRİŞİ
          </Button>
          {auth && auth.loggingIn && this.state.isDemoLogin && <CircularProgress size={24} className={classes.buttonProgress} />}
        </div>
        </div> */}

        <div className={classes.buttonRoot}>
        <div className={classes.buttonWrapper}>
          <Button
            fullWidth
            disableElevation
            variant="contained"
            color="secondary"
            component={Link}
            to="/signup"
          >
            ŞİMDİ KAYIT YAPTIR!
          </Button>
        </div>
        </div>
      </form>
    );
  }
}

export default reduxForm({
  initialValues: {
    // username: 'demo',
    // password: '1234'
  },
  form: "login"
})(withStyles(styles)(SigninForm));
