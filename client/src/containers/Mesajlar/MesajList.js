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
import DirectionsIcon from '@material-ui/icons/Directions';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Badge from "@material-ui/core/Badge";

import { getMessagePreviews } from '../../store/reducers/api.messagePreviews';

import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import AddIcon from '@material-ui/icons/Add';
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

import InstagramLogin from 'react-instagram-login';
import FontAwesome from 'react-fontawesome'
import 'font-awesome/css/font-awesome.min.css'; 

import InputAdornment from '@material-ui/core/InputAdornment';
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
  rootLoading: {
      height: "inherit",
      display: "flex",
      justifyContent: "center",
      width: '100%',
      alignItems: "center",
      marginTop: theme.spacing(5)
  },
  main: {
    width: '100%',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
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
    flex: 1
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
  yeniDanisanBtn: {
    margin: theme.spacing(1)
  },
  divider: {
    height: 28,
    margin: 4,
  },
});


function renderLoadingButton(classes) {
  return (
    <div className={classes.rootLoading}>
      <CircularProgress size={24} className={classes.buttonProgress} />
    </div>
  )
} 

class Envanter extends React.Component {
  
  constructor(props) {
    super(props);

    this.isLoaded = this.isLoaded.bind(this);

    this.state = {
      userId: JSON.parse(localStorage.getItem('user')).id
    }
  }
  
  isLoaded() {
    console.log(this.props.apiMessagePreviews);

    var userId = this.state.userId;

    var loaded = 
      this.props.apiMessagePreviews[userId] != undefined &&
      this.props.apiMessagePreviews[userId].isGetLoading != true &&
      this.props.apiMessagePreviews[userId].data != undefined;

    console.log(loaded);
    return loaded;
  }

  componentDidMount() {
    if (!this.isLoaded()) {
      this.props.getMessagePreviews(this.state.userId);
    }
  }

  render() {
    const { classes } = this.props;
    const showLoader = !this.isLoaded();

    var danisans = showLoader ? undefined : this.props.apiMessagePreviews[this.state.userId].data;

    return (
        <div className={classes.root}>
        <div className={classes.main}>
            { showLoader && renderLoadingButton(classes) }
            { !showLoader && 
                <span> 
                  <List disablePadding>
                    {Object.keys(danisans).map((danisanKey, idx) => {                      
                      var danisan = danisans[danisanKey];
                      var fontWeight = danisan.unread == 0 ? 400 : 600;
                      return (
                        <span key={idx}>
                          <ListItem button component={Link} to={"/m/" + danisan.username}>
                            <ListItemAvatar>
                            <Avatar src={danisan.url} />
                            </ListItemAvatar>
                            <ListItemText primaryTypographyProps={{style: {fontWeight: fontWeight}}} secondaryTypographyProps={{style: {fontWeight: fontWeight}}} primary={danisan.name} secondary={danisan.mesaj}/>
                            <div style={{flex: 'none', display: 'flex', flexDirection: 'column'}}>
                              <Typography style={{textAlign: 'right', fontWeight: fontWeight}} color="initial" variant="caption">{danisan.aktivite}</Typography>
                              { danisan.unread > 0 && (
                                <div>
                                  <Badge style={{marginLeft: 'calc(100% - 10px)', }} badgeContent={danisan.unread} color="secondary"></Badge>
                                </div>
                              )}
                            </div>
                          </ListItem>
                          <Divider component="li" />
                        </span>
                      )
                    })}  
                  </List>
                </span>
            }
        </div>
        </div>
      );
    }
};

const mapStateToProps = state => {
  return {
    apiMessagePreviews: state.apiMessagePreviews,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getMessagePreviews: (userId) => getMessagePreviews(userId),
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Envanter));
