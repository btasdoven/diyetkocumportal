import React from "react";
import Card from "@material-ui/core/Card";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import SigninForm from "../components/Signin";
import { login } from "../store/reducers/authenticate";

const styles = () => ({
  root: {
    height: "inherit",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  card: {
    width: "350px",
    height: "300px"
  }
});

const Signin = props => {
  const { login, classes, auth } = props;
  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <SigninForm auth={auth} onSubmit={(v) => {
          login(v.username, v.password);
        }} />
      </Card>
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
