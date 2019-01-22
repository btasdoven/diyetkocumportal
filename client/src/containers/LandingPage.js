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
import { Buffer } from 'mdi-material-ui'
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
    padding: `${theme.spacing.unit * 8}px 0`,
  },
  card: {
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

const cards = [
    {
        'title': 'All your data in one basket',
        'subtitle': "Don't get confused with investments. It's easier to manage who accesses to which data of yours.",
    },
    {
        'title': 'Access Control',
        'subtitle': 'Monagard gives all the power to you.',
        'items':
          <ul>
            <li>Application only accesses the hashed version of your data</li>
            <li>Monitor when applications access to your data.</li>
            <li>Be asked or notified whenever an application accesses your data.</li>
            <li>Revoke applications' access forever</li>
            <li>Let applications add data to your profile.</li>
          </ul>,
    },
    {
        'title': 'ACL-based permissions',
        'subtitle': '',
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
              Your data is your own. Why let others keep your private data and use it without your explicit permission? <br/>
              Monagard helps you only share the information you want with the applications you choose as long as you like.  
            </Typography>
            <div className={classes.heroButtons}>
                  <Button variant="contained" align="left" color="primary" className={classes.loginButton}>
                    Register for free
                  </Button>
            </div>
          </div>
        </div>
        <div className={classNames(classes.layout, classes.cardGrid)}>
          <Grid key={"grid_"} container spacing={40}>
            {cards.map((card, idx) => (
              <Grid key={"grid_child_" + idx} item sm={6} md={4} lg={4}>
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
                              <p>
                                <ul>
                                  <li><Typography>Application only accesses the hashed version of your data</Typography></li>
                                  <li><Typography>Monitor when applications access to your data.</Typography></li>
                                  <li><Typography>Be asked or notified whenever an application accesses your data.</Typography></li>
                                  <li><Typography>Revoke applications' access forever</Typography></li>
                                  <li><Typography>Let applications add data to your profile.</Typography></li>
                                </ul>
                              </p>
                              <div style={{height:'100%'}}>
                                <SvgIcon style={{fontSize: 96, height: '100%'}}>
                                  <Buffer/>
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
        <Typography variant="body1" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography variant="button" align="center" color="textSecondary">
          Something here to give the footer a purpose!
        </Typography>
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}

Album.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Album);