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
import IconButton from '@material-ui/core/IconButton';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';

import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import FieldDialog from './dialog';

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

function renderLoadingButton(classes) {
    return (
        //<div className={classes.rootLoading}>
        //    <div style={{display: 'flex', align: 'center'}}>
                <CircularProgress size={24} className={classes.buttonProgress} />
        //    </div>
        //</div>
    )
}

class UserDataExpensionPanel extends React.Component  {

    constructor(props) {
        super(props)

        this.onAddNewField = this.onAddNewField.bind(this);
        this.onEditField = this.onEditField.bind(this);
        this.onDeleteField = this.onDeleteField.bind(this);
        this.onDialogClosed = this.onDialogClosed.bind(this);

        this.state = {
            addingNewField: false,
            editingFieldId: null,
        }
    }

    onDialogClosed(obj) {
        if (obj != null) {
            this.props.rows.data[obj['id']] = obj;
            this.props.onSubmit(this.props.rows);
        }

        this.setState({
            addingNewField: false,
            editingFieldId: null,
        })
    }

    componentDidMount() {
        if (this.props.defaultExpanded && !this.props.rows) {
            this.props.itemsFetchData(JSON.parse(localStorage.getItem('user')).id, this.props.form)
        }
    }

    onAddNewField() {
        this.setState({
            addingNewField: true,
        })
    }

    onEditField(fieldId) {
        this.setState({
            editingFieldId: fieldId,
        })
    }

    onDeleteField(fieldId) {
        delete this.props.rows.data[fieldId];
        this.props.onSubmit(this.props.rows);
    }

    render() {
        const { fieldData, groupData, classes } = this.props;
        var rows = fieldData && fieldData.items
            ? fieldData.items
            : undefined;
        var showLoader = rows == undefined || fieldData.isGetLoading;

        return (
                <ExpansionPanel 
                    defaultExpanded={this.props.defaultExpanded}
                    onChange={(event, expanded) => {
                        if (expanded && rows === undefined) {
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
                        {showLoader && renderLoadingButton(classes)}
                        {rows && rows.data && (
                            <Table className={classes.table}>
                                <TableBody>{Object.keys(rows.data).map(k => {
                                    return (
                                        <TableRow key={"homeData" + k}>
                                            <TableCell style= {{ display: 'flex', borderBottom: 0 }}>
                                                <TextField
                                                    className={classes.table}
                                                    name={k}
                                                    id={k}
                                                    value={rows.data[k].value}
                                                    margin="dense"
                                                    label={rows.data[k].name + " (" + k + ")"}
                                                    inputProps={{
                                                        readOnly: true
                                                    }}
                                                />
                                                <IconButton 
                                                    aria-label="Edit"
                                                    onClick={() => this.onEditField(k)}
                                                >
                                                    <CreateIcon />
                                                </IconButton>
                                                <IconButton 
                                                    aria-label="Delete"
                                                    onClick={() => this.onDeleteField(k)}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    )})}
                                </TableBody>
                            </Table>
                        )}
                        {(this.state.addingNewField || this.state.editingFieldId != null) && (
                            <FieldDialog
                                open={true}
                                form={this.state.addingNewField ? "newField" : this.state.editingFieldId}
                                fieldData={this.state.addingNewField ? null : rows.data[this.state.editingFieldId]}
                                handleClose={this.onDialogClosed}
                            />
                        )}
                    </ExpansionPanelDetails>        
                    <Divider />
                    <ExpansionPanelActions style={{justifyContent: 'flex-start'}}>
                        <Button 
                            disabled={this.state.addingNewField} 
                            size="small"
                            color="primary"
                            onClick={this.onAddNewField}
                        >
                            Add
                        </Button>
                    </ExpansionPanelActions>
                </ExpansionPanel>
        )
    }
}

export default withStyles(styles)(UserDataExpensionPanel);