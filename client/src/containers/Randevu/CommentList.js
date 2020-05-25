import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Link } from "react-router-dom";

import moment from "moment";

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
import CancelIcon from '@material-ui/icons/Cancel';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ClearIcon from '@material-ui/icons/Clear';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckSharpIcon from '@material-ui/icons/CheckSharp';
import CloseIcon from '@material-ui/icons/Close';
import { withSnackbar } from 'material-ui-snackbar-provider'
import EventIcon from '@material-ui/icons/Event';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { getDietitianComments, putDietitianComments } from '../../store/reducers/api.dietitianComments';
import Chip from '@material-ui/core/Chip';
import Badge from '@material-ui/core/Badge';

import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

import IconButton from '@material-ui/core/IconButton';
import { red, green } from '@material-ui/core/colors';
import AddIcon from '@material-ui/icons/Add';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import SearchIcon from '@material-ui/icons/Search';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import CheckIcon from '@material-ui/icons/Check';

import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { userService } from "../../services";
import { Form, Field, reduxForm } from "redux-form";

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import 'font-awesome/css/font-awesome.min.css'; 

import InputAdornment from '@material-ui/core/InputAdornment';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { withRouter } from "react-router-dom";
import IntroInstaVideo from '../../components/IntroInstaVideo'

const styles = theme => ({
  root: {
    height: "inherit",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
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
    borderRadius: theme.spacing(4), //theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.95),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.99),
    },
    margin: theme.spacing(1),
    padding: theme.spacing(0.5),
    flex: 1
  },
  searchIconStart: {
    paddingLeft: theme.spacing(1),
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
    height: 44,
    margin: 4,
  },
  iconButton: {
    margin: theme.spacing(1),
  },
  searchWrapper: {
    display: 'flex', 
    alignItems: 'center',
  },
  rootLoading: {
      height: "inherit",
      display: "flex",
      justifyContent: "center",
      width: '100%',
      alignItems: "center",
      marginTop: theme.spacing(5)
  },
});


function renderLoadingButton(classes, idx) {
  return (
    <div key={idx} className={classes.rootLoading}>
      <CircularProgress size={24} className={classes.buttonProgress} />
    </div>
  )
} 

class Envanter extends React.Component {
  
  constructor(props) {
    super(props);

    this.isLoaded = this.isLoaded.bind(this);
    
    this.state = {
      userId: props.userId,
    }
  }

  isLoaded() {
    var loaded = this.props.apiDietitianComments != undefined &&
      this.props.apiDietitianComments[this.state.userId] != undefined &&
      this.props.apiDietitianComments[this.state.userId].isGetLoading != true &&
      this.props.apiDietitianComments[this.state.userId].data != undefined;

      return loaded;
  }
  
  componentDidMount() {
    if (!this.isLoaded()) {
      this.props.getDietitianComments(this.state.userId);
    }
  }

  render() {
    const { classes } = this.props;
    const showLoader = !this.isLoaded();

    var comments = showLoader ? undefined : this.props.apiDietitianComments[this.state.userId].data;
    var commentKeys = showLoader ? undefined : Object.keys(comments).filter((c) => comments[c].status == 'confirmed')

    return (
        <div className={classes.root}>
        <div className={classes.main}>
          { showLoader && renderLoadingButton(classes) }
          { !showLoader && commentKeys.length == 0 && (
            <Typography variant="body2" color="textSecondary" component="p" style={{textAlign: 'center'}}>
              Herhangi bir danışan görüşü bulunmamaktadır.
            </Typography>
          )}
          { !showLoader && commentKeys.sort().reverse().map((commentId, idx) => {
            return (
              <Card elevation={0} key={idx} style={{paddingTop: idx == 0 ? '0' : '8px'}}>
                <CardHeader
                  style={{padding: 0}}
                  avatar={
                    <Avatar style={{width: '32px', height: '32px'}} alt={comments[commentId].name}>
                      
                    </Avatar>
                  }
                  action={
                    <IconButton disabled style={{paddingTop: '20px'}}>
                      <Typography variant="caption" color="textSecondary">{comments[commentId].date}</Typography>
                    </IconButton>
                  }
                  title={comments[commentId].name}
                  // subheader={comments[commentId].date}
                />
                <Typography variant="body2" color="textSecondary" component="p" style={{paddingLeft: '48px'}}>
                  {comments[commentId].notes.split("\n").map((item, idx) => <span key={idx}>{item}<br/></span>)}
                </Typography>
              </Card>
            )
          })}
        </div>
        </div>
      );
    }
};

const mapStateToProps = state => {
  return {
    apiDietitianComments: state.apiDietitianComments,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getDietitianComments: (userId) => getDietitianComments(userId),
      putDietitianComments: (userId, values) => putDietitianComments(userId, values),
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(withRouter(withSnackbar()(Envanter))));
