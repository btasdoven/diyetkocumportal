import CircularLoader from "../../components/CircularLoader"
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import React from 'react';
import { connect } from "react-redux";
import SwipeableViews from 'react-swipeable-views';
import { bindActionCreators } from "redux";
import ExtendedLink from '../../components/ExtendedLink';
import { userService } from '../../services/user.service';
import { getAllDietitians } from '../../store/reducers/api.allDietitians';

const tutorialSteps = [
  {
    label: 'Aşkın Özdemir',
    link: '/diyetisyenasknn',
    unvan: 'Dyt.',
    info: 'Sağlıklı bir yaşam ve fit bir görüntü için daha fazla vakit kaybetme! Hemen şimdi randevu alabilirsin.',
  },
  {
    label: 'Meltem Arslan',
    link: '/dyt.arslanmeltem',
    unvan: 'Dyt.',
    info: 'Online asistanlık ile online diyet sistemini pratik ve kolay hale getiren bir platform. Diyetisyenler için her şey düşünülmüş 😊 Tüm meslektaşlarıma tavsiye ederim 👍🏻',
  },
  {
    label: 'Merve Doyranlı',
    link: '/diyetisyendoyranli',
    info: 'Sağlıklı bir yaşam ve fit bir görüntü için daha fazla vakit kaybetme! Hemen şimdi randevu alabilirsin.',
    unvan: 'Dyt.',
  },
  {
    label: 'Ezel Kavadar',
    link: '/dyt_ezelkavadar',
    unvan: 'Uzm. Dyt.',
    info: 'Bütün meslektaşlarıma, özellikle de online ağırlıklı çalışan meslektaşlarıma kullanmalarını tavsiye ettiğim randevu sistemi 👌 En güzel yanı danışan datamızı saklayabiliyor olmak 🥰',
  },
  {
    label: 'Aysu Taşdöven',
    link: '/aysuutasdovenn',
    unvan: 'Dyt.',
    info: "Oluşturduğum kişisel sayfamın linkini Instagram profilime koydum ve yeni danışanlarıma kolayca randevu verebildim. Teşekkürler Diyet Koçum 😊",
  },
  {
    label: 'Büşra Özyavuz',
    link: '/diyetiswomen',
    unvan: 'Dyt.',
    info: 'Sağlıklı bir yaşam ve fit bir görüntü için daha fazla vakit kaybetme! Hemen şimdi randevu alabilirsin.',
  },
];

