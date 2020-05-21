
import CircularProgress from '@material-ui/core/CircularProgress';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

import { withStyles } from '@material-ui/core/styles';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { Link } from "react-router-dom";
import { registerEvent, trackPage } from '../../components/Signin/PageTracker'
import { getAllDietitians } from '../../store/reducers/api.allDietitians';

import { userService } from '../../services/user.service'

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const tutorialSteps = [
  {
    label: 'Seda Nur Arslan',
    link: '/dyt.sedaarslan',
    unvan: 'Diyetisyen',
    info: 'Sağlıklı bir yaşam ve fit bir görüntü için daha fazla vakit kaybetme! Hemen şimdi randevu alabilirsin.',
  },
  {
    label: 'Aşkın Özdemir',
    link: '/diyetisyenasknn',
    unvan: 'Beslenme Uzmanı',
    info: 'Sağlıklı bir yaşam ve fit bir görüntü için daha fazla vakit kaybetme! Hemen şimdi randevu alabilirsin.',
  },
  {
    label: 'Merve Doyranlı',
    link: '/diyetisyendoyranli',
    info: 'Sağlıklı bir yaşam ve fit bir görüntü için daha fazla vakit kaybetme! Hemen şimdi randevu alabilirsin.',
    unvan: 'Beslenme ve Diyet Uzmanı',
  },
  {
    label: 'Ezel Kavadar',
    link: '/dyt_ezelkavadar',
    unvan: 'Uzman Diyetisyen',
    info: 'Bütün meslektaşlarıma, özellikle de online ağırlıklı çalışan meslektaşlarıma kullanmalarını tavsiye ettiğim randevu sistemi 👌 En güzel yanı danışan datamızı saklayabiliyor olmak 🥰',
  },
  {
    label: 'Büşra Özyavuz',
    link: '/diyetiswomen',
    unvan: 'Diyetisyen',
    info: 'Sağlıklı bir yaşam ve fit bir görüntü için daha fazla vakit kaybetme! Hemen şimdi randevu alabilirsin.',
  },
  {
    label: 'Aysu Taşdöven',
    link: '/aysuutasdovenn',
    unvan: 'Diyetisyen',
    info: "Oluşturduğum kişisel sayfamın linkini Instagram profilime koydum ve yeni danışanlarıma kolayca randevu verebildim. Teşekkürler Diyet Koçum!",
  },
];

const styles = theme => ({
  root: {
    // maxWidth: 400,
    overflow: 'hidden',
    flexGrow: 1,
    backgroundColor: 'white'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    height: 50,
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
  },
  img: {
    height: theme.spacing(8),
    width: theme.spacing(8),
    // marginRight: '16px'
    // maxWidth: 400,
    // overflow: 'hidden',
    // display: 'block',
    // width: '100%',
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
});

const useStyles = makeStyles(styles)

const TextMobileStepper = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = tutorialSteps.length;

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleStepChange = step => {
    setActiveStep(step);
  };

  return (
    <Paper elevation={0} className={classes.root}>
        <AutoPlaySwipeableViews
            axis={'x'}
            index={activeStep}
            onChangeIndex={handleStepChange}
            enableMouseEvents
            interval={8000}
        >
            {tutorialSteps.map((step, index) => (
              <div key={index} style={{textAlign: 'center'}}>
                <Avatar 
                    className={classes.img}
                    src={userService.getStaticFileUri(`api/v1/public${tutorialSteps[index].link}${tutorialSteps[index].link}.png`)}
                    alt={tutorialSteps[index].label}
                    style={{width: '140px', height: '140px', margin: 'auto'}}
                />            
                
                <Typography variant="h6" style={{color: '#32325d', fontWeight: 400, paddingBottom: '16px', paddingTop: '16px'}}>Dyt. {tutorialSteps[index].label}</Typography>
          
                <Typography variant="body1" color="textSecondary" style={{paddingLeft:'24px', paddingRight: '24px', paddingBottom: '16px'}}>
                  {tutorialSteps[index].info || ""}
                </Typography>
{/*       
                <div style={{backgroundColor: props.backgroundColor ? props.backgroundColor : 'white', width: '100%', justifyContent: 'center', display: 'flex', padding: '8px', paddingBottom: '16px'}}>
                  <Button onClick={() => registerEvent('LandingPageClickRandevuAl')} style={{borderColor: 'rgb(252, 81, 133)', color: 'rgb(252, 81, 133)', backgroundColor: 'transparent'}} variant="outlined" component={Link} to={tutorialSteps[index].link}>RANDEVU AL</Button>
                </div> */}
              </div>
            ))}
        </AutoPlaySwipeableViews>
{/* 
      <Paper square elevation={0} className={classes.header}>
        <Typography>{tutorialSteps[activeStep].label}</Typography>
      </Paper>
      <img
        className={classes.img}
        src={tutorialSteps[activeStep].imgPath}
        alt={tutorialSteps[activeStep].label}
      /> */}
      <MobileStepper
        style={{backgroundColor: props.backgroundColor ? props.backgroundColor : 'white'}}
        steps={maxSteps}
        position="static"
        variant="dots"
        activeStep={activeStep}
        nextButton={
            <span></span>
            //<Button onClick={handleNext} disabled={activeStep === maxSteps - 1} size="small"><KeyboardArrowRight /></Button>
        }
        backButton={
            <span></span>
            //<Button onClick={handleBack} disabled={activeStep === 0} size="small"><KeyboardArrowLeft /></Button>
        }
      />

      
    </Paper>
  );
}

