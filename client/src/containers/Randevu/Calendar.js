import BusinessIcon from '@material-ui/icons/Business';
import CommentIcon from '@material-ui/icons/Comment';
import SpeedDial from '../SpeedDial/SpeedDial'
import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Link } from "react-router-dom";

import { AppBar } from "@material-ui/core";
import moment from "moment";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import VideocamIcon from '@material-ui/icons/Videocam';
import RoomIcon from '@material-ui/icons/Room';
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
import CancelIcon from '@material-ui/icons/Cancel';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ClearIcon from '@material-ui/icons/Clear';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckSharpIcon from '@material-ui/icons/CheckSharp';
import CloseIcon from '@material-ui/icons/Close';
import { withSnackbar } from 'material-ui-snackbar-provider'
import EventIcon from '@material-ui/icons/Event';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import { getDietitianAppointments, putDietitianAppointment } from '../../store/reducers/api.dietitianAppointments';
import Chip from '@material-ui/core/Chip';
import Badge from '@material-ui/core/Badge';

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
import CheckIcon from '@material-ui/icons/Check';

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
import IntroInstaVideo from '../../components/IntroInstaVideo'

import AddAppointmentDialog from './AddAppointmentDialog'

import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  DayView,
  WeekView,
  Toolbar,
  TodayButton,
  DateNavigator,
  ViewSwitcher,
  CurrentTimeIndicator,
  Appointments,
  AppointmentTooltip,
  AppointmentForm,
} from '@devexpress/dx-react-scheduler-material-ui';
import { Fragment } from 'react';

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

const SchedulerRoot = withStyles(styles, { name: 'Scheduler' })(({
  children, style, classes, ...restProps
}) => {
  return (
      <Scheduler.Root
        {...restProps}
        style={{
          ...style,
          height: 'calc(100vh - 56px)',
        }}
      > 
        {children}
      </Scheduler.Root>
  );
})

const CalendarToolbar = withStyles(styles, { name: 'Toolbar' })(({
  children, style, classes, ...restProps
}) => {
  return (
    // <AppBar elevation={0} position="fixed">
      <Toolbar.Root
        {...restProps}
        style={{
          ...style,
          // backgroundColor: 'rgb(102, 187, 106)',
        }}
      > 
        {children}
      </Toolbar.Root>
    // </AppBar>
  );
})

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
      showAllPendingAppts: false,
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

    var pendingApptsShown = 0;
    var apptList = showLoader ? undefined : this.props.apiDietitianAppointments[this.state.userId].data;
    var schedulerData = []

    if (apptList) {
      Object.keys(apptList).forEach((apptDate, idx) => {
        if (apptList[apptDate].data == undefined)
        {
          return;
        }

        var danisans = apptList[apptDate].data;
        Object.keys(danisans).forEach( (danisanKey) => {
            var danisan = danisans[danisanKey]; 
            var hours = danisanKey.split(' - ')

            if (danisan.status != 'confirmed') {
              return;
            }

            schedulerData.push({
              startDate: moment(apptDate).format('YYYY-MM-DD') + 'T' + hours[0],
              endDate: moment(apptDate).format('YYYY-MM-DD') + 'T' + hours[1],
              title: `${danisan.info.name}`,
              details: danisan
            })
        })
      })
    }

    return (
        <div className={classes.root}>
        <div className={classes.main}>

          { showLoader && renderLoadingButton(classes) }
{/* 
          {!showLoader && 
            <AddAppointmentDialog 
              form='newAppointment' 
              userId={this.state.userId}
              startDate='08.06.2020 14:00'
              handleClose={this.handleCloseAddAppointment}
            />
          } */}
          {!showLoader &&
            <Fragment>
              {/* <Typography variant="body2" style={{textAlign: 'center', paddingTop: '56px'}}>Bu özellik çok yakında hizmetinizde...</Typography> */}
              
              {this.state.newAppointment != undefined &&
                <AddAppointmentDialog 
                  form='newAppointment' 
                  userId={this.state.userId}
                  startDate={this.state.selectedCellStartDate}
                  handleClose={this.handleCloseAddAppointment}
                />
              }

              {this.state.selectedCellStartDate != undefined &&
                <SpeedDial
                  icon={<AddIcon />}
                  iconText={"YENİ RANDEVU"}
                  eventText={"AppointmentListAddNew"}
                  onClickFab={() => this.setState({newAppointment: true})}
                  style={{zIndex: 1, position: 'fixed', bottom: '16px', right: '16px'}}
                />
              }

              <Scheduler
                data={schedulerData}
                locale="tr-TR"
                height={600}
                rootComponent={SchedulerRoot}
              >
                <ViewState
                  defaultCurrentDate={moment().format()}
                  defaultCurrentViewName={this.props.width == 'xs' ? 'Day' : 'Week'}
                />
                <DayView
                  startDayHour={7}
                  endDayHour={20}
                  timeTableCellComponent={this.TimeTableCellWithProps}
                />
                <WeekView
                  startDayHour={7}
                  endDayHour={20}
                  timeTableCellComponent={this.TimeTableCellWithProps}
                />
                <Toolbar rootComponent={CalendarToolbar} />
                {/* <ViewSwitcher /> */}
                <DateNavigator />
                <TodayButton messages={{today:"BUGÜN"}} />
                <Appointments appointmentComponent={Appointment} />
                
                <CurrentTimeIndicator
                  shadePreviousCells={true}
                  shadePreviousAppointments={true}
                  updateInterval={60000}
                />

                <AppointmentTooltip
                  contentComponent={ApptContent}
                  showCloseButton
                />
              </Scheduler>
            </Fragment>
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
