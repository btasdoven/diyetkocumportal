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
import { DatePickerInput } from '../../components/DateTimePicker'
import EventIcon from '@material-ui/icons/Event';
import OlcumlerTartiPdf from './OlcumlerTartiPdf'

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
import { getDanisanMeasurements, addDanisanMeasurement } from '../../store/reducers/api.danisanMeasurements'

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
    width: '100%'
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

    var loaded = this.props.apiDanisanMeasurements != undefined &&
      this.props.apiDanisanMeasurements[this.state.userId] != undefined &&
      this.props.apiDanisanMeasurements[this.state.userId][this.props.danisanUserName] != undefined && 
      this.props.apiDanisanMeasurements[this.state.userId][this.props.danisanUserName].isGetLoading != true &&
      this.props.apiDanisanMeasurements[this.state.userId][this.props.danisanUserName].data != undefined;

      console.log(loaded);
      return loaded;
  }

  componentDidMount() {
    if (!this.isLoaded()) {
      this.props.getDanisanMeasurements(this.state.userId, this.props.danisanUserName);
    }
  }

  onSubmitInternal(formValues) {
    console.log(formValues);
    formValues['uniqueFileKey'] = this.state.uniqueFileKey;
    console.log(formValues);
    // const formData = new FormData();
    // formData.append('file',formValues.file)
    // formData.append('type', 'olcum')
    // console.log(formData);

    this.props.addDanisanMeasurement(this.state.userId, this.props.danisanUserName, formValues);
    this.onDialogClose();
  }

  onDialogClose(values) {
    this.setState({openDialog: undefined, uniqueFileKey: undefined})
  }

  render() {
    console.log(this.props);
    const { classes } = this.props;

    const showLoader = !this.isLoaded();
    const allMeasurements = showLoader ? undefined : this.props.apiDanisanMeasurements[this.state.userId][this.props.danisanUserName].data;
    console.log(allMeasurements)

    return (
      <div className={classes.root}> 
        <Form
          onSubmit={this.props.handleSubmit(this.onSubmitInternal)}
          name={this.props.form}
        >  
          {/* <Button onClick={() => this.setState({openDialog: true, uniqueFileKey: 'olcum_' + Date.now()})} style={{marginRight: '8px'}} variant="outlined" size="small" color="primary" startIcon={<PostAddIcon />}>
            YENİ ÖLÇÜM EKLE
          </Button>
          <Divider style={{marginTop: '8px'}} /> */}

          <SpeedDial
            icon={<PostAddIcon />}
            iconText={"YENİ ÖLÇÜM EKLE"}
            // hidden={this.props.pristine}
            onClickFab={() => this.setState({openDialog: true, uniqueFileKey: 'olcum_' + Date.now()})}
            // actions={[
            //   {name: 'hey', icon: <MoreVertIcon />, onClick: () => console.log('click')},
            //   {name: 'hey', icon: <MoreVertIcon />, onClick: () => console.log('click')}
            // ]}
          />

          <Dialog 
            fullWidth
            open={this.state.openDialog != undefined} 
            onClose={() => this.onDialogClose(undefined)}
          >
            <DialogTitle id="form-dialog-title">Yeni Ölçüm Ekle</DialogTitle>
            <DialogContent>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <Field name='olcum_tarihi' label="Ölçüm tarihi" component={DatePickerInput} />
                  {/* <ReduxFormTextField name="yas" label="Yaşı" type="number"/> */}
                </Grid>

                <Grid item xs={6} sm={6} md={6} lg={6}>
                  <Field
                    fullWidth
                    name="kilo"
                    component={renderTextField}
                    label="Kilo"
                    type="number" 
                    InputProps={{endAdornment: <InputAdornment position="end"><Typography color="primary" variant="caption">Kg</Typography></InputAdornment>}}
                  />
                </Grid>
                <Grid item xs={6} sm={6} md={6} lg={6}>
                  <Field
                    fullWidth
                    name="boy"
                    component={renderTextField}
                    label="Boy"
                    type="number" 
                    InputProps={{endAdornment: <InputAdornment position="end"><Typography color="primary" variant="caption">Cm</Typography></InputAdornment>}}
                  />
                </Grid>
                <Grid item xs={6} sm={6} md={6} lg={6}>
                  <Field
                    fullWidth
                    name="bacak"
                    component={renderTextField}
                    label="Bacak ölçüsü"
                    type="number" 
                    InputProps={{endAdornment: <InputAdornment position="end"><Typography color="primary" variant="caption">Cm</Typography></InputAdornment>}}
                  />
                </Grid>
                <Grid item xs={6} sm={6} md={6} lg={6}>
                  <Field
                    fullWidth
                    name="kol"
                    component={renderTextField}
                    label="Kol ölçüsü"
                    type="number" 
                    InputProps={{endAdornment: <InputAdornment position="end"><Typography color="primary" variant="caption">Cm</Typography></InputAdornment>}}
                  />
                </Grid>
                <Grid item xs={6} sm={6} md={6} lg={6}>
                  <Field
                    fullWidth
                    name="gogus"
                    component={renderTextField}
                    label="Göğüs ölçüsü"
                    type="number" 
                    InputProps={{endAdornment: <InputAdornment position="end"><Typography color="primary" variant="caption">Cm</Typography></InputAdornment>}}
                  />
                </Grid>
                <Grid item xs={6} sm={6} md={6} lg={6}>
                  <Field
                    fullWidth
                    name="bel"
                    component={renderTextField}
                    label="Bel ölçüsü"
                    type="number" 
                    InputProps={{endAdornment: <InputAdornment position="end"><Typography color="primary" variant="caption">Cm</Typography></InputAdornment>}}
                  />
                </Grid>
                <Grid item xs={6} sm={6} md={6} lg={6}>
                  <Field
                    fullWidth
                    name="gobek"
                    component={renderTextField}
                    label="Göbek ölçüsü"
                    type="number" 
                    InputProps={{endAdornment: <InputAdornment position="end"><Typography color="primary" variant="caption">Cm</Typography></InputAdornment>}}
                  />
                </Grid>
                <Grid item xs={6} sm={6} md={6} lg={6}>
                  <Field
                    fullWidth
                    name="kalca"
                    component={renderTextField}
                    label="Kalça ölçüsü"
                    type="number" 
                    InputProps={{endAdornment: <InputAdornment position="end"><Typography color="primary" variant="caption">Cm</Typography></InputAdornment>}}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <OlcumlerTartiPdf uniqueFileKey={this.state.uniqueFileKey} danisanUserName={this.props.danisanUserName} />
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
              {allMeasurements.length == 0 && <Typography variant="body2" style={{paddingTop: 'calc(50vh - 100px)', textAlign: 'center'}}>Bu danışana ait ölçüm bilgisi bulunmamaktadır.</Typography>}

              {Object.keys(allMeasurements).map((day, idx) => {
                const measurementsPerDay = allMeasurements[day];
                console.log(measurementsPerDay);

                return (
                  <List
                    key={idx} 
                    disablePadding
                    subheader={
                      <ListSubheader component="span" id="nested-list-subheader">
                        <Typography component="span" variant="subtitle2" color="secondary">{moment(day).format('D MMMM YYYY')}</Typography>
                      </ListSubheader>
                  }>
                    {Object.keys(measurementsPerDay).map((mTs, midx) => {
                      const measurement = measurementsPerDay[mTs];

                      return (
                        <ListItem 
                          key={midx}
                          button 
                          style={{padding: 0}}
                          // component="a" 
                          // href={userService.getStaticFileUri(file.path)}
                          // target="_blank"
                            //component={Link} to={"/c/" + danisan.name}
                        >
                          <Card variant="outlined" className={classes.card}>
                            <CardContent>
                              <Grid container spacing={1}>
                                <Grid item xs={4} sm={3} md={3} lg={2}>
                                  <Typography className={classes.pos} color="textSecondary">Kilo</Typography>
                                  <Typography className={classes.pos} color="textPrimary">{measurement.kilo || ''} {measurement.kilo ? 'kg' : ''}</Typography>
                                </Grid>
                                <Grid item xs={4} sm={3} md={3} lg={2}>
                                  <Typography className={classes.pos} color="textSecondary">Boy</Typography>
                                  <Typography className={classes.pos} color="textPrimary">{measurement.boy || ''} {measurement.boy ? 'cm' : ''}</Typography>
                                </Grid>
                                <Grid item xs={4} sm={3} md={3} lg={2}>
                                  <Typography className={classes.pos} color="textSecondary">Bacak</Typography>
                                  <Typography className={classes.pos} color="textPrimary">{measurement.bacak || ''} {measurement.bacak ? 'cm' : ''}</Typography>
                                </Grid>
                                <Grid item xs={4} sm={3} md={3} lg={2}>
                                  <Typography className={classes.pos} color="textSecondary">Kol</Typography>
                                  <Typography className={classes.pos} color="textPrimary">{measurement.kol || ''} {measurement.kol ? 'cm' : ''}</Typography>
                                </Grid>
                                <Grid item xs={4} sm={3} md={3} lg={2}>
                                  <Typography className={classes.pos} color="textSecondary">Göğüs</Typography>
                                  <Typography className={classes.pos} color="textPrimary">{measurement.gogus || ''} {measurement.gogus ? 'cm' : ''}</Typography>
                                </Grid>
                                <Grid item xs={4} sm={3} md={3} lg={2}>
                                  <Typography className={classes.pos} color="textSecondary">Göbek</Typography>
                                  <Typography className={classes.pos} color="textPrimary">{measurement.gobek || ''} {measurement.gobek ? 'cm' : ''}</Typography>
                                </Grid>
                              </Grid>
                            </CardContent>
                            {/* <CardActions>
                              <Button size="small">Learn More</Button>
                            </CardActions> */}
                          </Card>
                        </ListItem>
                      )
                    })}
                  </List>
                )
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
    apiDanisanMeasurements: state.apiDanisanMeasurements,
    // apiDanisanProfile: state.apiDanisanProfile,
    initialValues: { 
      olcum_tarihi: moment(moment().format('DD.MM.YYYY'), 'DD.MM.YYYY').toDate(),
    },
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      addDanisanMeasurement: (userId, danisanUserName, measurement) => addDanisanMeasurement(userId, danisanUserName, measurement),
      getDanisanMeasurements: (userId, danisanUserName) => getDanisanMeasurements(userId, danisanUserName),
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({ form: 'DanisanOlcumForm', enableReinitialize: true })(withStyles(styles)(Envanter)));
