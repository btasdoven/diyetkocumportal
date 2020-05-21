
import CardActionArea from '@material-ui/core/CardActionArea';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import green from '@material-ui/core/colors/green';
import Image from 'material-ui-image'
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import { withTheme, makeStyles, withStyles } from '@material-ui/core/styles';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import SvgIcon from '@material-ui/core/SvgIcon';
import { Link } from "react-router-dom";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import SendIcon from '@material-ui/icons/Send';
import Divider from '@material-ui/core/Divider';
import IntroInstaVideo from '../../components/IntroInstaVideo'
import { WhatsappIcon } from "react-share";
import Fab from '@material-ui/core/Fab';
import Zoom from '@material-ui/core/Zoom';
import SpeedDial from '../SpeedDial/SpeedDial'
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';

import CardHeader from '@material-ui/core/CardHeader';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import { Form, Field, reduxForm } from "redux-form";
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MaskedInput from 'react-text-mask';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Select from '@material-ui/core/Select';
import Switch from '@material-ui/core/Switch';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Check from '@material-ui/icons/Check';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import StepConnector from '@material-ui/core/StepConnector';

import SwipeableViews from 'react-swipeable-views';
import { signup } from "../../store/reducers/authenticate";
import { userService } from '../../services/user.service'
import { registerEvent, trackPage } from '../../components/Signin/PageTracker'
import { getAllPosts } from '../../store/reducers/api.allPosts';

import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import HeaderV2 from "../../components/Header/HeaderV2";

import moment from "moment";
import 'moment/locale/tr'
moment.locale('tr')

const styles = theme => ({
  layoutToolbar: {
    width: 'auto',
    color: '#262626',
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    padding: 0,
    // flexDirection: 'row',
    // display: 'flex',
    justifyContent: 'space-between',
    minHeight: theme.spacing(7),
    [theme.breakpoints.up(750 + theme.spacing(6))]: {
      width: 750,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: 'calc(50% - 12px)',
    left: 'calc(50% - 12px)',
  },
  rootLoading: {
      height: "inherit",
      display: "flex",
      justifyContent: "center",
      width: '100%',
      alignItems: "center",
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(2),
      //textAlign: 'center',
  },
  root: {
    margin: theme.spacing(2),
    marginBottom: theme.spacing(2),
    marginTop: 0,
  },
  media: {
    height: '0',
    paddingTop: '125%',
    borderRadius: '12px',
  },
  avatar: {
      width: theme.spacing(7),
      height: theme.spacing(7),
      //paddingRight: theme.spacing(1),
  },
  imgContainer: {
    display: 'flex', 
    overflowX: 'auto',
    '&::-webkit-scrollbar': {
      display: 'none',
    }
  }
});

function groupBy(xs, key) {
  return xs.reduce(function(rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};

function renderLoadingButton(classes) {
    return (
      <div className={classes.rootLoading}>
        <CircularProgress size={24} className={classes.buttonProgress} />
      </div>
    )
  } 

class LandingPage extends React.Component {

  constructor(props) {
    super(props)

    this.isLoaded = this.isLoaded.bind(this);
  }

  componentDidMount() {
    if (!this.isLoaded()) {
        this.props.getAllPosts();
    }
  }

  isLoaded() {
    var loaded = this.props.apiAllPosts != undefined &&
      this.props.apiAllPosts.isGetLoading != true &&
      this.props.apiAllPosts.data != undefined;

      return loaded;
  }

  render() {
    const { classes } = this.props;
    const showLoader = !this.isLoaded();
    const posts = showLoader ? undefined : this.props.apiAllPosts.data;
    const postsPerUser = showLoader ? undefined : groupBy(posts, 'userId');
    const ratio = 40;

    return (
      <React.Fragment >
        <CssBaseline />

        <HeaderV2 static 
          onBackButton={"/"}
          title={"BLOG YAZILARI"}
        />

        <main className={classes.layoutToolbar} style={{margin:'auto'}}>
            { showLoader && renderLoadingButton(classes) }
            { !showLoader && Object.keys(postsPerUser).map((userId) => {
                if (postsPerUser[userId].filter(post => post.postImg != undefined).length == 0) {
                  return;
                }

                return (
                  <Card elevation={0} key={userId} style={{marginBttom: '16px'}}>
                    <CardActionArea component={Link} to={{ pathname: `/${userId}`, state: {fromUrl: '/blog'}}} >
                      <CardHeader
                        style={{paddingLeft: '24px', paddingBottom: '8px'}}
                        avatar={
                          <Avatar src={userService.getStaticFileUri(postsPerUser[userId][0].userImg)} className={classes.avatar} />
                        }
                        // action={
                        //   <IconButton aria-label="settings">
                        //     <MoreVertIcon />
                        //   </IconButton>
                        // }
                        title={postsPerUser[userId][0].userFullName}
                        subheader={postsPerUser[userId][0].userUnvan || 'Diyetisyen'}
                      />
                      {/* <CardMedia
                        className={classes.media}
                        image={userService.getStaticFileUri(post.postImg || '')}
                        title="Paella dish"
                      /> */}
                      </CardActionArea>
                      <CardContent style={{padding: 0}}>
                        <div className={classes.imgContainer}>
                          {postsPerUser[userId].filter(post => post.postImg != undefined).map((post, idx) => 
                            <Link
                              key={userId}
                              to={{pathname: `/${userId}/blog/${post.postId}`, state: {fromUrl: '/blog'}}}
                            >
                              <Image
                                imageStyle={{ left: idx == 0 ? '8px' : 0, borderRadius: '8px', width: `calc(${ratio}vw)`}}
                                style={{paddingLeft: `calc(${ratio}vw + ${idx == 0 ? '8px' : '0px'})`, paddingRight: '8px', paddingTop: `${1920.0/1080.0 * ratio}vw`, width: `${ratio}vw`}}
                                aspectRatio={1080.0/1920}
                                src={userService.getStaticFileUri(post.postImg || '') }
                              /> 
                            </Link>
                          )}
                        </div>
                      </CardContent>
                    {/* <CardActions disableSpacing>
                      <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                      </IconButton>
                      <IconButton aria-label="share">
                        <ShareIcon />
                      </IconButton>
                    </CardActions> */}
                  </Card>
                )
              })
            }
        </main>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
    return {
        apiAllPosts: state.apiAllPosts,
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return bindActionCreators(
      {
        getAllPosts: () => getAllPosts(),
      },
      dispatch
    );
  };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTheme(withStyles(styles)(LandingPage)));