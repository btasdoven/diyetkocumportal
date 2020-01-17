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
import { Buffer, Basket, ThumbUpOutline } from 'mdi-material-ui'
import SvgIcon from '@material-ui/core/SvgIcon';
import { Link } from "react-router-dom";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Divider from '@material-ui/core/Divider';

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
    display: 'flex',
    justifyContent: 'flex-end',
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
    cursor: 'pointer'
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

const sources = [
  '/static/story1.mp4',
  '/static/story2.mp4',
  '/static/story3.mp4',
  '/static/story4.mp4',
  '/static/story5.mp4',
];

const highlights = [
  { name: 'Diyet Koçum nedir?', src: "https://instagram.fyvr2-1.fna.fbcdn.net/v/t51.12442-15/e35/c35.856.942.942a/s150x150/49858499_1237374653094099_951020053474906933_n.jpg?_nc_ht=instagram.fyvr2-1.fna.fbcdn.net&_nc_cat=103&_nc_ohc=Ei2xKWvNp6cAX9wdykB&oh=98e132bdc126c617a1396018e2679ce6&oe=5E22986E" },
  { name: 'İlk danışan kaydı', src: "https://instagram.fcxh3-1.fna.fbcdn.net/v/t51.12442-15/e15/c0.280.720.720a/s150x150/26068425_133505374114645_5456226221186613248_n.jpg?_nc_ht=instagram.fcxh3-1.fna.fbcdn.net&_nc_cat=101&_nc_ohc=Q60fIx3_3KMAX8_C7XH&oh=a7eab52d7a67de6b94a1ae8dfeecc9ec&oe=5E222FAB" },
  { name: 'İlk randevu', src: "https://instagram.fyvr2-1.fna.fbcdn.net/v/t51.2885-15/s150x150/80845780_603499753556425_1161772046735433997_n.jpg?_nc_ht=instagram.fyvr2-1.fna.fbcdn.net&_nc_ohc=vvL_-kUjZAUAX8WTwxo&oh=cf4b63131565dff0a674f04d2a80ce6d&oe=5EA1029B" },
  { name: 'Soru & Cevap', src: "https://instagram.fcxh3-1.fna.fbcdn.net/v/t51.12442-15/e35/c58.245.1005.1005a/s150x150/31571523_2035958099977680_6231814499284811776_n.jpg?_nc_ht=instagram.fcxh3-1.fna.fbcdn.net&_nc_cat=100&_nc_ohc=Yl9n3T04C7gAX9VsQKW&oh=c1983f8c1786329727ac9a253caf2978&oe=5E223F4E" },
]
class LandingPage extends React.Component {

  constructor(props) {
    super(props)

    this.videoRef = React.createRef();

    this.state = {
      activeStory: 0,
      duration: 12,
      openDialog: false,
      width: 0,
    }
  }

