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
import { withStyles } from '@material-ui/core/styles';
import { Buffer, Basket, ThumbUpOutline } from 'mdi-material-ui'
import SvgIcon from '@material-ui/core/SvgIcon';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';

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
    marginRight: theme.spacing(1),
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
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
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
    paddingTop: 'calc(100% - 4px)',
    border: 'solid red',
    borderWidth: '2px',
    //margin: '2px',
    borderRadius: '50%',
    cursor: 'pointer'
  },
  avatar: {
    width: 'calc(100% - 6px)',
    height: '100%',
    top: '3px',
    left: '3px',
  },
  avatarWrapper2: {
    position: 'absolute',
    width: 'calc(100% - 8px)',
    paddingTop: 'calc(100% - 12px)',
    border: 'solid rgba(0,0,0,0.1)',
    borderWidth: '2px',
    //margin: '2px',
    borderRadius: '50%',
    cursor: 'pointer'
  },
  info: {
    marginTop: theme.spacing(2)
  }
});

const footers = [
  {
    title: 'Company',
    description: ['Team', 'History', 'Contact us', 'Locations'],
  },
  {
    title: 'Features',
    description: ['Login with Monagard', 'Encryption at rest', 'One-Time ID', 'Multi-factor Auth'],
  },
  // {
  //   title: 'Resources',
  //   description: ['Resource', 'Resource name', 'Another resource', 'Final resource'],
  // },
  {
    title: 'Legal',
    description: ['Privacy policy', 'Terms of use'],
  },
];

const cards = [
    {
        'title': 'All your data in one basket',
        'subtitle': "Don't get confused with investments. This is the right way to manage your data.",
        'items':
            <ul>
              <li><Typography>Quick and secure way to build your profile</Typography></li>
              <li><Typography><i>Login with Monagard</i> feature to share your data with companies, applications and governments</Typography></li>
              <li><Typography>100+ natively supported applications</Typography></li>
              <li><Typography>Easy to export your data</Typography></li>
            </ul>,
        'icon': <Basket />
    },
    {
        'title': 'Access Control',
        'subtitle': 'Monagard gives all the power to you.',
        'items':
            <ul>
              <li><Typography>Allow applications to only access encrypted version of your data</Typography></li>
              <li><Typography>Get notified whenever an application uses your data</Typography></li>
              <li><Typography>Let applications add more data to your profile</Typography></li>
              <li><Typography>Revoke applications' permission</Typography></li>
              <li><Typography>Enable full auditing on your data</Typography></li>
            </ul>,
        'icon': <Buffer/>
    },
    {
        'title': 'A life-changing solution',
        'subtitle': 'Say goodbye to many of your day-to-day problems.',
        'items':
            <ul>
              <li><Typography>Integrate with a tax-filing application to automatically manage your tax return</Typography></li>
              <li><Typography>Track your home or car insurance</Typography></li>
              <li><Typography>Worried about sharing your phone or e-mail number? Monagard is the answer.</Typography></li>
              <li><Typography>The most secure way for online shopping</Typography></li>
            </ul>,
        'icon': <ThumbUpOutline/>
    },
];

