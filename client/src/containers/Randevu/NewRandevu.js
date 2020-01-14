import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

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
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import { withSnackbar } from 'material-ui-snackbar-provider'

import InputAdornment from '@material-ui/core/InputAdornment';
import { getDietitianProfile, putDietitianProfile } from '../../store/reducers/api.dietitianProfile';
import { getDietitianAppointments, putDietitianAppointment } from '../../store/reducers/api.dietitianAppointments';

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

import { DatePickerInput, StaticDatePickerInput } from '../../components/DateTimePicker'

import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import {reset} from 'redux-form';
import Slide from '@material-ui/core/Slide';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import DoneIcon from '@material-ui/icons/Done';

import Header from "../../components/Header";

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
      marginTop: theme.spacing(7),
      backgroundColor: 'rgb(255,255,255)'
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

class NewRandevuWrapper extends React.Component {
    constructor(props) {
        super(props)

        this.isLoaded = this.isLoaded.bind(this);
        this.onSubmitInternal = this.onSubmitInternal.bind(this)

        this.state = {
          userId: this.props.location.pathname.split('/')[2],
          date: new Date(),
          step: 1,
        }
    }

    componentDidMount() {
      if (!this.isLoaded()) {
        this.props.getDietitianProfile(this.state.userId);
      }
  
      this.props.getDietitianAppointments(this.state.userId, moment(this.state.date).format('YYYYMMDD'))
    }

    onSubmitInternal(formValues) {
        console.log(formValues);
        this.setState({ step: 3, formValues: formValues})
        this.props.putDietitianAppointment(this.state.userId, moment(this.state.date).format('YYYYMMDD'), this.state.time, formValues);
    }

    isLoaded() {
        var loaded = this.props.apiDietitianProfile != undefined &&
            this.props.apiDietitianProfile[this.state.userId] != undefined &&
            this.props.apiDietitianProfile[this.state.userId].isGetLoading != true &&
            this.props.apiDietitianProfile[this.state.userId].data != undefined;

        return loaded;
    }

    render() {
        const { classes } = this.props;
        const showLoader = !this.isLoaded();
        console.log(this.state);
        var user = showLoader ? undefined : this.props.apiDietitianProfile[this.state.userId].data;
        console.log(user)

        return (
            <div className={classes.root}>
                <Header
                    noButton={this.state.step == 1}
                    permanentDrawer={false} 
                    backButton={this.state.step != 1 ? this.props.location.pathname : undefined}
                    onBackButtonClick={() => this.setState({step: 1})}
                    title={this.state.step == 1 
                        ? "RANDEVU TARİHİNİ SEÇ" 
                        : this.state.step == 2 ? "BİLGİLERİNİ GİR" : ""}
                />
                <main>
                    <Form
                        onSubmit={this.props.handleSubmit(this.onSubmitInternal)}
                        name={this.props.form}
                    >
                        { showLoader && renderLoadingButton(classes) }
                        { !showLoader && (
                            <Card className={classes.card}>
                                <CardHeader
                                avatar={
                                    <Avatar className={classes.avatar} alt={user.name} src={user.url} />
                                }
                                title={<Typography variant="h5" component="h2">{user.name}</Typography>}
                                />
                            </Card>
                        )}
                        { !showLoader && this.state.step == 1 && 
                            <NewRandevuStep1 
                                {...this.props}
                                userId={this.state.userId}
                                date={this.state.date} 
                                onComplete={(date, time) => this.setState({date, time, step: 2})}  
                            /> 
                        }
                        { !showLoader && this.state.step == 2 && 
                            <NewRandevuStep2 
                                {...this.props}
                                userId={this.state.userId}
                                date={this.state.date} 
                                time={this.state.time}
                                handleFormSubmit={this.props.handleSubmit(this.onSubmitInternal)} 
                            /> 
                        }
                        { !showLoader && this.state.step == 3 && 
                            <NewRandevuStep3 
                                {...this.props}
                                userId={this.state.userId}
                                date={this.state.date} 
                                time={this.state.time}
                                formValues={this.state.formValues} 
                                handleFormSubmit={this.props.handleSubmit(this.onSubmitInternal)} 
                            /> 
                        }
                    </Form>
                </main>
            </div>
        )
    }
}

