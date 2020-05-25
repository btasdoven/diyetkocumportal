import React, { Fragment } from 'react';
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
import { Link, Redirect } from "react-router-dom";
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
import { postDietitianComment } from '../../store/reducers/api.dietitianComments';

import SwipeableViews from 'react-swipeable-views';
import { registerEvent, trackPage } from '../../components/Signin/PageTracker'

import { userService } from '../../services/user.service'

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


import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import {reset} from 'redux-form';
import Slide from '@material-ui/core/Slide';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import DoneIcon from '@material-ui/icons/Done';

import HeaderV2 from "../../components/Header/HeaderV2";

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
          userId: this.props.match && this.props.match.params && this.props.match.params.diyetisyenUserName ? this.props.match.params.diyetisyenUserName : '',
          step: 1,
          user: JSON.parse(localStorage.getItem('user')),
        }
    }

    componentDidMount() {
      if (!this.isLoaded()) {
        this.props.getDietitianProfile(this.state.userId);
      }
    }

    componentDidUpdate(prevProps, prevState) {
      if (prevState.step != this.state.step) {
        trackPage(this.props.location.pathname + "/" + this.state.step)
      }
    }

    onSubmitInternal(formValues) {
        console.log(formValues);
        this.setState({ step: this.state.step + 1, formValues: formValues})

        this.props.postDietitianComment(this.state.userId, formValues);
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
        var user = showLoader ? undefined : this.props.apiDietitianProfile[this.state.userId].data;

        if (showLoader) {
          return renderLoadingButton(classes);
        }
          
        return (
          <Form
            onSubmit={this.props.handleSubmit(this.onSubmitInternal)}
            name={this.props.form}
          >
            <HeaderV2 static 
                title={'Anket'}
            />

            <SwipeableViews
              axis={'x'}
              disabled={true}
              index={this.state.step}
            >
              <div>
                <Step1 
                    {...this.props}
                    handleFormSubmit={this.props.handleSubmit(this.onSubmitInternal)} 
                    userId={this.state.userId}
                    onComplete={(type) => this.setState({step: 1})} // action to be called to move to the next step
                />
              </div>
              <div>
                <Step2 
                    {...this.props}
                    userId={this.state.userId}
                />
              </div>
            </SwipeableViews>
          </Form>
        )
    }
}

const required = value => value ? undefined : 'Zorunlu'
const validPhone = value => value && !/^\+90 [1-9][0-9]{2} [0-9]{3} [0-9]{2} [0-9]{2}$/i.test(value) ? 'Geçerli bir telefon numarası değil' : undefined;
const validEmail = value => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,5}$/i.test(value) ? 'Geçerli bir e-posta adresi değil' : undefined;
const matchEmails = (email, allValues) => email !== allValues.email ? 'Girdiğin e-postalar eşleşmiyor' : undefined;

class Step1 extends React.Component {

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

      return (
          <span>
              <Dialog 
                open={this.state.openDialog} 
                onClose={() => this.setState({openDialog: false})}
              >
                <DialogTitle id="form-dialog-title">
                  Onaylıyor musun?
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <span>
                            Diyetisyen <b>{user.name}</b> için doldurmuş olduğun anketin sonuçları diyetisyenine gönderilecektir. Onaylıyor istiyor musun?
                        </span>
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

              <Card variant="outlined" className={classes.card}>
                {/* <div className={classes.divCategory}> */}
                <CardHeader
                    style={{textAlign: 'center'}}
                    title={
                    <Rating readOnly={true} value={5} size="large" />
                    }
                />
                <CardContent style={{paddingTop:0}}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <ReduxFormTextField required validate={[required]} name="name" label="Adın ve soyadın" />
                    </Grid>
                    <Grid item xs={12}>
                        <ReduxFormMasketTextField required name="tel" label="Telefon numaran" validate={[required, validPhone]} />
                    </Grid>
                    <Grid item xs={12}>
                        <ReduxFormTextField name="notes" rows={3} label="Görüşlerin" multiline validate={[required]}/>
                    </Grid>
                  </Grid>
                  <div style={{marginTop: '16px'}}>
                    <Button disabled={this.props.pristine || this.props.invalid} onClick={() => this.setState({openDialog: true})} variant="contained" color="primary">
                      GÖNDER
                    </Button>
                  </div>
                </CardContent>
              </Card>
          </span>
      )}
  };

class Step2 extends React.Component {

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
              <div style={{margin: '16px', display: 'flex', flexDirection: 'column'}}>
                
                <Typography variant="h6" style={{marginTop: '24px', textAlign:'center', color: '#32325d', fontWeight: 400 }}>
                  Teşekkürler!
                </Typography>

                <Typography style={{textAlign:'center', color: '#32325d', fontWeight: 400, marginTop: '24px', marginBottom: '24px'}} variant="body2" display="block" gutterBottom>
                    Görüşlerin bizim için çok değerli. Görüşlerini en kısa zamanda diyetisyenine ulaştıracağız.
                </Typography>

                <Button variant="contained" color="secondary" component={Link} to={`/${this.state.userId}`} style={{textAlign: 'center'}}>KİŞİSEL SAYFAYA GİT</Button>
              </div>
          </span>
      )}
  };

const mapStateToProps = (state, ownProps) => {
  return {
    apiDietitianProfile: state.apiDietitianProfile,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getDietitianProfile: (userId) => getDietitianProfile(userId),
      postDietitianComment: (userId, comment) => postDietitianComment(userId, comment),
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({ form: 'DiyetisyenNewCommentForm', enableReinitialize: true })(withStyles(styles)(withSnackbar()(NewRandevuWrapper))));
