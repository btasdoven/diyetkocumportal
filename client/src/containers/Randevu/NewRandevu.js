import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Checkbox from '@material-ui/core/Checkbox';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from "@material-ui/core/Typography";
import EditIcon from '@material-ui/icons/Edit';
import Rating from '@material-ui/lab/Rating';
import { withSnackbar } from 'material-ui-snackbar-provider';
import moment from "moment";
import 'moment/locale/tr';
import React from 'react';
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import SwipeableViews from 'react-swipeable-views';
import MaskedInput from 'react-text-mask';
import { bindActionCreators } from "redux";
import { Field, Form, reduxForm } from "redux-form";
import { DatePickerInput, StaticDatePickerInput } from '../../components/DateTimePicker';
import ExtendedLink from '../../components/ExtendedLink';
import HeaderV2 from "../../components/Header/HeaderV2";
import { trackPage } from '../../components/Signin/PageTracker';
import { getDietitianAppointments, putDietitianAppointment } from '../../store/reducers/api.dietitianAppointments';
import { getDietitianProfile } from '../../store/reducers/api.dietitianProfile';
import SpeedDial from '../SpeedDial/SpeedDial';
import PersonalPage from './PersonalPage';
import CircularLoader from "../../components/CircularLoader";










moment.locale('tr')

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
      //margin: theme.spacing(1),
      marginTop: theme.spacing(7),
      //backgroundColor: 'rgb(255,255,255)'
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
  rootTypeSelect: {
      height: "inherit",
      display: "flex",
      flexDirection: 'column',
      justifyContent: "center",
      width: '100%',
      //height: 'calc(100vh - ',
      alignItems: "center",
      padding: theme.spacing(3),
      textAlign: 'center',
      //position: 'absolute',
      //top: 0,
      bottom: 0,
      left: 0,
      right: 0,
  },
  bannerTop: {
    // position: 'fixed',
    backgroundColor: '#fafafa',
    marginBottom: '8px',
    top: 0,
    left: 0,
    right: 0,
    // display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
  banner: {
    position: 'fixed',
    bottom: '-100%',
    left: 0,
    right: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
    paddingTop: '8px',
    paddingBottom: '8px',
    transition: 'bottom 1s linear'
  },
  main: {
    width: '100%',
    display: 'block', // Fix IE 11 issue.
    //top: 0,
    [theme.breakpoints.up(600 + theme.spacing(6))]: {
      width: '600px',
      marginLeft: 'auto',
      marginRight: 'auto',
    }
    //backgroundColor: 'red',
    // padding: theme.spacing(1)
  },
  checkBoxRoot: {
    lineHeight: 1
  }
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
  const { input, label, classes, ...rest } = props;

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
        classes= {{ label: classes.checkBoxRoot}}
        label={label}
      />
  )
}



