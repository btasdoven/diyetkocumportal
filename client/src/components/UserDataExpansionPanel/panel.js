import React from "react";
import { withStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";

import { Field, reduxForm } from "redux-form";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';

import TextField from '@material-ui/core/TextField';
import Typography from "@material-ui/core/Typography";

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
    }
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
    />
  )


function convertApiToForm(rowsData) {
    var obj = {};

    Object.keys(rowsData).forEach(function(key) {
        obj[key] = rowsData[key].value;
    });

    return obj;
}

function convertFormToApi(rows, obj) {
    Object.keys(obj).forEach(function(key) {
        rows.data[key].value = obj[key];
    });

    return rows
}

class UserDataExpensionPanel extends React.Component  {

    constructor(props) {
        super(props)

        this.onSubmitInternal = this.onSubmitInternal.bind(this);
    }

    onSubmitInternal(formValues) {
        this.props.onSubmit(convertFormToApi(this.props.rows, formValues));
    }

    render() {
        console.log("render")
        const { rows, classes } = this.props;

        return (
                <ExpansionPanel defaultExpanded={this.props.defaultExpanded}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography className={classes.heading}>
                            {this.props.rows && <img src={this.props.rows.headerImg}  className={classes.headerImg}/>}
                            {this.props.rows.header}
                        </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <form onSubmit={this.onSubmitInternal} name={this.props.form} className={classes.table}>
                                {rows && rows.data && 
                                    (<Table className={classes.table}>
                                        <TableBody>{Object.keys(rows.data).map(k => {
                                        return (
                                            <TableRow key={k}>
                                                <TableCell style= {{ borderBottom: 0 }}>
                                                <Field
                                                    className={classes.table}
                                                    name={k}
                                                    id={k}
                                                    value={rows.data[k].value}
                                                    margin="normal"
                                                    component={renderTextField}
                                                    label={rows.data[k].name + " (" + k + ")"}
                                                />
                                                </TableCell>
                                            </TableRow>
                                        )})}</TableBody>
                                        </Table>
                                    )
                                }
                        </form>
                    </ExpansionPanelDetails>        
                    <Divider />
                    <ExpansionPanelActions style={{justifyContent: 'flex-start'}}>
                        <Button type="submit" disabled={this.props.pristine} form={this.props.form} size="small" color="primary" onClick={this.props.handleSubmit(this.onSubmitInternal)}>
                            Save
                        </Button>
                    </ExpansionPanelActions>
                </ExpansionPanel>
        )
    }
}


const redForm = reduxForm({
    // a unique name for the form
    enableReinitialize: true
})(withStyles(styles)(UserDataExpensionPanel));

function mapStateToProps(state, props) {
    var val = (props.rows && props.rows.data) || {}; //state.api.items.length > 0 ? state.api.items : { id: 'basic/name', value: "test" } 
    return {
      initialValues: convertApiToForm(val)
    }
}

export default connect(
    mapStateToProps,
    null)(redForm);