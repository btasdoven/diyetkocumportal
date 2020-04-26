import FileCopyIcon from '@material-ui/icons/FileCopy';
import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Link } from "react-router-dom";

import { registerEvent } from '../../components/Signin/PageTracker'

import moment from "moment";
import { WhatsappIcon } from "react-share";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import InputBase from '@material-ui/core/InputBase';
import CardContent from "@material-ui/core/CardContent";
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from "@material-ui/core/CardActionArea";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import DirectionsIcon from '@material-ui/icons/Directions';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ClearIcon from '@material-ui/icons/Clear';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckSharpIcon from '@material-ui/icons/CheckSharp';
import CloseIcon from '@material-ui/icons/Close';
import { withSnackbar } from 'material-ui-snackbar-provider'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import EventIcon from '@material-ui/icons/Event';
import { logout } from "../../store/reducers/authenticate";

import { getDietitianAppointments, putDietitianAppointment } from '../../store/reducers/api.dietitianAppointments';

import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

import IconButton from '@material-ui/core/IconButton';
import { red, green } from '@material-ui/core/colors';
import AddIcon from '@material-ui/icons/Add';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import SearchIcon from '@material-ui/icons/Search';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';

import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { userService } from "../../services";
import { Form, Field, reduxForm } from "redux-form";

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import 'font-awesome/css/font-awesome.min.css'; 

import InputAdornment from '@material-ui/core/InputAdornment';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { withRouter } from "react-router-dom";
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';