const styles = theme => ({
  root: {
    // maxWidth: 400,
    overflow: 'hidden',
    flexGrow: 1,
    backgroundColor: 'transparent'
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
  slideContainer: {
    padding: '24px 12px',
    [theme.breakpoints.up(750 + theme.spacing(6))]: {
      padding: '32px 32px',
    },
  },
  slide: {
    padding: '16px',
    border: 'solid 1px rgb(228, 229, 234)',
    borderRadius: '15px',
    paddingTop: '15px',
    paddingBottom: '15px',
    maxWidth: '350px',
    margin: 'auto',
    backgroundColor: 'white'
  }
});

const useStyles = makeStyles(styles)

const TextMobileStepper = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(1);
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
        <SwipeableViews
            axis={'x'}
            index={activeStep}
            onChangeIndex={handleStepChange}
            enableMouseEvents
            slideStyle={{padding: '24px 12px'}}
            style={{padding: '0 max(36px, calc(50% - 200px))', paddingBottom: '16px'}}
        >
          <div className={classes.slide}>
            <Typography variant="h5" style={{color: '#32325d', textAlign: 'center', fontWeight: 500, paddingBottom: '16px'}}>Öğrenci Paketi</Typography>
            
            <Typography variant="body1" color="textSecondary" style={{textAlign:'center', paddingLeft:'24px', paddingRight: '24px', paddingBottom: '4px'}}>
              Sana özel kişisel sayfa
            </Typography>
            <Typography variant="body1" color="textSecondary" style={{textAlign:'center', paddingLeft:'24px', paddingRight: '24px', paddingBottom: '4px'}}>
              Blog yazıları
            </Typography>
            <Typography variant="body1" color="textSecondary" style={{textAlign:'center', paddingLeft:'24px', paddingRight: '24px', paddingBottom: '4px'}}>
              Diyet listesi oluşturma
            </Typography>
            <Typography variant="body1" color="textSecondary" style={{textAlign:'center', paddingLeft:'24px', paddingRight: '24px', paddingBottom: '4px'}}>
              VKİ, BMH hesaplama
            </Typography>

            <div style={{textAlign: 'center', paddingTop: '12px'}}>
              <Typography component="span" variant="h4" color="textPrimary">
                0₺
              </Typography>
              <Typography component="span" variant="h5" color="textSecondary">
                /ay
              </Typography>
            </div>

            <div style={{textAlign: 'center', paddingTop: '24px', paddingBottom: '8px'}}>
              <Button size="large" className={classes.loginButton} variant="outlined" style={{borderColor: 'rgb(252, 81, 133)', color: 'rgb(252, 81, 133)'}} component={ExtendedLink} to="/signup">
                ŞİMDİ KAYDOL
              </Button>
            </div>
          </div>
          <div className={classes.slide} style={{transform: 'scale(1.08)'}}>
            <Typography variant="h5" style={{color: '#32325d', textAlign: 'center', fontWeight: 500, paddingBottom: '16px'}}>Premium Paket</Typography>
            
            <Typography variant="body1" color="textSecondary" style={{textAlign:'center', paddingLeft:'24px', paddingRight: '24px', paddingBottom: '4px'}}>
              Sana özel kişisel sayfa
            </Typography>
            <Typography variant="body1" color="textSecondary" style={{textAlign:'center', paddingLeft:'24px', paddingRight: '24px', paddingBottom: '4px'}}>
              Randevu takibi
            </Typography>
            <Typography variant="body1" color="textSecondary" style={{textAlign:'center', paddingLeft:'24px', paddingRight: '24px', paddingBottom: '4px'}}>
              Dijital anamnez formu
            </Typography>
            <Typography variant="body1" color="textSecondary" style={{textAlign:'center', paddingLeft:'24px', paddingRight: '24px', paddingBottom: '4px'}}>
              Günlük ve haftalık takvim
            </Typography>
            <Typography variant="body1" color="textSecondary" style={{textAlign:'center', paddingLeft:'24px', paddingRight: '24px', paddingBottom: '4px'}}>
              Sınırsız ölçüm ekleme
            </Typography>
            <Typography variant="body1" color="textSecondary" style={{textAlign:'center', paddingLeft:'24px', paddingRight: '24px', paddingBottom: '4px'}}>
              Danışan görüşleri
            </Typography>

            <div style={{textAlign: 'center', paddingTop: '12px'}}>
              <Typography component="span" variant="h4" color="textPrimary">
                49.99₺
              </Typography>
              <Typography component="span" variant="h5" color="textSecondary">
                /ay
              </Typography>
            </div>

            <div style={{textAlign: 'center', paddingTop: '24px', paddingBottom: '8px'}}>
              <Button size="large" className={classes.loginButton} variant="contained" style={{backgroundColor: 'rgb(252, 81, 133)', color: 'white'}} component={ExtendedLink} to="/signup">
                2 AY ÜCRETSİZ DENE
              </Button>
            </div>
          </div>
        </SwipeableViews>
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
        style={{backgroundColor: props.backgroundColor ? props.backgroundColor : 'transparent'}}
        steps={2}
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

        {/* <Button color="secondary" style={{marginTop: '16px', marginRight: '24px', float: 'right'}} onClick={() => {
          registerEvent('ClickShowAllDietitians')
          this.setDialog(true)}
         } size="small">Tümünü gör</Button> */}

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
            { showLoader && <CircularLoader /> }
            { !showLoader && (
              <List className={classes.dietitanList}>
                {dietitians.map((step, index) => (
                  <ListItem key={index} button component={ExtendedLink} to={`/${dietitians[index].username}`}>
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