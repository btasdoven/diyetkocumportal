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
import AccountCircle from '@material-ui/icons/AccountCircle';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreVertIcon from '@material-ui/icons/MoreHoriz';
import FieldDialog from './dialog';

import InputAdornment from '@material-ui/core/InputAdornment';

import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import Typography from "@material-ui/core/Typography";
import green from '@material-ui/core/colors/green';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import LinkField from '../../containers/LinkField'
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

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

const typeToIconMap = {
    "address": "home",
    "text": "message",
    "email": "alternate_email",
    "tel": "phone",
    "link": "link",
};

function getPanelField(classes, row, fieldId, userId) {
    if (row.type == 'link') {
        return (
            <LinkField
                disabled
                multiline
                className={classes.table}
                name={fieldId}
                id={fieldId}
                label={row.name}
                inputProps={{
                    readOnly: true,
                    classes: {
                        textarea: classes.textFieldColor,
                    },
                }}
                fieldRef={row.link}
                fieldId={fieldId}
                userId={userId}
            />
        )
    } else {
        return (
            <TextField
                disabled
                multiline
                className={classes.table}
                name={fieldId}
                id={fieldId}
                value={row.value}
                margin="dense"
                label={row.name}
                inputProps={{
                    readOnly: true,
                    classes: {
                        textarea: classes.textFieldColor,
                    },
                }}
            />
        )
    }
}
class PanelField extends React.Component  {

    constructor(props) {
        super(props)

        this.state = {
            anchorEl: null
        }
    }
    
    handleDelete= () => {
        this.setState({ anchorEl: null });
        this.props.onDeleteField(this.props.fieldId)
    }
    
    handleEdit = () => {
        this.setState({ anchorEl: null });
        this.props.onEditField(this.props.fieldId)
    }

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    render() {
        var {classes} = this.props;

        return (
            <TableCell className={classes.tableCell} style= {{paddingRight: '8px', display: 'flex', borderBottom: 0 }}>
                <Icon 
                    style={{marginLeft: '12px', marginRight: '12px', lineHeight: '65px', height: '45px', fontSize: '18px'}}
                    className={classes.typeIcon}
                >
                    {typeToIconMap[this.props.fieldData.type]}
                </Icon>

                { getPanelField(classes, this.props.fieldData, this.props.fieldId, this.props.userId) }
                
                {this.props.groupUpdateable && (
                    <div>
                        <IconButton onClick={this.handleClick}>
                            <MoreVertIcon />
                        </IconButton>
                            <Menu
                                id="long-menu"
                                anchorEl={this.state.anchorEl}
                                open={this.state.anchorEl ? true : false}
                                onClose={() => this.setState({anchorEl: null})}
                            >
                                <MenuItem disabled={this.props.fieldData.isReadOnly} onClick={this.handleEdit}>
                                    <ListItemIcon>
                                        <CreateIcon/>
                                    </ListItemIcon>
                                    <ListItemText inset primary="Edit" />
                                </MenuItem>
                                <MenuItem disabled={this.props.fieldData.isReadOnly} onClick={this.handleDelete}>
                                    <ListItemIcon>
                                        <DeleteIcon/>
                                    </ListItemIcon>
                                    <ListItemText inset primary="Delete" />
                                </MenuItem>
                            </Menu>
                    </div>
                )}
            </TableCell>
        )
    }
}

export default withStyles(styles)(PanelField);