const styles = theme => ({
  root1: {
    height: "inherit",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  main: {
    width: '100%',
    display: 'block', // Fix IE 11 issue.
    //top: 0,
    [theme.breakpoints.up(600 + theme.spacing(6))]: {
      width: '600px',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    //backgroundColor: 'red',
    padding: theme.spacing(1)
  },
  profile: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    padding: theme.spacing(3),
    //backgroundColor: 'blue',
  },
  form: {
    display: 'flex',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(3),
  },
  button: {
    marginLeft: theme.spacing(1),
    float: 'right'
  },
  field: {
    width: '100%',
    float: 'left'
  },
  avatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  card: {
      marginBottom: theme.spacing(1),
      marginTop: theme.spacing(1),
  },
  search: {
    position: 'relative',
    borderRadius: theme.spacing(4), //theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.95),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.99),
    },
    margin: theme.spacing(1),
    padding: theme.spacing(0.5),
    flex: 1
  },
  searchIconStart: {
    paddingLeft: theme.spacing(1),
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  yeniDanisanBtn: {
    margin: theme.spacing(1)
  },
  divider: {
    height: 44,
    margin: 4,
  },
  iconButton: {
    margin: theme.spacing(1),
  },
  searchWrapper: {
    display: 'flex', 
    alignItems: 'center',
  },
  rootLoading: {
      height: "inherit",
      display: "flex",
      justifyContent: "center",
      width: '100%',
      alignItems: "center",
      marginTop: theme.spacing(5)
  },
  root: {
    //borderRadius: 12,
    textAlign: 'center',
    marginBottom: theme.spacing(1),
  },
  header: {
    textAlign: 'center',
    spacing: 10,
  },
  list: {
    paddingTop: '20px',
  },
  button: {
    margin: theme.spacing(1),
  },
  action: {
    display: 'flex',
    justifyContent: 'space-around',
  },
});

function isMobileOrTablet() {
  return /(android|iphone|ipad|mobile)/i.test(navigator.userAgent);
}

function whatsappLink(tel, text) {
  
  tel = tel.replace('+', '').replace(/ /g, '')
  text = encodeURIComponent(text)

  console.log(text)

  return (
    'https://' +
    (isMobileOrTablet() ? 'api' : 'web') +
    `.whatsapp.com/send?phone=${tel}&text=${text}`
  );
}

function renderLoadingButton(classes, idx) {
  return (
    <div key={idx} className={classes.rootLoading}>
      <CircularProgress size={24} className={classes.buttonProgress} />
    </div>
  )
} 

class Envanter extends React.Component {
  
  constructor(props) {
    super(props);

    this.isLoaded = this.isLoaded.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.confirmAppointment = this.confirmAppointment.bind(this);
    this.handleLinkCopied = this.handleLinkCopied.bind(this);
    
    this.state = {
      userId: JSON.parse(localStorage.getItem('user')).id,
      activeStep: 1,
    }
  }

  handleNext() {
      this.setState({activeStep: this.state.activeStep + 1})
  }

  handleBack() {
      this.setState({activeStep: this.state.activeStep - 1})
  }

  handleLinkCopied() {
    registerEvent('RandevuClickCopyToClipboard')
    this.props.snackbar.showMessage(
      'Anamnez formu linki kopyalandı. Bu linki danışanına sosyal medyadan gönderebilirsin.',
      //'Undo', () => handleUndo()
    )
  }

  isLoaded() {
    console.log(this.props);
    console.log(this.state.userId);

    var loaded = this.props.apiDietitianAppointments != undefined &&
      this.props.apiDietitianAppointments[this.state.userId] != undefined &&
      this.props.apiDietitianAppointments[this.state.userId].isGetLoading != true &&
      this.props.apiDietitianAppointments[this.state.userId].data != undefined;

      console.log(loaded);
      return loaded;
  }
  
  componentDidMount() {
    if (!this.isLoaded()) {
      this.props.getDietitianAppointments(this.state.userId);
    }
  }

  confirmAppointment(date, time, danisan, status, step) {
    var d = { ...danisan };

    return () => {
      d.status = status;
      d.step = step;
      console.log(date, time, d)
      this.props.putDietitianAppointment(this.state.userId, date, time, d);

    //   var statusText = status == 'confirmed' ? 'onaylayışınız' : 'reddedişiniz'
    //   this.props.snackbar.showMessage(
    //     'Randevuyu ' + statusText + ' danışanınızın e-posta adresine gönderildi.',
    //     //'Undo', () => handleUndo()
    //   )
    }
  }

  render() {
    const { classes } = this.props;
    const showLoader = !this.isLoaded();
    const date = this.props.match.params.date;
    const time = this.props.match.params.time;
    console.log(this.props)
    var appt = undefined;
    
    if (!showLoader) {
      appt = this.props.apiDietitianAppointments[this.state.userId].data[date];
      
      if (appt) {
        appt = appt.data[time];
      }

      if (!appt) {
        return (
          <div className={classes.root} style={{textAlign: 'center'}}>
            <div style={{padding: '8px'}}>Ulaşmaya çalışığın randevu giriş yapmış olduğun hesaba ait değildir.</div>
            <div style={{padding: '8px'}}>Giriş yapmış olduğun hesap: {this.state.userId}</div>
            <Button style={{padding: '8px'}} color="primary" variant="contained" onClick={this.props.logout} >ÇIK ve YENİDEN GİRİŞ YAP</Button>
          </div>
        )
      }
    }

    var step = appt && appt.status == 'pending' ? 0 : (appt ? (appt.step || 1) : 1);

    if (step == 1)
      step = 2;

    return (
        <div className={classes.root1}>
        <div className={classes.main}>
          { showLoader && renderLoadingButton(classes) }
          { !showLoader && 
            <span>
                <Card elevation={0} variant="outlined" className={classes.root} >
                    <CardHeader title={appt.type == 'randevu' ? moment(date).format('D MMMM YYYY') + ' ' + time : 'Online Diyet'} className={classes.header} />
                    <Divider variant="middle" />
                    <CardContent>
                        <Typography variant="h6" align="center">
                            {appt.info.name}
                        </Typography>
                        
                        {appt.address != undefined && (
                            <Typography variant="subtitle1" align="center">
                                {appt.address}
                            </Typography>
                        )}

                        <div className={classes.list}>
                            <Typography align="center">{appt.info.email}</Typography>
                            <Typography align="center">{appt.info.tel}</Typography>
                        </div>

                        {appt.info.notes != undefined && (
                            <div className={classes.list}>
                                <Typography align="center">{appt.info.notes}</Typography>
                            </div>
                        )}
                    </CardContent>
                    {/* <Divider variant="middle" />
                    <CardActions className={classes.action}>
                    <Button variant="contained" color="primary" className={classes.button}>
                        Buy
                    </Button>
                    </CardActions> */}
                </Card>
                
                <Card style={{marginBottom: '8px'}} variant="outlined" >
                  <Stepper activeStep={step} orientation="vertical">
                      <Step>
                          <StepLabel>
                          {
                              appt.status == 'pending' 
                                  ? "Randevu isteğini onayla"
                                  : appt.status == 'confirmed'
                                      ? "Randevu isteği onaylandı ✔️"
                                      : "Randevu isteği reddedildi 😔"
                          } 
                          </StepLabel>
                          <StepContent>
                              <div className={classes.actionsContainer}>
                                  <div>
                                  <Button
                                      variant="outlined"
                                      disabled={this.state.activeStep === 0}
                                      onClick={this.confirmAppointment(date, time, appt, 'rejected', 1)}
                                      className={classes.button}
                                  >
                                      Reddet
                                  </Button>
                                  <Button
                                      variant="contained"
                                      color="primary"
                                      onClick={this.confirmAppointment(date, time, appt, 'confirmed', 1)}
                                      className={classes.button}
                                  >
                                      Onayla
                                  </Button>
                                  </div>
                              </div>
                          </StepContent>
                      </Step>
                      {appt.status != 'rejected' && (
                          <Step>
                              <StepLabel>{step <= 1 ? "Danışanı listeme ekle" : "Danışan listene eklendi 👍"}</StepLabel>
                              <StepContent>
                                  <Typography variant="body2">Danışanınızı listenize ekleyerek danışanınızın bütün bilgilerine dijital ortamdan erişebilir ve gereken değişiklikleri anında yapabilirsiniz.</Typography>
                                  <div className={classes.actionsContainer}>
                                      <div>
                                      <Button
                                          variant="contained"
                                          color="primary"
                                          onClick={this.confirmAppointment(date, time, appt, appt.status, 2)}
                                          className={classes.button}
                                      >
                                          DANIŞANI LİSTEME EKLE
                                      </Button>
                                      </div>
                                  </div>
                              </StepContent>
                          </Step>
                      )}
                      {appt.status != 'rejected' && (
                          <Step>
                              <StepLabel>{step <= 2 ? "Dijital Anamnez formunu gönder" : "Danışana Anamnez formu gönderildi."}</StepLabel>
                              <StepContent>
                                  <Typography variant="body2">Anamnez formu sayesinde eksiksiz bir diyet programı hazırlamanız için ihtiyacınız olan tüm kişisel, beslenme, sağlık, tahlil ve ölçüm bilgilerini danışanınız hızlıca doldurabilir, ve siz de bu bilgilere otomatik olarak erişebilirsiniz.</Typography>
                                  <div className={classes.actionsContainer}>
                                      <div style={{display: 'flex', flexDirection: 'column', paddingTop: '16px'}}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => {
                                              registerEvent('RandevuClickWhatsApp')
                                              window.open(whatsappLink(appt.info.tel, `https://diyetkocum.net/l/${appt.linkId} `), '_blank')
                                            }}
                                            className={classes.button}
                                            endIcon={<WhatsappIcon size={24} round={true}/>}
                                        >
                                            {/* {activeStep === steps.length - 1 ? 'Finish' : 'Next'} */}
                                            WHATSAPP'TAN GÖNDER
                                        </Button>
                                        <CopyToClipboard text={"diyetkocum.net/l/" + appt.linkId} >
                                          <Button
                                              variant="contained"
                                              color="default"
                                              onClick={this.handleLinkCopied}
                                              className={classes.button}
                                              endIcon={<FileCopyIcon fontSize="large" />}
                                          >
                                              {/* {activeStep === steps.length - 1 ? 'Finish' : 'Next'} */}
                                              LİNKİ KOPYALA
                                          </Button>
                                        </CopyToClipboard>
                                      </div>
                                  </div>
                              </StepContent>
                          </Step>
                      )}
                  </Stepper>
                </Card>

                {step == 3 && (
                  <Card style={{marginBottom: '8px', textAlign: 'center'}}  variant="outlined" >
                    <CardContent>
                        <Typography variant="body1">Randevu işlemleri tamamlandı 👍</Typography>
                        {/* <Typography variant="body2">Danışanına iletmek istediğin ek bilgiler varsa mesajlara gidebilirsin.</Typography> */}
                        <Button
                            variant="contained"
                            color="primary"
                            component={Link}
                            to={"/r/" + appt.info.name + "/messages"}
                            className={classes.button}
                            style={{marginBottom: 0}}
                        >
                            MESAJLARA GİT
                        </Button>
                    </CardContent>
                  </Card>
                )}
            </span>
          }
        </div>
        </div>
      );
    }
};

const mapStateToProps = state => {
  return {
    apiDietitianAppointments: state.apiDietitianAppointments,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getDietitianAppointments: (userId, date) => getDietitianAppointments(userId, date),
      putDietitianAppointment: (userId, date, time, values) => putDietitianAppointment(userId, date, time, values),
      logout: () => logout()
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(withRouter(withSnackbar()(Envanter))));
