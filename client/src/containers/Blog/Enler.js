
import Avatar from '@material-ui/core/Avatar';
import Checkbox from '@material-ui/core/Checkbox';
import CircularProgress from '@material-ui/core/CircularProgress';
import green from '@material-ui/core/colors/green';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
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
import { Field } from "redux-form";
import ExtendedLink from '../../components/ExtendedLink';
import { userService } from '../../services/user.service';
import { getAllDietitians } from '../../store/reducers/api.allDietitians';






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
  avatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    marginRight: '16px',
  },
  dietitanList: {
    paddingLeft: '0 !important',
    paddingRight: '0 !important',
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
  rootLoading: {
      height: "inherit",
      display: "flex",
      justifyContent: "center",
      width: '100%',
      alignItems: "center",
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(2),
      //textAlign: 'center',
  },
});
  
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

const WeeklyUserList = {
  "6 Nisan - 12 Nisan 2020": {
    ziyaret: [
      'diyetisyendoyranli',
      'aysuutasdovenn',
      'diyetisyennidaceliksoydan',
      'diyetisyenvildanozkaya',
      'diyetiswomen',
    ],
    randevu: [
      'diyetisyennidaceliksoydan',
      'diyetisyendoyranli',
      'diyetisyenasknn',
      'uzm.dyt.aslihansahiner',
      'diyetisyenvildanozkaya',
    ],
    aktif: [
      'diyetisyendoyranli',
      'diyetisyenvildanozkaya',
      'dytgozdeucak',
      'aysuutasdovenn',
      'diyetisyennidaceliksoydan',
    ]
  },
  "29 Mart - 5 Nisan 2020": {
    ziyaret: [
      'diyetisyendoyranli',
      'dytelifbozyel',
      'aysuutasdovenn',
      'diyetisyennidaceliksoydan',
      'dyt.busedogan',
    ],
    randevu: [
      'diyetiswomen',
      'diyetisyenasknn',
      'diyetisyendoyranli',
      'aysuutasdovenn',
      'dyt.sedaarslan',
    ],
    aktif: [
      'diyetisyenbetulkingir',
      'dyt.arslanmeltem',
      'dyt.elifnarcinkubat',
      'uzm.dyt.aslihansahiner',
      'dyt_esmakurtgunes',
    ]
  },
}

function initList(dietitians, usernames) {
  var rr = {}
  
  if (dietitians == undefined || dietitians == [])
    return undefined;

  dietitians.map((d) => {
    if (usernames.indexOf(d.username) >= 0) {
      rr[d.username] = d;
    }
  });

  return rr;
}

function renderLoadingButton(classes) {
    return (
      <div className={classes.rootLoading}>
        <CircularProgress size={24} className={classes.buttonProgress} />
      </div>
    )
  } 

const DietitianListView = (props) => (
  <div style={{paddingLeft:'24px', paddingRight: '24px'}}>
    <Typography variant="h6" style={{textAlign:'center', color: '#32325d', fontWeight: 400, paddingTop: '24px', paddingBottom: '8px'}}>
      {props.title}
    </Typography>
    
    <List className={props.classes.dietitanList}>
        {props.usernames.map((uname) => {
          if (props.dietitians == undefined || 
              props.dietitians[uname] == undefined)
            return ;

          return (
            <ListItem key={uname} button component={ExtendedLink} to={`/${uname}`}>
                <ListItemAvatar>
                <Avatar
                    className={props.classes.avatar}
                    src={userService.getStaticFileUri(props.dietitians[uname].url)}
                    alt={props.dietitians[uname].name}
                />
                </ListItemAvatar>
                <ListItemText primary={props.dietitians[uname].name} secondary={props.dietitians[uname].unvan || 'Diyetisyen'} />
                {/* <ListItemSecondaryAction>
                <Checkbox
                    edge="end"
                    onChange={handleToggle(value)}
                    checked={checked.indexOf(value) !== -1}
                    inputProps={{ 'aria-labelledby': labelId }}
                />
                </ListItemSecondaryAction> */}
            </ListItem>
          )
        })}
    </List>
</div>
)