const ReduxFormSelect = ({name, label, values, ...props}) => (
  <FormControl
    //margin="normal"
    style={{width: '100%'}}
    required
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

function TextMaskCustom(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={ref => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={['+', '9', '0', ' ', /[1-9]/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, ' ', /\d/, /\d/]}
      guide={false}
      showMask={true}
      placeholder={"+90 "}
    />
  );
}

const renderMaskedTextField = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => {
  return (
    <TextField
      fullWidth
      label={label}
      {...input}
      {...custom}
      InputLabelProps={{color: 'primary', shrink: true}}
      InputProps={{inputComponent: TextMaskCustom}}
      error={touched && error != undefined}
      helperText={touched && error ? error : undefined}
    />
  )
};

const ReduxFormMasketTextField = ({name, label, ...props}) => (
  <Field
      name={name}
      component={renderMaskedTextField}
      label={label}
      {...props}
  />)

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
        this.setStateInternal = this.setStateInternal.bind(this);
        this.renderHeader = this.renderHeader.bind(this);
        this.onSubmitInternal = this.onSubmitInternal.bind(this)
        this.getData = this.getData.bind(this)

        this.state = {
          userId: this.props.match && this.props.match.params && this.props.match.params.diyetisyenUserName ? this.props.match.params.diyetisyenUserName : '',
          addressId: -1,
          date: new Date(),
          time: Date.now(),
          step: 0,
          type: undefined,
          showBanner: false,
          user: JSON.parse(localStorage.getItem('user')),
        }

        // setTimeout(() => this.setState({showBanner: true}), 750)
    }

    getData(userId) {
      if (!this.isLoaded(userId)) {
        this.props.getDietitianProfile(userId);
      }
  
      this.props.getDietitianAppointments(userId, moment(this.state.date).format('YYYYMMDD'))
    }

    componentDidMount() {
      this.getData(this.state.userId)
    }

    componentWillReceiveProps(newProps) {

      var userId = newProps.match && newProps.match.params && newProps.match.params.diyetisyenUserName ? newProps.match.params.diyetisyenUserName : ''

      if (userId != this.state.userId) {
        this.setState({
          userId: userId,
          addressId: -1,
          date: new Date(),
          time: Date.now(),
          step: 0,
          type: undefined,
          showBanner: false,
          user: JSON.parse(localStorage.getItem('user')),
        })

        this.getData(userId);
      }

    }

    componentDidUpdate(prevProps, prevState) {
      if (prevState.step != this.state.step) {
        trackPage(this.props.location.pathname + "/" + this.state.step)
      }
    }

    setStateInternal(newState) {
      newState = {
        ...this.state,
        ...newState
      }

      this.props.setOnBackButtonClick(newState.step > 0 && newState.formValues == undefined ? () => this.setStateInternal( {step : newState.step - 1}) : undefined)
      this.props.setTitle(newState.step == 0 || newState.formValues != undefined
        ? undefined
        : newState.type == 'randevu' 
          ? 'Yüz Yüze Randevu Al' 
          : 'Online Diyete Başla'
      )

      this.setState(newState);
    }

    onSubmitInternal(formValues) {
        console.log(formValues);
        this.setStateInternal({ step: this.state.step + 1, formValues: formValues})

        var user = this.props.apiDietitianProfile[this.state.userId].data;
        var addressId = this.state.addressId

        if (addressId == -1 && this.state.type == 'randevu') {
          addressId = Object.keys(user.addresses)[0]
        }
        var address = this.state.addressId == -1 ? undefined : user.addresses[addressId].address;
        var sub = { info: formValues, type: this.state.type, status: 'pending', address: address, addressId: addressId}

        this.props.putDietitianAppointment(this.state.userId, moment(this.state.date).format('YYYYMMDD'), this.state.time, sub);
  
        window.scrollTo(0, 0)
    }

    isLoaded(userId) {
        var loaded = this.props.apiDietitianProfile != undefined &&
            this.props.apiDietitianProfile[userId] != undefined &&
            this.props.apiDietitianProfile[userId].isGetLoading != true &&
            this.props.apiDietitianProfile[userId].data != undefined;

        return loaded;
    }

    renderHeader() {
      return (
        <HeaderV2 static 
          onBackButtonClick={this.state.step > 0 && this.state.formValues == undefined ? () => this.setStateInternal( {step : this.state.step - 1}) : undefined}
          title={this.state.step == 0 || this.state.formValues != undefined
            ? undefined
            : this.state.type == 'randevu' 
              ? 'Yüz Yüze Randevu Al' 
              : 'Online Diyete Başla'
          }
        />
      );
    }

    render() {
        const { classes, history } = this.props;
        const showLoader = !this.isLoaded(this.state.userId);
        var user = showLoader ? undefined : this.props.apiDietitianProfile[this.state.userId].data;

        if (!showLoader && Object.keys(user).length == 0) {
          return <Redirect to="/" />
        }

        if (showLoader) {
          return <CircularLoader />
        }

        var multipleOffices = user && Object.keys(user.addresses).length > 1;
          
        return (
          <Form
            onSubmit={this.props.handleSubmit(this.onSubmitInternal)}
            name={this.props.form}
          >

            { this.state.user != undefined && this.state.user.id == this.state.userId && this.state.step == 0 &&
              <SpeedDial
                  icon={<EditIcon />}
                  iconText={"DÜZENLE"}
                  eventText={"PersonalPageEdit"}
                  onClickFab={() => history.push("/me")}
                  style={{zIndex: 1, position: 'fixed', bottom: '16px', right: '16px'}}
              />
            }

            <SwipeableViews
              axis={'x'}
              disabled={true}
              index={this.state.step}
            >
              <div style={this.state.step == 0 ? {} : {height: 'calc(100vh - 56px)', overflowY: 'hidden'}}>
                <PersonalPage 
                  dietitianProfile={user}  // dietitian whose personal page is being visited
                  userId={this.state.userId} 
                  onComplete={(type) => this.setStateInternal({step: 1, type: type})} // action to be called to move to the next step
                />
              </div>
              <div>
                { multipleOffices && this.state.type == 'randevu' && 
                  <NewRandevuStep1
                    {...this.props}
                    userId={this.state.userId}
                    onComplete={(addressId) => this.setStateInternal({addressId, step: 2})}  
                  /> 
                }
                { !multipleOffices && this.state.type == 'randevu' && 
                  <NewRandevuStep2 
                    {...this.props}
                    activeStep={this.state.step == 1}
                    userId={this.state.userId}
                    addressId={this.state.addressId}
                    date={this.state.date} 
                    type={this.state.type}
                    onComplete={(date, time) => this.setStateInternal({date, time, step: 2})}  
                  /> 
                }
                { this.state.type != 'randevu' && 
                  <NewRandevuStep3 
                    {...this.props}
                    userId={this.state.userId}
                    date={this.state.date} 
                    time={this.state.time} 
                    type={this.state.type}
                    handleFormSubmit={this.props.handleSubmit(this.onSubmitInternal)} 
                  /> 
                }
              </div>
              <div>
                { multipleOffices && this.state.type == 'randevu' && 
                  <NewRandevuStep2 
                    {...this.props}
                    activeStep={this.state.step == 2}
                    userId={this.state.userId}
                    addressId={this.state.addressId}
                    date={this.state.date} 
                    type={this.state.type}
                    onComplete={(date, time) => {
                      this.setStateInternal({date, time, step: 3})
                    }}  
                  /> 
                }
                { !multipleOffices && this.state.type == 'randevu' && 
                  <NewRandevuStep3 
                    {...this.props}
                    userId={this.state.userId}
                    date={this.state.date} 
                    time={this.state.time} 
                    type={this.state.type}
                    handleFormSubmit={this.props.handleSubmit(this.onSubmitInternal)} 
                  /> 
                }
                { this.state.type != 'randevu' && 
                  <NewRandevuStep4 
                    {...this.props}
                    userId={this.state.userId}
                    date={this.state.date} 
                    time={this.state.time} 
                    type={this.state.type}
                    formValues={this.state.formValues} 
                  />
                }
              </div>
              <div>
                { multipleOffices && this.state.type == 'randevu' && 
                  <NewRandevuStep3 
                    {...this.props}
                    userId={this.state.userId}
                    date={this.state.date} 
                    time={this.state.time} 
                    type={this.state.type}
                    handleFormSubmit={this.props.handleSubmit(this.onSubmitInternal)} 
                  /> 
                }
                { !multipleOffices && this.state.type == 'randevu' && 
                  <NewRandevuStep4 
                    {...this.props}
                    userId={this.state.userId}
                    date={this.state.date} 
                    time={this.state.time} 
                    type={this.state.type}
                    formValues={this.state.formValues} 
                  />
                }
              </div>
              <div>
                { multipleOffices && this.state.type == 'randevu' && 
                  <NewRandevuStep4 
                    {...this.props}
                    userId={this.state.userId}
                    date={this.state.date} 
                    time={this.state.time} 
                    type={this.state.type}
                    formValues={this.state.formValues} 
                  />
                }
              </div>
            </SwipeableViews>
          </Form>
        )
    }
}

