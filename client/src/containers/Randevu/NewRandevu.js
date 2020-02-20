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
import EventIcon from '@material-ui/icons/Event';
import moment from "moment";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CloseIcon from '@material-ui/icons/Close';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
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
import MaskedInput from 'react-text-mask';
import Rating from '@material-ui/lab/Rating';
import InputAdornment from '@material-ui/core/InputAdornment';
import { getDietitianProfile, putDietitianProfile } from '../../store/reducers/api.dietitianProfile';
import { getDietitianAppointments, putDietitianAppointment } from '../../store/reducers/api.dietitianAppointments';

import { registerEvent, trackPage } from '../../components/Signin/PageTracker'

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
import PersonalPage from './PersonalPage';

import Header from "../../components/Header";
import 'moment/locale/tr'
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
        this.onSubmitInternal = this.onSubmitInternal.bind(this)

        this.state = {
          userId: this.props.location.pathname.split('/')[2],
          addressId: -1,
          date: new Date(),
          time: Date.now(),
          step: 0,
          type: undefined,
          showBanner: false,
          user: JSON.parse(localStorage.getItem('user')),
        }

        setTimeout(() => this.setState({showBanner: true}), 750)
    }

    componentDidMount() {
      if (!this.isLoaded()) {
        this.props.getDietitianProfile(this.state.userId);
      }
  
      this.props.getDietitianAppointments(this.state.userId, moment(this.state.date).format('YYYYMMDD'))
    }

    componentDidUpdate(prevProps, prevState) {
      if (prevState.step != this.state.step) {
        trackPage(this.props.location.pathname + "/" + this.state.step)
      }
    }

    onSubmitInternal(formValues) {
        console.log(formValues);
        this.setState({ step: 4, formValues: formValues})

        var user = this.props.apiDietitianProfile[this.state.userId].data;
        var address = this.state.addressId == -1 ? undefined : (this.state.addressId == 1 ? user.address : user.address_2);
        var sub = { info: formValues, type: this.state.type, status: 'pending', address: address}

        this.props.putDietitianAppointment(this.state.userId, moment(this.state.date).format('YYYYMMDD'), this.state.time, sub);
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

        if (!showLoader && Object.keys(user).length == 0) {
          return (
            <div className={classes.root} style={{textAlign: 'center'}}>
              <div style={{padding: '8px'}}>Ulaşmaya çalışığın diyetisyen sistemimizde kayıtlı değildir.</div>
              <Button style={{padding: '8px'}} color="primary" variant="contained" component={Link} to="/">ANA SAYFAYA GİT</Button>
            </div>
          )
        }

        var multipleOffices = user && user.address_2 != undefined && user.address_2 != '';

        if (showLoader) {
          return renderLoadingButton(classes);
        }

        if (this.state.step == 0) {
          return (
            <PersonalPage 
              dietitianProfile={user}  // dietitian whose personal page is being visited
              userId={this.state.userId}  // logged in username
              onComplete={(type) => this.setState({step: type == 'randevu' ? (multipleOffices ? 1 : 2) : 3, type: type})} // action to be called to move to the next step
            />
          )
        }

        return (
            <div className={classes.root}>
                <Header
                    noButton={this.state.step == 0}
                    permanentDrawer={false} 
                    backButton={this.state.step != 0 ? this.props.location.pathname : undefined}
                    onBackButtonClick={() => this.setState({
                      step: this.state.step == 1
                        ? 0 
                        : this.state.step == 2
                          ? (multipleOffices ? 1 : 0)
                          : this.state.step == 3
                            ? (this.state.type != 'randevu' ? 0 : 2)
                            : 3
                    })}
                    title={
                      this.state.step == 0
                        ? "DİYET KOÇUM RANDEVU PORTALI"
                        : this.state.step == 1
                          ? "OFİS KONUMUNU SEÇ"
                          : this.state.step == 2 
                            ? "RANDEVU TARİHİNİ SEÇ" 
                            : this.state.step == 3 
                              ? "BİLGİLERİNİ GİR" 
                              : ""}
                />

                {this.state.user != undefined && this.state.userId == this.state.user.id && (
                  <div className={classes.bannerTop}>
                    <Divider />
                    <List disablePadding className={classes.main}>
                      <ListItem>
                        <ListItemText
                          style={{marginRight: '96px'}}
                          primary={<Typography variant="caption">Kendi kişisel sayfanı görüntülüyorsun. Bu sayfadaki bilgileri profilinden güncelleyebilirsin.</Typography>} 
                          // secondary="yo"
                        />
                        <ListItemSecondaryAction>
                          <Button component={Link} onClick={() => registerEvent('GoToMyProfileFromNewAppointment')} to={"/me"} size="small" variant="contained" color="primary" edge="end">
                            PROFİLİME GİT
                          </Button>
                        </ListItemSecondaryAction>
                      </ListItem>
                    </List>
                    <Divider />
                  </div>
                )}

                {this.state.user == undefined && (
                  <Paper elevation={2} square className={classes.banner} style={{bottom: this.state.showBanner ? '0' : '-100%'}}>
                    <List disablePadding className={classes.main}>
                      <ListItem>
                        <ListItemText
                          style={{marginRight: '96px'}}
                          primary={<Typography variant="body2">Sen de diyetisyenlerimizin arasına katılmak ister misin?</Typography>} 
                          // secondary="yo"
                        />
                        <ListItemSecondaryAction>
                          <Button component={Link} onClick={() => registerEvent('SignUpFromNewAppointment')} to={"/signup"} size="small" variant="contained" color="primary" edge="end">
                            KAYDOL
                          </Button>
                          <IconButton onClick={()=>this.setState({showBanner:false})} edge="end">
                            <CloseIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    </List>
                  </Paper>
                )}
                <main style={{
      maxWidth: '800px',
      paddingLeft: '8px',
      paddingRight: '8px',
      paddingBottom: '56px',
      width: '100%',
      margin: 'auto'}}>
                    <Form
                        onSubmit={this.props.handleSubmit(this.onSubmitInternal)}
                        name={this.props.form}
                    >
                        { showLoader && renderLoadingButton(classes) }
                        { !showLoader && (
                            <Card variant="outlined" className={classes.card}>
                                <CardHeader
                                avatar={
                                    <Avatar className={classes.avatar} alt={user.name} src={user.url} />
                                }
                                title={<Typography variant="h5" component="h2">{user.name}</Typography>}
                                subheader={user.unvan}
                                />
                            </Card>
                        )}
                        { !showLoader && this.state.step > 1 && this.state.type == 'randevu' && multipleOffices && (
                          <Card variant="outlined" className={classes.card}>
                            <CardHeader
                              avatar={
                                  <Avatar className={classes.avatar}>
                                    <EventIcon />
                                  </Avatar>
                              }
                              title={<Typography variant="h6">{
                                this.state.addressId == 1 ? user.address : user.address_2
                                }</Typography>}
                              />
                          </Card>
                        )}
                        { !showLoader && this.state.step > 2 && (
                          <Card variant="outlined" className={classes.card}>
                            <CardHeader
                              avatar={
                                  <Avatar className={classes.avatar}>
                                    <EventIcon />
                                  </Avatar>
                              }
                              title={<Typography variant="h6">{
                                this.state.type == 'randevu' 
                                  ? moment(this.state.date).format("DD MMMM YYYY") + " " + this.state.time
                                  : 'Online Diyet'
                                }</Typography>}
                              />
                          </Card>
                        )}
                        {/* { !showLoader && this.state.time != undefined && (
                            <Card className={classes.card}>
                                <CardHeader
                                title={<Typography variant="h5" component="h3">{moment(this.state.date).format("DD MMMM YYYY") + " " + this.state.time}</Typography>}
                                />
                            </Card>
                        )} */}
                        { !showLoader && this.state.step == 0 && 
                            <NewRandevuStep0 
                                {...this.props}
                                userId={this.state.userId}
                                onComplete={(type) => this.setState({step: type == 'randevu' ? (multipleOffices ? 1 : 2) : 3, type: type})}  
                            /> 
                        }
                        { !showLoader && multipleOffices && this.state.type == 'randevu' && this.state.step == 1 && 
                            <NewRandevuStep1
                                {...this.props}
                                userId={this.state.userId}
                                onComplete={(addressId) => this.setState({addressId, step: 2})}  
                            /> 
                        }
                        { !showLoader && this.state.step == 2 && 
                            <NewRandevuStep2 
                            {...this.props}
                            userId={this.state.userId}
                            addressId={this.state.addressId}
                            date={this.state.date} 
                            type={this.state.type}
                            onComplete={(date, time) => this.setState({date, time, step: 3})}  
                        /> 
                        }
                        { !showLoader && this.state.step == 3 && 
                            <NewRandevuStep3 
                                {...this.props}
                                userId={this.state.userId}
                                date={this.state.date} 
                                time={this.state.time} 
                                type={this.state.type}
                                handleFormSubmit={this.props.handleSubmit(this.onSubmitInternal)} 
                            /> 
                        }
                        { !showLoader && this.state.step == 4 && 
                            <NewRandevuStep4 
                                {...this.props}
                                userId={this.state.userId}
                                date={this.state.date} 
                                time={this.state.time} 
                                type={this.state.type}
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
                    <br />
                    <br />
                    {user.online_diyet == true 
                      ? "Online diyet yapmaktayım. Aşağıdan yüz yüze randevu ya da online diyeti seçerek daha sağlıklı ve kaliteli bir yaşama ilk adımını atabilirsin 🍏💪🙏" 
                      : "Yalnızca yüz yüze randevu vermekteyim. Daha sağlıklı ve kaliteli bir yaşama ilk adımını aşağıdan atabilirsin 🍏💪🙏"}
                  </Typography>
                </div>
              </Grid>
            </Grid>
          </CardContent>
          {/* </div> */}
        </Card>
        <div className={classes.rootTypeSelect}>
          {user.online_diyet == true && <Button style={{margin: '24px'}} variant="contained" color="primary" onClick={() => this.props.onComplete('onlinediyet')}>ONLİNE DİYETE BAŞLA</Button>}
          <Button variant="contained" color="secondary" onClick={() => this.props.onComplete('randevu')}>YÜZ YÜZE RANDEVU AL</Button>
        </div>
      </span>
    )}
};

