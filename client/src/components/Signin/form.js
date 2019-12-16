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

// const styles = (theme) => ({
//   grid: {
//     padding: "20px",
//     display: "grid",
//     gridTemplateRows: "85px 1fr 1fr 1fr",
//     height: "inherit"
//   },
//   wrapper: {
//     margin: theme.spacing,
//     position: 'relative',
//   },
//   buttonSuccess: {
//     backgroundColor: green[500],
//     '&:hover': {
//       backgroundColor: green[700],
//     },
//   },
//   buttonProgress: {
//     color: green[500],
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     marginTop: -12,
//     marginLeft: -12,
//   },
//   root: {
//     display: 'flex',
//     alignItems: 'center',
//   },
// });

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
    top: '50%',
    left: 'calc(50% - 12px)',
  },
  buttonRoot: {
    display: 'flex',
    alignItems: 'center',
  },
  buttonWrapper: {
    position: 'relative',
    width: '100%',
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
  />
)

const SigninForm = props => {
  const { auth, handleSubmit, onSubmit, classes } = props;
  const buttonClassname = classNames({
    [classes.buttonSuccess]: auth && auth.loggedIn,
  });

  return (
    // <form onSubmit={handleSubmit(onSubmit)} className={classes.grid}>
    //   <div>
    //     <Typography
    //       align="left"
    //       headlineMapping={{ display: "h1" }}
    //       variant="headline"
    //     >
    //       Monagard
    //     </Typography>
    //   </div>
    //   <Field
    //     required
    //     name="username"
    //     component={renderTextField}
    //     label="Username"
    //     autoFocus={true}
    //   />
    //   <Field
    //     required
    //     name="password"
    //     type="password"
    //     component={renderTextField}
    //     label="Password"
    //   />
    //   <div className={classes.root}>
    //     <div className={classes.wrapper}>
    //       <Button
    //         type="submit"
    //         variant="contained"
    //         color="primary"
    //         className={buttonClassname}
    //         disabled={auth && auth.loggingIn}
    //         onClick={this.handleButtonClick}
    //       >
    //       Login
    //       </Button>
    //       {auth && auth.loggingIn && <CircularProgress size={24} className={classes.buttonProgress} />}
    //     </div>
    //   </div>
    // </form>
    <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
      <FormControl margin="normal" required fullWidth>
        <Field
          required
          id="username"
          name="username"
          component={renderTextField}
          label="Username"
          autoComplete="username"
          autoFocus={true}
        />
      </FormControl>
      <FormControl margin="normal" required fullWidth>
        <Field
          required
          id="password"
          name="password"
          type="password"
          component={renderTextField}
          label="Password"
          autoComplete="current-password"
        />
      </FormControl>
      <FormControlLabel
        control={<Checkbox value="remember" color="primary" />}
        label="Remember me"
      />
      <div className={classes.buttonRoot}>
      <div className={classes.buttonWrapper}>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          disabled={auth && auth.loggingIn}
        >
          Sign in
        </Button>
        {auth && auth.loggingIn && <CircularProgress size={24} className={classes.buttonProgress} />}
      </div>
      </div>
    </form>
  );
};

export default reduxForm({
  // a unique name for the form
  initialValues: {
    username: 'ediz',
    password: '1234'
  },
  form: "login"
})(withStyles(styles)(SigninForm));
