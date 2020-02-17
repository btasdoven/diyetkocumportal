import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { DatePickerInput } from '../../components/DateTimePicker'
import Typography from "@material-ui/core/Typography";
import Slide from '@material-ui/core/Slide';

import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import moment from 'moment'

import { withStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";

import { Form, Field, reduxForm } from "redux-form";
import MaskedInput from 'react-text-mask';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import MobileStepper from '@material-ui/core/MobileStepper';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import SwipeableViews from 'react-swipeable-views';


const styles = theme => ({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
      verticalAlign: 'middle',
      alignItems: 'center',
      display: 'inline-flex',
    },
    table: {
      align: 'left',
      width: '100%'
    },
    headerImg: {
        marginRight: theme.typography.pxToRem(5)
    },
    buttonProgress: {
      top: '50%',
      left: '50%',
    },
    rootLoading: {
        height: "inherit",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    gridLoading: {
        padding: "20px",
        display: "grid",
        gridTemplateRows: "85px 1fr 1fr 1fr",
        height: "inherit"
      },
});

class Step1 extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
          activeStep: 0
        }
    }

    render() {
        const step = this.state.activeStep;
        const { classes } = this.props;

        return (
            <div>
                <Typography color="textPrimary" variant='body1'>
                    Profilini tamamla 
                </Typography>
                <img width="100%" src="/static/info/1.png" />
            </div>
        )
    }
}

class Step2 extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
          activeStep: 0
        }
    }

    render() {
        const step = this.state.activeStep;
        const { classes } = this.props;

        return (
            <Stepper style={{padding: 0}} activeStep={step} orientation="vertical">
                <Step>
                    <StepLabel>
                    {
                        "Randevu isteği reddedildi."
                    } 
                    </StepLabel>
                    <StepContent>
                        <div className={classes.actionsContainer}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => console.log('onayla')}
                                className={classes.button}
                            >
                                Onayla
                            </Button>
                        </div>
                    </StepContent>
                </Step>
                <Step>
                    <StepLabel>{step <= 1 ? "Danışanı listeme ekle" : "Danışan listeye eklendi."}</StepLabel>
                    <StepContent>
                        <Typography variant="body2">Danışanınızı listenize ekleyerek danışanınızın bütün bilgilerine dijital ortamdan erişebilir ve gereken değişiklikleri anında yapabilirsiniz.</Typography>
                        <div className={classes.actionsContainer}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => console.log('onayla2')}
                                className={classes.button}
                            >
                                DANIŞANI LİSTEME EKLE
                            </Button>
                        </div>
                    </StepContent>
                </Step>
                <Step>
                    <StepLabel>{step <= 2 ? "Danışana anamnez formu gönder" : "Danışana anamnez formu gönderildi."}</StepLabel>
                    <StepContent>
                        <Typography variant="body2">Anamnez formu sayesinde danışanınız eksiksiz bir diyet programı hazırlamanız için ihtiyacınız olan tüm kişisel, beslenme, sağlık, tahlil ve ölçüm bilgilerini hızlıca doldurabilir, ve siz de bu bilgilere otomatik olarak ulaşabilirsiniz.</Typography>
                        <div className={classes.actionsContainer}>
                            <div>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => console.log('onayla3')}
                                className={classes.button}
                            >
                                FORMU GÖNDER
                            </Button>
                            </div>
                        </div>
                    </StepContent>
                </Step>
            </Stepper>
        )
    }
}

class FieldDialog extends React.Component {
 
    constructor(props) {
        super(props)

        this.state = {
          activeStep: 0
        }
    }

    render() {
        const step = this.state.activeStep;
        const maxSteps = 2;
        const { classes } = this.props;

        return (
          <Dialog 
            fullWidth
            open={this.props.open} 
            onClose={() => this.props.handleClose()}
            // TransitionComponent={props => {
            //   return <Slide direction="up" {...props} />
            // }}
          >
              <DialogTitle id="form-dialog-title">Diyet Koçum'a hoş geldin</DialogTitle>
              <DialogContent>
                {/* <DialogContentText>
                  Neler yapabilirsin?
                </DialogContentText> */}
                <SwipeableViews
                    axis={'x'}
                    index={step}
                    onChangeIndex={(s) => this.setState({activeStep: s})}
                >
                    <Step1 {...this.props} />
                    <Step2 {...this.props} />
                </SwipeableViews>
              </DialogContent>
              <DialogActions>
                <MobileStepper
                    style={{backgroundColor: 'white', width: '100%'}}
                    steps={maxSteps}
                    position="static"
                    variant="dots"
                    activeStep={step}
                    nextButton={
                        <Button onClick={() => this.setState({ activeStep: step+1})} disabled={step === maxSteps - 1} size="small" color="secondary">SONRAKİ</Button>
                    }
                    backButton={
                        <Button onClick={() => this.setState({ activeStep: step-1})} disabled={step === 0} size="small" color="secondary">ÖNCEKİ</Button>
                    }
                />
              </DialogActions>
          </Dialog>
        )
    }
}

export default connect(
    null,
    null)(withStyles(styles)(FieldDialog));