
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
import StepConnector from '@material-ui/core/StepConnector';
import { makeStyles, withStyles, withTheme } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Check from '@material-ui/icons/Check';
import clsx from 'clsx';
import moment from "moment";
import 'moment/locale/tr';
import React from 'react';
import { connect } from "react-redux";
import MaskedInput from 'react-text-mask';
import { bindActionCreators } from "redux";
import { Field, Form, reduxForm } from "redux-form";
import ExtendedLink from '../../components/ExtendedLink';
import { login } from "../../store/reducers/authenticate";

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

const required = value => value ? undefined : 'Zorunlu'
const validPhone = value => value && !/^\+90 [1-9][0-9]{2} [0-9]{3} [0-9]{2} [0-9]{2}$/i.test(value) ? 'Geçerli bir telefon numarası değil' : undefined;
const validEmail = value => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,5}$/i.test(value) ? 'Geçerli bir e-posta adresi değil' : undefined;
const matchEmails = (email, allValues) => email !== allValues.email ? 'Girdiğin e-postalar eşleşmiyor' : undefined;

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
    }
  }

  componentDidMount() {
    // setTimeout(() => {
    //   this.setState({ showWhatsappText: true})
    //   setTimeout(() => {
    //     this.setState({ showWhatsappText: false})
    //   }, 3000)
    // }, 3000)
  }

  handleMenuOpen(event)
  {
    console.log(event.currentTarget);
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
    // console.log(formValues);
      
    this.props.login(formValues.username, formValues.password);
  }

  componentWillReceiveProps(nextProps, nextState) {

  }

  render() {
    const { auth, classes } = this.props;
    const apiForm = 
        this.props.apiForm && 
        this.props.apiForm[this.props.form];

    var activeStep = this.state.activeStep;

    if (auth && auth.signedUp == true) {
        activeStep += 1;
    }

    const checkDisabled = (f, props) => {

        if (f == undefined) {
            return true;
        }

        if (f.syncErrors == undefined) {
            return false;
        }

        return !props.every((prop) => f.syncErrors[prop] == undefined);
    }

    return (
      <React.Fragment >
        <CssBaseline />

        <main className={classes.layoutToolbar} style={{margin:'auto'}}>

        <Form
            onSubmit={this.props.handleSubmit(this.onSubmitInternal)}
            name={this.props.form}
        >
          <div style={{paddingLeft:'15%', paddingRight: '15%', paddingTop: '48px'}}>
              {/* <Typography variant="h6" style={{textAlign:'center', color: '#32325d', fontWeight: 400, paddingBottom: '24px'}}>Senden birkaç bilgi rica ediyoruz</Typography> */}
              
              <FormControl margin="normal" fullWidth>
                  <Field
                      required
                      id="username"
                      name="username"
                      component={renderTextField}
                      label="Instagram kullanıcı adın"
                      autoComplete="username"
                      autoFocus={true}
                      validate={[required]}
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

              <FormControl margin="normal" fullWidth>
                <Typography component={ExtendedLink} to="/fp" style={{textAlign: 'end'}} color="textSecondary" variant="body2">
                    Şifremi unuttum
                </Typography>
              </FormControl>

              <FormControl margin="normal" fullWidth>
                  {auth && auth.error && (
                      <Typography color="error" variant="body1" className={classes.registerTypo}>
                          {auth.error}
                      </Typography>
                  )}
              </FormControl>

              <div className={classes.buttonRoot}>
              <div className={classes.buttonWrapper}>
                  <Button
                  type="submit"
                  fullWidth
                  disableElevation
                  variant="contained"
                  className={classes.nextButton}
                  disabled={this.props.pristine || this.props.invalid || (auth && auth.loggingIn)}
                  >
                  GİRİŞ YAP
                  </Button>
                  {auth && auth.loggingIn && <CircularProgress size={24} className={classes.buttonProgress} />}
              </div>
              </div>
          </div>
        </Form>
        </main>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {

    return {
      auth: state.auth,
      // apiForm: state.form,
      // initialValues: 
      //   { online_diyet: true},
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return bindActionCreators(
      {
        login: login
      },
      dispatch
    );
  };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({ form: 'DiyetisyenSigninV2Form', enableReinitialize: true })(withTheme(withStyles(styles)(LandingPage))));