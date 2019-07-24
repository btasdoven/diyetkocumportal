import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Review from './Review';

const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing * 2,
    marginRight: theme.spacing * 2,
    [theme.breakpoints.up(600 + theme.spacing * 2 * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  loginButton: {
    marginLeft: 'auto',
    backgroundColor: 'rgb(255, 109, 33)'
  },
  toolbarLayout: {
    width: 'auto',
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    padding: 0,
    [theme.breakpoints.up(1100 + theme.spacing(6))]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing * 2,
    [theme.breakpoints.up(600 + theme.spacing(6))]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: `${theme.spacing(3)}px 0 ${theme.spacing(5)}px`,
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
});

const steps = ['','','','','', '','','','',''];

class Checkout extends React.Component {
  state = {
    activeStep: 0,
    responses: [],
  };

  getStepContent(step) {
    switch (step) {
      case 0:
        return <AddressForm 
          question="Sence andimiz ilkokul ve ortaokulda ders oncesi okutulmali midir?"
          choices={["Okutulmalidir", "Okutulmamalidir"]}
          response={this.state.responses[step]}
          handleResponse={this.handleResponse}
          handleNext={this.handleNext}/>;
      case 1:
        return <AddressForm 
          question="Sence FETO'nun siyasi ayagi ortaya cikartilmali midir?"
          choices={["Cikartirmalidir", "Cikartilmamalidir"]}
          response={this.state.responses[step]}
          handleResponse={this.handleResponse}
          handleNext={this.handleNext}/>;
      case 2:
        return <Review />;
      default:
        throw new Error('Unknown step');
    }
  }

  handleResponse = (response) => {
    this.state.responses[this.state.activeStep] = response;
    this.setState(this.state);
  }

  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1,
    }));
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  render() {
    const { classes } = this.props;
    const { activeStep } = this.state;

    return (
      <React.Fragment>
      <CssBaseline />
      <AppBar position="static" className={classes.appBar}>
        <Toolbar className={classes.toolbarLayout}>
          <a href="/">
            <img src="/static/favicon.png" style={{marginRight: '10px', height:'40px'}}/>
          </a>
          <Typography variant="h6" color="inherit" noWrap>
            Ben Olsam
          </Typography>
        </Toolbar>
      </AppBar>
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <React.Fragment>
              {activeStep === steps.length ? (
                <React.Fragment>
                  <Typography variant="h5" gutterBottom>
                    Thank you for your order.
                  </Typography>
                  <Typography variant="subtitle1">
                    Your order number is #2001539. We have emailed your order confirmation, and will
                    send you an update when your order has shipped.
                  </Typography>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {this.getStepContent(activeStep)}

                    {/* {activeStep !== 0 && (
                      <Button onClick={this.handleBack} className={classes.button}>
                        Back
                      </Button>
                    )} */}
                    
                </React.Fragment>
              )}
            </React.Fragment>
          </Paper>
        </main>
      </React.Fragment>
    );
  }
}

Checkout.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Checkout);