class NewRandevuStep0 extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      userId: props.userId,
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render() {
    const { classes } = this.props;
    var user = this.props.apiDietitianProfile[this.state.userId].data;

    return (
      <span>
        <Card variant="outlined" className={classes.card}>
          <CardHeader
            style={{textAlign: 'center'}}
            title={
              <Rating readOnly={true} value={5} size="large" />
            }
          />
          <CardContent style={{paddingTop:0}}>
            <Grid container>
              <Grid item xs={12}>
                <div className={classes.text}>
                  <Typography variant="body2" style={{textAlign: 'center'}}>
                    {user.ozgecmis || 
                      `Merhaba, Ben ${user.unvan || ''} ${user.name}! Siz değerli danışanlarıma zayıflama, kilo alma, kilo verme, hamilelik ve emzirme döneminde beslenme, hastalıklarda beslenme, sporcu beslenmesi, vegan/vejetaryen diyet gibi farklı alanlarda sağlıklı beslenme ve diyet danışmanlığı hizmeti vermekteyim.`
                    }
                  </Typography>
                </div>
              </Grid>
            </Grid>
          </CardContent>
          {/* </div> */}
        </Card>
        <div className={classes.rootTypeSelect}>
          {user.online_diyet == true && <Button style={{margin: '24px'}} variant="contained" color="primary" onClick={() => this.props.onComplete('onlinediyet')}>ONLİNE DİYETE BAŞLA</Button>}
          {user.yuzyuze_diyet == true && <Button variant="contained" color="secondary" onClick={() => this.props.onComplete('randevu')}>YÜZ YÜZE RANDEVU AL</Button>}
        </div>
      </span>
    )}
};

