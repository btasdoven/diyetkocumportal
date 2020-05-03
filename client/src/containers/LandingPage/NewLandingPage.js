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

import DiyetisyenList from './DiyetisyenList'

const styles = theme => ({
  appBar: {
    backgroundColor: 'rgb(255,255,255)',
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
    marginRight: theme.spacing(2),
    padding: 0,
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
        <AppBar elevation={0} position="static" className={classes.appBar}>
          <Toolbar className={classes.layoutToolbar}>
            <span edge="start">
              {this.state.user && <Avatar edge="start" src={this.state.user.url} style={{marginRight: '10px', width: '48px', height:'48px'}}/>}
            </span>
            {/* <Typography variant="h6" color="inherit" noWrap>
              Digital Lab Book
            </Typography> */}
            {this.state.user == undefined && (
              <div edge="end">
                <Button className={classes.loginButton2} variant="outlined" color="primary" component={Link} to="/signin">
                  DİYETİSYEN GİRİŞİ
                </Button>
                {/* <Button className={classes.loginButton} variant="contained" color="primary" size="small" component={Link} to="/signup">
                  DİYETİSYEN KAYDI
                </Button> */}
              </div>
            )}
            {this.state.user != undefined && (
              <Button edge="end" endIcon={<SendIcon />} className={classes.loginButton} variant="contained" color="primary" component={Link} to="/r">
                PORTALIMA GİT
              </Button>
            )}
            {/* <Button size="small" className={classes.loginButton} variant="contained" color="primary" component={Link} to="/signin">
              KAYDOL
            </Button> */}
          </Toolbar>
        </AppBar>
        <Divider />
        <main>
          {/* <Zoom
            in={true}
            timeout={250}
            style={{
              transitionDelay: `2000ms`,
            }}
            unmountOnExit
          > */}

          
            <SpeedDial
              icon={<WhatsappIcon style={{marginTop: '-8px', marginRight: '-8px'}} size={40} round={true}/>}
              iconText={this.state.showWhatsappText ? "BİZE YAZIN" : undefined}
              eventText={"LandingPageBizeYazin"}
              onClickFab={() => window.open(whatsappLink(), '_blank')}
              // actions={[
              //   {name: 'hey', icon: <MoreVertIcon />, onClick: () => console.log('click')},
              //   {name: 'hey', icon: <MoreVertIcon />, onClick: () => console.log('click')}
              // ]}
              style={{zIndex: 1, position: 'fixed', bottom: '16px', right: '16px'}}
            />
            {/* <Fab componenent='a' href={whatsappLink()} target="_blank" color="primary" aria-label="add" style={{zIndex: 1, position: 'fixed', bottom: '16px', right: '16px'}}>
              
            </Fab> */}
          {/* </Zoom> */}

          <div className={classNames(classes.layout, classes.cardGrid)}>
            <Grid container spacing={0} >
              <Grid style={{paddingLeft: '5%'}} item xs={3} sm={3} md={3} lg={3}>
                <div style={{position: 'relative', width: '100%'}}>
                  {/* <IntroInstaVideo 
                    border={false}
                    introName="DiyetKocumProfile"
                    infoHighlightSrc={"/static/favicon.png"}
                    sources={[
                      '/static/randevu/randevu_1.mov',
                      '/static/randevu/randevu_2.mov',
                      '/static/randevu/randevu_3.mov',
                      '/static/randevu/randevu_4.mov',
                    ]}
                  /> */}
                  {/* <style>
                    {`@keyframes rotate {
                        from{ transform: rotate(0deg); }
                        to{ transform: rotate(360deg); }
                    }`}
                  </style>
                  <div style={{animation: 'rotate 3s linear infinite'}} className={classes.avatarWrapper}>
                  </div> */}
                  <Avatar src="/static/favicon.png" className={classes.avatar} />
                </div>
              </Grid>
              <Grid style={{paddingLeft: '5%'}} item xs={9} sm={9} md={9} lg={9}>
                <Grid style={{alignContent: 'center', height: '100%'}} container spacing={0}>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Typography style={{fontWeight: 300, color: '#262626'}} gutterBottom variant="h5">
                        Diyet Koçum
                    </Typography>
                  </Grid>
                  <Grid item xs={4} sm={4} md={4} lg={4}>
                    <Typography style={{fontWeight: 300, color: '#262626'}} gutterBottom variant="body2">
                        <b>{diyetisyenCount}</b><br/> diyetisyen
                    </Typography>
                  </Grid>
                  <Grid item xs={4} sm={4} md={4} lg={4}>
                    <Typography style={{fontWeight: 300, color: '#262626'}} gutterBottom variant="body2">
                        <b>{danisanCount}</b><br/> danışan
                    </Typography>
                  </Grid>
                  <Grid item xs={4} sm={4} md={4} lg={4}>
                    <Typography style={{fontWeight: 300, color: '#262626'}} gutterBottom variant="body2">
                        <b>{randevuCount}</b><br/> randevu
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid className={classes.info} style={{paddingTop: '8px', paddingLeft: '16px', paddingRight: '16px'}} item xs={12} sm={12} md={12} lg={12}>
                <Typography style={{color: '#262626'}} gutterBottom variant="body2">
                    <b>Diyetisyenlerin Dijital Asistanı</b>
                </Typography>
                <Typography style={{color: '#262626'}} gutterBottom variant="body2">
                    🌏 Online ve 📍 yüz yüze diyete yardımcı <br />
                    🍀 Kolay randevu sistemi <br />
                    🥑 Danışanlara otomatik anamnez formu doldurtma <br />
                    🍋 Diyet geçmişi ve notlara online erişim <br />
                    🍍 Diyet listeleri oluşturma ve kaydetme <br />
                    💌 Uygulama üzerinden mesajlaşma <br />
                    {/* 🍏 Ödeme alma kolaylığı <br /> */}
                </Typography>
              </Grid>
              {/* <Grid className={classes.info} style={{paddingTop: '8px', paddingLeft: '16px', paddingRight: '16px'}} item xs={12} sm={12} md={12} lg={12}>
                <Typography style={{letterSpacing: 0, color: '#999'}} gutterBottom variant="caption">
                <a style={{ textDecoration: 'none', fontWeight: 'bolder', color: '#252525' }} href="/d/diyetiswomen">diyetiswomen, </a>  
                <a style={{ textDecoration: 'none', fontWeight: 'bolder', color: '#252525' }} href="/d/dyt_ezelkavadar">dyt_ezelkavadar, </a> 
                <a style={{ textDecoration: 'none', fontWeight: 'bolder', color: '#252525' }} href="/d/diyetisyendoyranli">diyetisyendoyranli, </a> 
                <a style={{ textDecoration: 'none', fontWeight: 'bolder', color: '#252525' }} href="/d/diyetisyenasknn">diyetisyenasknn, </a>  
                <a style={{ textDecoration: 'none', fontWeight: 'bolder', color: '#252525' }} href="/d/dyt.sedaarslan">dyt.sedaarslan </a>  
                ve digerleri tarafından kullanılıyor
                </Typography>
              </Grid> */}
            </Grid>

            <Grid style={{paddingTop: '8px', paddingBottom: '16px', paddingLeft: '8px', paddingRight: '8px'}} container spacing={0}>
              {highlights.map((highlight, idx) => 
                <Grid key={idx} item xs={3}>
                  <div style={{position: 'relative', width: '80%', margin: '10%'}}>
                    <div className={classes.avatarWrapper2}>
                    </div>
                    <IntroInstaVideo 
                      border={false}  
                      introName={highlight.name}
                      infoHighlightSrc={highlight.src}
                      sources={highlight.sources}
                    />
                  </div>
                  <Typography component="div" style={{marginTop: '8px', textAlign: 'center'}} variant="caption">{highlight.name}</Typography>
                </Grid>
              )}
            </Grid>

            <div style={{marginTop: '0px', marginBottom: '16px', backgroundColor: '#fafafa'}} >
              <Divider />
              <Grid container style={{paddingLeft: '16px', paddingRight: '16px'}} spacing={0}>
                <Grid style={{paddingTop: '16px', paddingBottom: '8px', display: 'flex', justifyContent: 'center'}} item xs={12} lg={12}>
                  <Grid container spacing={1}>
                    <Grid item xs={12}>
                      <Typography component="div" style={{fontWeight: 400, textAlign: 'center'}} variant="h6">PREMIUM PAKET</Typography>
                    </Grid>
                    {/* <Grid item xs={6}>
                      <Typography component="div" style={{fontWeight: 300, textAlign: 'center'}} variant="h6">PREMIUM</Typography>
                    </Grid> */}
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={1}>
                    {/* <Grid item xs={6}>
                      <Typography component="div" style={{textAlign: 'center'}} variant="caption">5 danışana kadar kayıt</Typography>
                      <Typography component="div" style={{textAlign: 'center'}} variant="caption">Haftalık randevu takibi</Typography>
                      <Typography component="div" style={{textAlign: 'center'}} variant="caption">Kısıtlı mesajlaşma</Typography>
                    </Grid> */}
                    <Grid item xs={12}>
                      <Typography component="div" style={{textAlign: 'center', color: 'black'}} variant="caption">Sana özel kişisel sayfa</Typography>
                      <Typography component="div" style={{textAlign: 'center', color: 'black'}} variant="caption">Online/yüz yüze randevu takibi</Typography>
                      <Typography component="div" style={{textAlign: 'center', color: 'black'}} variant="caption">Sınırsız danışan kaydı</Typography>
                      <Typography component="div" style={{textAlign: 'center', color: 'black'}} variant="caption">Sınırsız mesajlaşma</Typography>
                      <Typography component="div" style={{textAlign: 'center', color: 'black'}} variant="caption">Sınırsız vücut ölçümü</Typography>
                      {/* <Typography component="div" style={{textAlign: 'center', color: 'black'}} variant="caption">Online ödeme alma</Typography> */}
                      {/* <Typography component="div" style={{textAlign: 'center', color: 'black'}} variant="caption">Otomatik öğün/su hatırlatma</Typography> */}
                    </Grid>
                  </Grid>
                </Grid>
                
                <Grid style={{paddingTop:'8px'}} item xs={12}> 
                  <Grid container spacing={1}>
                    <Grid style={{flexDirection: 'column', justifyContent: 'center', display: 'flex', alignItems: 'center'}} item xs={12}>
                      <div>
                        {/* <Typography component="span" style={{marginRight: '4px', textDecoration: 'line-through', color: 'rgba(0, 0, 0, 0.27)', fontSize: '1rem'}} variant="h6" color="textPrimary">
                          99₺
                        </Typography> */}
                        <Typography component="span" variant="h5" color="textPrimary">
                          0₺
                        </Typography>
                        <Typography component="span" variant="h6" color="textSecondary">
                          /ay
                        </Typography>
                      </div>
                      <Typography component="div" style={{textAlign: 'center', color: 'black'}} variant="caption"><b>*1 Nisan 2020'ye kadar geçerlidir.</b></Typography>
                    </Grid>
                    {/* <Grid style={{justifyContent: 'center', display: 'flex', alignItems: 'center'}} item xs={6}>
                      <Typography component="span" variant="h5" color="textPrimary">
                        199₺
                      </Typography>
                      <Typography component="span" variant="h6" color="textSecondary">
                        /ay
                      </Typography>
                    </Grid> */}
                  </Grid>
                </Grid>
                <Grid item style={{paddingTop: '8px', paddingBottom: '16px'}} xs={12}>
                  <Grid container spacing={1}>
                    {/* <Grid style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}} item xs={6}>
                      <Button style={{borderColor: '#3897f0', color: '#3897f0'}} variant="outlined" component={Link} to="/signup">ŞİMDİ DENE</Button>
                    </Grid> */}
                    <Grid style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}} item xs={12}>
                      <Button style={{color: 'white', backgroundColor: '#3897f0'}} variant="contained" component={Link} to="/signup">ŞİMDİ KAYDOL</Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Divider />
            </div>
            
            <Typography component="div" style={{ textAlign: 'center'}} variant="subtitle1">Diyetisyen değil misin?</Typography>
            <Typography component="div" style={{paddingBottom: '8px', fontWeight: 400, textAlign: 'center'}} color="textSecondary" variant="body2">Bizi kullanan diyetisyenlerimizden hemen şimdi randevu alabilirsin.</Typography>

            {/* <Divider /> */}
            <Grid style={{padding: '8px'}} container spacing={0}>
              {/* <Typography component="div" style={{width: '100%', fontWeight: 300, textAlign: 'center'}} variant="title1">DİYETİSYENLERİMİZ</Typography> */}
              <DiyetisyenList />
            </Grid>
            <Divider />
            <Typography component="div" style={{backgroundColor: '#fafafa', padding: '16px', textAlign: 'center'}} color="textSecondary" variant="body2">Diyet Koçum 2020</Typography>
          </div>
        </main>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(LandingPage);