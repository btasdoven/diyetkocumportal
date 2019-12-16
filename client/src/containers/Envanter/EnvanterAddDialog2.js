import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

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
    />
  )

const createTextField = (key, label, autoFocus) => (
<Field
    key={key}
    name={key}
    id={key}
    component={renderTextField}
    autoFocus={autoFocus}
    label={label}
/>)

export const reduxFormSelect = props => {
    const { input, options } = props;
  
    return (
      <Select 
        {...input} 
        onChange={value => input.onChange(value)} 
        onBlur={() => input.onBlur(input.value)} 
        options={options}
      />
    )
  }

const createSelect = (key, label, autoFocus, value, values) => (
    <FormControl
        style={{width: '100%'}}>
        <InputLabel id={label+"_label"}>{label}</InputLabel>
        { console.log(value, label, values)}

        <Field
            id={key}
            name={key}
            options={values}
            component={reduxFormSelect
                // () =>
                // <Select
                //     labelId={label+"_label"}
                //     id={key}
                //     autoFocus={autoFocus}
                //     fullWidth
                //     options={values}
                // />
            }
        />
    </FormControl>)

const ReduxFormSelect = props => {
  const { input, options } = props;
  console.log(props);
  return (
    <Select 
      {...input} 
      onChange={value => input.onChange(value)} 
      onBlur={() => input.onBlur(input.value)} 
      value={input.value}
    >
      {options.map((val) => <MenuItem value={val.value}>{val.label}</MenuItem>)}
    </Select>
  )
}

const Form2 = props => {
  const { handleSubmit } = props;
  return (
    <form onSubmit={handleSubmit}>
      <Field name="currentUser" component={ReduxFormSelect} options={userOptions} />
    </form>
  )
}

const userOptions = [
  {
    label: 'Erika',
    value: '4e4cf51f-b406-413a-ae46-2cf06c7aabff',
  },
  {
    label: 'Julia',
    value: 'edad97c7-f2dc-4198-91a9-8f20c7bc67b2',
  },
  {
    label: 'Sarah',
    value: '57d3578a-3583-4290-8bae-596a4da81a8d',
  },
];

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
        this.props.handleClose(formValues);
    }

    render() {

        if (this.props.reduxForm == undefined) {
            return <span></span>;
        }

        console.log(this.props.reduxForm);
        console.log(this.props.reduxForm.values['departman']);
        return (
            // <Form
            //     onSubmit={this.props.handleSubmit(this.onSubmitInternal)}
            //     name={this.props.form}
            // >
                <Dialog 
                    open={true} 
                    onClose={() => this.props.handleClose(undefined)}
                >
                    <DialogTitle id="form-dialog-title">Yeni Veri İşleme Kaydı Ekle</DialogTitle>
                    <DialogContent>
                        {/* <DialogContentText>
                            Enter the title of the synthesis you have done and share some more details below:
                        </DialogContentText> */}

                      <Form2 />

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.handleSubmit(this.onSubmitInternal)} color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            // </Form>
        )
    }
}

const redForm = reduxForm({
    enableReinitialize: true
})(withStyles(styles)(FieldDialog));

function mapStateToProps(state, props) {
    var val = { currentUser: '57d3578a-3583-4290-8bae-596a4da81a8d'
    };

    return {
      initialValues: val,
      reduxForm: state.form[props.form],
    }
}

export default connect(
    mapStateToProps,
    null)(redForm);