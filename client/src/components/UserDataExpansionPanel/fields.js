import React from 'react';
import TextField from '@material-ui/core/TextField';

import { Field } from "redux-form";
import { withStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";
import ReactPhoneInput from 'material-ui-phone-number'

const styles = theme => ({
    newField: {

    }
});

const renderTextField = ({
    input,
    label,
    meta: { touched, error },
    ...custom
  }) => (
    <TextField
      multiline
      label={label}
      {...input}
      {...custom}
      margin="dense"
      fullWidth
    />
)

const renderTelField = ({
    input,
    label,
    meta: { touched, error },
    ...custom
  }) => (
    <div>
        <ReactPhoneInput
            disableAreaCodes={true}
            defaultCountry={'us'}
            label={label}
            {...input}
            {...custom}
        />
    </div>
)

const AddressFieldWrapper = withStyles(styles)(props =>
    <div key={props.key}>
        <Field
            key={props.key + '_'}
            className={props.classes.newField}
            name={props.key}
            id={props.key}
            component={renderTextField}
            label={props.key}
        />
    </div>
)

class TelFieldWrapperClass extends React.Component {
    render() {
        var key = this.props.keykey
        console.log(this.props);
        return (
            <div key={key + '_wrapper'}>
                <Field
                    key={key + '_field'}
                    className={this.props.classes.newField}
                    name={key}
                    id={key}
                    component={renderTelField}
                    label="Country Code"
                />
            </div>
        )
    }

};

export const TelFieldWrapper = withStyles(styles)(TelFieldWrapperClass)