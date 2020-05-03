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
import SpeedDial from '../SpeedDial/SpeedDial'
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';

import InputAdornment from '@material-ui/core/InputAdornment';
import { getDanisanNotes, putDanisanNotes } from '../../store/reducers/api.danisanNotes';

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
import SaveIcon from '@material-ui/icons/Save';
import AddIcon from '@material-ui/icons/Add';
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
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import {reset} from 'redux-form';
import Slide from '@material-ui/core/Slide';

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

const createSelect = (key, label, autoFocus, values) => (
  <FormControl
      style={{width: '100%'}}>
      <InputLabel id={label+"_label"}>{label}</InputLabel>

      <Field
          name={key}
          options={values}
          autoFocus={autoFocus}
          component={reduxFormSelect}
      />
  </FormControl>
)
  
const reduxFormSelect = props => {
  const { input, options } = props;

  { console.log(input, options)}

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
        multiline
        placeholder={label}
        rows={20}
        //InputLabelProps={{shrink: true}}
    />
    
    // <InputBase multiline rows={25} fullWidth placeholder="Danışan ile ilgili notlar..." />

    // <TextField
    //   label={label}
    //   error={touched && invalid}
    //   helperText={touched && error}
    //   {...input}
    //   {...custom}
    //   fullWidth
    //   InputLabelProps={{shrink: true}}
    // />
  )
  
class Envanter extends React.Component {
  
  constructor(props) {
    super(props);

    this.isLoaded = this.isLoaded.bind(this);
    this.onSubmitInternal = this.onSubmitInternal.bind(this);

    this.state = {
      userId: JSON.parse(localStorage.getItem('user')).id
    }
  }

  isLoaded() {
    console.log(this.props);
    console.log(this.state.userId);

    var loaded = this.props.apiDanisanNotes != undefined &&
      this.props.apiDanisanNotes[this.state.userId] != undefined &&
      this.props.apiDanisanNotes[this.state.userId][this.props.danisanUserName] != undefined && 
      this.props.apiDanisanNotes[this.state.userId][this.props.danisanUserName].isGetLoading != true &&
      this.props.apiDanisanNotes[this.state.userId][this.props.danisanUserName].data != undefined;

      console.log(loaded);
      return loaded;
  }

  componentDidMount() {
    if (!this.isLoaded()) {
      this.props.getDanisanNotes(this.state.userId, this.props.danisanUserName);
    }
  }

  onSubmitInternal(formValues) {
      console.log(formValues);
      this.props.putDanisanNotes(this.state.userId, this.props.danisanUserName, formValues);
  }

  render() {
    console.log(this.props);
    const { classes } = this.props;
    
    const showLoader = !this.isLoaded();

    return (
      <div className={classes.root}>
        {/* <Button style={{marginRight: '8px'}} variant="outlined" size="small" disabled={this.props.pristine} color="primary" onClick={this.props.handleSubmit(this.onSubmitInternal)} startIcon={<SaveIcon />}>
          KAYDET
        </Button>
        <Divider style={{marginTop: '8px'}} /> */}

        { showLoader && renderLoadingButton(classes) }
        { !showLoader && 
          <span>
            <SpeedDial
                icon={<SaveIcon />}
                iconText={"KAYDET"}
                eventText={"DanisanNotlarKaydet"}
                hidden={this.props.pristine}
                onClickFab={this.props.handleSubmit(this.onSubmitInternal)}
                // actions={[
                //   {name: 'hey', icon: <MoreVertIcon />, onClick: () => console.log('click')},
                //   {name: 'hey', icon: <MoreVertIcon />, onClick: () => console.log('click')}
                // ]}
              />

            <Form
                onSubmit={this.props.handleSubmit(this.onSubmitInternal)}
                name={this.props.form}
                style={{marginTop: '8px'}}
            >
              <Field
                name="notes"
                component={renderTextField}
                label="Danışan ile ilgili notlar..."
              />
            </Form>
          </span>
        }
      </div>
    )}
};

const mapStateToProps = (state, ownProps) => {
  console.log(ownProps)
  console.log(state)
  
  return {
    apiDanisanNotes: state.apiDanisanNotes,
    initialValues: 
        state.apiDanisanNotes[ownProps.userId] != undefined && 
        state.apiDanisanNotes[ownProps.userId][ownProps.danisanUserName] != undefined &&
        state.apiDanisanNotes[ownProps.userId][ownProps.danisanUserName].data != undefined &&
        state.apiDanisanNotes[ownProps.userId][ownProps.danisanUserName].data.notes != undefined
        ? state.apiDanisanNotes[ownProps.userId][ownProps.danisanUserName].data
        : { notes: '' }
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getDanisanNotes: (userId, danisanUserName) => getDanisanNotes(userId, danisanUserName),
      putDanisanNotes: (userId, danisanUserName, danisanNotes) => putDanisanNotes(userId, danisanUserName, danisanNotes)
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({ form: 'DanisanNotesForm', enableReinitialize: true })(withStyles(styles)(Envanter)));