class NewRandevuStep1 extends React.Component {

  constructor(props) {
    super(props);

    this.handleOnComplete = this.handleOnComplete.bind(this)

    this.state = {
      userId: props.userId,
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  handleOnComplete(ad) {
    var vad = ad;
    return () => {
      this.props.onComplete(vad)
    }
  }

  render() {
    const { classes } = this.props;
    var user = this.props.apiDietitianProfile[this.state.userId].data;

    return (
      <div className={classes.main}>
        <div className={classes.rootTypeSelect}>
          {Object.keys(user.addresses).map((ad) =>
            <Button key={ad} style={{margin: '24px'}} variant="contained" color="secondary" onClick={this.handleOnComplete(ad)}>{user.addresses[ad].address}</Button>
          )}
        </div>
      </div>
    )}
};

class NewRandevuStep2 extends React.Component {

  constructor(props) {
    super(props);

    this.isDateLoaded = this.isDateLoaded.bind(this);
    this.handleOnDateChange = this.handleOnDateChange.bind(this);
    this.handleTimeSelected = this.handleTimeSelected.bind(this);
    this.state = {
      userId: props.userId,
      date: props.date,
      dateFmt: moment(props.date).format('YYYYMMDD')
    }
  }

  isDateLoaded() {
    var loaded = this.props.apiDietitianAppointments != undefined &&
      this.props.apiDietitianAppointments[this.state.userId] != undefined &&
      this.props.apiDietitianAppointments[this.state.userId].data != undefined &&
      this.props.apiDietitianAppointments[this.state.userId].data[this.state.dateFmt] != undefined &&
      this.props.apiDietitianAppointments[this.state.userId].data[this.state.dateFmt].isGetLoading != true &&
      this.props.apiDietitianAppointments[this.state.userId].data[this.state.dateFmt].data != undefined;

      return loaded;
  }

  componentDidMount() {
    window.scrollTo(0, 0)

    if (!this.isDateLoaded())
      this.props.getDietitianAppointments(this.state.userId, this.state.dateFmt);
  }

  handleOnDateChange(d) {
      var date = moment(d).format('YYYYMMDD')
      this.props.getDietitianAppointments(this.state.userId, date);
      this.setState({date: d, dateFmt: moment(d).format('YYYYMMDD')})
  }

  handleTimeSelected(h) {
      return () => {
          this.props.onComplete(this.state.date, h)
      }
  }

  render() {
    const { classes } = this.props;
    const showDateLoader = !this.isDateLoaded();

    return (
      <div className={classes.main}>
        <div style={{margin: '8px'}}>
            <Grid container spacing={2}>
            <Grid style={{display: 'flex', justifyContent: 'center'}} item xs={12} sm={12} md={12} lg={12}>
                {this.props.activeStep && (
                  <StaticDatePickerInput 
                    shouldDisableDate={(d) => {
                      var day = moment(d).format("dddd")
                      var addressId = this.props.addressId;
                      if (addressId == -1) {
                        addressId = Object.keys(this.props.apiDietitianProfile[this.state.userId].data.addresses)[0]
                      }

                      return this.props.apiDietitianProfile[this.state.userId].data.addresses[addressId].days[day] != true
                    }} 
                    value={this.state.date} 
                    onChange={(newValue) => this.handleOnDateChange(newValue)} 
                  />
                )}
            </Grid>
            </Grid>
        </div>

        { showDateLoader && renderLoadingButton(classes)}
        { !showDateLoader &&
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
          
                  var appts = this.props.apiDietitianAppointments[this.state.userId].data[this.state.dateFmt].data;

                  if (appts[h] != undefined) {
                      return;
                  }

                  return (
                    <Grid style={{display: 'flex', justifyContent: 'center'}} key={i} item xs={6}>
                      <Button onClick={this.handleTimeSelected(h)} variant="outlined" size="medium" color="default" >
                        {h}
                      </Button>
                    </Grid>)
              })}
            </Grid>
          </div>
        }
      </div>
    )}
};

const required = value => value ? undefined : 'Zorunlu'
const validPhone = value => value && !/^\+90 [1-9][0-9]{2} [0-9]{3} [0-9]{2} [0-9]{2}$/i.test(value) ? 'Geçerli bir telefon numarası değil' : undefined;
const validEmail = value => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,5}$/i.test(value) ? 'Geçerli bir e-posta adresi değil' : undefined;
const matchEmails = (email, allValues) => email !== allValues.email ? 'Girdiğin e-postalar eşleşmiyor' : undefined;

