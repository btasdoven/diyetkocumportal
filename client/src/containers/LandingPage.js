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
    backgroundColor: 'rgb(38,55,70)'
  },
  icon: {
    marginRight: theme.spacing.unit * 2,
  },
  loginButton: {
    marginLeft: 'auto',
    backgroundColor: 'rgb(255, 109, 33)'
  },
  heroUnit: {
    //backgroundColor: theme.palette.background.paper,
    backgroundColor: 'rgb(38,55,70)'
  },
  heroContent: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
        width: 1100,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
  },
  heroButtons: {
    marginTop: theme.spacing.unit * 4,
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    padding: 0,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  cardGrid: {
    padding: `${theme.spacing.unit * 4}px 0`,
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
    padding: theme.spacing.unit * 6,
  },
});

const footers = [
  {
    title: 'Company',
    description: ['Team', 'History', 'Contact us', 'Locations'],
  },
  {
    title: 'Features',
    description: ['Cool stuff', 'Random feature', 'Team feature', 'Developer stuff', 'Another one'],
  },
  {
    title: 'Resources',
    description: ['Resource', 'Resource name', 'Another resource', 'Final resource'],
  },
  {
    title: 'Legal',
    description: ['Privacy policy', 'Terms of use'],
  },
];

const cards = [
    {
        'title': 'All your data in one basket',
        'subtitle': "Don't get confused with investments. It's easier to control who accesses to your data.",
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
        'subtitle': 'Say goodbye to your day-to-day problems',
        'items':
            <ul>
              <li><Typography>Integrate with a tax-filing application to manage your tax return</Typography></li>
              <li><Typography>Track your home or car insurance automatically</Typography></li>
              <li><Typography>Worried about sharing your phone or e-mail number? Monagard can help.</Typography></li>
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
      <AppBar position="static" className={classes.appBar}>
        <Toolbar className={classes.layout}>
          <img src="/static/favicon.png" style={{marginRight: '10px', height:'40px'}}/>
          <Typography variant="h6" color="inherit" noWrap>
            Monagard
          </Typography>
          <Button className={classes.loginButton} variant="contained" color="primary" href="/signin">
            Login
          </Button>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <div className={classes.heroUnit}>
          <div className={classes.heroContent}>
            <Typography variant="h4" style={{fontFamily: 'Open Sans Light,sans-serif', color:'#eff9ff'}} align="left" gutterBottom>
                A secure way to store and share your personal data
            </Typography>
            <Typography variant="subtitle2" align="left" style={{fontFamily: 'Open Sans Light,sans-serif', color:'#eff9ff'}} gutterBottom>
              Your data is your own. Why allow tens of applications store your data without your explicit permission? <br/>
              With Monagard, you can share the data you want with the applications you choose as long as you like.  
            </Typography>
            <div className={classes.heroButtons}>
                  <Button variant="contained" align="left" color="primary" href="/signup" className={classes.loginButton}>
                    Register for free
                  </Button>
            </div>
          </div>
        </div>
        <div className={classNames(classes.layout, classes.cardGrid)}>
          <Grid key={"grid_"} container spacing={24}>
            {cards.map((card, idx) => (
              <Grid key={"grid_child_" + idx} item md={4} lg={4}>
                <Paper elevation={1}>
                    <Card className={classes.card}>
                        <CardContent className={classes.cardContent}>
                            <Typography gutterBottom variant="h5">
                                {card['title']}
                            </Typography>
                            <Typography>
                                {card['subtitle']}
                            </Typography>
                            <div style={{marginTop: '16px', marginLeft: '16px', display:'flex', alignItems: 'center'}}>
                              {card['items']}
                              <div style={{height:'100%'}}>
                                <SvgIcon style={{fontSize: 96, height: '100%'}}>
                                  {card['icon']}
                                </SvgIcon>
                              </div>
                            </div>
                            
                        </CardContent>
                        {/* <CardActions>
                            <Button size="small" color="primary">
                            View
                            </Button>
                            <Button size="small" color="primary">
                            Edit
                            </Button>
                        </CardActions> */}
                    </Card>
                    {/* <Typography component="h2" variant="headline">
                        {card['title']}
                    </Typography>
                    <Typography variant="subtitle">
                        {card['subtitle']}
                    </Typography> */}
                </Paper>
              </Grid>
            ))}
          </Grid>
        </div>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
       <Grid className={classes.layout} container spacing={32} align="center" justify="space-evenly">
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