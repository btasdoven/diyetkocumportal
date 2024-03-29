
import { Appointments, AppointmentTooltip, WeekView } from '@devexpress/dx-react-scheduler-material-ui';
import Avatar from "@material-ui/core/Avatar";
import CircularProgress from '@material-ui/core/CircularProgress';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import { fade, withStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import withWidth from '@material-ui/core/withWidth';
import CheckIcon from '@material-ui/icons/Check';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ClearIcon from '@material-ui/icons/Clear';
import CommentIcon from '@material-ui/icons/Comment';
import EventIcon from '@material-ui/icons/Event';
import RoomIcon from '@material-ui/icons/Room';
import VideocamIcon from '@material-ui/icons/Videocam';
import 'font-awesome/css/font-awesome.min.css';
import { withSnackbar } from 'material-ui-snackbar-provider';
import moment from "moment";
import React, { Fragment } from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import ExtendedLink from '../../components/ExtendedLink';
import { getDietitianAppointments, putDietitianAppointment } from '../../store/reducers/api.dietitianAppointments';
import IntroInstaVideo from '../../components/IntroInstaVideo'


const styles = theme => ({
  root: {
    height: "inherit",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  main: {
    width: '100%',
    display: 'block', // Fix IE 11 issue.
    // marginLeft: theme.spacing(1),
    // marginRight: theme.spacing(1),
    //top: 0,
    [theme.breakpoints.up(600 + theme.spacing(6))]: {
      width: '100%',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    //backgroundColor: 'red',
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
  icon: {
    color: theme.palette.action.active,
  },
  textCenter: {
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
  todayCell: {
    backgroundColor: fade(theme.palette.primary.main, 0.1),
    '&:hover': {
      backgroundColor: fade(theme.palette.primary.main, 0.14),
    },
    '&:focus': {
      backgroundColor: fade(theme.palette.primary.main, 0.16),
    },
  },
  weekendCell: {
    backgroundColor: fade(theme.palette.action.disabledBackground, 0.04),
    '&:hover': {
      backgroundColor: fade(theme.palette.action.disabledBackground, 0.04),
    },
    '&:focus': {
      backgroundColor: fade(theme.palette.action.disabledBackground, 0.04),
    },
  },
});


function renderLoadingButton(classes, idx) {
  return (
    <div key={idx} className={classes.rootLoading}>
      <CircularProgress size={24} className={classes.buttonProgress} />
    </div>
  )
} 

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}
  
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && <div>{children}</div>}
    </Typography>
  );
}

const Appointment = withStyles(styles, { name: 'Appointment' })(({
  children, style, classes, ...restProps
}) => {
  var apptData = restProps.data;
  var apptType = apptData.details.type

  return (
    <Appointments.Appointment
      {...restProps}
      style={{
        ...style,
        backgroundColor: apptType == 'randevu' ? 'rgb(100, 181, 246)' : 'rgb(102, 187, 106)',
      }}
    >    
      <IconButton style={{position: 'absolute', top: 0, right: 0, width: '16px', height: '16px'}}>
        {apptType == 'randevu'
          ? <RoomIcon className={classes.icon} style={{width: '16px', height: '16px'}}/>
          : <VideocamIcon className={classes.icon} style={{width: '16px', height: '16px'}}/>
        }
      </IconButton>
      {children}
    </Appointments.Appointment>
  );
})

const ApptContent = withStyles(styles, { name: 'Content' })(({
  children, appointmentData, classes, ...restProps
}) => {
  
  return (
  <AppointmentTooltip.Content {...restProps} appointmentData={appointmentData}>
    <Grid container alignItems="center">
      <Grid item xs={2} className={classes.textCenter}>
        {appointmentData.details.type == 'randevu' 
          ? <RoomIcon className={classes.icon} />
          : <VideocamIcon className={classes.icon} />
        }
      </Grid>
      <Grid item xs={10}>
        <span>
          {
            appointmentData.details.type == 'randevu' 
              ? appointmentData.details.address 
              : 'Online Görüşme'
          }
        </span>
      </Grid>
      {appointmentData.details.info.notes != undefined &&
        <Fragment>
          <Grid item xs={2} className={classes.textCenter} style={{paddingTop: '12px'}}>
            <CommentIcon className={classes.icon} />
          </Grid>
          <Grid item xs={10} style={{paddingTop: '12px'}}>
            <span>
              {appointmentData.details.info.notes}
            </span>
          </Grid>
        </Fragment>
      }
    </Grid>
  </AppointmentTooltip.Content>
)});

const TimeTableCellBase = ({ classes, onCellClickHandler, ...restProps }) => {
  const { startDate } = restProps;

  var clickHandler = (e) => {
    onCellClickHandler(startDate)
  }

  return <WeekView.TimeTableCell 
    // onDoubleClick={(e) => console.log('viewstate', 'doubleclick', e)}
    onClick={clickHandler}
    {...restProps} />;
};

;

class Envanter extends React.Component {
  
  constructor(props) {
    super(props);

    this.isLoaded = this.isLoaded.bind(this);
    this.confirmAppointment = this.confirmAppointment.bind(this);
    this.handleValueChange = this.handleValueChange.bind(this);
    
    this.state = {
      userId: JSON.parse(localStorage.getItem('user')).id,
      date: moment().format('YYYYMMDD'),
      value: 0,
      selectedCellStartDate: undefined,
      newAppointment: undefined,
    }

    var TimeTableCell = withStyles(styles, { name: 'TimeTableCell' })(TimeTableCellBase)

    this.handleCloseAddAppointment = this.handleCloseAddAppointment.bind(this);
    this.onCellClickHandler = this.onCellClickHandler.bind(this);
    this.TimeTableCellWithProps = (props) => <TimeTableCell {...props} onCellClickHandler={this.onCellClickHandler} />
  }

  onCellClickHandler(startDate) {
    if (!this.isLoaded()) {
      this.setState({selectedCellStartDate: undefined})
      return;
    }

    if (startDate < Date.now()) {
      this.setState({selectedCellStartDate: undefined})
      return;
    }
    var appts = this.props.apiDietitianAppointments[this.state.userId].data;
    var apptDate = moment(startDate).format('YYYYMMDD');

    if (appts[apptDate] == undefined) {
      // No appt on this *day*. Select the cell
      //
      this.setState({selectedCellStartDate: moment(startDate).format('DD.MM.YYYY HH:mm')})
      return;
    }

    var apptStartHour = moment(startDate).format('HH:mm');
    var apptEndHour = moment(startDate).add(30, 'minutes').format('HH:mm');
    var apptHour = `${apptStartHour} - ${apptEndHour}`

    if (appts[apptDate].data[apptHour] != undefined) {
      this.setState({selectedCellStartDate: undefined})
      return;
    }

    // No appt at this *date*. Select the cell.
    //
    this.setState({selectedCellStartDate: moment(startDate).format('DD.MM.YYYY HH:mm')})
  }

  isLoaded() {
    var loaded = this.props.apiDietitianAppointments != undefined &&
      this.props.apiDietitianAppointments[this.state.userId] != undefined &&
      this.props.apiDietitianAppointments[this.state.userId].isGetLoading != true &&
      this.props.apiDietitianAppointments[this.state.userId].data != undefined;

      return loaded;
  }

  handleCloseAddAppointment(values) {
    if (values != undefined) {
      this.props.putDietitianAppointment(this.state.userId, values.date, values.time, values);
    }

    this.setState({newAppointment: undefined});
  }

  handleValueChange = (ev, newVal) => {
    if (this.state.value != newVal) {
      this.setState({value: newVal})
    }
  }

  componentDidMount() {
    if (!this.isLoaded()) {
      this.props.getDietitianAppointments(this.state.userId);
    }
  }

  confirmAppointment(date, time, danisan, status) {
    var d = { ...danisan };

    return () => {
      d.status = status;
      this.props.putDietitianAppointment(this.state.userId, date, time, d);

      var statusText = status == 'confirmed' ? 'onaylayışınız' : 'reddedişiniz'
      this.props.snackbar.showMessage(
        'Randevuyu ' + statusText + ' danışanınızın e-posta adresine gönderildi.',
        //'Undo', () => handleUndo()
      )
    }
  }

  render() {
    const { classes } = this.props;
    const showLoader = !this.isLoaded();

    var apptList = showLoader ? undefined : this.props.apiDietitianAppointments[this.state.userId].data;
    var pendingAppts = 0

    if (!showLoader) {
      pendingAppts = Object.keys(apptList)
        .filter(u => apptList[u].data != undefined)
        .map((u) => Object.keys(apptList[u].data).map((t) => apptList[u].data[t].status == "pending" ? 1 : 0).reduce((a,b) => a+b, 0))
        .reduce((a,b) => a+b, 0);
    }

    return (
        <div className={classes.root}>
        <div className={classes.main}>

          {showLoader && renderLoadingButton(classes) }
          {/* {!showLoader && pendingAppts == 0 && (
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'absolute', top: 0, left: 0, right: 0, height: `100%`}}>
              <Grid container spacing={0} >
                <Grid item xs={12}>
                  <div style={{position: 'relative', margin: 'auto', minWidth: '128px', maxWidth: '144px', width: '33%'}}>
                    <IntroInstaVideo 
                      introName="RandevuList"
                      infoHighlightSrc={"/static/randevu/thumbnail.png"}
                      sources={[
                        '/static/randevu/randevu_1.mov',
                        '/static/randevu/randevu_2.mov',
                        '/static/randevu/randevu_3.mov',
                        '/static/randevu/randevu_4.mov',
                        '/static/randevu/randevu_5.mov',
                      ]}
                    />
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <Typography component="div" style={{padding: '16px', textAlign: 'center'}} color="textSecondary" variant="body1">Onayınızı bekleyen randevu bulunmamaktadır 😞</Typography>
                </Grid>
              </Grid>
            </div>
          )} */}
          {!showLoader && pendingAppts == 0 && 
            <React.Fragment>
              <Typography variant="body2" color="textSecondary" style={{textAlign: 'center', paddingTop: '56px'}}>Onayınızı bekleyen randevu bulunmamaktadır 👍</Typography>
              <Typography variant="body2" color="textSecondary" style={{textAlign: 'center', paddingTop: '16px'}}>Sosyal medyada paylaştığınız kişisel sayfanız üzerinden sizden randevu alan danışanlarınızın isteklerini buradan onaylayabilirsiniz. </Typography>
            </React.Fragment>
          }
          {!showLoader && pendingAppts > 0 && 
            <main className={classes.content}>
              {/* <Typography variant="body2" style={{textAlign: 'center', paddingTop: '56px'}}>Bu özellik çok yakında hizmetinizde...</Typography> */}
              
              {Object.keys(apptList).sort().reverse().map((apptDate, idx) => {

                if (apptList[apptDate].isGetLoading == true || 
                    apptList[apptDate].isPutLoading == true)
                {
                  return renderLoadingButton(classes, idx);
                }

                var danisans = apptList[apptDate].data;

                if (Object.keys(danisans).filter(d => danisans[d].status == 'pending').length == 0) {
                  return;
                }

                return (
                  <List
                    key={idx} 
                    disablePadding
                    subheader={
                      <ListSubheader component="span" id="nested-list-subheader">
                        <Typography component="span" variant="subtitle2" color="secondary">{moment(apptDate).format('D MMMM YYYY')}</Typography>
                      </ListSubheader>
                  }>
                    {Object.keys(danisans).filter(d => danisans[d].status == 'pending').map((danisanKey, idx) => {
                      var danisan = danisans[danisanKey]; 

                      var hours = danisanKey.split(' - ')

                      var avatar = danisan.type != 'onlinediyet'
                        ? (
                            <span>
                              <Typography color="textSecondary" variant="subtitle2">{hours[0]}</Typography>
                              <Typography color="textSecondary" variant="subtitle2">{hours[1]}</Typography>
                            </span>
                          )
                        : (
                            <Avatar>
                            <EventIcon />
                            </Avatar>
                          );

                      return (
                        <span key={idx}>
                          <Divider component="li" />
                          <ListItem 
                              button 
                              component={ExtendedLink} 
                              to={"/r/" + apptDate + '/' + danisanKey}
                          >
                            <ListItemAvatar >
                              {avatar}
                            </ListItemAvatar>
                            <ListItemText 
                              style={{paddingRight: '36px'}}
                              primary={
                                  // <Typography
                                  //     variant="subtitle1"
                                  //     color="textPrimary"
                                  // >
                                  danisan.info.name
                                  // </Typography>
                              } 
                              secondary={
                                  // <Typography
                                  //     variant="caption"
                                  //     color="inherit"
                                  // >
                                      danisan.type == 'onlinediyet' ? 'Online Diyet İsteği' : 
                                        danisan.address == undefined 
                                          ? 'Yüz Yüze Randevu İsteği'
                                          : danisan.address
                                  // </Typography>
                              }
                            />
                            {/* <Typography color="initial" variant="caption">{danisan.aktivite}</Typography> */}
                            {danisan.status == 'pending' && (
                              <ListItemSecondaryAction>
                                <IconButton component={ExtendedLink} to={"/r/" + apptDate + "/" + danisanKey} aria-label="delete">
                                  <ChevronRightIcon />
                                </IconButton>
                                {/* <IconButton onClick={this.confirmAppointment(apptDate, danisanKey, danisan, 'confirmed')} edge="end" aria-label="delete">
                                    <CheckSharpIcon style={{ color: green[500] }} />
                                </IconButton> */}
                              </ListItemSecondaryAction>
                            )}
                            {danisan.status == 'confirmed' && (
                              <ListItemSecondaryAction>
                                <IconButton component={ExtendedLink} to={"/r/" + apptDate + "/" + danisanKey} edge="end" >
                                {/* <Chip size="small" label="ONAYLANDI" /> */}
                                  <CheckIcon style={{color: '#00756b80'}}/>
                                </IconButton>
                              </ListItemSecondaryAction>
                            )}
                            {danisan.status == 'rejected' && (
                              <ListItemSecondaryAction>
                                <IconButton component={ExtendedLink} to={"/r/" + apptDate + "/" + danisanKey} edge="end" >
                                  <ClearIcon style={{color: '#d5602d80'}}/>
                                </IconButton>
                              </ListItemSecondaryAction>
                            )}
                          </ListItem>
                        </span>
                      )
                    })}  
                    <Divider component="li" />
                  </List>
                )
              })}
            </main>
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
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(withRouter(withWidth()(withSnackbar()(Envanter)))));
