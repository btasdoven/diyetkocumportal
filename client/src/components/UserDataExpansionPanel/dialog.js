import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

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
        
        var fieldData = this.props.fieldData != null 
            ? this.props.fieldData
            : { id: '', name: "", value: ''};

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
                        {/* <TextField
                            id="standard-select-currency-native"
                            select
                            label="Type"
                            className={classes.textField}
                            value={this.state.currency}
                            onChange={ (event) => this.setState({currency: event.target.value}) }
                            SelectProps={{
                                native: true,
                                MenuProps: {
                                className: classes.menu,
                                },
                            }}
                            margin="normal"
                        >
                            <option key={1} value={"11"}>
                                111
                            </option>
                            <option key={2} value={"22"}>
                                222
                            </option>
                        </TextField> */}

                        {
                            Object.keys(fieldData).map((key) => {
                                var isReadOnly = this.props.fieldData != null && key == 'id';
                                return (
                                    <Field
                                        key={key}
                                        className={classes.newField}
                                        name={key}
                                        id={key}
                                        component={renderTextField}
                                        label={key}
                                        disabled={isReadOnly}
                                    />
                                )
                            })
                        }
                    </DialogContent>
                    <DialogActions>
                        <Button type="submit" onClick={this.props.handleSubmit(this.onSubmitInternal)} color="primary">
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
    var val = (props.fieldData) || {};
    console.log(val);
    return {
      initialValues: val
    }
}

export default connect(
    mapStateToProps,
    null)(redForm);