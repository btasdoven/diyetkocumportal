import React from "react";
import Card from "@material-ui/core/Card";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import SigninForm from "../components/Signin";
import { login } from "../store/reducers/authenticate";
import { Field, reduxForm } from "redux-form";

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import green from '@material-ui/core/colors/green';

// const styles = () => ({
//   root: {
//     height: "inherit",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center"
//   },
//   card: {
//     width: "350px",
//     height: "300px"
//   }
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
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
  registerTypo: {
    marginTop: theme.spacing.unit * 3,
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
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

const Signin = props => {
  const { login, classes, auth } = props;
  return (
    // <div className={classes.root}>
    //   <Card className={classes.card}>
    //     <SigninForm auth={auth} onSubmit={(v) => {
    //       login(v.username, v.password);
    //     }} />
    //   </Card>
    // </div>
    <div className={classes.root}>
    <div className={classes.main}>
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockIcon />
        </Avatar>
        <Typography component="h2" variant="headline">
          Log into your account
        </Typography>

        <SigninForm auth={auth} onSubmit={(v) => {
          login(v.username, v.password);
        }} />

        <Typography component="h4" variant="subheading" className={classes.registerTypo}>
          Don't you have an account?
        </Typography>
        <Button
          fullWidth
          variant="contained"
          color="secondary"
        >
          Register for free!
        </Button>
      </Paper>
    </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      login: login
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Signin));