function Album(props) {
  const { classes } = props;

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar elevation={0} position="static" className={classes.appBar}>
        <Toolbar className={classes.layoutToolbar}>
          {/* <img src="/static/favicon.png" style={{marginRight: '10px', height:'40px'}}/> */}
          {/* <Typography variant="h6" color="inherit" noWrap>
            Digital Lab Book
          </Typography> */}
          <Button size="small" className={classes.loginButton2} color="primary" href="/signin">
            GİRİŞ YAP
          </Button>
          <Button size="small" className={classes.loginButton} variant="contained" color="primary" href="/signin">
            KAYDOL
          </Button>
        </Toolbar>
      </AppBar>
      <Divider />
      <main>
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
          <Grid container spacing={2}>
            <Grid item xs={3} sm={3} md={3} lg={3}>
              <div style={{position: 'relative', width: '100%'}}>
                <div className={classes.avatarWrapper}>
                </div>
                <Avatar alt="Remy Sharp" src="/static/favicon.png" className={classes.avatar} />
              </div>
            </Grid>
            <Grid item xs={9} sm={9} md={9} lg={9}>
              <Grid style={{alignContent: 'center', height: '100%'}} container spacing={1}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <Typography style={{fontWeight: 300, color: '#262626'}} gutterBottom variant="h5">
                      Diyet Koçum
                  </Typography>
                </Grid>
                <Grid item xs={4} sm={4} md={4} lg={4}>
                  <Typography style={{fontWeight: 300, color: '#262626'}} gutterBottom variant="body2">
                      <b>144</b> diyetisyen
                  </Typography>
                </Grid>
                <Grid item xs={4} sm={4} md={4} lg={4}>
                  <Typography style={{fontWeight: 300, color: '#262626'}} gutterBottom variant="body2">
                      <b>3489</b> danışan
                  </Typography>
                </Grid>
                <Grid item xs={4} sm={4} md={4} lg={4}>
                  <Typography style={{fontWeight: 300, color: '#262626'}} gutterBottom variant="body2">
                      <b>5542</b> danışan
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid className={classes.info} item xs={12} sm={12} md={12} lg={12}>
              <Typography style={{fontWeight: 300, color: '#262626'}} gutterBottom variant="body1">
                  <b>Diyetisyenlerin Dijital Asistanı</b>
              </Typography>
              <Typography style={{color: '#262626'}} gutterBottom variant="body2">
                  🌏 Online diyete ve 📍 Yüz yüze diyete yardımcı <br />
                  Kolay randevu sistemi <br />
                  Danışanlara otomatik anemnez formu doldurma <br />
                  Diyet geçmişi ve notlara online erişim <br />
                  Diyet listeleri oluşturma ve kaydetme <br />
                  Uygulama üzerinden mesajlaşma <br />
                  Ödeme alma kolaylığı <br />
                  ve daha niceleri...
              </Typography>
            </Grid>
          </Grid>
          <Grid style={{paddingLeft: '18px', paddingRight: '18px'}} container spacing={1}>
            <Grid item xs>
              <div style={{position: 'relative', width: '100%', padding: '4px'}}>
                <div className={classes.avatarWrapper2}>
                </div>
                <Avatar alt="Remy Sharp" src="/static/favicon.png" className={classes.avatar} />
              </div>
              <Typography component="div" style={{marginTop: '8px', textAlign: 'center'}} variant="caption">Diyet Koçum nedir?</Typography>
            </Grid>
            <Grid item xs>
              <div style={{position: 'relative', width: '100%', padding: '4px'}}>
                <div className={classes.avatarWrapper2}>
                </div>
                <Avatar alt="Remy Sharp" src="/static/favicon.png" className={classes.avatar} />
              </div>
              <Typography component="div" style={{marginTop: '8px', textAlign: 'center'}} variant="caption">DK101</Typography>
            </Grid>
            <Grid item xs>
              <div style={{position: 'relative', width: '100%', padding: '4px'}}>
                <div className={classes.avatarWrapper2}>
                </div>
                <Avatar alt="Remy Sharp" src="/static/favicon.png" className={classes.avatar} />
              </div>
              <Typography component="div" style={{marginTop: '8px', textAlign: 'center'}} variant="caption">DK201</Typography>
            </Grid>
            <Grid item xs>
              <div style={{position: 'relative', width: '100%', padding: '4px'}}>
                <div className={classes.avatarWrapper2}>
                </div>
                <Avatar alt="Remy Sharp" src="/static/favicon.png" className={classes.avatar} />
              </div>
              <Typography component="div" style={{marginTop: '8px', textAlign: 'center'}} variant="caption">DK301</Typography>
            </Grid>
          </Grid>
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
      <footer className={classes.footer}>
       <Grid className={classes.layout} container spacing={16} align="center" justify="space-evenly">
          {footers.map(footer => (
            <Grid item xs key={footer.title}>
              <Typography variant="subtitle1" color="textPrimary" gutterBottom>
                {footer.title}
              </Typography>
              {footer.description.map(item => (
                <Typography key={item} variant="body1" color="textSecondary">
                  {item}
                </Typography>
              ))}
            </Grid>
          ))}
        </Grid>
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}

Album.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Album);