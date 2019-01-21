import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import InputAdornment from '@material-ui/core/InputAdornment';

import MenuItem from '@material-ui/core/MenuItem';

import { withStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";

import {
    RetrieveFormValuesForType,
    AddressFieldWrapper,
    LinkFieldWrapper,
    TelFieldWrapper 
} from "./fields"

import { Field, reduxForm } from "redux-form";
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
  
const renderTypeField = ({
    input,
    label,
    meta: { touched, error },
    ...custom
  }) => (
    <TextField
        select
        label={label}
        {...input}
        {...custom}
        margin="dense"
    >
        <MenuItem key="text" value="text">
            text
        </MenuItem>
        <MenuItem key="tel" value="tel">
            tel
        </MenuItem>
        <MenuItem key="email" value="email">
            email
        </MenuItem>
        <MenuItem key="address" value="address">
            address
        </MenuItem>
        <MenuItem key="link" value="link">
            link
        </MenuItem>
    </TextField>
)

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

function getFieldWrapper(form) {
    var fieldId = form && form.values['id'];

    if (form && form.values['type'] == 'tel') {
        return (
            <TelFieldWrapper fieldId={fieldId} />
        )
    } else if (form && form.values['type'] == 'address') {
        return (
            <AddressFieldWrapper fieldId={fieldId} />
        )
    } else if (form && form.values['type'] == 'link') {
        return (
            <LinkFieldWrapper fieldId={fieldId} />
        )
    }

    return (
        <Field
            key={fieldId}
            name="value"
            id="value"
            component={renderTextField}
            label="Value"
        />
    )
}

class FieldDialog extends React.Component {
 
    constructor(props) {
        super(props)
        this.onSubmitInternal = this.onSubmitInternal.bind(this);
        this.state = {
        }
    }

    onSubmitInternal(formValues) {
        RetrieveFormValuesForType(formValues)
        formValues['id'] = this.props.groupId + '/' + formValues['fieldId']
        this.props.handleClose(formValues);
    }

    render() {
        const { classes } = this.props;

        return (
            <form
                onSubmit={this.onSubmitInternal}
                name={this.props.form} 
            >
                <Dialog
                    disableEnforceFocus 
                    open={this.props.open}
                    onClose={() => this.props.handleClose(null)}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">{
                        this.props.fieldData == null
                            ? "Add New Field"
                            : "Edit Field"
                    }</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            
                        </DialogContentText>
                            <Field
                                key="fieldId"
                                className={classes.newField}
                                name="fieldId"
                                id="fieldId"
                                component={renderTextField}
                                label="Id"
                                disabled={this.props.fieldData != null}
                                autoFocus={this.props.fieldData == null}
                                InputProps={{
                                    startAdornment: 
                                        <InputAdornment position="start" style={{marginRight:0}}>
                                            {this.props.groupId + "/"}
                                        </InputAdornment>,
                                  }}
                            />
                            <Field
                                key="name"
                                className={classes.newField}
                                name="name"
                                id="name"
                                component={renderTextField}
                                label="Name"
                                autoFocus={this.props.fieldData != null}
                            />
                            <Field
                                key="type"
                                className={classes.newField}
                                name="type"
                                id="type"
                                component={renderTypeField}
                                label="Type"
                                fullWidth
                            />
                        {
                            getFieldWrapper(this.props.reduxForm)
                        }
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.props.handleClose(null)} color="primary">
                            Cancel
                        </Button>
                        <Button disabled={this.props.pristine} type="submit" onClick={this.props.handleSubmit(this.onSubmitInternal)} color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            </form>
        )
    }
}

const redForm = reduxForm({
    enableReinitialize: true
})(withStyles(styles)(FieldDialog));

function mapStateToProps(state, props) {
    var val = (props.fieldData) || { id:'', type: 'text'};
    return {
      initialValues: val,
      reduxForm: state.form[props.form],
    }
}

export default connect(
    mapStateToProps,
    null)(redForm);