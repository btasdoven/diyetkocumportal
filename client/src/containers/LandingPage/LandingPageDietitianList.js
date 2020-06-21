
import ExtendedLink from '../../components/ExtendedLink'
import CircularProgress from '@material-ui/core/CircularProgress';

import { withStyles } from '@material-ui/core/styles';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import React, { Fragment } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { Link } from "react-router-dom";
import { registerEvent, trackPage } from '../../components/Signin/PageTracker'
import { getAllDietitians } from '../../store/reducers/api.allDietitians';

import { userService } from '../../services/user.service'

const styles = theme => ({
  root: {
    // maxWidth: 400,
    overflow: 'hidden',
    flexGrow: 1,
    backgroundColor: 'white'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    height: 50,
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
  },
  img: {
    height: theme.spacing(8),
    width: theme.spacing(8),
    // marginRight: '16px'
    // maxWidth: 400,
    // overflow: 'hidden',
    // display: 'block',
    // width: '100%',
  },
  avatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    margin: theme.spacing(0.25)
  },
  dietitanList: {
    paddingLeft: '0 !important',
    paddingRight: '0 !important',
  },
  rootLoading: {
      height: "inherit",
      display: "flex",
      justifyContent: "center",
      width: '100%',
      alignItems: "center",
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(2),
      //textAlign: 'center',
  },
});

function renderLoadingButton(classes) {
  return (
    <div className={classes.rootLoading}>
      <CircularProgress size={24} className={classes.buttonProgress} />
    </div>
  )
} 

class DietianList extends React.Component {
  constructor(props) {
    super(props)

    this.isLoaded = this.isLoaded.bind(this);

    this.state = {
      openDialog: false
    }
  }

  isLoaded() {
    var loaded = this.props.apiAllDietitians != undefined &&
      this.props.apiAllDietitians.isGetLoading != true &&
      this.props.apiAllDietitians.data != undefined;

      return loaded;
  }

  componentDidMount() {
    if (!this.isLoaded()) {
      this.props.getAllDietitians();
    }
  }

  render() {
    const { classes } = this.props;
    const showLoader = !this.isLoaded();
    const dietitians = showLoader ? undefined : this.props.apiAllDietitians.data;

    return (
      <Fragment>
        { showLoader && renderLoadingButton(classes) }
        { !showLoader && (
          <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
            {dietitians.map((step, index) => (
              <Fragment key={index}>
                <Avatar 
                  component={ExtendedLink} 
                  to={`/${dietitians[index].username}`} 
                  className={classes.avatar} 
                  src={userService.getStaticFileUri(dietitians[index].url64)} 
                  alt={dietitians[index].name} 
                />
              </Fragment>
            ))}
          </div>
        )}
      </Fragment>
    )
  }
};

const mapStateToProps = (state, ownProps) => {
  return {
    apiAllDietitians: state.apiAllDietitians,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getAllDietitians: () => getAllDietitians(),
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(DietianList));