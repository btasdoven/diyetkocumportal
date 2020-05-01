import MaterialTable from "material-table";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { Link } from "react-router-dom";
import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { userService } from '../../services/user.service'
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { getAllDietitians, deleteDietitian } from '../../store/reducers/api.allDietitians';

import moment from "moment";

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
import PostAddIcon from '@material-ui/icons/PostAdd';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import InputAdornment from '@material-ui/core/InputAdornment';
import { getDanisanProfile, putDanisanProfile } from '../../store/reducers/api.danisanProfile';
import { getDanisanFiles, addDanisanFiles, uploadPhoto, addNewPost } from '../../store/reducers/api.danisanFiles'

import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import Badge from '@material-ui/core/Badge';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SpeedDial from '../SpeedDial/SpeedDial'
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';

import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import SaveIcon from '@material-ui/icons/Save';
import ShareIcon from '@material-ui/icons/Share';
import SendIcon from '@material-ui/icons/Send';
import AddIcon from '@material-ui/icons/Add';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';

import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import InputBase from '@material-ui/core/InputBase';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { Form, Field, reduxForm } from "redux-form";
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

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
  card: {
    marginBottom: theme.spacing(1),
  },
  paper: {
    padding: theme.spacing(1)
  },
  root: {
      // margin: theme.spacing(1),
  },
  rootLoading: {
      height: "inherit",
      display: "flex",
      justifyContent: "center",
      width: '100%',
      alignItems: "center",
      marginTop: theme.spacing(5)
  },
  avatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    marginRight: '16px',
  },
  dietitanList: {
    paddingLeft: '0 !important',
    paddingRight: '0 !important',
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
class FieldFileInput  extends Component {
  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this)
  }

  onChange(e) {
    const { input: { onChange } } = this.props
    onChange(e.target.files[0])
  }

  render() {
    const { input: { value } } = this.props
    const {input,label, required, meta, } = this.props  //whatever props you send to the component from redux-form Field
    return(
      <Button
        variant="outlined"
        component="label"
        color="primary"
        style={{marginBottom: '16px'}}
      >
        DOSYA SEÇ
        <input
          type="file"
          accept=".pdf,.png,.jpg,.jpeg"
          onChange={this.onChange}
          style={{display: 'none'}}
        />
      </Button>
    )
  }
}

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

const createTextField = (key, label, inputProps) => (
  <Field
      key={key}
      name={key}
      id={key}
      component={renderTextField}
      autoFocus={false}
      label={label}
      InputProps={inputProps}
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
      InputLabelProps={{shrink: true}}
    />
  )
  
class Envanter extends React.Component {
  
  constructor(props) {
    super(props);

    this.isLoaded = this.isLoaded.bind(this);
    this.onDialogClose = this.onDialogClose.bind(this);
    this.onDeleteDietitian = this.onDeleteDietitian.bind(this);
    this.onSubmitInternal = this.onSubmitInternal.bind(this);

    this.state = {
      userId: props.userId,
      data: undefined,
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
      this.props.getAllDietitians(true);
    }
  }

  onSubmitInternal(formValues) {
    console.log(formValues);

    //this.props.addNewPost(formValues);
  }

  onDialogClose(values) {
    this.setState({openDialog: undefined})
  }

  onDeleteDietitian(username) {
    return () => {
      this.props.deleteDietitian(username);
    }
  }

  render() {
    const { classes } = this.props;
    const showLoader = !this.isLoaded();
    const dietitians = showLoader ? undefined : this.props.apiAllDietitians.data;

    return (
      <form
        onSubmit={this.props.handleSubmit(this.onSubmitInternal)}
        name={this.props.form}
      >  
        { showLoader && renderLoadingButton(classes) }
          { !showLoader && (
            <div style={{maxWidth: '100%'}}>
              <MaterialTable
                columns={[
                  {
                    title: 'Avatar',
                    field: 'url',
                    render: rowData => <Avatar
                      className={classes.avatar}
                      src={userService.getStaticFileUri(rowData.url)}
                    />
                  },
                  { title: "Name", field: "name" },
                  { title: "Insta", field: "username" },
                  { title: "CreateDate", field: "create_date", type: 'datetime' },
                  { title: "PremiumUntil", field: "premium_until", type: 'datetime' },
                  { title: "Danisan", field: "danisanCount", type: 'numeric' },
                  { title: "Randevu", field: "randevuCount", type: 'numeric' },
                  { title: "Blog", field: "blogCount", type: 'numeric' },
                ]}
                data={dietitians}
                title=""
                detailPanel={rowData => {
                  return (
                    <div style={{display:'flex', flexDirection: 'column'}}>
                      <Typography variant="body2">Admin: {rowData.isAdmin}</Typography> 
                      <Typography variant="body2">Tel: {rowData.tel}</Typography> 
                      <Typography variant="body2">E-mail: {rowData.email}</Typography>
                      <Typography variant="body2">Referans: {rowData.refDietitian}</Typography>
                    </div>
                  )
                }}
                paging={false}
                emptyRowsWhenPaging={false}
                toolbar={false}
              />

              {/* {dietitians.map((step, index) => (
                <ExpansionPanel key={index}>
                  <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <List disablePadding>
                      <ListItem key={index}>
                        <ListItemAvatar>
                          <Avatar
                            className={classes.avatar}
                            src={userService.getStaticFileUri(dietitians[index].url)}
                            alt={dietitians[index].name}
                          />
                        </ListItemAvatar>
                        <ListItemText primary={dietitians[index].name} secondary={dietitians[index].username + (dietitians[index].isAdmin ? ' (Admin)' : '')} />
                      </ListItem>
                    </List>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails style={{flexDirection: 'column'}}>
                    <Typography variant="body2">Hesap Acma Tarihi: {dietitians[index].create_date}</Typography>
                    <Typography variant="body2">Premium Bitim Tarihi: {dietitians[index].premium_until}</Typography>
                    <Typography variant="body2">Danisan Sayisi: {dietitians[index].danisanCount}</Typography> 
                    <Typography variant="body2">Randevu Sayisi: {dietitians[index].randevuCount}</Typography> 
                    <Typography variant="body2">Blog Sayisi: {dietitians[index].blogCount}</Typography> 
                    <Typography variant="body2">Tel: {dietitians[index].tel}</Typography> 
                    <Typography variant="body2">E-mail: {dietitians[index].email}</Typography>
                    <Typography variant="body2">Referans: {dietitians[index].refDietitian}</Typography> <br />
                    <Button variant="contained" color="secondary" onClick={this.onDeleteDietitian(dietitians[index].username)}>Delete</Button>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              ))} */}
            </div>
          )}
      </form>  
    )}
};

const mapStateToProps = (state, ownProps) => {
  console.log('mapstatetoprops')
  console.log(ownProps);
  console.log(state);

  return {
    apiForm: state.form,
    apiAllDietitians: state.apiAllDietitians,
    // apiDanisanProfile: state.apiDanisanProfile,
    // initialValues: 
    //   state.apiDanisanProfile[ownProps.userId] != undefined && 
    //   state.apiDanisanProfile[ownProps.userId][ownProps.danisanUserName] != undefined
    //     ? state.apiDanisanProfile[ownProps.userId][ownProps.danisanUserName].data
    //     : {},
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getAllDietitians: (isAdmin) => getAllDietitians(isAdmin),
      deleteDietitian: (uname) => deleteDietitian(uname),
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({ form: 'AddBlogPostForm', enableReinitialize: true })(withStyles(styles)(Envanter)));
