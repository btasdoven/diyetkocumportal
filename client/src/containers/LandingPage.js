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
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing.unit * 6,
  },
});

const cards = [
    {
        'title': 'Full Auditing',
        'subtitle': "We never use your data. Each access is logged and can be viewed.",
    },
    {
        'title': 'Simple and Secure',
        'subtitle': '',
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
          <img src="/static/favicon.png" style={{marginLeft:'8px', marginRight: '8px', height:'32px'}}/>
          <Typography variant="title" color="inherit" noWrap>
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
            <Typography variant="headline" style={{fontFamily: 'Open Sans Light,sans-serif', color:'#eff9ff'}} align="left" gutterBottom>
                A secure way to store and share your information
            </Typography>
            <Typography variant="subheading" align="left" style={{fontFamily: 'Open Sans Light,sans-serif', color:'#eff9ff'}} gutterBottom>
              Monagard helps you store your personal data in a secure and trusted way. <br/>
              Your data is your own. and enables others to access to your data base permission-based.
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
                            <Typography gutterBottom variant="headline" component="h2">
                                {card['title']}
                            </Typography>
                            <Typography>
                                {card['subtitle']}
                            </Typography>
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
        <Typography variant="button" align="center" color="textSecondary" component="p">
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