import React, { PropTypes } from 'react';
import { Field, reduxForm } from "redux-form";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";

const styles = () => ({
  grid: {
    padding: "20px",
    display: "grid",
    gridTemplateRows: "85px 1fr 1fr 1fr",
    height: "inherit"
  },
  buttons: {
    display: "flex",
    justifyContent: "end",
    alignItems: "center"
  }
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
        name="username"
        component={renderTextField}
        label="Username"
      />
      <Field
        name="password"
        type="password"
        component={renderTextField}
        label="Password"
      />
      <div className={classes.buttons}>
        <Button
          type="submit"
          color="primary"
          variant="contained"
          disabled={auth && auth.loggingIn}
        >
          { auth && auth.loggingIn ? "Signing in..." : "Sign In" }
        </Button>
      </div>
    </form>
  );
};

export default reduxForm({
  // a unique name for the form
  form: "login"
})(withStyles(styles)(SigninForm));
