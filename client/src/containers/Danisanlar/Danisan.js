import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from "@material-ui/core/CardActionArea";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';

import { getDanisanProfile } from '../../store/reducers/api.danisanProfile';

import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import Badge from '@material-ui/core/Badge';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import SendIcon from '@material-ui/icons/Send';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';

import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import InputBase from '@material-ui/core/InputBase';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { userService } from "../../services";
import { Form, Field, reduxForm } from "redux-form";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {reset} from 'redux-form';
import Slide from '@material-ui/core/Slide';

import KisiselBilgiler from './KisiselBilgiler';
import Tahliller from './Tahliller';
import Notlar from './Notlar';

const styles = theme => ({
  profile: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    padding: theme.spacing(3),
    //backgroundColor: 'blue',
  },
  form: {
    display: 'flex',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
  button: {
    marginLeft: theme.spacing(1),
    float: 'right'
  },
  avatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  card: {
      marginBottom: theme.spacing(1),
      margin: theme.spacing(1),
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

  const renderTextField = ({
    label,
    input,
    meta: { touched, invalid, error },
    ...custom
  }) => (
    <InputBase
        label={label}
        placeholder={label}
        error={touched && invalid}
        {...input}
        {...custom}
        fullWidth
    />
    // <TextField
    //   label={label}
    //   placeholder={label}
    //   error={touched && invalid}
    //   helperText={touched && error}
    //   {...input}
    //   {...custom}
    //   fullwidth
    // />
  )


  function a11yProps(index) {
    return {
      id: `scrollable-auto-tab-${index}`,
      'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
  }
  function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`scrollable-auto-tabpanel-${index}`}
        aria-labelledby={`scrollable-auto-tab-${index}`}
        {...other}
      >
        {value === index && <div>{children}</div>}
      </Typography>
    );
  }
  
class Envanter extends React.Component {
  
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleValueChange = this.handleValueChange.bind(this);

    this.state = {
      anchorEl: undefined, 
      value: this.props.viewParam == 'messages' ? 6 : 0,
      userId: JSON.parse(localStorage.getItem('user')).id
    }
  }

  isLoaded() {
      return this.props.apiEnvanter != undefined &&
        this.props.apiEnvanter[this.props.user._profile.username] != undefined &&
        this.props.apiEnvanter[this.props.user._profile.username].isLoaded == true;
  }

  componentDidMount() {
    //this.handleValueChange(undefined, this.state.value);
  }

  handleClick = event => {
    this.setState({anchorEl: event.currentTarget});
  };

  handleClose = (ev) => {
    if (ev == 'logout') {
      this.props.triggerLogout();
    }
    this.setState({anchorEl: undefined});
  };

  handleValueChange = (ev, newVal) => {
    if (this.state.value != newVal) {
      this.setState({value: newVal})
    }
  }

  render() {
    console.log(this.props);
    const { classes } = this.props;
    const showLoader = false;

    return (
      <Slide direction="up" in={true}>
        <span>
            { showLoader && renderLoadingButton(classes) }
            { !showLoader && 
                <span>
                  {/* <AppBar position="relative"> */}
                  <Tabs
                    value={this.state.value}
                    onChange={this.handleValueChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="scrollable"
                    scrollButtons="on"
                    aria-label="scrollable auto tabs example"
                  >
                    <Tab label="TEMEL BİLGİLER" {...a11yProps(0)} />
                    <Tab label="TAHLİLLER" {...a11yProps(1)} />
                    <Tab label="NOTLARIM" {...a11yProps(2)} />
                    <Tab label="DİYET LİSTESİ" {...a11yProps(3)} />
                    <Tab label="DİYET GEÇMİŞİ" {...a11yProps(4)} />
                    <Tab label="FİNANS" {...a11yProps(5)} />
                    <Tab label="MESAJLAR" {...a11yProps(6)} />
                  </Tabs>
                  {/* </AppBar> */}
                  <TabPanel value={this.state.value} index={0}>
                    <KisiselBilgiler danisanUserName={this.props.danisanUserName} />
                  </TabPanel>
                  <TabPanel value={this.state.value} index={1}>
                    <Tahliller danisanUserName={this.props.danisanUserName} />
                  </TabPanel>
                  <TabPanel value={this.state.value} index={2}>
                    <Notlar />
                  </TabPanel>
                  <TabPanel value={this.state.value} index={3}>
                    Item Four
                  </TabPanel>
                  <TabPanel value={this.state.value} index={4}>
                    Item Five
                  </TabPanel>
                  <TabPanel value={this.state.value} index={5}>
                    Item Six
                  </TabPanel>
                  <TabPanel value={this.state.value} index={6}>
                    Mesajlar kismi daha kodlanmadi
                  </TabPanel>
                  <TabPanel value={this.state.value} index={7}>
                    Item Eight
                  </TabPanel>
                </span>
            }
        </span>
      </Slide>
    )}
};

const mapStateToProps = state => {
  return {
    apiDanisanProfile: state.apiDanisanProfile,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getDanisanProfile: (userId, danisanUserName) => getDanisanProfile(userId, danisanUserName),
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({ form: 'CommentForm' })(withStyles(styles)(Envanter)));
