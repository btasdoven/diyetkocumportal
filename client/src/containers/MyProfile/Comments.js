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
import {CopyToClipboard} from 'react-copy-to-clipboard';
import DoneIcon from '@material-ui/icons/Done';
import FileCopyIcon from '@material-ui/icons/FileCopy';

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
    [theme.breakpoints.up(750 + theme.spacing(6))]: {
      width: '750px',
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
    this.handleStatusChange = this.handleStatusChange.bind(this);
    this.handleLinkCopied = this.handleLinkCopied.bind(this);
    
    this.state = {
      userId: JSON.parse(localStorage.getItem('user')).id,
      date: moment().format('YYYYMMDD'),
      linkCopied: false,
    }
  }

  isLoaded() {
    var loaded = this.props.apiDietitianComments != undefined &&
      this.props.apiDietitianComments[this.state.userId] != undefined &&
      this.props.apiDietitianComments[this.state.userId].isGetLoading != true &&
      this.props.apiDietitianComments[this.state.userId].data != undefined;

      return loaded;
  }
  
  handleStatusChange(commentId, status) {
    var that = this;
    return () => {
      var comments = that.props.apiDietitianComments[that.state.userId].data;
      comments[commentId].status = status
      that.props.putDietitianComments(that.state.userId, comments);
    };
  }

  componentDidMount() {
    if (!this.isLoaded()) {
      this.props.getDietitianComments(this.state.userId);
    }
  }

  handleLinkCopied() {
    this.setState({ linkCopied: true })
    this.props.snackbar.showMessage(
      'Anket linkiniz panoya kopyalandı.',
      //'Undo', () => handleUndo()
    )
  } 

  render() {
    const { classes } = this.props;
    const showLoader = !this.isLoaded();

    var comments = showLoader ? undefined : this.props.apiDietitianComments[this.state.userId].data;
    
    return (
        <div className={classes.root}>
        <div className={classes.main}>
          <Card variant="outlined" className={classes.card} style={{marginBottom: '16px'}}>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <div className={classes.text}>
                    <Typography variant="body2" style={{}}>
                      * Artık danışanlarından yorum almak çok kolay.<br />
                      * Aşağıdaki linke tıkladığında bu link kopyalanmış olacak.<br />
                      * Bu linki danışanına ister WhatsApp'tan istersen de Instagram'dan gönder.<br />
                      * Danışanların senin hakkında yorum yazsın. <br />
                      * Yazılan yorumlar onayın için bu sayfaya düşsün. <br />
                      * Sen de beğendiğin yorumları kişisel sayfanda göstermek için buradan onayla.
                    </Typography>
                  </div>
                </Grid>

                <Grid style={{textAlign:'center'}} item xs={12}>
                  <CopyToClipboard text={`https://diyetkocum.net/${this.state.userId}/anket`} >
                    <span>
                      <Chip
                        //avatar={<Avatar>M</Avatar>}
                        label={`https://diyetkocum.net/${this.state.userId}/anket`}
                        clickable
                        color="primary"
                        onClick={this.handleLinkCopied}
                        onDelete={this.handleLinkCopied}
                        deleteIcon={this.state.linkCopied ? <DoneIcon color="primary" /> : <FileCopyIcon  color="primary"/>}
                        variant="outlined"
                      />
                    </span>
                  </CopyToClipboard>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          { showLoader && renderLoadingButton(classes) }
          { !showLoader && Object.keys(comments).filter((c) => comments[c].status != 'rejected').sort().reverse().map((commentId, idx) => {
            return (
              <Card elevation={0} key={idx} style={{paddingTop: idx == 0 ? '0' : '8px'}}>
                <CardHeader
                  style={{padding: 0}}
                  avatar={
                    <Avatar alt={comments[commentId].name}>
                      
                    </Avatar>
                  }
                  // action={
                  //   <IconButton disabled color="textSecondary" style={{paddingTop: '20px'}}>
                  //     <Typography variant="caption" color="textSecondary">{comments[commentId].date}</Typography>
                  //   </IconButton>
                  // }
                  title={comments[commentId].name}
                  subheader={comments[commentId].date}
                />
                <CardContent>
                  <Typography variant="body2" color="textPrimary" component="p" style={{paddingLeft: '40px'}}>
                    {comments[commentId].notes.split("\n").map((item, idx) => <span key={idx}>{item}<br/></span>)}
                  </Typography>
                </CardContent>
                <CardActions style={{justifyContent: 'center'}}>
                  {comments[commentId].status == 'pending' && <Button onClick={this.handleStatusChange(commentId, 'confirmed')} size="small" variant="contained" color="secondary">KİŞİSEL SAYFANA EKLE</Button>}
                  {comments[commentId].status == 'pending' && <Button  onClick={this.handleStatusChange(commentId, 'rejected')} size="small" variant="outlined" color="default">REDDET</Button>}
                  {comments[commentId].status == 'confirmed' && 
                    <Typography variant="caption" color="textPrimary" component="p" style={{textAlign: 'center'}}>
                      Bu yorum kişisel sayfanızda gözükmektedir.
                    </Typography>
                  }
                  {comments[commentId].status == 'confirmed' && <Button edge="flex-end" onClick={this.handleStatusChange(commentId, 'rejected')} size="small" variant="outlined" color="secondary">KALDIR</Button>}
                </CardActions>
                <Divider />
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