function renderLoadingButton(classes) {
  return (
    <div className={classes.rootLoading}>
      <CircularProgress size={24} className={classes.buttonProgress} />
    </div>
  )
} 

class DietianList extends React.Component {
  constructor(props) {
    super(props)

    this.isLoaded = this.isLoaded.bind(this);
    this.setDialog = this.setDialog.bind(this);

    this.state = {
      openDialog: false
    }
  }

  isLoaded() {
    var loaded = this.props.apiAllDietitians != undefined &&
      this.props.apiAllDietitians.isGetLoading != true &&
      this.props.apiAllDietitians.data != undefined;

      return loaded;
  }

  setDialog (open) {
    this.setState({ openDialog : open });

    if (open && !this.isLoaded()) {
      this.props.getAllDietitians();
    }
  }

  render() {
    const { classes } = this.props;
    const showLoader = !this.isLoaded();
    const dietitians = showLoader ? undefined : this.props.apiAllDietitians.data;

    return (
      <span>
        <TextMobileStepper />

        <Button color="secondary" style={{marginTop: '16px', marginRight: '24px', float: 'right'}} onClick={() => {
          registerEvent('ClickShowAllDietitians')
          this.setDialog(true)}
         } size="small">Tümünü gör</Button>

        <Dialog 
          open={this.state.openDialog} 
          fullWidth={true}
          maxWidth="sm"
          onClose={() => this.setDialog(false)}
        >
          <DialogTitle disableTypography style={{paddingBottom: '0px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <Typography variant="subtitle1">Diyetisyenlerimiz</Typography>
            <IconButton size="small" aria-label="close" className={classes.closeButton} onClick={() => this.setDialog(false)}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            { showLoader && renderLoadingButton(classes) }
            { !showLoader && (
              <List className={classes.dietitanList}>
                {dietitians.map((step, index) => (
                  <ListItem key={index} button component={Link} to={`/${dietitians[index].username}`}>
                    <ListItemAvatar>
                      <Avatar
                        className={classes.avatar}
                        src={userService.getStaticFileUri(dietitians[index].url64)}
                        alt={dietitians[index].name}
                      />
                    </ListItemAvatar>
                    <ListItemText primary={dietitians[index].name} secondary={dietitians[index].unvan || 'Diyetisyen'} />
                    {/* <ListItemSecondaryAction>
                      <Checkbox
                        edge="end"
                        onChange={handleToggle(value)}
                        checked={checked.indexOf(value) !== -1}
                        inputProps={{ 'aria-labelledby': labelId }}
                      />
                    </ListItemSecondaryAction> */}
                  </ListItem>
                ))}
              </List>
            )}
          </DialogContent>
        </Dialog>
      </span>
    )
  }
};

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
)(withStyles(styles)(DietianList));