class NewRandevuStep1 extends React.Component {

  constructor(props) {
    super(props);

    this.isDateLoaded = this.isDateLoaded.bind(this);
    this.handleOnDateChange = this.handleOnDateChange.bind(this);
    this.handleTimeSelected = this.handleTimeSelected.bind(this);
    console.log(props)
    this.state = {
      userId: props.userId,
      date: props.date,
      dateFmt: moment(props.date).format('YYYYMMDD')
    }
  }

  isDateLoaded() {
    var loaded = this.props.apiDietitianAppointments != undefined &&
      this.props.apiDietitianAppointments[this.state.userId] != undefined &&
      this.props.apiDietitianAppointments[this.state.userId][this.state.dateFmt] != undefined &&
      this.props.apiDietitianAppointments[this.state.userId][this.state.dateFmt].isGetLoading != true &&
      this.props.apiDietitianAppointments[this.state.userId][this.state.dateFmt].data != undefined;

      return loaded;
  }

  handleOnDateChange(d) {
      console.log(d)
      var date = moment(d).format('YYYYMMDD')
      console.log(date)
      this.props.getDietitianAppointments(this.state.userId, date);
      this.setState({date: d, dateFmt: moment(d).format('YYYYMMDD')})
  }

  handleTimeSelected(h) {
      return () => {
          console.log(h)
          this.props.onComplete(this.state.date, h)
      }
  }

  render() {
    const { classes } = this.props;
    const showDateLoader = !this.isDateLoaded();

    return (
        <span>
            <div style={{margin: '8px'}}>
                <Grid container spacing={2}>
                <Grid style={{display: 'flex', justifyContent: 'center'}} item xs={12} sm={12} md={12} lg={12}>
                    <StaticDatePickerInput value={this.state.date} onChange={(newValue) => this.handleOnDateChange(newValue)} />
                </Grid>
                </Grid>
            </div>

            { showDateLoader && renderLoadingButton(classes)}
            { !showDateLoader &&
                <span>
                    <div style={{margin: '8px'}}>
                        <Typography style={{marginTop: '16px', marginBottom: '8px'}} color="secondary" variant="button" display="block" gutterBottom>
                        MÜSAİT ZAMANLAR
                        </Typography>

                        <Grid container spacing={2}>
                        { ApptHours().map( (h, i) => {
                            var profile = this.props.apiDietitianProfile[this.state.userId].data;

                            if (profile[h] != true) {
                                return;
                            }
                    
                            var appts = this.props.apiDietitianAppointments[this.state.userId][this.state.dateFmt].data;

                            if (appts[h] != undefined) {
                                return;
                            }

                            return (<Grid style={{display: 'flex', justifyContent: 'center'}} key={i} item xs={6} sm={4} md={3} lg={2}>
                                <Button onClick={this.handleTimeSelected(h)} variant="outlined" size="medium" color="primary" >
                                    {h}
                                </Button>
                            </Grid>)
                        })}
                        </Grid>
                    </div>
                </span>
            }
        </span>
    )}
};


const required = value => value ? undefined : 'Zorunlu'

class NewRandevuStep2 extends React.Component {

    constructor(props) {
      super(props);
        
      this.state = {
        userId: this.props.userId,
        openDialog: false,
      }
    }
  
    componentDidMount() {
        //this.props.initialize(this.props.profile)
    }

