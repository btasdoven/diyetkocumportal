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
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { Link } from "react-router-dom";
import { registerEvent, trackPage } from '../../components/Signin/PageTracker'

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const tutorialSteps = [
  {
    label: 'Seda Nur Arslan',
    link: '/d/dyt.sedaarslan',
    unvan: 'Diyetisyen',
    info: 'Sağlıklı bir yaşam ve fit bir görüntü için daha fazla vakit kaybetme! Hemen şimdi randevu alabilirsin.',
    imgPath:
      'https://scontent-sea1-1.cdninstagram.com/v/t51.2885-19/s320x320/79601151_440235653337041_155053159813742592_n.jpg?_nc_ht=scontent-sea1-1.cdninstagram.com&_nc_ohc=X6iriE12JhIAX9vj5NN&oh=6af52bb060a80f1b60225e5fcdfbeb7b&oe=5EDA438F',
  },
  {
    label: 'Aşkın Özdemir',
    link: '/d/diyetisyenasknn',
    unvan: 'Beslenme Uzmanı',
    info: 'Sağlıklı bir yaşam ve fit bir görüntü için daha fazla vakit kaybetme! Hemen şimdi randevu alabilirsin.',
    imgPath:
      'https://instagram.fcxh2-1.fna.fbcdn.net/v/t51.2885-19/s320x320/84786194_595684020985796_8460187620012457984_n.jpg?_nc_ht=instagram.fcxh2-1.fna.fbcdn.net&_nc_ohc=0o-Dk-fnd3gAX9g0V-7&oh=17df74f33067343f375732fa19308dc8&oe=5E964C75',
  },
  {
    label: 'Merve Doyranlı',
    link: '/d/diyetisyendoyranli',
    info: 'Sağlıklı bir yaşam ve fit bir görüntü için daha fazla vakit kaybetme! Hemen şimdi randevu alabilirsin.',
    unvan: 'Beslenme ve Diyet Uzmanı',
    imgPath:
      'https://instagram.fcxh2-1.fna.fbcdn.net/v/t51.2885-19/s150x150/84672932_1308851982646011_5856861668205658112_n.jpg?_nc_ht=instagram.fcxh2-1.fna.fbcdn.net&_nc_ohc=mfNzhyRr3F8AX84h0hu&oh=db9e445c8c0311076a1094fab70d9122&oe=5EA0047F',
  },
  {
    label: 'Ezel Kavadar',
    link: '/d/dyt_ezelkavadar',
    unvan: 'Uzman Diyetisyen',
    info: 'Sağlıklı bir yaşam ve fit bir görüntü için daha fazla vakit kaybetme! Hemen şimdi randevu alabilirsin.',
    imgPath:
      'https://scontent-sea1-1.cdninstagram.com/v/t51.2885-19/s320x320/65535962_411795416090543_708510732999720960_n.jpg?_nc_ht=scontent-sea1-1.cdninstagram.com&_nc_ohc=-CRizYY6VPwAX82G5qH&oh=75c5e5b1629d904afafbe3da693681bc&oe=5E9FC51C',
  },
  {
    label: 'Büşra Özyavuz',
    link: '/d/diyetiswomen',
    unvan: 'Diyetisyen',
    info: 'Sağlıklı bir yaşam ve fit bir görüntü için daha fazla vakit kaybetme! Hemen şimdi randevu alabilirsin.',
    imgPath:
      'https://instagram.fcxh2-1.fna.fbcdn.net/v/t51.2885-19/s150x150/87233097_1321399854712319_3852451223445700608_n.jpg?_nc_ht=instagram.fcxh2-1.fna.fbcdn.net&_nc_ohc=5Yv5vL8viD8AX9MjqgC&oh=6d8323804483c1781bc3526eb4554b6c&oe=5EA073A1',
  },
  {
    label: 'Aysu Taşdöven',
    link: '/d/aysuutasdovenn',
    unvan: 'Diyetisyen',
    info: "Oluşturduğum kişisel sayfamın linkini Instagram profilime koydum ve yeni danışanlarıma kolayca randevu verebildim. Teşekkürler Diyet Koçum!",
    imgPath:
      'https://instagram.fcxh2-1.fna.fbcdn.net/v/t51.2885-19/s320x320/80809330_475914226417245_2272595860648886272_n.jpg?_nc_ht=instagram.fcxh2-1.fna.fbcdn.net&_nc_ohc=NKIcZJYMDdcAX-lZJ_Y&oh=1a8ebffe7cdb4e22df44f353cd143f46&oe=5E9A210C',
  },
];

const useStyles = makeStyles(theme => ({
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
}));

export default function TextMobileStepper(props) {
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
            interval={5000}
        >
            {tutorialSteps.map((step, index) => (
              <div key={index} style={{textAlign: 'center'}}>
                <Avatar 
                    className={classes.img}
                    src={tutorialSteps[index].imgPath}
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