class NewRandevuStep1 extends React.Component {

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
      <div className={classes.rootTypeSelect}>
        <Button style={{margin: '24px'}} variant="contained" color="primary" onClick={() => this.props.onComplete(1)}>{user.address}</Button>
        <Button variant="contained" color="secondary" onClick={() => this.props.onComplete(2)}>{user.address_2}</Button>
      </div>
    )}
};

class NewRandevuStep2 extends React.Component {

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
        <div>
            <div style={{margin: '8px'}}>
                <Grid container spacing={2}>
                <Grid style={{display: 'flex', justifyContent: 'center'}} item xs={12} sm={12} md={12} lg={12}>
                    <StaticDatePickerInput 
                      shouldDisableDate={(d) => {
                        var day = moment(d).format("dddd") + (this.props.addressId <= 1 ? '' : '_2')
                        return this.props.apiDietitianProfile[this.state.userId].data[day] != true
                      }} 
                      value={this.state.date} 
                      onChange={(newValue) => this.handleOnDateChange(newValue)} />
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
        console.log(this.props)

      return (
          <span>
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
                          Randevunun durumu diyetisyenin randevuyu onaylamasından sonra kesinleşecektir. Randevu isteğini göndermek istiyor musun?
                        </span>
                      )}
                      {this.props.type != 'randevu' && (
                        <span>
                          Diyetisyen <b>{user.name}</b> ile seçtiğin online diyet isteğinin durumu diyetisyenin onaylamasından sonra kesinleşecektir. Online diyet isteğini göndermek istiyor musun?
                        </span>
                      )}
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

              <Card variant="outlined" className={classes.card}>
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
                    <Grid item xs={12}>
                        <ReduxFormTextField name="notes" rows={3} label="Diyetisyene notların" multiline />
                    </Grid>
                    <Grid item xs={12}>
                      <ReduxFormCheckBox name="sozlesme" validate={[required]} label={
                        <Typography variant="caption" style={{letterSpacing: 0, lineHeight: 0}}>
                          DiyetKoçum'a sağladığım bu bilgilerin doğruluğunu teyit ediyorum ve bu bilgiler üzerinden bana ulaşılmasına izin veriyorum. 
                          DiyetKoçum bu bilgileri yalnızca diyetisyeniniz ile paylaşacaktır.
                        </Typography>
                      }/>
                    </Grid>
                  </Grid>
                  <div style={{marginTop: '16px'}}>
                    <Button disabled={this.props.pristine || this.props.invalid} onClick={() => this.setState({openDialog: true})} variant="contained" color="primary">
                      {this.props.type == 'randevu' ? "RANDEVU" : "ONLİNE DİYET"} İSTEĞİNİ GÖNDER
                    </Button>
                  </div>
                </CardContent>
              </Card>
          </span>
      )}
  };

class NewRandevuStep4 extends React.Component {

    constructor(props) {
      super(props);
  
  
      this.state = {
        userId: this.props.userId,
      }
    }

    componentDidMount() {
        window.scrollTo(0, 0)
    }
    
    render() {
      const { classes } = this.props;
  
      return (
          <span>
              <div style={{margin: '8px'}}>
                <Typography style={{textAlign: 'center' ,marginTop: '48px', marginBottom: '8px'}} color="textPrimary" variant="body2" display="block" gutterBottom>
                    {this.props.type == 'randevu' ? "Randevu" : "Online diyet"} isteğin başarıyla gönderildi. İsteğin diyetisyenin tarafından onaylandığında <b>{this.props.formValues.email}</b> adresine e-posta gelecektir.
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