    render() {
      const { classes } = this.props;
        var user = this.props.apiDietitianProfile[this.state.userId].data;
        console.log(this.props)
      return (
          <span>
              <Dialog 
                    open={this.state.openDialog} 
                    onClose={() => this.setState({openDialog: false})}
                >
                    <DialogTitle id="form-dialog-title">Randevu isteğini onaylıyor musun?</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Seçtiğin randevu isteği <b>{user.name}</b> ile <b>{moment(this.props.date).format('D MMMM YYYY dddd')}</b> günü saat <b>{this.props.time}</b> arasındadır.
                            Randevunun durumu diyetisyenin randevuyu onaylamasından sonra kesinleşecektir. Randevu isteğini göndermek istiyor musun?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.setState({openDialog: false})} color="secondary">
                            VAZGEÇ
                        </Button>
                        <Button onClick={this.props.handleFormSubmit} color="secondary" autoFocus>
                            GÖNDER
                        </Button>
                    </DialogActions>
                </Dialog>

                <div style={{margin: '8px'}}>
                        <Typography style={{marginTop: '16px', marginBottom: '8px'}} color="secondary" variant="button" display="block" gutterBottom>
                         KİŞİSEL BİLGİLER
                        </Typography>

                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6} md={6} lg={6}>
                                <ReduxFormTextField required validate={[required]} name="name" label="Adın ve soyadın" />
                            </Grid>
                            <Grid item xs={12} sm={6} md={6} lg={6}>
                                <ReduxFormTextField required validate={[required]} name="email" label="E-posta adresin" />
                            </Grid>
                            <Grid item xs={6} sm={6} md={6} lg={6}>
                                <ReduxFormTextField name="tel" label="Telefon numaran" />
                            </Grid>
                            <Grid item xs={6} sm={6} md={3} lg={3}>
                                <Field name='birthday' label="Doğum tarihin" component={DatePickerInput} />
                                {/* <ReduxFormTextField name="yas" label="Yaşı" type="number"/> */}
                            </Grid>
                            <Grid item xs={6} sm={6} md={3} lg={3}>
                                <ReduxFormSelect
                                name="cinsiyet"
                                label="Cinsiyetin"
                                values={[
                                    {
                                    label: 'Kadın',
                                    value: 'Kadın',
                                    },
                                    {
                                    label: 'Erkek',
                                    value: 'Erkek',
                                    },
                                    {
                                    label: 'Diğer',
                                    value: 'Diğer',
                                    },
                                ]}
                                />
                            </Grid>
                            <Grid item xs={3} sm={3} md={3} lg={3}>
                                <ReduxFormTextField required validate={[required]} name="kilo" label="Kilon" type="number" InputProps={{endAdornment: <InputAdornment position="end"><Typography color="primary" variant="caption">Kg</Typography></InputAdornment>}} />
                            </Grid>
                            <Grid item xs={3} sm={3} md={3} lg={3}>
                                <ReduxFormTextField required validate={[required]} name="boy" label="Boyun" type="number" InputProps={{endAdornment: <InputAdornment position="end"><Typography color="primary" variant="caption">Cm</Typography></InputAdornment>}} />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <ReduxFormTextField name="notes" rows={3} label="Diyetisyene notların" multiline />
                            </Grid>
                        </Grid>
                    </div>
                    <div style={{margin: '16px'}}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <Button disabled={this.props.pristine || this.props.invalid} onClick={() => this.setState({openDialog: true})} variant="contained" color="primary">RANDEVU İSTEĞİNİ GÖNDER</Button>
                            </Grid>
                        </Grid>
                    </div>
          </span>
      )}
  };

class NewRandevuStep3 extends React.Component {

    constructor(props) {
      super(props);
  
  
      this.state = {
        userId: this.props.userId,
      }
    }
  
    render() {
      const { classes } = this.props;
  
      return (
          <span>
                
              <div style={{margin: '8px'}}>
                <Typography style={{marginTop: '48px', marginBottom: '8px'}} color="primary" variant="body2" display="block" gutterBottom>
                    Randevu isteğin başarıyla gönderildi. İsteğin diyetisyen tarafından onaylandığında {this.props.formValues.email} adresine e-posta gelecektir.
                </Typography>

              </div>
          </span>
      )}
  };

const mapStateToProps = (state, ownProps) => {
  return {
    apiDietitianProfile: state.apiDietitianProfile,
    apiDietitianAppointments: state.apiDietitianAppointments,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getDietitianProfile: (userId) => getDietitianProfile(userId),
      getDietitianAppointments: (userId, date) => getDietitianAppointments(userId, date),
      putDietitianAppointment: (userId, date, time, values) => putDietitianAppointment(userId, date, time, values),
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({ form: 'DiyetisyenNewRandevuForm', enableReinitialize: true })(withStyles(styles)(withSnackbar()(NewRandevuWrapper))));
