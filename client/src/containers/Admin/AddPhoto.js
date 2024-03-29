import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from "@material-ui/core/Typography";
import AddIcon from '@material-ui/icons/Add';
import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Field, reduxForm } from "redux-form";
import { addDanisanFiles, getDanisanFiles, uploadPhoto } from '../../store/reducers/api.danisanFiles';







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
        style={{marginBottom: '16px', marginTop: '16px'}}
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
      userId: props.userId,
      data: undefined,
    }
  }

  isLoaded() {

    var loaded = this.props.apiDanisanFiles != undefined &&
      this.props.apiDanisanFiles[0] != undefined &&
      this.props.apiDanisanFiles[0][''] != undefined && 
      this.props.apiDanisanFiles[0][''].isGetLoading != true &&
      this.props.apiDanisanFiles[0][''].data != undefined;

      return true;
  }

  componentDidMount() {
    if (!this.isLoaded()) {
      //this.props.getDanisanFiles(this.state.userId, this.props.danisanUserName);
    }
  }

  onSubmitInternal(formValues) {

    const formData = new FormData();
    formData.append('file',formValues.file)

    console.log(formValues)

    this.props.uploadPhoto(formValues.username, formData);

    this.onDialogClose();
  }

  onDialogClose(values) {
    this.setState({openDialog: undefined})
  }

  render() {
    const { classes } = this.props;

    const showLoader = !this.isLoaded();
    
    var path = this.props.apiDanisanFiles != undefined &&
      this.props.apiDanisanFiles[0] != undefined &&
      this.props.apiDanisanFiles[0][''] != undefined && 
      this.props.apiDanisanFiles[0][''].isGetLoading != true &&
      this.props.apiDanisanFiles[0][''].data != undefined &&
      this.props.apiDanisanFiles[0][''].data.data != undefined &&
      this.props.apiDanisanFiles[0][''].data.data.file != undefined &&
      this.props.apiDanisanFiles[0][''].data.data.file.path != undefined
      ? this.props.apiDanisanFiles[0][''].data.data.file.path
      : undefined;

    return (
      <div
        onSubmit={this.props.handleSubmit(this.onSubmitInternal)}
        name={this.props.form}
      >  
        <Dialog 
          fullWidth
          open={this.state.openDialog != undefined} 
          onClose={() => this.onDialogClose(undefined)}
        >
          <DialogTitle id="form-dialog-title">Fotoğraf Ekle</DialogTitle>
          <DialogContent>
            <Field
              label="Username (i.e. dyt_ezelkavadar)"
              name="username"
              component={renderTextField}
            />
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
            <List
              disablePadding
            >
              <ListItem button 
                onClick={() => this.setState({openDialog: 'tarti_pdf'})}
                target="_blank"
                  //component={ExtendedLink} to={"/c/" + danisan.name}
              >
                <ListItemAvatar >
                  <Avatar><AddIcon /></Avatar>
                </ListItemAvatar>
                <ListItemText 
                  primary={
                      // <Typography
                      //     variant="subtitle1"
                      //     color="textPrimary"
                      // >
                      "Fotoğraf ekle"
                      // </Typography>
                  } 
                />
              </ListItem>
            </List>

            {path != undefined && <Typography>Dosya başarıyla yüklendi. Adresi: {`https://diyetkocum.net/api/v1/${path.replace(/\\/g, '/')}`}</Typography>}
          </span>
        }
      </div>  
    )}
};

const mapStateToProps = (state, ownProps) => {

  return {
    apiForm: state.form,
    apiDanisanFiles: state.apiDanisanFiles,
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
      uploadPhoto: (userId, files) => uploadPhoto(userId, files),
      addDanisanFiles: (userId, danisanUserName, files) => addDanisanFiles(userId, danisanUserName, files),
      getDanisanFiles: (userId, danisanUserName) => getDanisanFiles(userId, danisanUserName),
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({ form: 'AddPhotoForm', enableReinitialize: true })(withStyles(styles)(Envanter)));
