import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import MenuItem from '@material-ui/core/MenuItem';

import { withStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";

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

class FieldDialog extends React.Component {
 
    constructor(props) {
        super(props)

        this.onSubmitInternal = this.onSubmitInternal.bind(this);
        this.state = {
        }
    }

    onSubmitInternal(formValues) {
        this.props.handleClose(formValues);
    }

    render() {
        const { classes } = this.props;
        
        console.log(this.props);

        var fieldData = this.props.fieldData != null 
            ? this.props.fieldData
            : { id: '', name: "", value: 'text'};

        return (
            <form
                onSubmit={this.onSubmitInternal}
                name={this.props.form} 
            >
                <Dialog
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
                                key="id"
                                className={classes.newField}
                                name="id"
                                id="id"
                                component={renderTextField}
                                label="id"
                                disabled={this.props.fieldData != null}
                            />
                            <Field
                                key="name"
                                className={classes.newField}
                                name="name"
                                id="name"
                                component={renderTextField}
                                label="name"
                            />
                            <Field
                                key="type"
                                className={classes.newField}
                                name="type"
                                id="type"
                                component={renderTypeField}
                                label="type"
                            />
                        {
                            Object.keys(fieldData).map((key) => {
                                if (key == 'type' || key == 'id' || key == 'name') {
                                    return;
                                }
                                
                                if (this.props.reduxForm && this.props.reduxForm.values['type'] == 'address') {
                                    return (
                                        <div key={key}>
                                            <Field
                                                key={key + '_'}
                                                className={classes.newField}
                                                name={key}
                                                id={key}
                                                component={renderTextField}
                                                label={key}
                                            />
                                        </div>
                                    )
                                }

                                return (
                                    <Field
                                        key={key}
                                        className={classes.newField}
                                        name={key}
                                        id={key}
                                        component={renderTextField}
                                        label={key}
                                    />
                                )
                            })
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
    var val = (props.fieldData) || { type: 'text'};
    console.log(val);
    console.log(state.form[props.form]);
    return {
      initialValues: val,
      reduxForm: state.form[props.form]
    }
}

export default connect(
    mapStateToProps,
    null)(redForm);