
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import CircularProgress from '@material-ui/core/CircularProgress';
import green from '@material-ui/core/colors/green';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Step from '@material-ui/core/Step';
import StepConnector from '@material-ui/core/StepConnector';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import { makeStyles, withStyles, withTheme } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Check from '@material-ui/icons/Check';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import clsx from 'clsx';
import moment from "moment";
import 'moment/locale/tr';
import qs from 'qs';
import React from 'react';
import { connect } from "react-redux";
import SwipeableViews from 'react-swipeable-views';
import MaskedInput from 'react-text-mask';
import { bindActionCreators } from "redux";
import { Field, Form, reduxForm } from "redux-form";
import ExtendedLink from '../../components/ExtendedLink';
import NewAddressDialog from '../../components/NewAddressDialog';
import ShowAddressOnMap from '../../components/ShowAddressOnMap';
import { registerEvent } from '../../components/Signin/PageTracker';
import UzmanlikAlanlariAutocomplete from '../../components/UzmanlikAlanlariAutocomplete';
import { signup } from "../../store/reducers/authenticate";




moment.locale('tr')

const styles = theme => ({
  appBar: {
    backgroundColor: 'transparent',
    color: 'rgb(38,55,70)'
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  loginButton: {
    backgroundColor: '#3897f0'
  },
  loginButton2: {
    borderColor: '#3897f0',
    color: '#3897f0',
    marginRight: theme.spacing(1),
  },
  heroUnit: {
    //backgroundColor: theme.palette.background.paper,
    backgroundColor: 'rgb(38,55,70)'
  },
  heroContent: {
    width: 'auto',
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up(1100 + theme.spacing(6))]: {
        width: 1100,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    padding: `${theme.spacing(8)}px 0 ${theme.spacing(6)}px`,
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  layoutToolbar: {
    width: 'auto',
    color: '#262626',
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    padding: 0,
    // flexDirection: 'row',
    // display: 'flex',
    justifyContent: 'space-between',
    minHeight: theme.spacing(7),
    [theme.breakpoints.up(750 + theme.spacing(6))]: {
      width: 750,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  layout: {
    width: 'auto',
    color: '#262626',
    // marginLeft: theme.spacing(1),
    // marginRight: theme.spacing(1),
    padding: 0,
    [theme.breakpoints.up(750 + theme.spacing(6))]: {
      width: 750,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  cardGrid: {
    padding: `${theme.spacing(3)}px 0 0 0`,
  },
  card: {
    paddingLeft: '8px',
    height: '100%',
    display: 'flex',
  },
  featureCardMedia: {
    width: '100px'
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flex: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(4),
    padding: theme.spacing(6),
  },

  avatarWrapper: {
    position: 'absolute',
    width: '100%',
    paddingTop: '100%',
    background: 'linear-gradient(to left,#7b4397,#dc2430)',
    //borderWidth: '3px',
    //margin: '2px',
    borderRadius: '50%',
    cursor: 'pointer'
  },
  avatar: {
    width: 'calc(100% - 6px)',
    height: 'calc(100% - 6px)',
    padding: '2px',
    top: '3px',
    left: '3px',
    background: '#fafafa',
    cursor: 'pointer',
    WebkitTapHighlightColor: 'transparent',
  },
  avatarWrapper2: {
    position: 'absolute',
    width: '100%',
    paddingTop: '100%',
    background: 'rgba(0,0,0,0.1)',
    //borderWidth: '3px',
    //margin: '2px',
    borderRadius: '50%',
    cursor: 'pointer'
  },
  avatar2: {
    width: 'calc(100% - 4px)',
    height: 'calc(100% - 4px)',
    padding: '2px',
    top: '2px',
    left: '2px',
    background: '#fafafa',
    cursor: 'pointer'
  },
  info: {
    marginTop: theme.spacing(2)
  },
  floatingPoint: {
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '50%',
    position: 'absolute',
  },
  paperProps: {
    width: '100%', 
    top: '8px',
    left: '8px',
    [theme.breakpoints.up(750 + theme.spacing(6))]: {
      width: 750,
      marginLeft: 'auto',
      marginRight: 'auto',
      position: 'relative',
      left: 0,
    },
  },
  nextButton: {
      '&:not(disabled)': {
          backgroundColor: 'rgb(252, 81, 133)', 
          color: 'white',
      }
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: 'calc(50% - 12px)',
    left: 'calc(50% - 12px)',
  },
  buttonRoot: {
    display: 'flex',
    alignItems: 'center',
  },
  buttonWrapper: {
    position: 'relative',
    width: '100%',
  },
});
  
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

// const ReduxFormMasketTextField = ({name, label, ...props}) => (
//   <Field
//       name={name}
//       component={renderMaskedTextField}
//       label={label}
//       {...props}
//   />)

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

const ReduxFormSwitch = ({name, label, ...props}) => (
    <Field
      name={name}
      label={label}
      component={renderSwitch}
      {...props}
    />
)

const renderSwitch = props => {
  const { input, label, ...rest } = props;
  return (
    <FormControlLabel
      control={
        <Switch  
          onChange={value => input.onChange(value)}
          value={input.value}
          checked={input.value == true}
        />
      }
      label={label}
    />
  )
}

const nowhitespace = value => value && !/^[^\s@-]+$/g.test(value) ? "Lütfen boşluk, '@' ya da '-' kullanmayınız." : undefined;
const required = value => value ? undefined : 'Zorunlu'
const validPhone = value => value && !/^\+90 [1-9][0-9]{2} [0-9]{3} [0-9]{2} [0-9]{2}$/i.test(value) ? 'Geçerli bir telefon numarası değil' : undefined;
const validEmail = value => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,5}$/i.test(value) ? 'Geçerli bir e-posta adresi değil' : undefined;
// const matchEmails = (email, allValues) => email !== allValues.email ? 'Girdiğin e-postalar eşleşmiyor' : undefined;

const QontoConnector = withStyles({
    alternativeLabel: {
      top: 10,
      left: 'calc(-50% + 16px)',
      right: 'calc(50% + 16px)',
    },
    active: {
      '& $line': {
        borderColor: '#784af4',
      },
    },
    completed: {
      '& $line': {
        borderColor: '#784af4',
      },
    },
    line: {
      borderColor: '#eaeaf0',
      borderTopWidth: 3,
      borderRadius: 1,
    },
  })(StepConnector);

  const useQontoStepIconStyles = makeStyles({
    root: {
      color: '#eaeaf0',
      display: 'flex',
      height: 22,
      alignItems: 'center',
    },
    active: {
      color: '#784af4',
    },
    circle: {
      width: 8,
      height: 8,
      borderRadius: '50%',
      backgroundColor: 'currentColor',
    },
    completed: {
      color: '#784af4',
      zIndex: 1,
      fontSize: 18,
    }
  });

  function QontoStepIcon(props) {
    const classes = useQontoStepIconStyles();
    const { active, completed } = props;
  
    return (
      <div
        className={clsx(classes.root, {
          [classes.active]: active,
        })}
      >
        {completed ? <Check className={classes.completed} /> : <div className={classes.circle} />}
      </div>
    );
  }

class LandingPage extends React.Component {

  constructor(props) {
    super(props)

    this.handleMenuClose = this.handleMenuClose.bind(this)
    this.handleMenuOpen = this.handleMenuOpen.bind(this)
    this.onSubmitInternal = this.onSubmitInternal.bind(this)
    this.handleNextStep = this.handleNextStep.bind(this)
    this.handlePrevStep = this.handlePrevStep.bind(this)

    this.state = {
      anchorEl: undefined,
      activeStep: 0,
      openAddressDialog: undefined,
      currentTimeForAddress: '1. Adres',
    }
  }

  handleMenuOpen(event)
  {
    this.setState({anchorEl: event.currentTarget})
  }

  handleMenuClose()
  {
    this.setState({anchorEl: undefined})
  }

  handleNextStep() {
      this.setState({activeStep: this.state.activeStep + 1});
  }

  handlePrevStep() {
      this.setState({activeStep: this.state.activeStep - 1});
  }

  onSubmitInternal(formValues) {
    console.log(formValues);
      
    formValues.refDietitian = qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).ref;

    this.props.signup(formValues.username, formValues);

    // handleNextStep();
  }

  render() {
    const { auth, classes } = this.props;
    const apiForm = 
        this.props.apiForm && 
        this.props.apiForm[this.props.form];

    var activeStep = this.state.activeStep;

    if (apiForm && apiForm.submitSucceeded && !(auth && auth.error)) {
      activeStep = 4;
    }

    if (auth && auth.signedUp == true) {
        activeStep += 1;
    }

    var addressValue = undefined
    if (apiForm && 
        apiForm.values && 
        apiForm.values.addresses) {
      addressValue = Object.values(apiForm.values.addresses)[0]
      if (addressValue.done != true) {
        addressValue = undefined
      }
    }
    
    const checkDisabled = (f, props) => {

        if (f == undefined) {
            return true;
        }

        if (f.syncErrors == undefined) {
            return false;
        }

        return !props.every((prop) => {
          return f.syncErrors[prop] == undefined
        });
    }

    return (
      <React.Fragment >
        <CssBaseline />

        <main className={classes.layoutToolbar} style={{margin:'auto'}}>

            
        <Form
            onSubmit={this.props.handleSubmit(this.onSubmitInternal)}
            name={this.props.form}
        >
            <Stepper
                alternativeLabel 
                activeStep={activeStep}
                connector={<QontoConnector />}
                style={{paddingBottom: '8px'}}
            >
                <Step>
                    <StepLabel StepIconComponent={QontoStepIcon}></StepLabel>
                </Step>
                <Step>
                    <StepLabel StepIconComponent={QontoStepIcon}></StepLabel>
                </Step>
                <Step>
                    <StepLabel StepIconComponent={QontoStepIcon}></StepLabel>
                </Step>
                <Step>
                    <StepLabel StepIconComponent={QontoStepIcon}></StepLabel>
                </Step>
                <Step>
                    <StepLabel StepIconComponent={QontoStepIcon}></StepLabel>
                </Step>
            </Stepper>

            <SwipeableViews
                axis={'x'}
                index={activeStep}
                disabled={true}
            >
                <div style={{paddingLeft:'24px', paddingRight: '24px'}}>
                    <Typography variant="h6" style={{textAlign:'center', color: '#32325d', fontWeight: 400, paddingBottom: '24px'}}>Senden birkaç bilgi rica ediyoruz</Typography>

                    <FormControl margin="normal" fullWidth>
                      <ReduxFormSelect
                        name="how_they_heard_about_us"
                        label="Bizi nereden duydunuz?"
                        values={[
                          {
                          label: 'Arkadaşımın Instagram profilinden',
                          value: 'Arkadaşımın Instagram profilinden',
                          },
                          {
                          label: 'Instagram etiketlerinden',
                          value: 'Instagram etiketlerinden',
                          },
                          {
                          label: "Twitter'dan",
                          value: "Twitter'dan",
                          },
                          {
                          label: "Google'dan",
                          value: "Google'dan",
                          },
                          {
                          label: "Diğer",
                          value: "Diğer",
                          },
                        ]}
                      />
                    </FormControl>

                    <FormControl margin="normal" fullWidth>
                      <ReduxFormSelect
                        name="gender"
                        label="Cinsiyetin"
                        values={[
                          {
                          label: 'Erkek',
                          value: 'Erkek',
                          },
                          {
                          label: 'Kadın',
                          value: 'Kadın',
                          },
                          {
                          label: "Diğer",
                          value: "Diğer",
                          },
                        ]}
                      />
                    </FormControl>

                    <FormControl margin="normal" fullWidth>
                        <Field
                            required
                            id="name"
                            name="name"
                            component={renderTextField}
                            label="Adın ve soyadın"
                            autoComplete="name"
                            autoFocus={false}
                            validate={[required]}
                        />
                    </FormControl>

                    <FormControl margin="normal" fullWidth>
                        <Field
                            required
                            id="email"
                            name="email"
                            component={renderTextField}
                            label="E-posta adresin"
                            autoComplete="email"
                            autoFocus={false}
                            validate={[required, validEmail]}
                        />
                    </FormControl>

                    <FormControl margin="normal" fullWidth>
                        <Field
                            required
                            id="tel"
                            name="tel"
                            component={renderMaskedTextField}
                            label="Telefon numaran"
                            autoComplete="mobile"
                            autoFocus={false}
                            validate={[required, validPhone]}
                        />
                    </FormControl>

                    <div style={{paddingTop: '24px', width: '100%', display: 'flex', justifyContent: 'flex-end'}}>
                        <Button className={classes.nextButton} variant="contained" onClick={this.handleNextStep}
                            disableElevation
                            disabled={checkDisabled(apiForm, ['name', 'email', 'tel'])} >
                            İLERİ<KeyboardArrowRight />
                        </Button>
                    </div>
                </div>

                <div style={{paddingLeft:'24px', paddingRight: '24px'}}>
                    <Typography variant="h6" style={{textAlign:'center', color: '#32325d', fontWeight: 400, paddingBottom: '24px'}}>Şimdi de hesap bilgilerin...</Typography>
                    
                    <Typography variant="body1" color="textSecondary" style={{paddingBottom: '16px'}}>
                        Diyet Koçum hesabını Instagram hesabın ile eşleştiriyoruz ve bu sayede danışanlarının profiline daha kolay ulaşmasını sağlıyoruz.
                    </Typography>

                    <FormControl margin="normal" fullWidth>
                        <Field
                        required
                        id="username"
                        name="username"
                        component={renderTextField}
                        label="Instagram kullanıcı adın"
                        autoComplete="username"
                        autoFocus={false}
                        validate={[required, nowhitespace]}
                        />
                    </FormControl>
                    <FormControl margin="normal" fullWidth>
                        <Field
                        required
                        id="password"
                        name="password"
                        type="password"
                        component={renderTextField}
                        label="Diyet Koçum şifren"
                        autoComplete="current-password"
                        validate={[required]}
                        />
                    </FormControl>

                    <div style={{paddingTop: '24px', width: '100%', display: 'flex', justifyContent: 'space-between'}}>
                        <Button disabled={this.state.activeStep == 0} onClick={this.handlePrevStep}>
                            <KeyboardArrowLeft /> GERİ
                        </Button>
                        <Button className={classes.nextButton} variant="contained" onClick={this.handleNextStep}
                            disableElevation
                            disabled={checkDisabled(apiForm, ['username', 'password'])} >
                            İLERİ<KeyboardArrowRight />
                        </Button>
                    </div>
                </div>

                <div style={{paddingLeft:'24px', paddingRight: '24px'}}>
                    <Typography variant="h6" style={{textAlign:'center', color: '#32325d', fontWeight: 400, paddingBottom: '24px'}}>Danışanların seni daha yakından tanısın</Typography>
                    
                    <Typography variant="body1" color="textSecondary" style={{paddingBottom: '16px'}}>
                        Elimizdeki verilere göre profili eksiksiz olan diyetisyenlerimiz daha sık randevu talebi alıyorlar.
                    </Typography>

                    <FormControl margin="normal" fullWidth>
                        <ReduxFormTextField name="unvan" label="Ünvanım" />
                    </FormControl>

                    <FormControl margin="normal" fullWidth>
                      <Field
                        name="uzmanlik_alanlari_v2"
                        label="Uzmanlık alanlarım"
                        component={UzmanlikAlanlariAutocomplete}
                      />
                    </FormControl>

                    <FormControl margin="normal" fullWidth>
                        <ReduxFormTextField rows={3} rowsMax={6} multiline name="ozgecmis" label="Öz geçmişim" />
                    </FormControl>

                    <div style={{paddingTop: '24px', width: '100%', display: 'flex', justifyContent: 'space-between'}}>
                        <Button disabled={this.state.activeStep == 0} onClick={this.handlePrevStep}>
                            <KeyboardArrowLeft /> GERİ
                        </Button>
                        <Button className={classes.nextButton} variant="contained" onClick={this.handleNextStep} disableElevation>
                            İLERİ<KeyboardArrowRight />
                        </Button>
                    </div>
                </div>

                <div style={{paddingLeft:'24px', paddingRight: '24px'}}>
                    <Typography variant="h6" style={{textAlign:'center', color: '#32325d', fontWeight: 400, paddingBottom: '24px'}}>Randevu tercihlerin</Typography>
                    
                    <Typography variant="body1" color="textSecondary" style={{paddingBottom: '16px'}}>
                        Randevu tercihlerini şimdi bir kere yaparak tüm yeni danışanlarının tercihlerine uygun randevu almasını sağlayabilirsin.
                    </Typography>

                    <FormControl margin="normal" fullWidth>
                        <ReduxFormSwitch name="online_diyet" label={<Typography variant="body2" color="textSecondary">Online diyet istekleri gelsin</Typography>}/>
                    </FormControl>

                    <FormControl margin="normal" fullWidth>
                        <ReduxFormSwitch name="yuzyuze_diyet" label={<Typography variant="body2" color="textSecondary">Yüz yüze randevu istekleri gelsin</Typography>}/>
                    </FormControl>

                    {apiForm && apiForm.values && apiForm.values.yuzyuze_diyet == true && (
                      <FormControl margin="normal" fullWidth>
                        {/* <ReduxFormTextField required validate={[required]} name="address" label="Ofis adresim" /> */}
                        
                        <Field validate={[required]} component="input" name={`addresses["${this.state.currentTimeForAddress}"].latlng.lat`} label="Lat" type="hidden" />
                        <Field validate={[required]} component="input" name={`addresses["${this.state.currentTimeForAddress}"].latlng.lng`} label="Lng" type="hidden" />
                        <Field validate={[required]} component="input" name={`addresses["${this.state.currentTimeForAddress}"].latlng.zoom`} label="Zoom" type="hidden" />

                        {addressValue != undefined && <ShowAddressOnMap latlng={addressValue.latlng}/>}
                        {addressValue != undefined && <ReduxFormTextField required validate={[required]} name={`addresses["${this.state.currentTimeForAddress}"].address`} label="Ofis Adresim" style={{marginTop: '16px'}} />}

                        {addressValue == undefined && <Button variant="outlined" color="secondary" onClick={() => this.setState({openAddressDialog: `address_new_map`})}>OFİS ADRESİ EKLE</Button>}

                        {this.state.openAddressDialog == `address_new_map` && 
                          <NewAddressDialog 
                            form={this.props.form}
                            addressId={this.state.currentTimeForAddress}
                            handleClose = {(adKey, latlng) => {
                              if (latlng != undefined) {
                                this.props.change(`addresses["${adKey}"].latlng.lat`, latlng.lat)
                                this.props.change(`addresses["${adKey}"].latlng.lng`, latlng.lng)
                                this.props.change(`addresses["${adKey}"].latlng.zoom`, latlng.zoom)
                                this.props.change(`addresses["${adKey}"].done`, true)
                              }
                              this.setState({openAddressDialog: undefined})
                            }}
                          />
                        }
                      </FormControl>
                    )}

                    <div style={{paddingTop: '24px', width: '100%', display: 'flex', justifyContent: 'space-between'}}>
                        <Button disabled={this.state.activeStep == 0} onClick={this.handlePrevStep}>
                            <KeyboardArrowLeft /> GERİ
                        </Button>
                        <Button 
                          disabled={apiForm && apiForm.registeredFields[`addresses["${this.state.currentTimeForAddress}"].latlng.lat`] != undefined && checkDisabled(apiForm, [`addresses`])}
                          className={classes.nextButton} 
                          variant="contained"
                          onClick={this.handleNextStep} 
                          disableElevation
                        >
                            İLERİ<KeyboardArrowRight />
                        </Button>
                    </div>
                </div>

                <div style={{paddingLeft:'24px', paddingRight: '24px'}}>
                    <Typography variant="h6" style={{textAlign:'center', color: '#32325d', fontWeight: 400, paddingBottom: '24px'}}>Verilerin bizimle güvende</Typography>
                    
                    <Typography variant="body1" color="textSecondary" style={{paddingBottom: '16px'}}>
                        En güncel veri depolama ve şifreleme teknolojileri ile tüm diyetisyenlerimizin ve danışanlarımızın verilerini Microsoft altyapısı kullanarak itina ile saklıyoruz.
                    </Typography>

                    <FormControl margin="normal" fullWidth>
                        <ReduxFormCheckBox name="sozlesme" validate={[required]} label={
                        <Typography variant="body2" color="textSecondary">
                            <a onClick={() => registerEvent('ClickKullaniciSozlesmesi')} style={{ color: 'rgba(0, 0, 0, 0.87)', textDecoration: 'none', fontWeight: 'bolder'}} target="_blank" href="/static/legal/kull_soz.pdf">Kullanıcı Sözleşmesini</a>
                            &nbsp;ve&nbsp;
                            <a onClick={() => registerEvent('ClickGdpr')} style={{ color: 'rgba(0, 0, 0, 0.87)', textDecoration: 'none', fontWeight: 'bolder'}} target="_blank" href="/static/legal/gdpr.pdf">Kişisel Verilerin Korunması Politikasını</a> 
                            &nbsp;kabul ediyorum.
                        </Typography>
                        }/>
                    </FormControl>

                    <FormControl margin="normal" fullWidth>
                        {auth && auth.error && (
                            <Typography color="error" variant="body1" className={classes.registerTypo}>
                                {auth.error}
                            </Typography>
                        )}
                    </FormControl>

                    <div style={{paddingTop: '24px', width: '100%', display: 'flex', justifyContent: 'space-between'}}>
                        <Button disabled={auth && auth.signingUp} onClick={this.handlePrevStep}>
                            <KeyboardArrowLeft /> GERİ
                        </Button>
                        <div className={classes.buttonRoot}>
                        <div className={classes.buttonWrapper}>
                            <Button
                            type="submit"
                            fullWidth
                            disableElevation
                            variant="contained"
                            className={classes.nextButton}
                            disabled={this.props.pristine || this.props.invalid || (auth && auth.signingUp)}
                            >
                            HESABIMI OLUŞTUR
                            </Button>
                            {auth && auth.signingUp && <CircularProgress size={24} className={classes.buttonProgress} />}
                        </div>
                        </div>
                    </div>
                </div>

                <div style={{paddingLeft:'24px', paddingRight: '24px'}}>
                    <Typography variant="h6" style={{textAlign:'center', color: '#32325d', fontWeight: 400, paddingBottom: '24px'}}>Üyeliğin başarıyla oluşturuldu.</Typography>
                    
                    <Typography variant="body1" color="textSecondary" style={{paddingBottom: '16px', textAlign: 'center'}}>
                        Diyet Koçum'u dijital asistanın olarak tercih ettiğin için teşekkürler.
                    </Typography>

                    <div style={{paddingTop: '24px', width: '100%', display: 'flex', justifyContent: 'center'}}>
                        <Button
                            disableElevation
                            variant="contained"
                            className={classes.nextButton}
                            component={ExtendedLink}
                            to={auth && auth.user ? `/${auth.user.id}` : '/'}
                            onClick={() => this.setState({activeStep: 0})}
                        >
                            ŞİMDİ PORTALA GİRİŞ YAP
                        </Button>
                    </div>
                </div>
            </SwipeableViews>
        </Form>
        </main>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {

    return {
      auth: state.auth,
      apiForm: state.form,
      initialValues: 
        { online_diyet: true, yuzyuze_diyet: true},
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return bindActionCreators(
      {
        signup: signup
      },
      dispatch
    );
  };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({ form: 'DiyetisyenRegisterV2Form' })(withTheme(withStyles(styles)(LandingPage))));