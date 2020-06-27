import Button from "@material-ui/core/Button";
import CircularProgress from '@material-ui/core/CircularProgress';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from "@material-ui/core/Typography";
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Field, reduxForm } from "redux-form";
import { getDanisanProfile, putDanisanProfile } from '../../store/reducers/api.danisanProfile';







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
      margin: theme.spacing(1),
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
  
const reduxFormSelect = props => {
  const { input, options } = props;

  { console.log(input, options)}

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
    this.onSubmitInternal = this.onSubmitInternal.bind(this);

    this.state = {
      userId: JSON.parse(localStorage.getItem('user')).id
    }
  }

  isLoaded() {
    console.log(this.props);
    console.log(this.state.userId);

    var loaded = this.props.apiDanisanProfile != undefined &&
      this.props.apiDanisanProfile[this.state.userId] != undefined &&
      this.props.apiDanisanProfile[this.state.userId][this.props.danisanUserName] != undefined && 
      this.props.apiDanisanProfile[this.state.userId][this.props.danisanUserName].isGetLoading != true &&
      this.props.apiDanisanProfile[this.state.userId][this.props.danisanUserName].data != undefined;

      console.log(loaded);
      return loaded;
  }

  componentDidMount() {
    if (!this.isLoaded()) {
      //this.props.getDanisanProfile(this.state.userId, this.props.danisanUserName);
    }
  }

  onSubmitInternal(formValues) {
      console.log(formValues);
      this.props.putDanisanProfile(this.state.userId, this.props.danisanUserName, formValues);
  }

  render() {
    console.log(this.props);
    const { classes } = this.props;

    const showLoader = false

    return (
      <div className={classes.root}>     
        <Button style={{marginRight: '8px'}} variant="outlined" size="small" disabled={true} color="primary" startIcon={<NoteAddIcon />}>
          ÖDEME EKLE
        </Button>
        <Divider style={{marginTop: '8px', marginBottom: '8px'}} />

        { showLoader && renderLoadingButton(classes) }
        { !showLoader && 
          <span>
            <Typography variant="body2" style={{textAlign: 'center'}}>Bu danışana ait ödeme bilgisi bulunmamaktadır.</Typography>
          </span>
        }
      </div>
    )}
};

const mapStateToProps = (state, ownProps) => {
  console.log('mapstatetoprops')
  console.log(ownProps);
  console.log(state);

  return {
    apiDanisanProfile: state.apiDanisanProfile,
    initialValues: 
      state.apiDanisanProfile[ownProps.userId] != undefined && 
      state.apiDanisanProfile[ownProps.userId][ownProps.danisanUserName] != undefined
        ? state.apiDanisanProfile[ownProps.userId][ownProps.danisanUserName].data
        : {},
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getDanisanProfile: (userId, danisanUserName) => getDanisanProfile(userId, danisanUserName),
      putDanisanProfile: (userId, danisanUserName, danisanProfile) => putDanisanProfile(userId, danisanUserName, danisanProfile)
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({ form: 'DanisanFinansForm', enableReinitialize: true })(withStyles(styles)(Envanter)));
