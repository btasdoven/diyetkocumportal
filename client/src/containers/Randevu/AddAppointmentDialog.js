import { bindActionCreators } from "redux";
import { getDietitianProfile } from '../../store/reducers/api.dietitianProfile';
import { getDanisanPreviews } from '../../store/reducers/api.danisanPreviews';
import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { DatePickerInput } from '../../components/DateTimePicker'
import Typography from "@material-ui/core/Typography";

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

const ReduxFormMaskedTextField = ({name, label, ...props}) => (
  <Field
      name={name}
      component={renderMaskedTextField}
      label={label}
      {...props}
  />)

const reduxFormSelect = props => {
    const { input, options } = props;

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
            validate={[required]}
        />
    </FormControl>)

const required = value => {
  return value ? undefined : 'Zorunlu'
}


function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

const Asynchronous = (props) => {
  const [open, setOpen] = React.useState(false);
  const options = props.options;
  // const [options, setOptions] = React.useState([]);
  const loading = open && options == undefined;

  // React.useEffect(() => {
  //   let active = true;

  //   if (!loading) {
  //     return undefined;
  //   }

  //   (async () => {
  //     const response = await fetch('https://country.register.gov.uk/records.json?page-size=5000');
  //     await sleep(1e5); // For demo purposes.
  //     const countries = await response.json();

  //     if (active) {
  //       setOptions(Object.keys(countries).map((key) => countries[key].item[0]));
  //     }
  //   })();

  //   return () => {
  //     active = false;
  //   };
  // }, [loading]);

  // React.useEffect(() => {
  //   if (!open) {
  //     setOptions([]);
  //   }
  // }, [open]);

  return (
    <Autocomplete
      id={props.name}
      // style={{ width: 300 }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      getOptionSelected={(option, value) => option.name === value.name}
      getOptionLabel={(option) => option.name}
      options={options}
      loading={loading}
      // blurOnSelect={true}
      autoSelect={true}
      disabled={props.disabled}
      loadingText="Yükleniyor..."
      noOptionsText="Hiç kayıtlı danışanınız bulunamadı. Lütfen Danışanlarım sayfasından yeni danışan ekleyiniz."
      renderInput={(params) => {
        // console.log('input', params, props)

        return (
        <ReduxFormTextField
          fullWidth
          {...params}
          name={props.name}
          label={props.label}
          disabled={props.disabled}
          validate={props.validate}
          required={props.required}
          InputProps={{
            ...params.InputProps,
            ...props.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="primary" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}}
    />
  );
}

class FieldDialog extends React.Component {
 
    constructor(props) {
        super(props)

        this.onSubmitInternal = this.onSubmitInternal.bind(this);

        this.state = {
          userId: props.userId,
        }
    } 

    isLoaded() {
      var loaded = this.props.apiDanisanPreviews != undefined &&
        this.props.apiDanisanPreviews[this.state.userId] != undefined &&
        this.props.apiDanisanPreviews[this.state.userId].isGetLoading != true &&
        this.props.apiDanisanPreviews[this.state.userId].data != undefined;
        
      
      var loaded2 = this.props.apiDietitianProfile != undefined &&
        this.props.apiDietitianProfile[this.state.userId] != undefined &&
        this.props.apiDietitianProfile[this.state.userId].isGetLoading != true &&
        this.props.apiDietitianProfile[this.state.userId].data != undefined;

      return loaded && loaded2;
    }
    
    componentDidMount() {
      if (!this.isLoaded()) {
        this.props.getDanisanPreviews(this.state.userId);
        this.props.getDietitianProfile(this.state.userId);
      }
    }

    onSubmitInternal(formValues) {
        // console.log(formValues);

        var mDate = moment(formValues.appt_date, 'DD.MM.YYYY HH:mm')

        formValues = {
          date: mDate.format('YYYYMMDD'),
          time: `${mDate.format('HH:mm')} - ${mDate.add(30, 'minutes').format('HH:mm')}`,
          address: formValues.address,
          type: formValues.type,
          name: formValues.danisan,
          notes: formValues.notes,
          createdBy: 'dietitian'
        }

        this.props.handleClose(formValues);
    }

    render() {

        if (this.props.reduxForm == undefined) {
            return <span></span>;
        }

        const showLoader = !this.isLoaded();
        const danisans = showLoader ? undefined : this.props.apiDanisanPreviews[this.state.userId].data;
        const addresses = showLoader ? undefined : this.props.apiDietitianProfile[this.state.userId].data.addresses;

        const selectedApptType = this.props.reduxForm.values['type']

        return (
            <Form
                onSubmit={this.props.handleSubmit(this.onSubmitInternal)}
                name={this.props.form}
            >
                <Dialog 
                    open={true} 
                    fullWidth={true}
                    onClose={() => this.props.handleClose(undefined)}
                >
                    <DialogTitle id="form-dialog-title">Yeni Randevu Ekle</DialogTitle>
                    <DialogContent>
                        <ReduxFormTextField 
                          name="appt_date" 
                          label="Randevu Saati" 
                          required
                          InputProps={{ readOnly: true }} 
                          disabled
                          validate={[required]}
                        />

                        <Asynchronous 
                          name="danisan"
                          label="Danışan"
                          required
                          options={danisans == undefined ? undefined : Object.keys(danisans).map(d => {
                            return { name: danisans[d].name, value: d }
                          })}
                          validate={[required]}
                        />

                        {createSelect('type', 'Randevu Tipi', false, 
                          [
                            {
                              label: 'Ofis Ziyareti',
                              value: 'randevu',
                            },
                            {
                              label: 'Online Görüşme',
                              value: 'online_gorusme',
                            },
                          ])
                        }

                        <Asynchronous 
                          name="address"
                          label="Adres"
                          required
                          disabled={selectedApptType != 'randevu'}
                          InputProps={{ readOnly: selectedApptType != 'randevu' }} 
                          options={addresses == undefined ? undefined : Object.keys(addresses).map((ad, idx) => {
                            var address = addresses[ad];
                            return {...address, name: address.address, value: ad}
                          })}
                        />

                        <ReduxFormTextField 
                            name="notes" 
                            label="Notlar"
                        />
{/* 
                        <ReduxFormTextField 
                            name="kilo" 
                            label="Kilosu"
                            type="number" 
                            InputProps={{endAdornment: <InputAdornment position="end"><Typography color="primary" variant="caption">Kg</Typography></InputAdornment>}} 
                        />

                        <ReduxFormTextField 
                            name="boy" 
                            label="Boyu"
                            type="number" 
                            InputProps={{endAdornment: <InputAdornment position="end"><Typography color="primary" variant="caption">Cm</Typography></InputAdornment>}} 
                        /> */}

{/* 
                        <ReduxFormTextField fullWidth name="email" label="E-posta adresi" />

                        <ReduxFormMaskedTextField fullWidth name="tel" label="Telefon numarası" />

                        {/* {createTextField('url', 'Profil Fotoğrafı', false)} */}

                        {/* <Field fullWidth margin="normal" name='start_date' label="Diyet başlangıc tarihi" component={DatePickerInput} />

                        <ReduxFormTextField fullWidth name="ucret_paketi" label="Diyet ücret paketi" /> */}

                    </DialogContent>
                    <DialogActions>
                        <Button disabled={this.props.submitting} onClick={() => this.props.handleClose(undefined)} color="secondary">
                            İPTAL
                        </Button>
                        <Button disabled={this.props.pristine || this.props.invalid || this.props.submitting} onClick={this.props.handleSubmit(this.onSubmitInternal)} color="secondary">
                            YENİ RANDEVU EKLE
                        </Button>
                    </DialogActions>
                </Dialog>
            </Form>
        )
    }
}

const redForm = reduxForm({
    enableReinitialize: true
})(withStyles(styles)(FieldDialog));

function mapStateToProps(state, props) {
    var val = { 
        appt_date: props.startDate,
    };

    return {
      initialValues: val,
      apiDanisanPreviews: state.apiDanisanPreviews,
      apiDietitianProfile: state.apiDietitianProfile,
      reduxForm: state.form[props.form],
    }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getDanisanPreviews: (userId) => getDanisanPreviews(userId),
      getDietitianProfile: (userId) => getDietitianProfile(userId),
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(redForm);