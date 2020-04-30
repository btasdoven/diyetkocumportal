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
    stepWrapper: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
    }
});

class Step1 extends React.Component {
    render() {
        return (
            <div className={this.props.classes.stepWrapper}>
                <Typography color="textPrimary" variant='body1' style={{paddingBottom: '16px'}}>
                    Dijital asistanın ile birkaç adımda profilini tamamlayabilir ve yeni danışanlara kolayca ulaşabilirsin.
                </Typography>
                {/* <Button target="_blank" href="https://wa.me/14252412070">
                    send
                </Button> */}
                <img width="100%" src="/static/info/1.png" />
            </div>
        )
    }
}

class Step1_2 extends React.Component {
    render() {
        return (
            <div className={this.props.classes.stepWrapper}>
                <Typography color="textPrimary" variant='body1' style={{paddingBottom: '16px'}}>
                    Kişisel ve iletişim bilgilerini buradan güncelleyerek danışanların sana daha kolay ulaşmasını sağlayabilirsin.
                </Typography>
                {/* <Button target="_blank" href="https://wa.me/14252412070">
                    send
                </Button> */}
                <img width="100%" src="/static/info/2.png" />
            </div>
        )
    }
}

class Step1_3 extends React.Component {
    render() {
        return (
            <div className={this.props.classes.stepWrapper}>
                <Typography color="textPrimary" variant='body1' style={{paddingBottom: '16px'}}>
                    Ayrıca online diyet yapıp yapmayacagını ve yüz yüze randevu vereceğin zamanlari da buradan seçebilirsin.
                </Typography>
                <img width="100%" src="/static/info/3.png" />
            </div>
        )
    }
}

class Step1_4 extends React.Component {
    render() {
        return (
            <div className={this.props.classes.stepWrapper}>
                <Typography color="textPrimary" variant='body1' style={{paddingBottom: '16px'}}>
                    Kişisel sayfan senin internetteki yeni yüzün. Danışanların buradan seni daha yakından tanıyıp senden randevu talep edecekler.
                </Typography>
                <img width="100%" src="/static/info/1.png" />
            </div>
        )
    }
}

class Step1_5 extends React.Component {
    render() {
        return (
            <div className={this.props.classes.stepWrapper}>
                <Typography color="textPrimary" variant='body1' style={{paddingBottom: '16px'}}>
                    Kişisel sayfanın linkini Instagram profiline koyarak danışanların sana hızlıca ulaşmasını sağlayabilirsin.
                </Typography>
                <img width="100%" src="/static/info/1.png" />
            </div>
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
        const maxSteps = 5;
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
              <DialogTitle id="form-dialog-title">
                {step == 0 && "Diyet Koçum'a hoş geldin"}
                {step == 1 && "Profil bilgilerini tamamla"}
                {step == 2 && "Randevu zamanlarını seç"}
                {step == 3 && "Kişisel sayfanı incele"}
                {step == 4 && "Instagram'da paylaş"}
              </DialogTitle>
              <DialogContent style={{paddingBottom: 0}}>
                {/* <DialogContentText>
                  Neler yapabilirsin?
                </DialogContentText> */}
                <SwipeableViews
                    axis={'x'}
                    index={step}
                    onChangeIndex={(s) => this.setState({activeStep: s})}
                >
                    <Step1 {...this.props} />
                    <Step1_2 {...this.props} />
                    <Step1_3 {...this.props} />
                    <Step1_4 {...this.props} />
                    <Step1_5 {...this.props} />
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
                        <Button 
                            onClick={() => {
                                if (step < maxSteps - 1)
                                    this.setState({ activeStep: step+1})
                                else
                                    this.props.handleClose()
                            }} 
                            size="small" 
                            color="secondary"
                        >
                            {step < maxSteps - 1 && "SONRAKİ"}
                            {step === maxSteps - 1 && "KAPAT"}
                        </Button>
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