class WeekView extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      dietitianEnCokZiyaret: undefined,
      dietitianEnCokRandevu: undefined,
      dietitianEnAktif: undefined,
    }
  }

  componentDidMount() {
    if (this.props.dietitians != undefined && this.state.dietitianEnCokZiyaret == undefined) {
      var dietitianEnCokZiyaret = initList(this.props.dietitians, this.props.usernameEnCokZiyaret);
      var dietitianEnCokRandevu = initList(this.props.dietitians, this.props.usernameEnCokRandevu);
      var dietitianEnAktif = initList(this.props.dietitians, this.props.usernameEnAktif);

      this.setState({
        dietitianEnCokZiyaret: dietitianEnCokZiyaret,
        dietitianEnCokRandevu: dietitianEnCokRandevu,
        dietitianEnAktif: dietitianEnAktif
      })
    }
  }

  render() {

    return (
      <div>
        <Typography variant="subtitle2" style={{color: '#32325d', fontWeight: 600, paddingTop: '24px', paddingLeft: '24px'}}>
          {this.props.weekTitle}
        </Typography>

        <DietitianListView 
          title="En Çok Ziyaret Edilen Diyetisyenlerimiz"
          usernames={this.props.usernameEnCokZiyaret}
          dietitians={this.state.dietitianEnCokZiyaret}
          classes={this.props.classes}
        />
        <DietitianListView 
          title="En Çok Randevu Alan Diyetisyenlerimiz"
          usernames={this.props.usernameEnCokRandevu}
          dietitians={this.state.dietitianEnCokRandevu}
          classes={this.props.classes}
        />
        <DietitianListView 
          title="En Aktif Diyetisyenlerimiz"
          usernames={this.props.usernameEnAktif}
          dietitians={this.state.dietitianEnAktif}
          classes={this.props.classes}
        />
      </div>
    )
  }
}

class LandingPage extends React.Component {

  constructor(props) {
    super(props)

    this.isLoaded = this.isLoaded.bind(this);
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
    if (!this.isLoaded()) {
        this.props.getAllDietitians();
    }

    this.props.setTitle('Haftanın Enleri')
  }

  isLoaded() {
    var loaded = this.props.apiAllDietitians != undefined &&
      this.props.apiAllDietitians.isGetLoading != true &&
      this.props.apiAllDietitians.data != undefined;

      return loaded;
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
      
    this.props.signup(formValues.username, formValues);
  }

  componentWillReceiveProps(nextProps, nextState) {

  }

  render() {
    const { classes } = this.props;
    const showLoader = !this.isLoaded();
    const dietitians = showLoader ? undefined : this.props.apiAllDietitians.data;

    return (
      <React.Fragment >
        <CssBaseline />
{/* 
        <HeaderV2 static 
          // onBackButton={"/"}
          title={"Haftanın Enleri"}
        /> */}

        <main className={classes.layoutToolbar} style={{margin:'auto'}}>
            { showLoader && renderLoadingButton(classes) }
            { !showLoader && 
              Object.keys(WeeklyUserList).map((weekTitle) => {
                const week = WeeklyUserList[weekTitle];
                return (
                  <WeekView
                    key={weekTitle}
                    classes={classes}
                    dietitians={dietitians}
                    weekTitle={weekTitle}
                    usernameEnCokZiyaret={week.ziyaret}
                    usernameEnCokRandevu={week.randevu}
                    usernameEnAktif={week.aktif}
                  />
                )
              })
            }
        </main>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
    return {
        apiAllDietitians: state.apiAllDietitians,
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return bindActionCreators(
      {
        getAllDietitians: () => getAllDietitians(),
      },
      dispatch
    );
  };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTheme(withStyles(styles)(LandingPage)));