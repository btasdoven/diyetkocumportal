import { css } from 'styled-components';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import moment from "moment";

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import DeleteIcon from '@material-ui/icons/Delete';
import SvgIcon from '@material-ui/core/SvgIcon';
import { registerEvent, trackPage } from '../../components/Signin/PageTracker'

import { Link } from "react-router-dom";
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
import SpeedDial from '../SpeedDial/SpeedDial'
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import Switch from '@material-ui/core/Switch';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import InputAdornment from '@material-ui/core/InputAdornment';
import { getDietitianProfile, putDietitianProfile } from '../../store/reducers/api.dietitianProfile';

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

import DateTimePicker from '../../components/DateTimePicker'

import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import {reset} from 'redux-form';
import Slide from '@material-ui/core/Slide';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import DoneIcon from '@material-ui/icons/Done';
import MaskedInput from 'react-text-mask';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { PaymentInputsWrapper, PaymentInputsContainer, usePaymentInputs } from 'react-payment-inputs';
import images from 'react-payment-inputs/images';
import { getCardTypeByValue } from 'react-payment-inputs/lib/utils/cardTypes'

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
    borderRadius: '4px',
    '&::before': {
      backgroundColor: 'transparent'
    }
  },
  paper: {
    padding: theme.spacing(1)
  },
  root: {
      //height: 'calc(100vh - 48px)',
      padding: theme.spacing(1),
      width: '100%',
      maxWidth: '800px',
      margin: 'auto'
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
  text: {
      height: "inherit",
      width: '100%',
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(2),
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

const renderCreditCardField = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => {

  console.log(input, label, custom, touched, error)

  return (
    <TextField
      label={label}
      {...input}
      {...custom}
      InputLabelProps={{color: 'primary', shrink: true}}
    />
  )
};

const renderMaskedTextField = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => {
  return (
    <TextField
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

const ReduxFormMaskedTextField = ({name, label, ...props}) => (
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

const ERROR_MESSAGES = {
  emptyCardNumber: 'Kart numarası zorunlu',
  invalidCardNumber: 'Kart numarası geçersiz',
  emptyExpiryDate: 'Son kullanma tarihi (MM/YY) zorunlu',
  monthOutOfRange: 'Son kullanma tarihi (MM/YY) geçersiz',
  yearOutOfRange: 'Son kullanma tarihi (MM/YY) geçersiz',
  dateOutOfRange: 'Son kullanma tarihi (MM/YY) geçersiz',
  invalidExpiryDate: 'Son kullanma tarihi (MM/YY) geçersiz',
  emptyCVC: 'CVC numarası zorunlu',
  invalidCVC: 'CVC numarası geçersiz'
}


const required = value => value ? undefined : 'Zorunlu'

class Envanter extends React.Component {

  constructor(props) {
    super(props);

    this.isLoaded = this.isLoaded.bind(this);
    this.onSubmitInternal = this.onSubmitInternal.bind(this);
    this.handleLinkCopied = this.handleLinkCopied.bind(this);
    this.handleExpand = this.handleExpand.bind(this);
    this.onDialogClose = this.onDialogClose.bind(this);
    this.deleteCreditCard = this.deleteCreditCard.bind(this);

    this.state = {
      userId: JSON.parse(localStorage.getItem('user')).id,
      user: JSON.parse(localStorage.getItem('user')),
      linkCopied: false,
      expandList: {},
      openDialog: undefined,
    }
  }

  isLoaded() {
    var loaded = this.props.apiDietitianProfile != undefined &&
      this.props.apiDietitianProfile[this.state.userId] != undefined &&
      this.props.apiDietitianProfile[this.state.userId].isGetLoading != true &&
      this.props.apiDietitianProfile[this.state.userId].data != undefined;

      return loaded;
  }

  componentDidMount() {
    if (!this.isLoaded()) {
      this.props.getDietitianProfile(this.state.userId);
    }
  }

  onSubmitInternal(formValues) {
    const dietitianProfile = this.props.apiDietitianProfile[this.state.userId].data;

    formValues.cardType = getCardTypeByValue(formValues.cardNumber)
    var newProfile = { ...dietitianProfile, ...formValues };

    this.props.putDietitianProfile(this.state.userId, formValues);
    
    this.setState({openDialog: undefined})
  }

  deleteCreditCard() {
    const dietitianProfile = this.props.apiDietitianProfile[this.state.userId].data;

    delete dietitianProfile.card_name;
    delete dietitianProfile.cardNumber;
    delete dietitianProfile.cardType;

    this.props.putDietitianProfile(this.state.userId, dietitianProfile);
  }

  handleLinkCopied() {
    this.setState({ linkCopied: true })
    this.props.snackbar.showMessage(
      'Referans linkiniz panoya kopyalandı.',
      //'Undo', () => handleUndo()
    )
    registerEvent('ClickCopyRefLink')
  }

  handleExpand(panel) {
    return (event, isExpanded) => {
      console.log(isExpanded, panel)
      this.setState({ 
        expandList: {
          ...this.state.expandList,
          [panel]: isExpanded
        }
      });
    };
  }


  onDialogClose(values) {
    this.setState({openDialog: undefined})
  }

  render() {
    const { classes } = this.props;
    const showLoader = !this.isLoaded();
    const dietitianProfile = showLoader ? undefined : this.props.apiDietitianProfile[this.state.userId].data;
    const now = moment();

    var rows = showLoader ? undefined : dietitianProfile.discounts;

    // var rows = [
    //     {name: 'Yeni üyelere özel ilk ay ücretsiz', duration: '1 ay'},
    //     {name: 'Koronavirüs destek paketi', duration: '1 ay'},
    // ]

    console.log(this.props)

    return (
      <div className={classes.root}>
        {/* <Button style={{marginRight: '8px'}} variant="outlined" disabled={this.props.pristine} size="small" color="primary" onClick={this.props.handleSubmit(this.onSubmitInternal)} startIcon={<SaveIcon />}>
          KAYDET
        </Button>
        <Divider style={{marginTop: '8px', marginBottom: '8px'}} /> */}

        { showLoader && renderLoadingButton(classes) }
        { !showLoader && 
          <span>
            <Form
                onSubmit={this.props.handleSubmit(this.onSubmitInternal)}
                name={this.props.form}
            >

              <PaymentInputsContainer errorMessages={ERROR_MESSAGES}>
                {({ meta, wrapperProps, getCardImageProps, getCardNumberProps, getExpiryDateProps, getCVCProps }) => {
                  console.log(meta)
                  return (
                    <Dialog 
                      fullWidth
                      open={this.state.openDialog != undefined} 
                      onClose={() => this.onDialogClose(undefined)}
                    >
                      <DialogTitle id="form-dialog-title">Yeni Ödeme Yöntemi Ekle</DialogTitle>
                      <DialogContent>
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={12} md={12} lg={12}>
                            <Field
                              fullWidth
                              name="card_name"
                              component={renderTextField}
                              label="Kart Üzerindeki İsim"
                              validate={[required]}
                            />
                          </Grid>
                          <Grid item xs={12} sm={12} md={12} lg={12}>
                            <Field
                              fullWidth
                              name="cardNumber"
                              component={renderCreditCardField}
                              label="Kart Numarası"
                              validate={[required]}
                              helperText={meta.touchedInputs.cardNumber ? meta.erroredInputs.cardNumber : undefined}
                              error={meta.touchedInputs.cardNumber && meta.erroredInputs.cardNumber != undefined}
                              InputProps={{
                                startAdornment: <InputAdornment position="start"><svg {...getCardImageProps({ images })} /></InputAdornment>,
                                inputComponent: ({inputRef, ...props}) => {
                                  console.log(props)

                                  return (
                                    <input 
                                      {...props}
                                      value={props.value} 
                                      {...getCardNumberProps({autoFocus: meta.focused == 'cardNumber', onBlur: props.onBlur, onChange: props.onChange})} 
                                      placeholder=''
                                    />
                                  )
                               }
                              }}
                            />
                          </Grid>
                          <Grid item xs={8} sm={8} md={8} lg={8}>
                            <Field
                              fullWidth
                              name="expiryDate"
                              component={renderCreditCardField}
                              label="Son Kullanma Tarihi"
                              validate={[required]}
                              helperText={meta.touchedInputs.expiryDate ? meta.erroredInputs.expiryDate : undefined}
                              error={meta.touchedInputs.expiryDate && meta.erroredInputs.expiryDate != undefined}
                              InputProps={{
                                inputComponent: ({inputRef, ...props}) => {
                                  console.log(props)

                                  return (
                                    <input 
                                      {...props}
                                      value={props.value} 
                                      {...getExpiryDateProps({autoFocus: meta.focused == 'expiryDate', onBlur: props.onBlur, onChange: props.onChange})} 
                                    />
                                  )
                               }
                              }}
                            />
                          </Grid>
                          <Grid item xs={4} sm={4} md={4} lg={4}>
                            <Field
                              fullWidth
                              name="cvc"
                              component={renderCreditCardField}
                              label="CVC"
                              validate={[required]}
                              InputProps={{
                                inputComponent: ({inputRef, ...props}) => {
                                  console.log(props)

                                  return (
                                    <input 
                                      {...props}
                                      value={props.value} 
                                      {...getCVCProps({autoFocus: meta.focused == 'cvc', onBlur: props.onBlur, onChange: props.onChange})} 
                                      placeholder=''
                                    />
                                  )
                               }
                              }}
                            />
                          </Grid>
                        </Grid> 
                      </DialogContent>
                      <DialogActions>
                        <Button color="default" disabled={this.props.submitting} onClick={() => this.onDialogClose(undefined)} color="secondary">
                          İPTAL
                        </Button>
                        <Button color="secondary" disabled={this.props.pristine || this.props.invalid || this.props.submitting || meta.error != undefined} onClick={this.props.handleSubmit(this.onSubmitInternal)} color="secondary">
                          KAYDET
                        </Button>
                      </DialogActions>
                    </Dialog>
                  )
                }}
              </PaymentInputsContainer>

            <Card variant="outlined" className={classes.card}>
                {/* <div className={classes.divCategory}> */}
                <CardHeader
                  title={
                    <Typography color="secondary" variant="button" gutterBottom>
                     ÜYELİK DURUMU
                    </Typography>
                  }
                />
                <CardContent style={{paddingTop:0}}>
                  <Grid container spacing={0}>
                    <Grid item xs={12}>
                      <div className={classes.text}>
                        {now > moment(dietitianProfile.premium_until) && (
                          <Typography variant="body2">Premium üyeliğiniz <b>{moment(dietitianProfile.premium_until).format('D MMMM YYYY HH:mm')}</b> tarihinde sona ermiştir. Lütfen geçerli bir ödeme yöntemi ekleyiniz.</Typography>
                        )}
                        {now <= moment(dietitianProfile.premium_until) && (
                          <Typography variant="body2">Premium üyeliğiniz <b>{moment(dietitianProfile.premium_until).format('D MMMM YYYY HH:mm')}</b> tarihine kadar devam etmektedir.</Typography>
                        )}
                      </div>
                    </Grid>
                    <Grid item xs={12}>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Paketler</TableCell>
                                        <TableCell align="center">Süresi</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                {rows.map(row => (
                                    <TableRow key={row.title}>
                                        <TableCell component="th" scope="row">
                                          {now > moment(row.endDate) && (
                                            <s>{row.title}</s>
                                          )}
                                          {now <= moment(row.endDate) && row.title}
                                        </TableCell>
                                        <TableCell align="center"><b>{row.duration}</b></TableCell>
                                    </TableRow>
                                ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>

              <Card variant="outlined" className={classes.card}>
                {/* <div className={classes.divCategory}> */}
                <CardHeader
                  title={
                    <Typography color="secondary" variant="button" gutterBottom>
                     ÖDEME YÖNTEMİ
                    </Typography>
                  }
                />
                <CardContent style={{paddingTop:0}}>
                  <Grid container spacing={0}>
                    {dietitianProfile.card_name == undefined && (
                      <Grid item xs={12}>
                        <div className={classes.text}>
                          <Typography variant="body2">Kayıtlı ödeme yönteminiz bulunmamaktadır.</Typography>
                        </div>
                      </Grid>
                    )}
                    {dietitianProfile.card_name && (
                      <Grid item xs={12}>
                        <List>
                          <ListItem>
                            <ListItemAvatar>
                              <Avatar>
                                <SvgIcon width='1.5em' height='1em' viewBox='0 0 24 16'>
                                  {images[dietitianProfile.cardType.type]}
                                </SvgIcon>
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={dietitianProfile.card_name} secondary={dietitianProfile.cardNumber} />
                            <ListItemSecondaryAction>
                              <IconButton edge="end" aria-label="delete" onClick={this.deleteCreditCard}>
                                <DeleteIcon/>
                              </IconButton>
                            </ListItemSecondaryAction>
                          </ListItem>
                        </List>
                      </Grid>
                    )}
                    <Grid item xs={12}>
                      <Button
                        fullWidth
                        disableElevation
                        variant="contained"
                        color="primary"
                        className={classes.nextButton}
                        onClick={() => {
                          registerEvent('ClickNewPaymentMethod')
                          this.setState({openDialog: 'new_card'})
                        }}
                      >
                        YENİ ÖDEME YÖNTEMİ EKLE
                      </Button>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>

              <Card variant="outlined" className={classes.card}>
                {/* <div className={classes.divCategory}> */}
                <CardHeader
                  title={
                    <Typography color="secondary" variant="button" gutterBottom>
                    ARKADAŞINI GETİR 1 HAFTA PREMİUM KAZAN
                    </Typography>
                  }
                />
                <CardContent style={{paddingTop:0}}>
                  <Grid container spacing={0}>
                    <Grid item xs={12} style={{display: 'flex', flexDirection: 'column'}}>
                      <div className={classes.text}>
                        <Typography variant="body2">Herhangi bir diyetisyen arkadaşını aşağıdaki linki paylaşarak üye yaparsan 1 hafta ücretsiz Premium paketi kazanabilirsin.</Typography>
                      </div>
                      
                      <CopyToClipboard text={"https://diyetkocum.net/signup?ref=" + this.state.userId} >
                        <span style={{textAlign: 'center'}}>
                          <Chip
                            //avatar={<Avatar>M</Avatar>}
                            label={"diyetkocum.net/signup?ref=" + this.state.userId}
                            clickable
                            color="primary"
                            onClick={this.handleLinkCopied}
                            onDelete={this.handleLinkCopied}
                            deleteIcon={this.state.linkCopied ? <DoneIcon fontSize="small" color="primary" /> : <FileCopyIcon fontSize="small" color="primary"/>}
                            variant="outlined"
                            size="small"
                          />
                        </span>
                      </CopyToClipboard>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>

              <Card variant="outlined" className={classes.card}>
                {/* <div className={classes.divCategory}> */}
                <CardHeader
                  title={
                    <Typography color="secondary" variant="button" gutterBottom>
                    ÖDEME GEÇMİŞİ
                    </Typography>
                  }
                />
                <CardContent style={{paddingTop:0}}>
                  <Grid container spacing={0}>
                    <Grid item xs={12}>
                      <div className={classes.text}>
                        <Typography variant="body2">Herhangi bir ödeme geçmişiniz bulunmamaktadır.</Typography>
                      </div>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Form>
          </span>
        }
      </div>
    )}
};

const mapStateToProps = (state, ownProps) => {

  return {
    apiForm: state.form,
    apiDietitianProfile: state.apiDietitianProfile,
    initialValues: { cardType: ''},
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getDietitianProfile: (userId) => getDietitianProfile(userId),
      putDietitianProfile: (userId, dietitianProfile) => putDietitianProfile(userId, dietitianProfile)
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({ form: 'DiyetisyenStatusForm', enableReinitialize: true })(withStyles(styles)(withSnackbar()(Envanter))));
