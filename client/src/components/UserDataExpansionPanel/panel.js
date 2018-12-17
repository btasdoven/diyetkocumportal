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

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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
    },
    table: {
      align: 'left'
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
    />
  )

class UserDataExpensionPanel extends React.Component  {
 
    constructor(prop) {
        super(prop);
    }

  componentDidMount() {
    console.log("mount")
    console.log(this.props);
  }

    render() {
        console.log("render")
        const { rows, classes, handleSubmit, onSubmit } = this.props;
        console.log(this.props)

        return (
            <ExpansionPanel defaultExpanded>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography className={classes.heading}>Basic Fields</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                <form onSubmit={handleSubmit(onSubmit)} className={classes.grid}>
                    <Table style={{ tableLayout: 'auto' }} className={classes.table}>
                        <TableBody>
                        {rows.map(row => {
                            return (
                            <TableRow key={row.id}>
                                <TableCell>{row.id}</TableCell>
                                <TableCell>
                                <Field
                                    name={row.id}
                                    id={row.id}
                                    value={row.value}
                                    margin="normal"
                                    component={renderTextField}
                                    label={row.name}
                                />
                                </TableCell>
                            </TableRow>
                            );
                        })}
                        </TableBody>
                    </Table>
                </form>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        )
    }
}


const redForm = reduxForm({
    // a unique name for the form
    form: "basic_fields",
    enableReinitialize: true
})(withStyles(styles)(UserDataExpensionPanel));

function mapStateToProps(state) {
    console.log("mapStateToProps")
    console.log(state)

    var val = state.api.items.length > 0 ? state.api.items : { id: 'basic/name', value: "test" }

    var obj = {};
    console.log(val);
    for (var i = 0; i < val.length; ++i) {
        obj[val[i].id] = val[i].value;
    }
    console.log(obj);
    return {
      initialValues: obj
    }
}

export default connect(
    mapStateToProps,
    null)(redForm);