class NewRandevuStep3 extends React.Component {

    constructor(props) {
      super(props);
        
      this.state = {
        userId: this.props.userId,
        openDialog: false,
      }
    }
  
    componentDidMount() {
        window.scrollTo(0, 0)
    }

    render() {
      const { classes } = this.props;
      var user = this.props.apiDietitianProfile[this.state.userId].data;

      var emailField = 
        this.props.apiForm == undefined ||
        this.props.apiForm[this.props.form] == undefined ||
        this.props.apiForm[this.props.form].values == undefined || 
        this.props.apiForm[this.props.form].values.email == undefined 
          ? ''
          : this.props.apiForm[this.props.form].values.email;

      return (
        <div className={classes.main}>
          <Dialog 
            open={this.state.openDialog} 
            onClose={() => this.setState({openDialog: false})}
          >
            <DialogTitle id="form-dialog-title">
              {this.props.type == 'randevu' ? "Randevu" : "Online diyet"} isteğini onaylıyor musun?
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  {this.props.type == 'randevu' && (
                    <span>
                      Seçtiğin randevu isteği <b>{user.name}</b> ile <b>{moment(this.props.date).format('D MMMM YYYY dddd')}</b> günü saat <b>{this.props.time}</b> arasındadır.
                      Randevunun durumu diyetisyenin randevuyu onaylamasından sonra <b>{emailField}</b> adresine bildirilecektir. E-posta adresinin doğruluğunu lütfen kontrol edin. Randevu isteğini göndermek istiyor musun?
                    </span>
                  )}
                  {this.props.type != 'randevu' && (
                    <span>
                      Diyetisyen <b>{user.name}</b> ile seçtiğin online diyet isteğinin durumu diyetisyenin onaylamasından sonra <b>{emailField}</b> adresine bildirilecektir. E-posta adresinin doğruluğunu lütfen kontrol edin. Online diyet isteğini göndermek istiyor musun?
                    </span>
                  )}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => this.setState({openDialog: false})} color="secondary">
                    VAZGEÇ
                </Button>
                <Button onClick={() => {
                  this.setState({openDialog: false})
                  this.props.handleFormSubmit()
                }} color="secondary" autoFocus>
                    GÖNDER
                </Button>
            </DialogActions>
          </Dialog>

          <Card elevation={0} className={classes.card}>
            {/* <div className={classes.divCategory}> */}
            <CardHeader
              title={
                <Typography color="secondary" variant="button" gutterBottom>
                KİŞİSEL BİLGİLER
                </Typography>
              }
            />
            <CardContent style={{paddingTop:0}}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                    <ReduxFormTextField required validate={[required]} name="name" label="Adın ve soyadın" />
                </Grid>
                <Grid item xs={12}>
                    <ReduxFormTextField required validate={[required, validEmail]} name="email" label="E-posta adresin" />
                </Grid>
                <Grid item xs={12}>
                    <ReduxFormTextField required validate={[required, validEmail, matchEmails]} name="email_confirmation" label="E-posta yeniden" />
                </Grid>
                <Grid item xs={6}>
                    <ReduxFormMasketTextField required name="tel" label="Telefon numaran" validate={[required, validPhone]} />
                </Grid>
                <Grid item xs={6}>
                    <Field required name='birthday' label="Doğum tarihin" component={DatePickerInput} validate={[required]}/>
                    {/* <ReduxFormTextField name="yas" label="Yaşı" type="number"/> */}
                </Grid>
                <Grid item xs={6}>
                    <ReduxFormSelect
                    required
                    name="cinsiyet"
                    label="Cinsiyetin"
                    validate={[required]}
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
                <Grid item xs={6}>
                    <ReduxFormTextField required name='hedef_kilo' label="Hedef kilo" type="number" validate={[required]} /> 
                </Grid>
                <Grid item xs={12}>
                    <ReduxFormTextField name="notes" rows={3} label="Diyetisyene notların" multiline />
                </Grid>
                <Grid item xs={12}>
                    <ReduxFormSelect
                    required
                    validate={[required]}
                    name="appointment_source"
                    label="Diyetisyeninizi nereden duydunuz?"
                    values={[
                        {
                        label: "Instagram'dan",
                        value: "Instagram'dan",
                        },
                        {
                        label: "Diyet Koçum'dan",
                        value: "Diyet Koçum'dan",
                        },
                        {
                        label: 'İnternetten',
                        value: 'İnternetten',
                        },
                        {
                        label: 'Arkadaşımdan',
                        value: 'Arkadaşımdan',
                        },
                        {
                        label: 'Zaten tanıyordum',
                        value: 'Zaten tanıyordum',
                        },
                        {
                        label: "Diğer",
                        value: "Diğer",
                        },
                    ]}
                    />
                </Grid>
                <Grid item xs={12} style={{marginTop: '16px'}}>
                  <ReduxFormCheckBox name="sozlesme" validate={[required]} classes={classes} label={
                    <Typography variant="caption" style={{letterSpacing: 0, lineHeight: 0}}>
                      DiyetKoçum'a sağladığım bu bilgilerin doğruluğunu teyit ediyorum ve bu bilgiler üzerinden bana ulaşılmasına izin veriyorum.
                      DiyetKoçum bu bilgileri yalnızca diyetisyeniniz ile paylaşacaktır.
                    </Typography>
                  }/>
                </Grid>
              </Grid>
              <div style={{marginTop: '32px', textAlign: 'center'}}>
                <Button disabled={this.props.pristine || this.props.invalid} onClick={() => this.setState({openDialog: true})} variant="contained" color="secondary">
                  {this.props.type == 'randevu' ? "RANDEVU" : "ONLİNE DİYET"} İSTEĞİNİ GÖNDER
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
  };

class NewRandevuStep4 extends React.Component {

