import CircularProgress from '@material-ui/core/CircularProgress';
import FormControl from '@material-ui/core/FormControl';
import InputBase from '@material-ui/core/InputBase';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { withStyles } from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/Save';
import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Field, Form, reduxForm } from "redux-form";
import { getDanisanNotes, putDanisanNotes } from '../../store/reducers/api.danisanNotes';
import SpeedDial from '../SpeedDial/SpeedDial';








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

  const renderTextField = ({
    label,
    input,
    meta: { touched, invalid, error },
    ...custom
  }) => (
    <InputBase
        label={label}
        placeholder={label}
        error={touched && invalid}
        {...input}
        {...custom}
        fullWidth
        multiline
        placeholder={label}
        rows={20}
        //InputLabelProps={{shrink: true}}
    />
    
    // <InputBase multiline rows={25} fullWidth placeholder="Danışan ile ilgili notlar..." />

    // <TextField
    //   label={label}
    //   error={touched && invalid}
    //   helperText={touched && error}
    //   {...input}
    //   {...custom}
    //   fullWidth
    //   InputLabelProps={{shrink: true}}
    // />
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
    var loaded = this.props.apiDanisanNotes != undefined &&
      this.props.apiDanisanNotes[this.state.userId] != undefined &&
      this.props.apiDanisanNotes[this.state.userId][this.props.danisanUserName] != undefined && 
      this.props.apiDanisanNotes[this.state.userId][this.props.danisanUserName].isGetLoading != true &&
      this.props.apiDanisanNotes[this.state.userId][this.props.danisanUserName].data != undefined;

      return loaded;
  }

  componentDidMount() {
    if (!this.isLoaded()) {
      this.props.getDanisanNotes(this.state.userId, this.props.danisanUserName);
    }
  }

  onSubmitInternal(formValues) {
      console.log(formValues);
      this.props.putDanisanNotes(this.state.userId, this.props.danisanUserName, formValues);
  }

  render() {
    const { classes } = this.props;
    
    const showLoader = !this.isLoaded();

    return (
      <div className={classes.root}>
        {/* <Button style={{marginRight: '8px'}} variant="outlined" size="small" disabled={this.props.pristine} color="primary" onClick={this.props.handleSubmit(this.onSubmitInternal)} startIcon={<SaveIcon />}>
          KAYDET
        </Button>
        <Divider style={{marginTop: '8px'}} /> */}

        { showLoader && renderLoadingButton(classes) }
        { !showLoader && 
          <span>
            <SpeedDial
                icon={<SaveIcon />}
                iconText={"KAYDET"}
                eventText={"DanisanNotlarKaydet"}
                hidden={this.props.pristine}
                onClickFab={this.props.handleSubmit(this.onSubmitInternal)}
                // actions={[
                //   {name: 'hey', icon: <MoreVertIcon />, onClick: () => console.log('click')},
                //   {name: 'hey', icon: <MoreVertIcon />, onClick: () => console.log('click')}
                // ]}
              />

            <Form
                onSubmit={this.props.handleSubmit(this.onSubmitInternal)}
                name={this.props.form}
                style={{marginTop: '8px'}}
            >
              <Field
                name="notes"
                component={renderTextField}
                label="Danışan ile ilgili notlar..."
              />
            </Form>
          </span>
        }
      </div>
    )}
};

const mapStateToProps = (state, ownProps) => {
  return {
    apiDanisanNotes: state.apiDanisanNotes,
    initialValues: 
        state.apiDanisanNotes[ownProps.userId] != undefined && 
        state.apiDanisanNotes[ownProps.userId][ownProps.danisanUserName] != undefined &&
        state.apiDanisanNotes[ownProps.userId][ownProps.danisanUserName].data != undefined &&
        state.apiDanisanNotes[ownProps.userId][ownProps.danisanUserName].data.notes != undefined
        ? state.apiDanisanNotes[ownProps.userId][ownProps.danisanUserName].data
        : { notes: '' }
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getDanisanNotes: (userId, danisanUserName) => getDanisanNotes(userId, danisanUserName),
      putDanisanNotes: (userId, danisanUserName, danisanNotes) => putDanisanNotes(userId, danisanUserName, danisanNotes)
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({ form: 'DanisanNotesForm', enableReinitialize: true })(withStyles(styles)(Envanter)));