  render() {
    const { classes } = this.props;

    console.log(this.state)
    console.log(this.videoRef)

    return (
      <React.Fragment >
        <CssBaseline />
        <AppBar elevation={0} position="static" className={classes.appBar}>
          <Toolbar variant="dense" className={classes.layoutToolbar}>
            {/* <img src="/static/favicon.png" style={{marginRight: '10px', height:'40px'}}/> */}
            {/* <Typography variant="h6" color="inherit" noWrap>
              Digital Lab Book
            </Typography> */}
            <Button size="small" className={classes.loginButton} variant="contained" color="primary" component={Link} to="/signin">
              GİRİŞ YAP
            </Button>
            {/* <Button size="small" className={classes.loginButton} variant="contained" color="primary" component={Link} to="/signin">
              KAYDOL
            </Button> */}
          </Toolbar>
        </AppBar>
        <Divider />
        <main>
          <Dialog
            PaperProps={{style: {
              width: '100%',
              height: '100%',
              maxWidth: '100%',
              maxHeight: '100%',
              margin: 0,
              padding: 0,
              backgroundColor: '#262626',
              borderRadius: 0,
            }}}
            fullWidth={true}
            open={this.state.openDialog}
          >
            <div style={{zIndex: 9999, position: 'absolute', width: '100%', display: 'flex', padding: '12px 6px'}}>
              {sources.map((src, idx) => {
                return (
                  <div key={idx} style={{flexGrow: 1, height: '2px', marginRight: '2px', background: 'rgba(255, 255, 255, 0.35)'}}>
                    {idx == this.state.activeStory &&
                      (<div style={{transition: `width ${this.state.duration}s linear`, width: this.state.width, height: '100%', backgroundColor: 'white'}}></div>)
                    }
                    {idx < this.state.activeStory &&
                      (<div style={{transition: `width 0s linear`, width: '100%', height: '100%', backgroundColor: 'white'}}></div>)
                    }
                  </div>
                )
              })}
            </div>
            <DialogContent style={{height: '100%', borderRadius: 0, color: 'white', padding:0, margin: 0}}>
              <Grid style={{height: '100%'}} container spacing={2}>
                <Grid 
                  style={{display: 'flex', zIndex: 9998}} item xs={4}
                  onClick={() => {
                    this.state.activeStory > 0 && this.setState({width: 0, duration: 0, activeStory: this.state.activeStory - 1})
                  }}
                >
                  {this.state.activeStory > 0 &&
                    <IconButton 
                      disableRipple
                      style={{color: 'rgba(255, 255, 255, 1)'}}
                      >
                        <ChevronLeftIcon />
                    </IconButton>
                  }
                </Grid>
                <Grid 
                  item xs={8}
                  style={{display: 'flex', height: '100%', justifyContent: 'flex-end', zIndex: 9998}} 
                  onClick={() => {
                    if (this.state.activeStory + 1 == sources.length) {
                      this.setState({width: 0, duration: 0, activeStory: 0, openDialog: false})
                    } else {
                      this.setState({width: 0, duration: 0, activeStory: this.state.activeStory + 1})
                    }
                  }}
                >
                  <IconButton 
                    disableRipple
                    style={{color: 'rgba(255, 255, 255, 1)'}}>
                      <ChevronRightIcon />
                  </IconButton>
                </Grid>
              </Grid>
              
              <IconButton 
                style={{position: 'absolute', zIndex: 9999, top: '14px', right: 0, color: 'rgba(255, 255, 255, 1)'}} 
                onClick={() => this.setState({width: 0, duration: 0, openDialog: false})}>
                  <CloseIcon />
              </IconButton>
              <video 
                muted
                playsInline
                autoPlay
                //controls={true}
                type='video/mp4'
                ref={this.videoRef}
                //poster="/static/favicon.png"
                onPlay={() => this.state.openDialog && this.setState({width: '100%', duration: this.videoRef.current.duration})}
                onEnded={() => {
                  if (this.state.activeStory + 1 == sources.length) {
                    this.setState({width: 0, duration: 0, activeStory: 0, openDialog: false})
                  } else {
                    this.setState({width: 0, duration: 0, activeStory: this.state.activeStory + 1})
                  }
                }}
                src={sources[this.state.activeStory]}
                preload="auto" 
                style={{position: 'absolute', top: 0, width: '100%', height: '100%'}}>
                  {sources.map((s, idx) => {
                    <source key={idx} src={s} type="video/mp4"/>
                  })}                  
              </video>
{/* 
              <video 
                muted
                playsInline
                loop
                autoPlay
                controls={true}
                type='video/mp4'
                ref={this.videoRef}
                //poster="/static/favicon.png"
                onPlay={() => this.state.openDialog && this.setState({width: '100%', duration: this.videoRef.current.duration})}
                onEnded={() => {
                  if (this.state.activeStory + 1 == sources.length) {
                    this.setState({width: 0, duration: 0, activeStory: 0, openDialog: false})
                  } else {
                    this.setState({width: 0, duration: 0, activeStory: this.state.activeStory + 1})
                  }
                }}
                src={sources[this.state.activeStory]}
                preload="auto" 
                style={{borderRadius: '12px', position: 'absolute', top: 0, width: '100%', height: '100%'}}>
                  {sources.map((s, idx) => {
                    <source key={idx} src={s} type="video/mp4"/>
                  })}                  
              </video> */}
            </DialogContent>
          </Dialog>
          {/* Hero unit */}
          {/* <div className={classes.heroUnit}>
            <div className={classes.heroContent}>
              <Typography variant="h4" style={{fontFamily: 'Open Sans Light,sans-serif', color:'#eff9ff'}} align="left" gutterBottom>
                  A secure way to track your research
              </Typography>
              <Typography align="left" style={{fontFamily: 'Open Sans Light,sans-serif', color:'#eff9ff'}} gutterBottom>
                Your data is your own. Why allow tens of applications store your data in their untrusted environment without your explicit permission? <br/>
                With Monagard, you can store your data and securely share with the applications you choose as long as you like.  
              </Typography>
              <div className={classes.heroButtons}>
                    <Button variant="contained" align="left" color="primary" href="/signup" className={classes.loginButton}>
                      Register for free
                    </Button>
              </div>
            </div>
          </div> */}
          <div className={classNames(classes.layout, classes.cardGrid)}>
            <Grid container spacing={0} >
              <Grid style={{paddingLeft: '5%'}} item xs={3} sm={3} md={3} lg={3}>
                <div style={{position: 'relative', width: '100%'}}>
                  <div className={classes.avatarWrapper}>
                  </div>
                  <Avatar onClick={() => this.setState({openDialog: true})} alt="Remy Sharp" src="/static/favicon.png" className={classes.avatar} />
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
                        <b>144</b><br/> diyetisyen
                    </Typography>
                  </Grid>
                  <Grid item xs={4} sm={4} md={4} lg={4}>
                    <Typography style={{fontWeight: 300, color: '#262626'}} gutterBottom variant="body2">
                        <b>3489</b><br/> danışan
                    </Typography>
                  </Grid>
                  <Grid item xs={4} sm={4} md={4} lg={4}>
                    <Typography style={{fontWeight: 300, color: '#262626'}} gutterBottom variant="body2">
                        <b>11472</b><br/> görüşme
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
                    🥑 Danışanlara otomatik anemnez formu doldurma <br />
                    🍋 Diyet geçmişi ve notlara online erişim <br />
                    🍍 Diyet listeleri oluşturma ve kaydetme <br />
                    💌 Uygulama üzerinden mesajlaşma <br />
                    🍏 Ödeme alma kolaylığı <br />
                </Typography>
              </Grid>
              <Grid className={classes.info} style={{paddingTop: '8px', paddingLeft: '16px', paddingRight: '16px'}} item xs={12} sm={12} md={12} lg={12}>
                <Typography style={{letterSpacing: 0, color: '#999'}} gutterBottom variant="caption">
                    <b style={{color: '#262626'}}>diyetisyendoyranli</b>, <b style={{color: '#262626'}}>dyt_ezelkavadar</b>, <b style={{color: '#262626'}}>aysuutasdovenn</b> ve digerleri tarafından kullanılıyor
                </Typography>
              </Grid>
            </Grid>
            <Grid style={{paddingTop: '8px', paddingLeft: '16px', paddingRight: '16px'}} container spacing={0}>
              {highlights.map((highlight, idx) => 
                <Grid key={idx} item xs>
                  <div style={{position: 'relative', width: '80%', margin: '10%'}}>
                    <div className={classes.avatarWrapper2}>
                    </div>
                    <Avatar imgProps={{style: { borderRadius: '50%' }}} onClick={() => this.setState({openDialog: true})} alt="Remy Sharp" src={highlight.src} className={classes.avatar2} />
                  </div>
                  <Typography component="div" style={{marginTop: '8px', textAlign: 'center'}} variant="caption">{highlight.name}</Typography>
                </Grid>
              )}
            </Grid>

            <div style={{marginTop: '24px', backgroundColor: 'white'}} >
              <Divider />
              <Grid container style={{paddingLeft: '16px', paddingRight: '16px'}} spacing={0}>
                <Grid style={{paddingTop: '16px', display: 'flex', justifyContent: 'center'}} item xs={12} lg={12}>
                  <Grid container spacing={1}>
                    <Grid item xs={6}>
                      <Typography component="div" style={{fontWeight: 300, textAlign: 'center'}} variant="h6">PRO</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography component="div" style={{fontWeight: 300, textAlign: 'center'}} variant="h6">PREMIUM</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={1}>
                    <Grid item xs={6}>
                      <Typography component="div" style={{textAlign: 'center'}} variant="caption">5 danışana kadar kayıt</Typography>
                      <Typography component="div" style={{textAlign: 'center'}} variant="caption">Haftalık randevu takibi</Typography>
                      <Typography component="div" style={{textAlign: 'center'}} variant="caption">Kısıtlı mesajlaşma</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography component="div" style={{textAlign: 'center', color: 'black'}} variant="caption">Sınırsız danışan kaydı</Typography>
                      <Typography component="div" style={{textAlign: 'center', color: 'black'}} variant="caption">Sınırsız randevu takibi</Typography>
                      <Typography component="div" style={{textAlign: 'center', color: 'black'}} variant="caption">Sınırsız mesajlaşma</Typography>
                      <Typography component="div" style={{textAlign: 'center', color: 'black'}} variant="caption">Online ödeme alma</Typography>
                      <Typography component="div" style={{textAlign: 'center', color: 'black'}} variant="caption">İlk ay ücretsiz</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}> 
                  <Grid container spacing={1}>
                    <Grid style={{justifyContent: 'center', display: 'flex', alignItems: 'center'}} item xs={6}>
                      <Typography component="span" style={{textDecoration: 'line-through', color: 'rgba(0, 0, 0, 0.27)', fontSize: '1rem'}} variant="h6" color="textPrimary">
                        99₺
                      </Typography><Typography component="span" variant="h5" color="textPrimary">
                        0₺
                      </Typography>
                      <Typography component="span" variant="h6" color="textSecondary">
                        /ay
                      </Typography>
                      {/* <Typography component="div" style={{fontWeight: 300, textAlign: 'center'}} variant="h6">99₺</Typography> */}
                    </Grid>
                    <Grid style={{justifyContent: 'center', display: 'flex', alignItems: 'center'}} item xs={6}>
                      <Typography component="span" variant="h5" color="textPrimary">
                        199₺
                      </Typography>
                      <Typography component="span" variant="h6" color="textSecondary">
                        /ay
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item style={{paddingBottom: '16px'}} xs={12}>
                  <Grid container spacing={1}>
                    <Grid style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}} item xs={6}>
                      <Button style={{borderColor: '#3897f0', color: '#3897f0'}} size="small" variant="outlined" component={Link} to="/signup">ÜCRETSİZ KAYDOL</Button>
                    </Grid>
                    <Grid style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}} item xs={6}>
                      <Button style={{color: 'white', backgroundColor: '#3897f0'}} size="small" variant="contained" component={Link} to="/signup">ŞİMDİ DENE</Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Divider />
            </div>
          </div>
          {/* <div className={classNames(classes.layout, classes.cardGrid)}>
            <Grid key={"gridlar_"} container spacing={24}>
                <Grid key={"grid_childlar"} item md={12} lg={12}>
                  <Paper elevation={1}>
                      <Card className={classes.card}>
                          <CardContent className={classes.cardContent}>
                              <Typography gutterBottom variant="h5">
                                Mikimmil bir baslik
                              </Typography>
                              <div style={{marginTop: '16px', marginLeft: '16px', display:'flex', alignItems: 'center'}}>
                              <ul>
                <li><Typography>Integrate with a tax-filing application to manage your tax return</Typography></li>
                <li><Typography>Track your home or car insurance automatically</Typography></li>
                <li><Typography>Worried about sharing your phone or e-mail number? Monagard can help.</Typography></li>
                <li><Typography>The most secure way for online shopping</Typography></li>
              </ul>
                                  <img src='static/icbc.png'/>
                              </div>
                          </CardContent>
                      </Card>
                  </Paper>
                </Grid>
            </Grid>
          </div> */}
        </main>
        {/* Footer */}
        {/* <footer className={classes.footer}>
        <Grid className={classes.layout} container spacing={1} align="center" justify="space-evenly">
            {footers.map(footer => (
              <Grid item xs={4} key={footer.title}>
                <Typography style={{color: '#262626'}} variant="subtitle2" gutterBottom>
                  {footer.title}
                </Typography>
                {footer.description.map(item => (
                  <Typography key={item} style={{fontWeight: 300, color: '#262626'}} variant="body2">
                    {item}
                  </Typography>
                ))}
              </Grid>
            ))}
          </Grid>
        </footer> */}
        {/* End footer */}
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(LandingPage);