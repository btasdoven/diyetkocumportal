import React, { Fragment, Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

import { withRouter } from 'react-router'
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { logout } from "../store/reducers/authenticate";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: "flex"
  },
  content: {
    flexGrow: 1,
    //marginLeft: theme.spacing(7),
    //padding: theme.spacing(1),
    marginTop: theme.spacing(6),
    overflowX: "hidden"
  },
  contentShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  }
});

class MainLayout extends Component {
  state = {
    open: false
  };

  handleOpenDrawer = () => {
    this.setState(prevState => {
      return { open: true };
    });
  };

  handleCloseDrawer = () => {
    this.setState(prevState => {
      return { open: false };
    });
  };

  handleToggleDrawer = () => {
    this.setState(prevState => {
      return { open: !prevState.open };
    });
  };

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.handleCloseDrawer();
    }
  }

  render() {
    const { classes, children } = this.props;
    return (
      <Fragment>
        <div className={classes.root}>
          <Header
            permanentDrawer={this.props.permanentDrawer} 
            backButton={this.props.backButton}
            logout={this.props.logout}
            handleOpenDrawer={this.handleToggleDrawer}
          />
          <main
            className={classNames(classes.content, {
              [classes.contentShift]: this.props.permanentDrawer
            })}
          >
            {children}
          </main>
        </div>
        
        {/* <ClickAwayListener mouseEvent={false} onClickAway={() => this.handleCloseDrawer()}> */}
          <Sidebar 
            permanentDrawer={this.props.permanentDrawer} 
            logout={this.props.logout}
            open={this.props.permanentDrawer ? true : this.state.open} handleClose={this.handleCloseDrawer} drawerWidth={drawerWidth} />
        {/* </ClickAwayListener> */}
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
)(withStyles(styles)(withRouter(MainLayout)));
