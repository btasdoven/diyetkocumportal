import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {CopyToClipboard} from 'react-copy-to-clipboard';

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
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import { withSnackbar } from 'material-ui-snackbar-provider'
import SpeedDial from '../SpeedDial/SpeedDial'
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';

import InputAdornment from '@material-ui/core/InputAdornment';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import { getLinkInfo } from '../../store/reducers/api.links';
import AnemnezForm from './AnemnezForm'

import { withStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import SaveIcon from '@material-ui/icons/Save';
import ShareIcon from '@material-ui/icons/Share';
import SendIcon from '@material-ui/icons/Send';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';

import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import InputBase from '@material-ui/core/InputBase';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { Form, Field, reduxForm } from "redux-form";
import Menu from '@material-ui/core/Menu';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

import DateTimePicker from '../../components/DateTimePicker'

import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import {reset} from 'redux-form';
import Slide from '@material-ui/core/Slide';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import DoneIcon from '@material-ui/icons/Done';

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
  },
  paper: {
    padding: theme.spacing(1)
  },
  root: {
      //height: 'calc(100vh - 48px)',
      padding: theme.spacing(1),
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
  text: {
      height: "inherit",
      width: '100%',
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(2),
  },
});

function renderLoadingButton(classes) {
  return (
    <div className={classes.rootLoading}>
      <CircularProgress size={24} className={classes.buttonProgress} />
    </div>
  )
} 
  
const ReduxFormCheckBox = ({name, label, ...props}) => (
    <Field
      name={name}
      label={label}
      component={renderCheckBox}
      {...props}
    />
)
  
const renderCheckBox = props => {
  const { input, label, ...rest } = props;

  return (
      <FormControlLabel
        control={<Checkbox 
          {...input} 
          {...rest}
          size="small"
          onChange={value => input.onChange(value)}
          onBlur={() => input.onBlur(input.value)} 
          value={input.value}
          checked={input.value == true}
          color="primary"/> 
        }
        label={label}
      />
  )
}



const ReduxFormSelect = ({name, label, values, ...props}) => (
  <FormControl
    //margin="normal"
    style={{width: '100%'}}
  >
    <InputLabel shrink={true} id={label}>{label}</InputLabel>

    <Field
      name={name}
      options={values}
      component={renderSelect}
      {...props}
    />
  </FormControl>
)

const renderSelect = props => {
  const { input, options } = props;

  return (
    <Select 
      {...input} 
      onChange={value => input.onChange(value)} 
      onBlur={() => input.onBlur(input.value)} 
      value={input.value}
    >
      {options.map((val) => <MenuItem key={val.value} value={val.value}>{val.label}</MenuItem>)}
    </Select>
  )
}

const ReduxFormTextField = ({name, label, ...props}) => (
  <Field
      name={name}
      component={renderTextField}
      label={label}
      {...props}
  />)

const renderTextField = ({
  label,
  input,
  meta: { touched, invalid, error },
  ...custom
}) => (
  // <InputBase
  //     label={label}
  //     placeholder={label}
  //     error={touched && invalid}
  //     {...input}
  //     {...custom}
  //     fullWidth
  // />
  <TextField
    label={label}
    error={touched && invalid}
    helperText={touched && error}
    {...input}
    {...custom}
    fullWidth
    color="primary"
    InputLabelProps={{color: 'primary', shrink: true}}
  />
)
  
const ApptDays = () => {
  return [
    "Pazartesi",
    "Salı",
    "Çarşamba",
    "Perşembe",
    "Cuma",
    "Cumartesi",
    "Pazar",
  ]
}

const ApptHours = () => {
  var s = 7;
  var e = 18;
  var ret = []
  for (var i = s; i <= e; ++i) {
    var hour = i < 10 ? "0" + i.toString() : i.toString();
    var hour1 = i+1 < 10 ? "0" + (i+1).toString() : (i+1).toString();
    ret.push(hour + ":00 - " + hour + ":30");
    ret.push(hour + ":30 - " + hour1 + ":00");
  }

  return ret;
}
class Envanter extends React.Component {

  constructor(props) {
    super(props);

    this.isLoaded = this.isLoaded.bind(this);

    this.state = {
      linkId: this.props.location.pathname.split('/')[2],
    }
  }

  isLoaded() {
    console.log(this.props);
    console.log(this.state.linkId);

    var loaded = this.props.apiLinks != undefined &&
      this.props.apiLinks[this.state.linkId] != undefined &&
      this.props.apiLinks[this.state.linkId].isGetLoading != true &&
      this.props.apiLinks[this.state.linkId].data != undefined;

      console.log(loaded);
      return loaded;
  }

  componentDidMount() {
    console.log('mounted')
    if (!this.isLoaded()) {
      this.props.getLinkInfo(this.state.linkId);
    }
  }

  render() {
    const { classes } = this.props;
    const showLoader = !this.isLoaded();

    const linkInfo = showLoader ? undefined : this.props.apiLinks[this.state.linkId].data;
    console.log(linkInfo)

    if (showLoader)
      return renderLoadingButton(classes)
    else
      return <AnemnezForm userId={linkInfo.userId} danisanUserName={linkInfo.danisanUserName} />
  }
};

const mapStateToProps = (state, ownProps) => {
  console.log(state, ownProps)
  return {
    apiLinks: state.apiLinks,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getLinkInfo: (linkId) => getLinkInfo(linkId),
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(withSnackbar()(Envanter)));
