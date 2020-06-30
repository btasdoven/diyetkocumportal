import SmartphoneIcon from '@material-ui/icons/Smartphone';

import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import clsx from 'clsx';
import Check from '@material-ui/icons/Check';
import StepConnector from '@material-ui/core/StepConnector';
import CategoryIcon from '@material-ui/icons/Category';
import ScheduleIcon from '@material-ui/icons/Schedule';
import CommentIcon from '@material-ui/icons/Comment';
import RoomIcon from '@material-ui/icons/Room';
import VideocamIcon from '@material-ui/icons/Videocam';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import IconButton from '@material-ui/core/IconButton';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CircularProgress from '@material-ui/core/CircularProgress';
import Divider from '@material-ui/core/Divider';
import Step from '@material-ui/core/Step';
import StepContent from '@material-ui/core/StepContent';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import { fade, withStyles, makeStyles} from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import FileCopyIcon from '@material-ui/icons/FileCopy';
import 'font-awesome/css/font-awesome.min.css';
import { withSnackbar } from 'material-ui-snackbar-provider';
import moment from "moment";
import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { WhatsappIcon } from "react-share";
import { bindActionCreators } from "redux";
import ExtendedLink from '../../components/ExtendedLink';
import { registerEvent } from '../../components/Signin/PageTracker';
import { getDietitianAppointments, putDietitianAppointment } from '../../store/reducers/api.dietitianAppointments';
import { logout } from "../../store/reducers/authenticate";

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

  return (
    'https://' +
    (isMobileOrTablet() ? 'api' : 'web') +
    `.whatsapp.com/send?phone=${tel}&text=${text}`
  );
}


