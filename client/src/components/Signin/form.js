import React, { PropTypes } from 'react';
import { Field, reduxForm } from "redux-form";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";

import classNames from 'classnames';
import CircularProgress from '@material-ui/core/CircularProgress';
import green from '@material-ui/core/colors/green';

const styles = (theme) => ({
  grid: {
    padding: "20px",
    display: "grid",
    gridTemplateRows: "85px 1fr 1fr 1fr",
    height: "inherit"
  },
  wrapper: {
    margin: theme.spacing.unit,
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  root: {
    display: 'flex',
    alignItems: 'center',
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
    <form onSubmit={handleSubmit(onSubmit)} className={classes.grid}>
      <div>
        <Typography
          align="left"
          headlineMapping={{ display: "h1" }}
          variant="headline"
        >
          Monagard
        </Typography>
      </div>
      <Field
        required
        name="username"
        component={renderTextField}
        label="Username"
        autoFocus={true}
      />
      <Field
        required
        name="password"
        type="password"
        component={renderTextField}
        label="Password"
      />
        <div className={classes.wrapper}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={buttonClassname}
            disabled={auth && auth.loggingIn}
            onClick={this.handleButtonClick}
          >
          Login
          </Button>
          {auth && auth.loggingIn && <CircularProgress size={24} className={classes.buttonProgress} />}
        </div>
    </form>
  );
};

export default reduxForm({
  // a unique name for the form
  form: "login"
})(withStyles(styles)(SigninForm));
