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
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ClearIcon from '@material-ui/icons/Clear';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckSharpIcon from '@material-ui/icons/CheckSharp';
import CloseIcon from '@material-ui/icons/Close';

import { getDietitianAppointments } from '../../store/reducers/api.dietitianAppointments';

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

    this.handleOnSearchChange = this.handleOnSearchChange.bind(this);
    this.handleCloseAddDanisan = this.handleCloseAddDanisan.bind(this);
    this.isLoaded = this.isLoaded.bind(this);

    this.state = {
      newDanisan: false,
      searchKey: '',
      userId: JSON.parse(localStorage.getItem('user')).id,
      date: moment().format('YYYYMMDD')
    }
  }

  isLoaded() {
    console.log(this.props);
    console.log(this.state.userId);

    var loaded = this.props.apiDietitianAppointments != undefined &&
      this.props.apiDietitianAppointments[this.state.userId] != undefined &&
      this.props.apiDietitianAppointments[this.state.userId].isGetLoading != true &&
      this.props.apiDietitianAppointments[this.state.userId].data != undefined;

      console.log(loaded);
      return loaded;
  }
  
  componentDidMount() {
    if (!this.isLoaded()) {
      this.props.getDietitianAppointments(this.state.userId);
    }
  }

  handleOnSearchChange(e) {
    this.setState({ searchKey: e.currentTarget.value.toLowerCase()})
  }

  handleCloseAddDanisan(values) {
    console.log(values);

    if (values != undefined) {
      this.props.addDanisan(this.state.userId, values);
      this.props.history.push('/d/' + values.username)
    }

    this.setState({newDanisan: false});
  }

  render() {
    const { classes } = this.props;
    const showLoader = !this.isLoaded();

    var apptList = showLoader ? undefined : this.props.apiDietitianAppointments[this.state.userId].data;
    console.log(apptList)

    return (
        <div className={classes.root}>
        <div className={classes.main}>
          {/* <div className={classes.searchWrapper}>
            <IconButton onClick={() => this.setState({newDanisan: true})} color="primary" className={classes.iconButton} aria-label="directions">
              <PersonAddIcon />
            </IconButton>
            <Divider className={classes.divider} orientation="vertical" />
            <InputBase
              onChange={this.handleOnSearchChange}
              className={classes.search}
              placeholder="Danışan Ara..."
              value={this.state.searchKey}
              startAdornment={
                <InputAdornment className={classes.searchIconStart} position="start">
                  <SearchIcon />
                </InputAdornment>
              }
              endAdornment={this.state.searchKey != '' &&
                (<InputAdornment position="end">
                  <ClearIcon onClick={() => this.setState({ searchKey: '' })} />
                </InputAdornment>)
              }
            />
          </div>
          <Divider /> */}

          { showLoader && renderLoadingButton(classes) }
          { !showLoader && 
            Object.keys(apptList).map((apptDate, idx) => {
              
              console.log(apptList[apptDate])
              var danisans = apptList[apptDate].data;

              return (
                <List
                  key={idx} 
                  disablePadding
                  subheader={
                    <ListSubheader component="span" id="nested-list-subheader">
                      {moment(apptDate).format('DD MMMM YYYY')}
                    </ListSubheader>
                }>
                  {Object.keys(danisans).map( (danisanKey, idx) => {

                    var danisan = danisans[danisanKey];

                    if (this.state.searchKey != '' &&
                        danisan.name.toLowerCase().indexOf(this.state.searchKey) == -1)
                    {
                      return;
                    }
                    // <Card key={idx} className={classes.card}>
                      //   <CardActionArea>
                      //     <CardHeader
                      //       avatar={
                      //           <Avatar className={classes.avatar} src={danisan.url} />
                      //       }
                      //       action={
                      //         <div>
                      //           <IconButton aria-label="settings" onClick={this.handleClick}>
                      //             <MoreVertIcon />
                      //           </IconButton>
                      //           <Menu
                      //             id="simple-menu"
                      //             anchorEl={this.state.anchorEl}
                      //             keepMounted
                      //             open={this.state.anchorEl != undefined}
                      //             onClose={this.handleClose}
                      //           >
                      //             <MenuItem onClick={() => this.handleClose('logout')}>Logout</MenuItem>
                      //           </Menu>
                      //         </div>
                      //       }
                      //       title={<Typography color="primary" variant="h6">{danisan.name}</Typography>}
                      //       subheader={<Typography color="initial" variant="body2">86kg, 167cm, Son görüşme 6 gün önce</Typography>}
                      //     />
                      //   </CardActionArea>
                      // </Card>  

                    var hours = danisanKey.split(' - ')
                    return (
                      <span key={idx}>
                        <Divider component="li" />
                        <ListItem button 
                            //component={Link} to={"/c/" + danisan.name}
                        >
                          <ListItemAvatar >
                            <span>
                              <Typography color="primary" variant="subtitle2">{hours[0]}</Typography>
                              <Typography color="primary" variant="subtitle2">{hours[1]}</Typography>
                            </span>
                          </ListItemAvatar>
                          <ListItemText 
                            style={{paddingRight: '36px'}}
                            primary={
                                // <Typography
                                //     variant="subtitle1"
                                //     color="textPrimary"
                                // >
                                danisan.info.name
                                // </Typography>
                            } 
                            secondary={
                                // <Typography
                                //     variant="caption"
                                //     color="inherit"
                                // >
                                    danisan.info.kilo + "kg, " + danisan.info.boy + "cm"
                                // </Typography>
                            }
                          />
                          {/* <Typography color="initial" variant="caption">{danisan.aktivite}</Typography> */}
                          <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="delete">
                                <CloseIcon color="error" />
                            </IconButton>
                            <IconButton edge="end" aria-label="delete">
                                <CheckSharpIcon style={{ color: green[500] }} />
                            </IconButton>
                          </ListItemSecondaryAction>
                        </ListItem>
                      </span>
                    )
                  })}  
                  <Divider component="li" />
                </List>
              )
            })
          }
        </div>
        </div>
      );
    }
};

const mapStateToProps = state => {
  return {
    apiDietitianAppointments: state.apiDietitianAppointments,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getDietitianAppointments: (userId, date) => getDietitianAppointments(userId, date),
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(withRouter(Envanter)));