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

import Icon from '@material-ui/core/Icon';
import FieldDialog from './dialog';
import PanelField from './PanelField';

import CircularProgress from '@material-ui/core/CircularProgress';
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
      width: '100%',
    },
    textFieldColor: {
        color: 'rgba(0, 0, 0, 0.87)'
    },
    newField: {
      align: 'left',
      width: '33%'
    },
    headerImg: {
        margin: '0 5px 0 5px'
    },
    buttonProgress: {
      top: '50%',
      left: '50%',
    },
    rootLoading: {
        height: "inherit",
        display: "flex",
        justifyContent: "center",
        width: '100%',
        alignItems: "center",
        margin: '8px'
    },
    gridLoading: {
        padding: "20px",
        display: "grid",
        gridTemplateRows: "85px 1fr 1fr 1fr",
        height: "inherit"
    },
    editButton: {
        width: '24px',
        height: '24px',
    },
    typeIcon: {
        marginRight: '9px',
        marginLeft: '5px',
        color: 'rgba(0, 0, 0, 0.54)',
    },
    tableCell: {
        padding: '4px 4px 4px 8px',
    }
  });

function renderLoadingButton(classes) {
    return (
        <div className={classes.rootLoading}>
           <CircularProgress size={24} className={classes.buttonProgress} />
        </div>
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
            this.props.itemsFetchData(this.props.userId, this.props.form)
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
                            this.props.itemsFetchData(this.props.userId, this.props.form)
                        }
                    }}
                >
                    <ExpansionPanelSummary style={{padding: '0 24px 0 5px'}} expandIcon={<ExpandMoreIcon />}>
                        <Typography className={classes.heading}>
                            {groupData.headerImg && <img width="24px" src={groupData.headerImg} className={classes.headerImg}/>}
                            {groupData.headerIcon && <Icon className={classes.typeIcon}>{groupData.headerIcon}</Icon>}
                            {groupData.header}
                        </Typography>
                    </ExpansionPanelSummary>
                    <Divider />
                    <ExpansionPanelDetails style={{padding: 0}}>
                        {showLoader && renderLoadingButton(classes)}
                        {rows && rows.data && Object.keys(rows.data).length == 0 && (
                            <div className={classes.rootLoading}>
                                No field found.
                            </div>
                        )}
                        {rows && rows.data && Object.keys(rows.data).length > 0 && (
                            <Table className={classes.table}>
                                <TableBody>{Object.keys(rows.data).map(k => {
                                    return (
                                        <TableRow key={"homeData" + k}>
                                            <PanelField
                                                fieldId={k}
                                                userId={this.props.userId}
                                                fieldData={rows.data[k]}
                                                onEditField={this.onEditField}
                                                onDeleteField={this.onDeleteField} />
                                        </TableRow>
                                    )})}
                                </TableBody>
                            </Table>
                        )}
                        {(this.state.addingNewField || this.state.editingFieldId != null) && (
                            <FieldDialog
                                open={true}
                                form={this.state.addingNewField ? "newField" : this.state.editingFieldId}
                                groupId={groupData.id}
                                userId={this.props.userId}
                                isApp={groupData.app}
                                fieldData={this.state.addingNewField ? null : rows.data[this.state.editingFieldId]}
                                handleClose={this.onDialogClosed}
                            />
                        )}
                    </ExpansionPanelDetails>       
                    <Divider />
                    <ExpansionPanelActions style={{justifyContent: 'flex-start'}}>
                        {this.props.insertable && 
                            <Button 
                                disabled={this.state.addingNewField} 
                                size="small"
                                color="primary"
                                onClick={this.onAddNewField}
                            >
                                Add
                            </Button>
                        }                        
                        {this.props.updateable && 
                            <Button 
                                disabled={this.state.addingNewField} 
                                size="small"
                                color="primary"
                                onClick={this.onAddNewField}
                            >
                                Revoke access
                            </Button>
                        }
                    </ExpansionPanelActions>
                </ExpansionPanel>
        )
    }
}

export default withStyles(styles)(UserDataExpensionPanel);