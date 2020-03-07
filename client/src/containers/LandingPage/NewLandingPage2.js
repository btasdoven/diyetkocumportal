import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import SvgIcon from '@material-ui/core/SvgIcon';
import { Link } from "react-router-dom";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import SendIcon from '@material-ui/icons/Send';
import Divider from '@material-ui/core/Divider';
import IntroInstaVideo from '../../components/IntroInstaVideo'
import { WhatsappIcon } from "react-share";
import Fab from '@material-ui/core/Fab';
import Zoom from '@material-ui/core/Zoom';
import SpeedDial from '../SpeedDial/SpeedDial'
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';

import DiyetisyenList from './DiyetisyenList'
import DiyetisyenList2 from './DiyetisyenList2'

const styles = theme => ({
  appBar: {
    backgroundColor: 'transparent',
    color: 'rgb(38,55,70)'
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  loginButton: {
    backgroundColor: '#3897f0'
  },
  loginButton2: {
    borderColor: '#3897f0',
    color: '#3897f0',
    marginRight: theme.spacing(1),
  },
  heroUnit: {
    //backgroundColor: theme.palette.background.paper,
    backgroundColor: 'rgb(38,55,70)'
  },
  heroContent: {
    width: 'auto',
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up(1100 + theme.spacing(6))]: {
        width: 1100,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    padding: `${theme.spacing(8)}px 0 ${theme.spacing(6)}px`,
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  layoutToolbar: {
    width: 'auto',
    color: '#262626',
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    padding: 0,
    // flexDirection: 'row',
    // display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.up(750 + theme.spacing(6))]: {
      width: 750,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  layout: {
    width: 'auto',
    color: '#262626',
    // marginLeft: theme.spacing(1),
    // marginRight: theme.spacing(1),
    padding: 0,
    [theme.breakpoints.up(750 + theme.spacing(6))]: {
      width: 750,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  cardGrid: {
    padding: `${theme.spacing(3)}px 0 0 0`,
  },
  card: {
    paddingLeft: '8px',
    height: '100%',
    display: 'flex',
  },
  featureCardMedia: {
    width: '100px'
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flex: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(4),
    padding: theme.spacing(6),
  },

  avatarWrapper: {
    position: 'absolute',
    width: '100%',
    paddingTop: '100%',
    background: 'linear-gradient(to left,#7b4397,#dc2430)',
    //borderWidth: '3px',
    //margin: '2px',
    borderRadius: '50%',
    cursor: 'pointer'
  },
  avatar: {
    width: 'calc(100% - 6px)',
    height: 'calc(100% - 6px)',
    padding: '2px',
    top: '3px',
    left: '3px',
    background: '#fafafa',
    cursor: 'pointer',
    WebkitTapHighlightColor: 'transparent',
  },
  avatarWrapper2: {
    position: 'absolute',
    width: '100%',
    paddingTop: '100%',
    background: 'rgba(0,0,0,0.1)',
    //borderWidth: '3px',
    //margin: '2px',
    borderRadius: '50%',
    cursor: 'pointer'
  },
  avatar2: {
    width: 'calc(100% - 4px)',
    height: 'calc(100% - 4px)',
    padding: '2px',
    top: '2px',
    left: '2px',
    background: '#fafafa',
    cursor: 'pointer'
  },
  info: {
    marginTop: theme.spacing(2)
  },
  floatingPoint: {
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '50%',
    position: 'absolute',
  }
});

const storySources = [
  '/static/story1.mp4',
  '/static/story2.mp4',
  '/static/story3.mp4',
  '/static/story4.mp4',
  '/static/story5.mp4',
];

const ilkDanisanSources = [
  '/static/highlights/ilk_danisan_1.mp4',
  '/static/highlights/ilk_danisan_2.mp4',
  '/static/highlights/ilk_danisan_3.mp4',
];

const soruCevapSources = [
  '/static/highlights/sorucevap_1.mov',  
  '/static/highlights/sorucevap_2.mov',
  '/static/highlights/sorucevap_3.mov',
];

const ilkRandevuSources = [
  '/static/randevu/randevu_1.mov',
  '/static/randevu/randevu_2.mov',
  '/static/randevu/randevu_3.mov',
  '/static/randevu/randevu_4.mov',
  '/static/randevu/randevu_5.mov',
];

const highlights = [
  { name: 'Soru & Cevap', src: "/static/highlights/highlight4.jpg", sources: soruCevapSources },
  // { name: 'Diyet Koçum nedir?', src: "/static/highlights/highlight1.jpg", sources: ilkDanisanSources },
  // { name: 'İlk danışan kaydı', src: "/static/danisan/thumbnail.png", sources: ilkDanisanSources },
  { name: 'İlk randevu', src: "/static/randevu/thumbnail.png", sources: ilkRandevuSources },
]

function isMobileOrTablet() {
  return /(android|iphone|ipad|mobile)/i.test(navigator.userAgent);
}

function whatsappLink() {
  console.log(isMobileOrTablet());
  
  return (
    'https://' +
    (isMobileOrTablet() ? 'api' : 'web') +
    '.whatsapp.com/send?phone=19712177653'
  );
}

class LandingPage extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      user: JSON.parse(localStorage.getItem('user')),
      showWhatsappText: true,
    }
  }

  componentDidMount() {
    // setTimeout(() => {
    //   this.setState({ showWhatsappText: true})
    //   setTimeout(() => {
    //     this.setState({ showWhatsappText: false})
    //   }, 3000)
    // }, 3000)
  }

  render() {
    const { classes } = this.props;

    var diffInMs = Date.now() - Date.parse('2/9/20');
    var diffInHrs = diffInMs / 1000 / 60 / 60;
    var diyetisyenCount = 14 + parseInt(diffInHrs / 24) // her 24 saatte 1 yeni diyetisyen
    var danisanCount = 33 + parseInt(diffInHrs / 6) // her 6 saatte 1 yeni danisan
    var randevuCount = 55 + parseInt(diffInHrs / 3) // her 3 saatte 1 yeni randevu

    return (
      <React.Fragment >
        <CssBaseline />

        <div style={{position: 'relative', paddingBottom: '80px'}}>
          <div style={{position:'absolute', top:0, width: '100%', height: '100%', zIndex: -1, background: 'linear-gradient(150deg,#281483 15%,#8f6ed5 70%,#d782d9 94%)'}}>

            <span className={classes.floatingPoint} style={{width: '150px', height: '150px', left: '-4%', bottom: 'auto'}}></span>
            <span className={classes.floatingPoint} style={{width: '50px', height: '50px', right: '4%', top: '10%'}}></span>
            <span className={classes.floatingPoint} style={{width: '50px', height: '50px', right: '5%', top: '280px'}}></span>
            <span className={classes.floatingPoint} style={{width: '75px', height: '75px', right: '7%', top: '320px'}}></span>
            <span className={classes.floatingPoint} style={{width: '100px', height: '100px', left: '1%', top: '38%'}}></span>
            <span className={classes.floatingPoint} style={{width: '200px', height: '200px', left: '10%', top: '44%'}}></span>
            <span className={classes.floatingPoint} style={{width: '50px', height: '50px', right: '36%', bottom: '50%'}}></span>
            <span className={classes.floatingPoint} style={{width: '100px', height: '100px', right: '2%', bottom: '70px'}}></span>
            <span className={classes.floatingPoint} style={{width: '50px', height: '50px', right: '2%', bottom: '1%'}}></span>
            <span className={classes.floatingPoint} style={{width: '100px', height: '100px', left: '1%', bottom: '1%'}}></span>

            <div style={{position: 'absolute', bottom: '-1px', paddingLeft: '5vh', width: '100%'}}>
              <svg x="0" y="0" viewBox="0 0 2560 100" preserveAspectRatio="none" style={{height: '100%', verticalAlign: 'bottom'}} version="1.1" xmlns="http://www.w3.org/2000/svg">
                <polygon style={{fill: 'white'}} points="2560 0 2560 100 0 100"></polygon>
              </svg>
            </div>
          </div> 

          <AppBar elevation={0} position="static" className={classes.appBar}>
            <Toolbar className={classes.layoutToolbar}>
              <span edge="start" style={{display: 'flex'}}>
                <Avatar edge="start" src='/static/favicon.png' style={{marginRight: '4px', width: '32px', height:'32px'}}/>
                <Typography variant="h6" style={{fontWeight: 700, color: 'white', fontFamily: 'Open Sans,sans-serif'}}>diyetkoçum</Typography>
              </span>
              {/* <Typography variant="h6" color="inherit" noWrap>
                Digital Lab Book
              </Typography> */}
              <IconButton component="span" style={{color: 'white'}}>
                <MenuRoundedIcon style={{width: '32px', height: '32px'}} />
              </IconButton>
              {/* <Button size="small" className={classes.loginButton} variant="contained" color="primary" component={Link} to="/signin">
                KAYDOL
              </Button> */}
            </Toolbar>
          </AppBar>

          <div style={{paddingTop: '15vh', width: '100%', paddingLeft: '16px', paddingRight: '16px', textAlign: 'center', color: 'white'}}>
            <Grid container spacing={0}>
              <Grid item xs={12}>
                <Typography variant="h3" color="inherit" style={{fontWeight: 600, fontFamily: 'Open Sans,sans-serif'}}>
                  Diyet Koçum
                </Typography>
                <Typography variant="h6" color="inherit" style={{paddingTop: '24px', paddingBottom: '16px', fontWeight: 300, fontFamily: 'Open Sans,sans-serif'}}>
                  <b>Diyetisyenlerin Dijital Asistanı</b>
                </Typography>
                <Typography variant="subtitle1" color="inherit" style={{paddingBottom: '10vh', fontWeight: 300}}>
                  Randevu sayfanı oluştur, anamnez formu gönder, otomatik öğün takibi yap.
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Button size="large" className={classes.loginButton} variant="contained" style={{backgroundColor: 'rgb(252, 81, 133)', color: 'white'}} href="/signin">
                  HEMEN ŞİMDİ DENE
                </Button>
              </Grid>
              {/* <Grid item xs={12} style={{paddingTop: '8px'}}>
                <Button size="large" className={classes.loginButton} variant="contained" style={{color: 'rgb(252, 81, 133)', backgroundColor: 'white'}} href="/signin">
                  ÜCRETSİZ KAYIT OL
                </Button>
              </Grid> */}
            </Grid>
          </div>
        </div>

        <main className={classes.layoutToolbar} style={{margin:'auto'}}>
 
          <SpeedDial
            icon={<WhatsappIcon style={{marginTop: '-8px', marginRight: '-8px'}} size={40} round={true}/>}
            iconText={this.state.showWhatsappText ? "BİZE YAZIN" : undefined}
            onClickFab={() => window.open(whatsappLink(), '_blank')}
            // actions={[
            //   {name: 'hey', icon: <MoreVertIcon />, onClick: () => console.log('click')},
            //   {name: 'hey', icon: <MoreVertIcon />, onClick: () => console.log('click')}
            // ]}
            style={{zIndex: 1, position: 'fixed', bottom: '16px', right: '16px', backgroundColor: 'rgb(44, 183, 66)'}}
          />

          <div style={{paddingLeft:'24px', paddingRight: '24px', paddingTop: '48px'}}>
            <Typography variant="h5" style={{color: '#32325d', fontWeight: 400, paddingBottom: '16px'}}>Kişisel Sayfanı Oluştur</Typography>
            <Typography variant="body1" color="textSecondary">
              Kişisel sayfan senin internetteki yeni yüzün. Kendini tanıtabileceğin, blog yazıları paylaşabileceğin ve danışanlarına kolayca randevu verebileceğin 
              profesyonelce hazırlanmış sadece sana özel bir sayfa.
            </Typography>
          </div>

          <div style={{width: '100%', paddingLeft:'24px', paddingRight: '24px', paddingTop: '48px'}}>
            <Typography variant="h5" style={{color: '#32325d', fontWeight: 400, paddingBottom: '16px'}}>Randevularını Yönet</Typography>
            <Typography variant="body1" color="textSecondary">
              Ofisin mi yok? Yalnızca yüz yüze randevu mu veriyorsun? Pazartesilerin boş mu kalsın istiyorsun? Randevu tiplerini, ofislerini, gün ve saatlerini bir kere seç,
              gerisini biz halledelim. Danışanlarına müsait olduğun zamanları tekrar tekrar söylemek son bulsun.
            </Typography>
          </div>

          <div style={{width: '100%', paddingLeft:'24px', paddingRight: '24px', paddingTop: '48px'}}>
            <Typography variant="h5" style={{color: '#32325d', fontWeight: 400, paddingBottom: '16px'}}>Anamnez Formu Gönder</Typography>
            <Typography variant="body1" color="textSecondary">
              Yüz yüze randevuya gelen ya da online diyet yapan danışanlarınla paylaşabileceğin dijital anamnez formu sayesinde hem sen zamandan tasarruf edersin,
              hem de danışanların tüm ihtiyacın olan bilgileri kolayca doldururlar.
            </Typography>
          </div>

          <div style={{width: '100%', backgroundColor: 'rgb(244, 245, 247)', paddingTop: '48px', paddingBottom: '24px', marginTop: '48px'}}>
            <Typography variant="h5" style={{color: '#32325d', paddingLeft:'24px', fontWeight: 400, paddingBottom: '16px'}}>İster Cepte, İster Ofiste</Typography>
            
            <Grid container spacing={0} style={{paddingBottom: '0px', paddingTop: '8px'}}>
              {/* <Grid style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}} item xs={6}>
                <Button style={{borderColor: '#3897f0', color: '#3897f0'}} variant="outlined" component={Link} to="/signup">ŞİMDİ DENE</Button>
              </Grid> */}
              <Grid style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}} item xs={6}>
                <div style={{width: '100%', paddingLeft: '24px', paddingRight: '12px'}}>
                  <img style={{width: '100%', borderRadius: '24px', boxShadow: '0 0 2px #ccc'}} src="/static/landing/1.png" />
                </div>
              </Grid>
              <Grid style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}} item xs={6}>
                <div style={{width: '100%', paddingLeft: '12px', paddingRight: '24px'}}>
                  <img style={{width: '100%', borderRadius: '24px', boxShadow: '0 0 2px #ccc'}} src="https://demos.creative-tim.com/material-kit-react-native/assets/img/signup.png" />
                </div>
              </Grid>
              <Grid style={{display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '16px'}} item xs={12}>
                <div style={{width: '100%', paddingLeft: '24px', paddingRight: '24px'}}>
                  <img style={{width: '100%', borderRadius: '24px', boxShadow: '0 0 2px #ccc'}} src="https://s3.amazonaws.com/creativetim_bucket/products/215/thumb/opt_wd_laravel_thumbnail.jpg?1567087179" />
                </div>
              </Grid>
            </Grid>

          </div>

          <div style={{width: '100%', paddingTop: '48px', paddingBottom: '48px' }}>
            {/* <Typography variant="h5" style={{color: '#32325d', paddingLeft:'24px', fontWeight: 400, paddingBottom: '16px'}}>Diyetisyen Değil Misin?</Typography>
            
            <Typography variant="body1" color="textSecondary" style={{paddingLeft:'24px', paddingRight: '24px', paddingBottom: '16px'}}>Sistemimizi kullanan diyetisyenlerimizden hemen şimdi randevu alabilirsin.</Typography> */}

            <DiyetisyenList2 backgroundColor="white"/>

          </div>

          <div style={{width: '100%', paddingTop: '48px', paddingBottom: '48px', backgroundColor: '#f8f9fe' }}>
            <Typography variant="h5" style={{color: '#32325d', textAlign: 'center', fontWeight: 500, paddingBottom: '16px'}}>PREMIUM PAKET</Typography>
            
            <Typography variant="body1" color="textSecondary" style={{textAlign:'center', paddingLeft:'24px', paddingRight: '24px', paddingBottom: '4px'}}>
              Sana özel kişisel sayfa
            </Typography>
            <Typography variant="body1" color="textSecondary" style={{textAlign:'center', paddingLeft:'24px', paddingRight: '24px', paddingBottom: '4px'}}>
              Online ve yüz yüze randevu takibi
            </Typography>
            <Typography variant="body1" color="textSecondary" style={{textAlign:'center', paddingLeft:'24px', paddingRight: '24px', paddingBottom: '4px'}}>
              Otomatik dijital anamnez formu
            </Typography>
            <Typography variant="body1" color="textSecondary" style={{textAlign:'center', paddingLeft:'24px', paddingRight: '24px', paddingBottom: '4px'}}>
              Sınırsız mesajlaşma
            </Typography>
            <Typography variant="body1" color="textSecondary" style={{textAlign:'center', paddingLeft:'24px', paddingRight: '24px', paddingBottom: '4px'}}>
              Sınırsız ölçüm ekleme
            </Typography>

            <div style={{textAlign: 'center', paddingTop: '12px'}}>
              <Typography component="span" variant="h4" color="textPrimary">
                49₺
              </Typography>
              <Typography component="span" variant="h5" color="textSecondary">
                /ay
              </Typography>
            </div>

            <div style={{textAlign: 'center', paddingTop: '30px'}}>
              <Button size="large" className={classes.loginButton} variant="contained" style={{backgroundColor: 'rgb(252, 81, 133)', color: 'white'}} href="/signin">
                1 HAFTA ÜCRETSİZ DENE
              </Button>
            </div>
          </div>

          {/* <div style={{width: '100%', paddingTop: '48px', paddingBottom: '48px' }}>
            <Typography variant="h5" style={{color: '#32325d', paddingLeft:'24px', fontWeight: 400, paddingBottom: '16px'}}>Diyetisyen Değil Misin?</Typography>
            
            <Typography variant="body1" color="textSecondary" style={{paddingLeft:'24px', paddingRight: '24px', paddingBottom: '16px'}}>Sistemimizi kullanan diyetisyenlerimizden hemen şimdi randevu alabilirsin.</Typography>

            <DiyetisyenList backgroundColor="white"/>

          </div> */}
        <Typography component="div" variant="body2" color="textSecondary" style={{padding: '16px', textAlign: 'center'}}>
         © 2020 Diyet Koçum
        </Typography>
        </main>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(LandingPage);