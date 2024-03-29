import Button from "@material-ui/core/Button";
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from "@material-ui/core/Typography";
import PostAddIcon from '@material-ui/icons/PostAdd';
import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Field, Form, reduxForm } from "redux-form";
import { addDanisanFiles, getDanisanFiles } from '../../store/reducers/api.danisanFiles';








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
      userId: JSON.parse(localStorage.getItem('user')).id
    }
  }

  isLoaded() {
    console.log(this.props);
    console.log(this.state.userId);

    var loaded = this.props.apiDanisanFiles != undefined &&
      this.props.apiDanisanFiles[this.state.userId] != undefined &&
      this.props.apiDanisanFiles[this.state.userId][this.props.danisanUserName] != undefined && 
      this.props.apiDanisanFiles[this.state.userId][this.props.danisanUserName].isGetLoading != true &&
      this.props.apiDanisanFiles[this.state.userId][this.props.danisanUserName].data != undefined;

      console.log(loaded);
      return loaded;
  }

  componentDidMount() {
    if (!this.isLoaded()) {
      this.props.getDanisanFiles(this.state.userId, this.props.danisanUserName);
    }
  }

  onSubmitInternal(formValues) {
    console.log(formValues);

    const formData = new FormData();
    formData.append('file',formValues.file)
    formData.append('type', 'olcum')
    console.log(formData);

    this.props.addDanisanFiles(this.state.userId, this.props.danisanUserName, formData);
    this.onDialogClose();
  }

  onDialogClose(values) {
    this.setState({openDialog: undefined})
  }

  render() {
    console.log(this.props);
    const { classes } = this.props;

    const showLoader = !this.isLoaded();
    const allFiles = showLoader ? undefined : this.props.apiDanisanFiles[this.state.userId][this.props.danisanUserName].data;
    console.log(allFiles)

    return (
      <div className={classes.root}> 
        <Form
          onSubmit={this.props.handleSubmit(this.onSubmitInternal)}
          name={this.props.form}
        >  
          <Button disabled={true} onClick={() => this.setState({openDialog: true})} style={{marginRight: '8px'}} variant="outlined" size="small" color="primary" startIcon={<PostAddIcon />}>
            TARTI ÖLÇÜMÜ EKLE
          </Button>
          <Divider style={{marginTop: '8px', marginBottom: '8px'}} />

          <Dialog 
            fullWidth
            open={this.state.openDialog != undefined} 
            onClose={() => this.onDialogClose(undefined)}
          >
            <DialogTitle id="form-dialog-title">Yeni Ölçüm Ekle</DialogTitle>
            <DialogContent>
              <Grid container spacing={2}>
                <Grid item xs={6} sm={6} md={3} lg={3}>
                  <Field
                    fullWidth
                    name="kilo"
                    component={renderTextField}
                    label="Kilo"
                    type="number" 
                    InputProps={{endAdornment: <InputAdornment position="end"><Typography color="primary" variant="caption">Kg</Typography></InputAdornment>}}
                  />
                </Grid>
                <Grid item xs={6} sm={6} md={3} lg={3}>
                  <Field
                    fullWidth
                    name="boy"
                    component={renderTextField}
                    label="Boy"
                    type="number" 
                    InputProps={{endAdornment: <InputAdornment position="end"><Typography color="primary" variant="caption">Cm</Typography></InputAdornment>}}
                  />
                </Grid>
                <Grid item xs={6} sm={6} md={3} lg={3}>
                  <Field
                    fullWidth
                    name="bacak"
                    component={renderTextField}
                    label="Bacak ölçüsü"
                    type="number" 
                    InputProps={{endAdornment: <InputAdornment position="end"><Typography color="primary" variant="caption">Cm</Typography></InputAdornment>}}
                  />
                </Grid>
                <Grid item xs={6} sm={6} md={3} lg={3}>
                  <Field
                    fullWidth
                    name="kol"
                    component={renderTextField}
                    label="Kol ölçüsü"
                    type="number" 
                    InputProps={{endAdornment: <InputAdornment position="end"><Typography color="primary" variant="caption">Cm</Typography></InputAdornment>}}
                  />
                </Grid>
                <Grid item xs={6} sm={6} md={3} lg={3}>
                  <Field
                    fullWidth
                    name="gogus"
                    component={renderTextField}
                    label="Göğüs ölçüsü"
                    type="number" 
                    InputProps={{endAdornment: <InputAdornment position="end"><Typography color="primary" variant="caption">Cm</Typography></InputAdornment>}}
                  />
                </Grid>
              </Grid> 

            </DialogContent>
            <DialogActions>
              <Button disabled={this.props.submitting} onClick={() => this.onDialogClose(undefined)} color="secondary">
                İPTAL
              </Button>
              <Button disabled={this.props.submitting} onClick={this.props.handleSubmit(this.onSubmitInternal)} color="secondary">
                KAYDET
              </Button>
            </DialogActions>
          </Dialog>

          { showLoader && renderLoadingButton(classes) }
          { !showLoader && 
            <span>
              {/* <SpeedDial
                icon={<AddIcon />}
                actions={[
                  {name: 'Kan Tahlili Ekle', icon: <NoteAddIcon />, onClick: () => console.log('kan tahlılı')},
                  {name: 'Tartı Ölçümü Ekle', icon: <PostAddIcon />, onClick: () => console.log('tartı')}
                ]}
              /> */}

                <Typography variant="body2" style={{textAlign: 'center'}}>Bu danışana ait ölçüm bilgisi bulunmamaktadır.</Typography>

              {/* {Object.keys(allFiles).map((day, idx) => {
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
                    })}
                  </List>
                )
              })} */}
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
      addDanisanFiles: (userId, danisanUserName, files) => addDanisanFiles(userId, danisanUserName, files),
      getDanisanFiles: (userId, danisanUserName) => getDanisanFiles(userId, danisanUserName),
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({ form: 'DanisanTahlilForm', enableReinitialize: true })(withStyles(styles)(Envanter)));
