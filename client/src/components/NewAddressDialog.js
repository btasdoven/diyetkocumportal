
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import React from 'react';
import { connect } from "react-redux";
import MaskedInput from 'react-text-mask';
import { Field } from "redux-form";
import SelectAddressOnMapFromDialog from './SelectAddressOnMapFromDialog';






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

const renderTextField = ({
    input,
    label,
    meta: { touched, error },
    ...custom
  }) => (
    <TextField
      label={label}
      {...input}
      {...custom}
      margin="normal"
      fullWidth
      color="primary"
      error={touched && error != undefined}
      helperText={touched && error ? error : undefined}
      InputLabelProps={{color: 'primary', shrink: true}}
    />
  )

const ReduxFormTextField = ({name, label, ...props}) => (
<Field
    name={name}
    component={renderTextField}
    label={label}
    {...props}
/>)

const createTextField = (key, label, autoFocus) => (
<Field
    InputLabelProps={{shrink: true}}
    key={key}
    name={key}
    id={key}
    component={renderTextField}
    autoFocus={autoFocus}
    label={label}
/>)

function TextMaskCustom(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={ref => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={['+', '9', '0', ' ', /[1-9]/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, ' ', /\d/, /\d/]}
      guide={false}
      showMask={true}
      placeholder={"+90 "}
    />
  );
}

const renderMaskedTextField = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => {
  return (
    <TextField
      label={label}
      {...input}
      {...custom}
      InputLabelProps={{color: 'primary', shrink: true}}
      InputProps={{inputComponent: TextMaskCustom}}
      error={touched && error != undefined}
      helperText={touched && error ? error : undefined}
    />
  )
};

// const ReduxFormMaskedTextField = ({name, label, ...props}) => (
//   <Field
//       name={name}
//       component={renderMaskedTextField}
//       label={label}
//       {...props}
//   />)

export const reduxFormSelect = props => {
    const { input, options } = props;

    // { console.log(input, options)}
  
    return (
      <Select 
        {...input} 
        onChange={value => input.onChange(value)} 
        onBlur={() => input.onBlur(input.value)} 
        value={input.value}
      >
        {options.map((val) => <MenuItem key={val.value} value={val.value}>{val.label}</MenuItem>)}
      </Select>
    )
  }

const createSelect = (key, label, autoFocus, values) => (
    <FormControl
        margin="normal"
        style={{width: '100%'}}>
        <InputLabel shrink={true} id={label+"_label"}>{label}</InputLabel>

        <Field
            name={key}
            options={values}
            autoFocus={autoFocus}
            component={reduxFormSelect}
        />
    </FormControl>)

const required = value => value ? undefined : 'Zorunlu'

const ReduxFormCheckBox = ({name, label, ...props}) => (
  <Field
    name={name}
    label={label}
    component={renderCheckBox}
    {...props}
  />
)

const renderCheckBox = props => {
const { input, label, ...rest } = props;

return (
    <FormControlLabel
      control={<Checkbox 
        {...input} 
        {...rest}
        size="small"
        onChange={value => input.onChange(value)}
        onBlur={() => input.onBlur(input.value)} 
        value={input.value}
        checked={input.value == true}
        color="primary"/> 
      }
      label={label}
    />
)
}

const ApptDays = () => {
  return [
    "Pazartesi",
    "Salı",
    "Çarşamba",
    "Perşembe",
    "Cuma",
    "Cumartesi",
    "Pazar",
  ]
}

class FieldDialog extends React.Component {
 
    constructor(props) {
        super(props)
        // console.log(props)

        this.handleClose = this.handleClose.bind(this);

        this.refMap = React.createRef();

        this.state = {
          ad: props.addressId ? props.addressId : Date.now(),
          latlng: props.latlng,
          shouldDraw: false,
        }
    }

