import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Link } from "react-router-dom";

import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import InputBase from '@material-ui/core/InputBase';
import CardContent from "@material-ui/core/CardContent";
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from "@material-ui/core/CardActionArea";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import SearchIcon from '@material-ui/icons/Search';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';

import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { userService } from "../../services";
import { Form, Field, reduxForm } from "redux-form";

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import UserDetails from './Danisan'
import InstagramLogin from 'react-instagram-login';
import FontAwesome from 'react-fontawesome'
import SocialLogin from 'react-social-login'
import 'font-awesome/css/font-awesome.min.css'; 
import { InstagramLoginButton, GoogleLoginButton } from "react-social-login-buttons";

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';

const styles = theme => ({
  root: {
    height: "inherit",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  main: {
    width: '100%',
    //height: 'calc(100vh - 48px)',
    display: 'block', // Fix IE 11 issue.
    // marginLeft: theme.spacing(1),
    // marginRight: theme.spacing(1),
    //top: 0,
    [theme.breakpoints.up(600 + theme.spacing(6))]: {
      width: '100%',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    //backgroundColor: 'red',
  },
  profile: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    padding: theme.spacing(3),
    //backgroundColor: 'blue',
  },
  form: {
    display: 'flex',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(3),
  },
  button: {
    marginLeft: theme.spacing(1),
    float: 'right'
  },
  field: {
    width: '100%',
    float: 'left'
  },
  avatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  card: {
      marginBottom: theme.spacing(1),
      marginTop: theme.spacing(1),
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.95),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.99),
    },
    margin: theme.spacing(1),
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
});


function renderLoadingButton(classes) {
  return (
    <div className={classes.rootLoading}>
      <CircularProgress size={24} className={classes.buttonProgress} />
    </div>
  )
} 

class __SocialButton extends React.Component {  
  render () {
    const { component: Component, children, ...props } = this.props

    return (
      <Component
        onClick={this.props.triggerLogin} 
        {...props}
      >
        {children}
      </Component>
    )
  }
}

const UberSocialButton = SocialLogin(__SocialButton)

class Envanter extends React.Component {
  
  constructor(props) {
    super(props);

    this.handleSocialLogin = this.handleSocialLogin.bind(this);
    this.handleSocialLoginFailure = this.handleSocialLoginFailure.bind(this);
    this.handleSocialLogout = this.handleSocialLogout.bind(this);

    this.state = {
      user: undefined,
      userIgInfo: undefined
    }
  }
  
  componentWillMount() {
    var user = localStorage.getItem('userig')

    if (user != undefined) {
      this.setState({userIgInfo: JSON.parse(user)});
    }
  }

  handleSocialLogout() {
    console.log('handle social logout')
    localStorage.removeItem('userig');
    this.setState({
      userIgInfo: undefined,
      showLoader: false,
    })
  }

  handleSocialLogin(user) {
    console.log('handle social')
    console.log(user)

    if (user._provider == 'instagram') {
      fetch('https://api.instagram.com/v1/users/self/?access_token=' + user._token.accessToken)
        .then(response => response.json())
        .then(data => {
          user._profile['username'] = data.data.username
          localStorage.setItem('userig', JSON.stringify(user));
          this.props.putClaim(5, user._profile['username'])
          this.setState({userIgInfo: user, showLoader:false})
        })
        .catch(err => console.log(err));
    } else if (user._provider == 'google') {
      user._profile['username'] = user._profile.email;
      localStorage.setItem('userig', JSON.stringify(user));
      this.props.putClaim(5, user._profile['username'])
      this.setState({userIgInfo: user, showLoader:false})
    } else {    
      localStorage.setItem('userig', JSON.stringify(user));
      this.setState({userIgInfo: user, showLoader:false})
    }
  }
  
  handleSocialLoginFailure(err) {
    this.handleSocialLogout();

    console.error(err)
  }

  render() {
    const { classes } = this.props;
    const showLoader = this.state.showLoader;

    const user = this.state.userIgInfo;
    console.log(user);
    console.log(this.state);
    console.log(this.props);

    var pathParams = this.props.location.pathname.split('/');
    var danisanUserName = pathParams[pathParams.length - 1];

    return (
        // <div className={classes.root}>
        <div className={classes.main}>
            { showLoader && renderLoadingButton(classes) }
            { !showLoader && 
                <span> 
                  {/* <Card key={idx} className={classes.card}>
                    <CardActionArea>
                      <CardHeader
                        avatar={
                            <Avatar className={classes.avatar} src={danisan.url} />
                        }
                        action={
                          <div>
                            <IconButton aria-label="settings" onClick={this.handleClick}>
                              <MoreVertIcon />
                            </IconButton>
                            <Menu
                              id="simple-menu"
                              anchorEl={this.state.anchorEl}
                              keepMounted
                              open={this.state.anchorEl != undefined}
                              onClose={this.handleClose}
                            >
                              <MenuItem onClick={() => this.handleClose('logout')}>Logout</MenuItem>
                            </Menu>
                        </div>
                        }
                        title={<Typography color="primary" variant="h6">{danisan.name}</Typography>}
                        subheader={<Typography color="initial" variant="body2">86kg, 167cm, Son görüşme 6 gün önce</Typography>}
                    />
                    </CardActionArea>
                  </Card>   */}

                                  
                  {/* {!user &&
                    <UberSocialButton
                      autoCleanUri
                      provider='instagram'
                      appId='5bff3a93e155401fb02b2bbc789e01b4'
                      redirect={this.props.location.pathname}
                      onLoginSuccess={this.handleSocialLogin}
                      onLoginFailure={this.handleSocialLoginFailure}
                      component={InstagramLoginButton}
                    >
                      Login with Instagram
                    </UberSocialButton>
                  } */}
                 
                 {/* {!user &&
                    <UberSocialButton
                      autoCleanUri
                      provider='google'
                      appId='755813466643-tqjd3qieai0angldsndr7du6pj75v0sd.apps.googleusercontent.com'
                      redirect={this.props.location.pathname}
                      onLoginSuccess={this.handleSocialLogin}
                      onLoginFailure={this.handleSocialLoginFailure}
                      component={GoogleLoginButton}
                    >
                      Login with Google
                    </UberSocialButton>
                  } */}

                  {
                    //user && 
                    <UberSocialButton 
                      autoCleanUri
                      provider='instagram'
                      redirect={this.props.location.pathname} 
                      onLogoutSuccess={this.handleSocialLogout}
                      onLoginFailure={this.handleSocialLoginFailure}
                      onLogoutFailure={this.handleSocialLoginFailure}
                      user={user}
                      component={UserDetails}
                      viewParam={this.props.viewParam}
                      setTitle={this.props.setTitle}
                      danisanUserName={danisanUserName}
                    >
                    </UberSocialButton>
                  }
                </span>
            }
        </div>
        // </div>
      );
    }
};

const mapStateToProps = state => {
  return {
    apiEnvanter: state.apiEnvanter,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Envanter));
