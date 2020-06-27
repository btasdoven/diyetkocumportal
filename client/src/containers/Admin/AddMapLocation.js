import Button from "@material-ui/core/Button";
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from "@material-ui/core/Typography";
import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Field, reduxForm } from "redux-form";
import { putDietitianProfile } from '../../store/reducers/api.dietitianProfile';








const styles = theme => ({
  profile: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    padding: theme.spacing(3),
    //backgroundColor: 'blue',
  },
  form: {
    display: 'flex',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
  button: {
    marginLeft: theme.spacing(1),
    float: 'right'
  },
  avatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  card: {
    marginBottom: theme.spacing(1),
  },
  paper: {
    padding: theme.spacing(1)
  },
  root: {
      // margin: theme.spacing(1),
  },
  rootLoading: {
      height: "inherit",
      display: "flex",
      justifyContent: "center",
      width: '100%',
      alignItems: "center",
      marginTop: theme.spacing(5)
  },
});

function renderLoadingButton(classes) {
  return (
    <div className={classes.rootLoading}>
      <CircularProgress size={24} className={classes.buttonProgress} />
    </div>
  )
} 

const createSelect = (key, label, autoFocus, values) => (
  <FormControl
      style={{width: '100%'}}>
      <InputLabel id={label+"_label"}>{label}</InputLabel>

      <Field
          name={key}
          options={values}
          autoFocus={autoFocus}
          component={reduxFormSelect}
      />
  </FormControl>
)
class FieldFileInput  extends Component {
  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this)
  }

  onChange(e) {
    const { input: { onChange } } = this.props
    onChange(e.target.files[0])
  }

  render() {
    const { input: { value } } = this.props
    const {input,label, required, meta, } = this.props  //whatever props you send to the component from redux-form Field
    return(
      <Button
        variant="outlined"
        component="label"
        color="primary"
        style={{marginBottom: '16px'}}
      >
        DOSYA SEÇ
        <input
          type="file"
          accept=".pdf,.png,.jpg,.jpeg"
          onChange={this.onChange}
          style={{display: 'none'}}
        />
      </Button>
    )
  }
}

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

const createTextField = (key, label, inputProps) => (
  <Field
      key={key}
      name={key}
      id={key}
      component={renderTextField}
      autoFocus={false}
      label={label}
      InputProps={inputProps}
  />)

  const renderTextField = ({
    label,
    input,
    meta: { touched, invalid, error },
    ...custom
  }) => (
    // <InputBase
    //     label={label}
    //     placeholder={label}
    //     error={touched && invalid}
    //     {...input}
    //     {...custom}
    //     fullWidth
    // />
    <TextField
      label={label}
      error={touched && invalid}
      helperText={touched && error}
      {...input}
      {...custom}
      fullWidth
      InputLabelProps={{shrink: true}}
    />
  )
  
class Envanter extends React.Component {
  
  constructor(props) {
    super(props);

    this.isLoaded = this.isLoaded.bind(this);
    this.onDialogClose = this.onDialogClose.bind(this);
    this.onSubmitInternal = this.onSubmitInternal.bind(this);

    this.state = {
      loadingUser: props.userId,
      data: undefined,
    }
  }

  isLoaded() {
    var loaded = this.props.apiDietitianProfile != undefined &&
      this.props.apiDietitianProfile[this.state.loadingUser] != undefined &&
      this.props.apiDietitianProfile[this.state.loadingUser].isGetLoading != true &&
      this.props.apiDietitianProfile[this.state.loadingUser].data != undefined;

      return loaded;
  }

  componentDidMount() {
  }

  onSubmitInternal(formValues) {

    var profile = { address_latlng: { lat: parseFloat(formValues.lat), lng: parseFloat(formValues.lng) }}

    this.props.putDietitianProfile(formValues.userId, profile);

    this.setState({ loadingUser: formValues.userId })
  }

  onDialogClose(values) {
    this.setState({openDialog: undefined})
  }

  render() {
    const { classes } = this.props;

    return (
      <form
        onSubmit={this.props.handleSubmit(this.onSubmitInternal)}
        name={this.props.form}
      >  
        <Field
      style={{padding: '32px'}}
          name="userId"
          label="Diyetisyenin instagram adi"
          component={renderTextField}
         />
         <Field
      style={{padding: '32px'}}
           name="lat"
           label="Enlem (Orn: 41.049835)"
           component={renderTextField}
          />
          <Field
      style={{padding: '32px'}}
            name="lng"
            label="Boylam (Orn: 28.875741)"
            component={renderTextField}
           />
           
          <Button type="submit">SUBMIT</Button>

          {this.state.loadingUser && this.isLoaded() && <Typography>Harita basariyla yuklendi</Typography>}
      </form>  
    )}
};

const mapStateToProps = (state, ownProps) => {
  return {
    apiDietitianProfile: state.apiDietitianProfile,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      putDietitianProfile: (userId, dietitianProfile) => putDietitianProfile(userId, dietitianProfile)
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({ form: 'AddMapLocationForm', enableReinitialize: true })(withStyles(styles)(Envanter)));