    componentDidMount() {
        if ("geolocation" in navigator && this.state.latlng == undefined) {
          var that = this
          navigator.geolocation.getCurrentPosition(
              function(position) {
                that.setState({shouldDraw: true, latlng: { lat: position.coords.latitude, lng: position.coords.longitude, zoom: 17}})
              },
              function(error) {
                console.error("Error Code = " + error.code + " - " + error.message);
                that.setState({shouldDraw: true})
              }
          );
        } else {
            this.setState({shouldDraw: true})
        }
    }

    handleClose(cancel=false) {
        if (cancel) {
            this.props.handleClose(undefined);
            return;
        }

        var center = this.refMap.current.getCenter();
        var zoom = this.refMap.current.getZoom()
        if (this.props.handleClose != undefined) {
            this.props.handleClose(this.state.ad, { lat: center.lat(), lng: center.lng(), zoom: zoom });
        }        
    }

    render() {
        var ad = this.state.ad;
        var formValid = false;

        if (this.props.apiForm &&
            this.props.apiForm[this.props.form] &&
            this.props.apiForm[this.props.form].values &&
            this.props.apiForm[this.props.form].values.addresses && 
            this.props.apiForm[this.props.form].values.addresses[this.state.ad] && 
            this.props.apiForm[this.props.form].values.addresses[this.state.ad].address != undefined) {
          formValid = true;
        }

        return (
          <Dialog 
              fullWidth
              open={true} 
              onClose={this.handleClose}
          >
              <DialogTitle id="form-dialog-title">Yeni Ofis Ekle</DialogTitle>
              <DialogContent>
                {/* <Typography variant="subtitle1">Ofisinin konumunu seç</Typography> */}
                <Grid container spacing={2}>
                  <Grid style={{alignItems: 'center', justifyContent: 'center'}} item xs={12}>
                    {this.state.shouldDraw && 
                      <SelectAddressOnMapFromDialog 
                        lat={this.state.latlng ? this.state.latlng.lat : undefined}
                        lng={this.state.latlng ? this.state.latlng.lng : undefined}
                        zoom={this.state.latlng ? this.state.latlng.zoom : undefined}
                        ref={this.refMap}
                      />
                    }
                    {this.props.addressId == undefined && (
                      <React.Fragment>
                        <Field validate={[required]} component="input" name={`addresses["${ad}"].latlng.lat`} label="Lat" type="hidden" />
                        <Field validate={[required]} component="input" name={`addresses["${ad}"].latlng.lng`} label="Lng" type="hidden" />
                        <Field validate={[required]} component="input" name={`addresses["${ad}"].latlng.zoom`} label="Zoom" type="hidden" />
                      </React.Fragment>
                    )}
                  </Grid>
                  <Grid style={{paddingTop: '8px', alignItems: 'center', justifyContent: 'center'}} item xs={12}>
                    <ReduxFormTextField required name={`addresses["${ad}"].address`} label="Adres" validate={[required]}/>
                  </Grid>
                  {/* <Grid style={{paddingTop: '8px', alignItems: 'center', justifyContent: 'center'}} item xs={12}>
                    <ReduxFormTextField name={`addresses["${ad}"].city`} label="Şehir" validate={[required]}/>
                  </Grid> */}
                  { ApptDays().map( (h, i) => {
                    return (
                      <Grid style={{paddingTop: '0', paddingBottom: '0', alignItems: 'center', justifyContent: 'center'}} key={i} item xs={12} sm={6} md={4} lg={3}>
                        <ReduxFormCheckBox name={`addresses["${ad}"].days["${h}"]`} label={h}/>
                      </Grid>
                    )}
                  )}
                </Grid>
              </DialogContent>
              <DialogActions>
                  <Button disabled={this.props.submitting} onClick={() => this.handleClose(true)} color="secondary">
                      İPTAL
                  </Button>
                  <Button disabled={!formValid} onClick={() => this.handleClose(false)} color="secondary">
                      OFİS EKLE
                  </Button>
              </DialogActions>
          </Dialog>
        )
    }
}

function mapStateToProps(state, props) {
    return {
      apiForm: state.form,
    }
}

export default connect(
    mapStateToProps,
    null)(withStyles(styles)(FieldDialog));