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

import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import { withStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";

import { Form, Field, reduxForm } from "redux-form";
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
      error={touched && error}
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

export const reduxFormSelect = props => {
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

class FieldDialog extends React.Component {
 
    constructor(props) {
        super(props)
        console.log(props)

        this.onSubmitInternal = this.onSubmitInternal.bind(this);
        this.state = {
        }
    }

    onSubmitInternal(formValues) {
        //RetrieveFormValuesForType(formValues)
        console.log(formValues);
        formValues.username=formValues.name;
        this.props.handleClose(formValues);
    }

    render() {

        if (this.props.reduxForm == undefined) {
            return <span></span>;
        }

        console.log(this.props.reduxForm);
        return (
            <Form
                onSubmit={this.props.handleSubmit(this.onSubmitInternal)}
                name={this.props.form}
            >
                <Dialog 
                    open={true} 
                    onClose={() => this.props.handleClose(undefined)}
                >
                    <DialogTitle id="form-dialog-title">Yeni Danışan Ekle</DialogTitle>
                    <DialogContent>
                        {/* <DialogContentText>
                            Enter the title of the synthesis you have done and share some more details below:
                        </DialogContentText> */}

                        <ReduxFormTextField 
                            name="name" 
                            label="Adı ve Soyadı" 
                            required
                            validate={[required]}
                        />

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
                        />

                        <Field fullWidth margin="normal" name='birthday' label="Doğum tarihi" component={DatePickerInput} />

                        {createSelect('cinsiyet', 'Cinsiyeti', false, 
                            [
                                {
                                label: 'Kadın',
                                value: 'Kadın',
                                },
                                {
                                label: 'Erkek',
                                value: 'Erkek',
                                },
                                {
                                label: 'Diğer',
                                value: 'Diğer',
                                },
                            ])}
                        {/* {createTextField('url', 'Profil Fotoğrafı', false)} */}
                    </DialogContent>
                    <DialogActions>
                        <Button disabled={this.props.submitting} onClick={() => this.props.handleClose(undefined)} color="secondary">
                            İPTAL
                        </Button>
                        <Button disabled={this.props.submitting} onClick={this.props.handleSubmit(this.onSubmitInternal)} color="secondary">
                            YENİ DANIŞAN EKLE
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
        // departman: 'İnsan Kaynakları',
        // saklama_suresi: "İşten ayrılmasından itibaren 10 yıl"
    };

    return {
      initialValues: val,
      reduxForm: state.form[props.form],
    }
}

export default connect(
    mapStateToProps,
    null)(redForm);