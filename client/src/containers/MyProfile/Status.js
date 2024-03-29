import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import { withStyles } from '@material-ui/core/styles';
import SvgIcon from '@material-ui/core/SvgIcon';
import Switch from '@material-ui/core/Switch';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Typography from "@material-ui/core/Typography";
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import { withSnackbar } from 'material-ui-snackbar-provider';
import moment from "moment";
import 'moment/locale/tr';
import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { PaymentInputsContainer } from 'react-payment-inputs';
import images from 'react-payment-inputs/images';
import { getCardTypeByValue } from 'react-payment-inputs/lib/utils/cardTypes';
import { connect } from "react-redux";
import MaskedInput from 'react-text-mask';
import { bindActionCreators } from "redux";
import { Field, Form, reduxForm } from "redux-form";
import { registerEvent } from '../../components/Signin/PageTracker';
import { getDietitianProfile, putDietitianProfile } from '../../store/reducers/api.dietitianProfile';
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
    var payments = showLoader ? undefined : dietitianProfile.payments;

    // var rows = [
    //     {name: 'Yeni üyelere özel ilk ay ücretsiz', duration: '1 ay'},
    //     {name: 'Koronavirüs destek paketi', duration: '1 ay'},
    // ]

    return (
      <div className={classes.root}>
        {/* <Button style={{marginRight: '8px'}} variant="outlined" disabled={this.props.pristine} size="small" color="primary" onClick={this.props.handleSubmit(this.onSubmitInternal)} startIcon={<SaveIcon />}>
          KAYDET
        </Button>
        <Divider style={{marginTop: '8px', marginBottom: '8px'}} /> */}

        { showLoader && <CircularLoader /> }
        { !showLoader && 
          <span>
            <Form
                onSubmit={this.props.handleSubmit(this.onSubmitInternal)}
                name={this.props.form}
            >

              <PaymentInputsContainer errorMessages={ERROR_MESSAGES}>
                {({ meta, wrapperProps, getCardImageProps, getCardNumberProps, getExpiryDateProps, getCVCProps }) => {
                  // console.log(meta)
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
                          <Typography variant="body2">Premium üyeliğiniz <b>{moment(dietitianProfile.premium_until).format('D MMMM YYYY')}</b> tarihinde sona ermiştir. Randevularınızı kabul etmek ve danışan bilgilerinize erişmek için lütfen geçerli bir ödeme yöntemi ekleyiniz ve 1 aylık üyelik ücreti olan <b>49₺</b>'yi ödeyiniz.</Typography>
                        )}
                        {now <= moment(dietitianProfile.premium_until) && (
                          <Typography variant="body2">Premium üyeliğiniz <b>{moment(dietitianProfile.premium_until).format('D MMMM YYYY')}</b> tarihine kadar devam etmektedir.</Typography>
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
                    ÖDEME GEÇMİŞİ
                    </Typography>
                  }
                />
                <CardContent style={{paddingTop:0}}>
                  <Grid container spacing={0}>
                    <Grid item xs={12}>
                      { Object.keys(payments).length == 0 && 
                        <div className={classes.text}>
                          <Typography variant="body2">Herhangi bir ödeme geçmişiniz bulunmamaktadır.</Typography>
                        </div>
                      }
                      { Object.keys(payments).length > 0 && (
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Ödeme</TableCell>
                                        <TableCell align="center">Tarih</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                {Object.keys(payments).map(p => {
                                  
                                  var payment = payments[p];

                                  return (
                                    <TableRow key={p}>
                                        <TableCell component="th" scope="row">
                                          {payment.title}
                                        </TableCell>
                                        <TableCell align="center"><b>{moment(payment.date).format("D MMM YYYY")}</b></TableCell>
                                    </TableRow>
                                  )
                                })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                      )}
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