const QontoConnector = withStyles({
  alternativeLabel: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  active: {
    '& $line': {
      borderColor: 'rgb(252, 81, 133)',
    },
  },
  completed: {
    '& $line': {
      borderColor: 'rgb(252, 81, 133)',
    },
  },
  line: {
    borderColor: 'rgb(252, 81, 133)',
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
    marginLeft: '4px'
  },
  active: {
    color: 'rgb(252, 81, 133)',
    marginLeft: '4px'
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
    marginLeft: '4px'
  },
  completed: {
    color: 'rgb(252, 81, 133)',
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
    var loaded = this.props.apiDietitianAppointments != undefined &&
      this.props.apiDietitianAppointments[this.state.userId] != undefined &&
      this.props.apiDietitianAppointments[this.state.userId].isGetLoading != true &&
      this.props.apiDietitianAppointments[this.state.userId].data != undefined;

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
              <Card elevation={0} className={classes.card} style={{marginTop: 0}}>
                <CardHeader
                  avatar={
                      <Avatar className={classes.avatar} src={undefined} />
                  }
                  // action={
                  //   <div>
                  //     <IconButton aria-label="settings" onClick={this.handleClick}>
                  //       <MoreVertIcon />
                  //     </IconButton>
                  //     <Menu
                  //       id="simple-menu"
                  //       anchorEl={this.state.anchorEl}
                  //       keepMounted
                  //       open={this.state.anchorEl != undefined}
                  //       onClose={this.handleClose}
                  //     >
                  //       <MenuItem onClick={() => this.handleClose('logout')}>Logout</MenuItem>
                  //     </Menu>
                  //   </div>
                  // }
                  title={<Typography variant="h5" component="h2">{appt.info.name}</Typography>}
                  subheader={`${appt.info.cinsiyet}, ${moment.utc().diff(appt.info.birthday, 'years', false)} yaşında`}
                />
                {/* <CardMedia
                className={classes.media}
                image="/static/images/cards/paella.jpg"
                title="Paella dish"
                /> */}
                <CardContent style={{paddingTop: 0, paddingBottom: 0}}>
                  <List disablePadding>
                    <ListItem>
                      <ListItemIcon>
                        {appt.type == 'randevu' 
                          ? <RoomIcon className={classes.icon} />
                          : <SmartphoneIcon className={classes.icon} />
                        }
                      </ListItemIcon>
                      <ListItemText primary={
                        appt.type == 'randevu' 
                          ? appt.address
                          : 'Online Diyet'
                        } 
                      />
                    </ListItem>
                    {appt.type == 'randevu' &&
                      <ListItem>
                        <ListItemIcon>
                          <ScheduleIcon />
                        </ListItemIcon>
                        <ListItemText primary={moment(date).format('D MMMM YYYY') + ' ' + time} />
                      </ListItem>
                    }
                    {appt.info.notes != undefined &&
                      <ListItem>
                        <ListItemIcon>
                          <CommentIcon />
                        </ListItemIcon>
                        <ListItemText primary={appt.info.notes} />
                      </ListItem>
                    }
                  </List>
                </CardContent>
               
                {/* <Divider /> */}
                {/* <CardActions disableSpacing>
                  <FieldFileInput
                    onChange={this.onChangeProfilePicture}
                  /> */}
                  {/* <IconButton aria-label="add to favorites">
                      <FavoriteIcon />
                  </IconButton>
                  <IconButton aria-label="share">
                      <ShareIcon />
                  </IconButton>
                  <IconButton
                      className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                      })}
                      onClick={handleExpandClick}
                      aria-expanded={expanded}
                      aria-label="show more"
                  >
                      <ExpandMoreIcon />
                  </IconButton> */}
                {/* </CardActions>  */}
              </Card>

                {/* <Card elevation={0} variant="outlined" className={classes.root} >
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
                </Card> */}


                <Card elevation={0} style={{marginTop: '8px', marginBottom: '8px'}}  >
                  <CardContent style={{paddingTop: 0, paddingBottom: 0}}>
                    <List disablePadding>
                      <Divider />
                      <ListItem 
                          button 
                          component={ExtendedLink} 
                          to={{ 
                              pathname: `/c/${appt.info.name}`, 
                              state: {fromUrl: this.props.location.pathname}
                          }}
                      >
                        <ListItemText 
                          style={{paddingRight: '36px'}}
                          primary={"Anamnez Formuna Git"} 
                        />
                          <ListItemSecondaryAction>
                            <IconButton style={{color: 'rgb(252, 81, 133)'}} component={ExtendedLink} 
                              to={{ 
                                  pathname: `/c/${appt.info.name}`, 
                                  state: {fromUrl: this.props.location.pathname}
                              }}
                            >
                              <ChevronRightIcon />
                            </IconButton>
                          </ListItemSecondaryAction>
                      </ListItem>
                      <Divider />
                      <ListItem 
                          button 
                          component={ExtendedLink} 
                          to={{ 
                              pathname: `/c/${appt.info.name}/measurements`, 
                              state: {fromUrl: this.props.location.pathname}
                          }}
                      >
                        <ListItemText 
                          style={{paddingRight: '36px'}}
                          primary={"Ölçümleri Görüntüle"} 
                        />
                          <ListItemSecondaryAction>
                            <IconButton style={{color: 'rgb(252, 81, 133)'}} component={ExtendedLink} 
                              to={{ 
                                  pathname: `/c/${appt.info.name}/measurements`, 
                                  state: {fromUrl: this.props.location.pathname}
                              }}
                            >  
                              <ChevronRightIcon />
                            </IconButton>
                          </ListItemSecondaryAction>
                      </ListItem>
                      <Divider />
                    </List>
                  </CardContent>
                </Card>

                <Card elevation={0} style={{marginBottom: '8px'}}  >
                  <Stepper activeStep={step} orientation="vertical" connector={<QontoConnector />}>
                      <Step>
                          <StepLabel StepIconComponent={QontoStepIcon}>
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
                                      color="secondary"
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
                              <StepLabel StepIconComponent={QontoStepIcon}>{step <= 1 ? "Danışanı listeme ekle" : "Danışan listene eklendi 👍"}</StepLabel>
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
                              <StepLabel StepIconComponent={QontoStepIcon}>{step <= 2 ? "Dijital Anamnez formunu gönder" : "Danışana Anamnez formu gönderildi."}</StepLabel>
                              <StepContent>
                                  <Typography variant="body2">Anamnez formu sayesinde eksiksiz bir diyet programı hazırlamanız için ihtiyacınız olan tüm kişisel, beslenme, sağlık, tahlil ve ölçüm bilgilerini danışanınıza hızlıca doldurtabilir ve bu bilgilere otomatik olarak erişebilirsiniz.</Typography>
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
                            component={ExtendedLink}
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
