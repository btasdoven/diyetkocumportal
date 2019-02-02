import React from 'react';
import TextField from '@material-ui/core/TextField';

import { Field } from "redux-form";
import { withStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";
import ReactPhoneInput from 'material-ui-phone-number'

import LinkField from '../../containers/LinkField'

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
        <ReactPhoneInput
            disableAreaCodes={true}
            defaultCountry={'us'}
            label={label}
            {...input}
            {...custom}
        />
)

class AddressFieldWrapperClass extends React.Component {
    render() {
        var key = this.props.fieldId
        return (
            <div key={key + '_wrapper'}>
                <Field
                    key={key + '_street'}
                    className={this.props.classes.newField}
                    name={key + '_street'}
                    id={key + '_street'}
                    component={renderTextField}
                    label="Street Address"
                />
                <Field
                    key={key + '_city'}
                    className={this.props.classes.newField}
                    name={key + '_city'}
                    id={key + '_city'}
                    component={renderTextField}
                    label="City"
                />
                <Field
                    key={key + '_state'}
                    className={this.props.classes.newField}
                    name={key + '_state'}
                    id={key + '_state'}
                    component={renderTextField}
                    label="State"
                />
                <Field
                    key={key + '_pk'}
                    className={this.props.classes.newField}
                    name={key + '_pk'}
                    id={key + '_pk'}
                    component={renderTextField}
                    label="Postal Code"
                />
                <Field
                    key={key + '_country'}
                    className={this.props.classes.newField}
                    name={key + '_country'}
                    id={key + '_country'}
                    component={renderTextField}
                    label="Country"
                />
            </div>
        )
    }
};

export const RetrieveFormValuesForType = (formValues) => {
    var fieldId = formValues['id']
    var type = formValues['type'];
    if (type == 'address') {
        formValues['value'] = 
            formValues[fieldId + '_street'] + ', ' + formValues[fieldId + '_city'] + ', ' +
            formValues[fieldId + '_state'] + ' ' + formValues[fieldId + '_pk'] + ', ' +
            formValues[fieldId + '_country'];
    } else if (type == 'link') {
        formValues['link'] = formValues[fieldId + '_link'];
    }
};

class TelFieldWrapperClass extends React.Component {
    render() {
        var key = this.props.fieldId
        return (
            <div key={key + '_wrapper'}>
                <Field
                    key={key}
                    className={this.props.classes.newField}
                    name="value"
                    id="value"
                    component={renderTelField}
                    label="Phone Number"
                />
            </div>
        )
    }
};

class LinkFieldWrapperClass extends React.Component {
    render() {
        var key = this.props.fieldId
        console.log('linkfieldwrapper')
        console.log(this.props);
        return (
            <LinkField
                fieldId={key}
                label={this.props.label}
                userId={this.props.userId}
            />
        )
    }
};

export const AddressFieldWrapper = withStyles(styles)(AddressFieldWrapperClass)
export const TelFieldWrapper = withStyles(styles)(TelFieldWrapperClass)
export const LinkFieldWrapper = withStyles(styles)(LinkFieldWrapperClass)