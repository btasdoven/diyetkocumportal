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
        return (
            <Form
                onSubmit={this.props.handleSubmit(this.onSubmitInternal)}
                name={this.props.form}
            >
                <Dialog 
                    open={true} 
                    onClose={() => this.props.handleClose(undefined)}
                >
                    <DialogTitle id="form-dialog-title">Add new synthesis</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Enter the title of the synthesis you have done and share some more details below:
                        </DialogContentText>
                        <Field
                            key='type'
                            name="type"
                            id="type"
                            component={renderTextField}
                            autoFocus={true}
                            label="Title"
                        />
                        <Field
                            key='description'
                            name="description"
                            id="description"
                            component={renderTextField}
                            label="Description"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.handleSubmit(this.onSubmitInternal)} color="primary">
                            Save
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
    var val = props.fieldData != undefined
      ? { title: props.fieldData} 
      : { title: ''};

    return {
      initialValues: val,
      reduxForm: state.form[props.form],
    }
}

export default connect(
    mapStateToProps,
    null)(redForm);