    constructor(props) {
      super(props);
  
      this.isDateLoaded = this.isDateLoaded.bind(this)

      this.state = {
        userId: this.props.userId,
        dateFmt: moment(props.date).format('YYYYMMDD')
      }
    }

    isDateLoaded() {
      var loaded = this.props.apiDietitianAppointments != undefined &&
        this.props.apiDietitianAppointments[this.state.userId] != undefined &&
        this.props.apiDietitianAppointments[this.state.userId].data != undefined &&
        this.props.apiDietitianAppointments[this.state.userId].data[this.state.dateFmt] != undefined &&
        this.props.apiDietitianAppointments[this.state.userId].data[this.state.dateFmt].isGetLoading != true &&
        this.props.apiDietitianAppointments[this.state.userId].data[this.state.dateFmt].isPutLoading != true &&
        this.props.apiDietitianAppointments[this.state.userId].data[this.state.dateFmt].data != undefined;

        return loaded;
    }

    componentWillReceiveProps(newProps) {
      if (this.props.date != newProps.date) {
        this.setState({ dateFmt: moment(newProps.date).format('YYYYMMDD') })
      }
    }

    componentDidMount() {
        window.scrollTo(0, 0)
    }
    
    render() {
      const { classes } = this.props;
      var anamnezFormLink = '';

      if (this.isDateLoaded()) {
        var appt = this.props.apiDietitianAppointments[this.state.userId].data[this.state.dateFmt].data[this.props.time];

        if (appt) {
          anamnezFormLink = "/l/" + appt.linkId;
        }
      }

      return (
        <div className={classes.main}>
          <div style={{margin: '16px', display: 'flex', flexDirection: 'column'}}>
            
            <Typography variant="h6" style={{marginTop: '24px', textAlign:'center', color: '#32325d', fontWeight: 400 }}>
              {this.props.type == 'randevu' ? "Randevu" : "Online diyet"} isteğin başarıyla gönderildi!
            </Typography>

            <Typography style={{textAlign:'center', color: '#32325d', fontWeight: 400, marginTop: '24px', marginBottom: '8px'}} variant="body2" display="block" gutterBottom>
                  İsteğin diyetisyenin tarafından onaylandığında <b>{this.props.formValues ? this.props.formValues.email : ''}</b> adresine e-posta gönderilecektir.
            </Typography>

            <Typography style={{textAlign: 'center' ,color: '#32325d', fontWeight: 400, marginTop: '48px', marginBottom: '32px'}} color="textPrimary" variant="body2" display="block" gutterBottom>
                Bu süreçte diyetisyenlerimiz danışanlarına en uygun diyet programını hazırlayabilmek için birkaç bilgi daha rica ediyorlar.
            </Typography>

            <Button variant="contained" color="secondary" component={ExtendedLink} to={anamnezFormLink} style={{textAlign: 'center'}}>ANANMEZ FORMUNU DOLDUR</Button>
          </div>
        </div>
      )}
  };

const mapStateToProps = (state, ownProps) => {
  return {
    apiForm: state.form,
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
