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
import { getDanisanFiles, addDanisanFiles } from '../../store/reducers/api.danisanFiles'

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
    this.onSubmitInternal = this.onSubmitInternal.bind(this);

    this.state = {
      openDialog: undefined,
    }
  }

  isLoaded() {
    console.log(this.props);

    var loaded = this.props.apiDanisanFiles != undefined &&
      this.props.apiDanisanFiles[this.props.userId] != undefined &&
      this.props.apiDanisanFiles[this.props.userId][this.props.danisanUserName] != undefined && 
      this.props.apiDanisanFiles[this.props.userId][this.props.danisanUserName].isGetLoading != true &&
      this.props.apiDanisanFiles[this.props.userId][this.props.danisanUserName].data != undefined;

      console.log(loaded);
      return loaded;
  }

  componentDidMount() {
    if (!this.isLoaded()) {
      this.props.getDanisanFiles(this.props.userId, this.props.danisanUserName);
    }
  }

  onSubmitInternal(formValues) {
    console.log(formValues);

    const formData = new FormData();
    formData.append('file',formValues.file)
    console.log(formData);

    this.props.addDanisanFiles(this.props.userId, this.props.danisanUserName, formData);
    this.onDialogClose();
  }

  onDialogClose(values) {
    this.setState({openDialog: undefined})
  }

  render() {
    console.log(this.props);
    const { classes } = this.props;

    const showLoader = !this.isLoaded();
    const allFiles = showLoader ? undefined : this.props.apiDanisanFiles[this.props.userId][this.props.danisanUserName].data;
    console.log(allFiles)

    return (
      <div className={classes.root}> 
        <Form
          onSubmit={this.props.handleSubmit(this.onSubmitInternal)}
          name={this.props.form}
        >  
          <Button style={{marginRight: '8px'}} variant="outlined" size="small" onClick={() => this.setState({openDialog: 'tahlil'})} color="primary" startIcon={<NoteAddIcon />}>
            KAN TAHLİLİ EKLE
          </Button>
          <Divider style={{marginTop: '8px'}} />

          <Dialog 
            fullWidth
            open={this.state.openDialog != undefined} 
            onClose={() => this.onDialogClose(undefined)}
          >
            <DialogTitle id="form-dialog-title">Yeni Tahlil Ekle</DialogTitle>
            <DialogContent>
              <Field
                name="file"
                component={FieldFileInput}
                onChange={(f) => console.log(f)}
              />

              {this.props.apiForm[this.props.form] != undefined && 
               this.props.apiForm[this.props.form].values != undefined && Object.keys(this.props.apiForm[this.props.form].values).map((i) => {
                  const file = this.props.apiForm[this.props.form].values[i];

                  return (
                    <Typography variant="body2" key={i}>{file.name}</Typography>
                  )
               })}
            </DialogContent>
            <DialogActions>
              <Button disabled={this.props.submitting} onClick={() => this.onDialogClose(undefined)} color="secondary">
                İPTAL
              </Button>
              <Button disabled={this.props.submitting} onClick={this.props.handleSubmit(this.onSubmitInternal)} color="secondary">
                YÜKLE
              </Button>
            </DialogActions>
          </Dialog>

          { showLoader && renderLoadingButton(classes) }
          { !showLoader && 
            <span>
              {/* <SpeedDial
                icon={<SpeedDialIcon icon={<AddIcon />} />}
                actions={[
                  {name: 'Kan Tahlili Ekle', icon: <NoteAddIcon />, onClick: () => console.log('kan tahlılı')},
                  {name: 'Tartı Ölçümü Ekle', icon: <PostAddIcon />, onClick: () => console.log('tartı')}
                ]}
              /> */}

              {allFiles.length == 0 && <Typography style={{textAlign: 'center'}}>Size ait tahlil ya da ölçüm bilgisi bulunmamaktadır.</Typography>}

              {Object.keys(allFiles).map((day, idx) => {
                const allFilesPerDay = allFiles[day];
                console.log(allFilesPerDay);

                return (
                  <List
                    key={idx} 
                    disablePadding
                    subheader={
                      <ListSubheader component="span" id="nested-list-subheader">
                        {moment(day).format('DD MMMM YYYY')}
                      </ListSubheader>
                  }>
                    {Object.keys(allFilesPerDay).map( (fileTs, fidx) => {
                      const file = allFilesPerDay[fileTs];
                      console.log(file)

                      return (
                        <span key={fidx}>
                          <Divider component="li" />
                          <ListItem button 
                            component="a" 
                            href={userService.getStaticFileUri(file.path)}
                            target="_blank"
                              //component={Link} to={"/c/" + danisan.name}
                          >
                            <ListItemAvatar >
                              <Avatar src={userService.getStaticFileUri(file.path)}></Avatar>
                            </ListItemAvatar>
                            <ListItemText 
                              primary={
                                  // <Typography
                                  //     variant="subtitle1"
                                  //     color="textPrimary"
                                  // >
                                  file.name
                                  // </Typography>
                              } 
                              // secondary={
                              //     // <Typography
                              //     //     variant="caption"
                              //     //     color="inherit"
                              //     // >
                              //         danisan.info.kilo + "kg, " + danisan.info.boy + "cm"
                              //     // </Typography>
                              // }
                            />
                          </ListItem>
                        </span>
                      )
                      return (
                        <span key={fidx}>
                          <img style={{textAlign: 'center'}} src={userService.getStaticFileUri(file.path)} />
                          <Typography>{file.name}</Typography>
                        </span>
                      )
                    })}
                  </List>
                )

                return Object.keys(allFilesPerDay).map( (fileTs, fidx) => {
                  const file = allFilesPerDay[fileTs];
                  console.log(file)
                  return (
                    <span key={fidx}>
                      <img style={{textAlign: 'center'}} src={userService.getStaticFileUri(file.path)} />
                      <Typography>{file.name}</Typography>
                    </span>
                  )
                })
              })}
            </span>
          }
        </Form>  
      </div>
    )}
};

const mapStateToProps = (state, ownProps) => {
  console.log('mapstatetoprops')
  console.log(ownProps);
  console.log(state);

  return {
    apiForm: state.form,
    apiDanisanFiles: state.apiDanisanFiles
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      addDanisanFiles: (userId, danisanUserName, files) => addDanisanFiles(userId, danisanUserName, files),
      getDanisanFiles: (userId, danisanUserName) => getDanisanFiles(userId, danisanUserName),
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({ form: 'AnemnezTahlilForm', enableReinitialize: true })(withStyles(styles)(Envanter)));
