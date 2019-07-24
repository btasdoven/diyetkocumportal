import React, { Fragment, Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Header from "../components/Header";
import BottomBar from "../components/BottomBar";
import { logout } from "../store/reducers/authenticate";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: "flex",
    //backgroundColor: "red",
  },
  content: {
    flexGrow: 1,
    marginBottom: theme.spacing(7),
    //marginLeft: theme.spacing(7),
    padding: theme.spacing(1),
    marginTop: theme.spacing(7),
    overflowX: "hidden"
  },
  contentShift: {
    marginLeft: 0, //drawerWidth,
    width: '100%', //`calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  }
});

class MainLayoutBottomNav extends Component {
  state = {
    open: false
  };

  handleToggleDrawer = () => {
    this.setState(prevState => {
      return { open: !prevState.open };
    });
  };

  render() {
    const { classes, children } = this.props;
    return (
      <Fragment>
        <div className={classes.root}>
          <Header
            logout={this.props.logout}
            handleToggleDrawer={this.handleToggleDrawer}
          />
          <main
            className={classNames(classes.content, {
              [classes.contentShift]: false
            })}
          >
            {children}
          </main>
        </div>
        <BottomBar />
      </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      logout: () => logout()
    },
    dispatch
  );
};

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(MainLayoutBottomNav));
