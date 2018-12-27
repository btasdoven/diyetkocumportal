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

import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import Typography from "@material-ui/core/Typography";
import green from '@material-ui/core/colors/green';

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
    newField: {
      align: 'left',
      width: '33%'
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
    />
  )

function renderLoadingButton(classes) {
    return (
        //<div className={classes.rootLoading}>
        //    <div className={classes.gridLoading}>
                <CircularProgress size={24} className={classes.buttonProgress} />
        //    </div>
        //</div>
    )
}

function convertApiToForm(rowsData) {
    var obj = {};

    Object.keys(rowsData).forEach(function(key) {
        obj[key] = rowsData[key].value;
    });

    return obj;
}

function convertFormToApi(rows, obj, addingNewField) {
    Object.keys(obj).forEach(function(key) {
        if (rows.hasOwnProperty(key)) {
            rows.data[key].value = obj[key];
        }
    });

    if (addingNewField) {
        rows.data[rows.id + '/' + obj['newId']] = { name: obj['newName'], value: obj['newValue'] }
    }

    return rows
}

class UserDataExpensionPanel extends React.Component  {

    constructor(props) {
        super(props)

        this.onSubmitInternal = this.onSubmitInternal.bind(this);
        this.onAddNewField = this.onAddNewField.bind(this);

        this.state = {
            addingNewField: false,
        }
    }

    componentDidMount() {
        if (this.props.defaultExpanded && !this.props.rows) {
            this.props.itemsFetchData(JSON.parse(localStorage.getItem('user')).id, this.props.form)
        }
    }

    onSubmitInternal(formValues) {
        this.props.onSubmit(convertFormToApi(this.props.rows, formValues, this.state.addingNewField));
        this.state.addingNewField = false;
    }

    onAddNewField() {
        this.state.addingNewField = true;
    }

    render() {
        const { rows, groupData, classes } = this.props;

        return (
                <ExpansionPanel 
                    defaultExpanded={this.props.defaultExpanded}
                    onChange={(event, expanded) => {
                        if (expanded && this.props.rows === undefined) {
                            this.props.itemsFetchData(JSON.parse(localStorage.getItem('user')).id, this.props.form)
                        }
                    }}
                >
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography className={classes.heading}>
                            {groupData.headerImg && <img src={groupData.headerImg}  className={classes.headerImg}/>}
                            {groupData.header}
                        </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        {!rows && renderLoadingButton(classes)}
                        {rows && rows.data && 
                            (
                                <form onSubmit={this.onSubmitInternal} name={this.props.form} className={classes.table}>
                                    <Table className={classes.table}>
                                        <TableBody>{Object.keys(rows.data).map(k => {
                                        return (
                                            <TableRow key={"homeData" + k}>
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
                                        )})}
                                        {this.state.addingNewField &&
                                            (
                                                <TableRow key={"newRow"}>
                                                    <TableCell style= {{ borderBottom: 0 }}>
                                                        <TextField
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
                                                        </TextField>
                                                        <Field
                                                            className={classes.newField}
                                                            name='newId'
                                                            id='newId'
                                                            margin="normal"
                                                            component={renderTextField}
                                                            label='Id'
                                                        />
                                                        <Field
                                                            className={classes.newField}
                                                            name='newName'
                                                            id='newName'
                                                            margin="normal"
                                                            component={renderTextField}
                                                            label='Name'
                                                        />
                                                        <Field
                                                            className={classes.newField}
                                                            name='newValue'
                                                            id='newValue'
                                                            margin="normal"
                                                            component={renderTextField}
                                                            label='Value'
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        }
                                        </TableBody>
                                    </Table>
                                </form>
                            )
                        }
                    </ExpansionPanelDetails>        
                    <Divider />
                    <ExpansionPanelActions style={{justifyContent: 'flex-start'}}>
                        <Button type="submit" disabled={this.props.pristine} form={this.props.form} size="small" color="primary" onClick={this.props.handleSubmit(this.onSubmitInternal)}>
                            Save
                        </Button>
                        <Button disabled={this.state.addingNewField} form={this.props.form} size="small" color="primary" onClick={this.props.handleSubmit(this.onAddNewField)}>
                            Add
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