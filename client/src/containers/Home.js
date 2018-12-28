import React from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { increment, decrement } from "../store/reducers/stepCounter";
import { itemsFetchData, itemsPutData } from '../store/reducers/api.fields';
import { groupsFetchData } from '../store/reducers/api.groups';

import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Divider from '@material-ui/core/Divider';

import UserDataExpensionPanel from '../components/UserDataExpansionPanel'
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { userService } from "../services";

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

class Home extends React.Component {
  componentDidMount() {
    this.props.groupsFetchData(JSON.parse(localStorage.getItem('user')).id);
  }

  onSubmit(v, groupId) {
    this.props.itemsPutData(JSON.parse(localStorage.getItem('user')).id, groupId, v);
  }

  render() {
    const { classes } = this.props;

    return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
 
          <div className={classes.root}>
            {Object.keys(this.props.apiGroups.items).length == 0 &&
              (<CircularProgress size={24} className={classes.buttonProgress} />)}
            {Object.keys(this.props.apiGroups.items).map( (groupId, idx) => {
                return (
                  <UserDataExpensionPanel
                    key={"userDataPanel" + groupId}
                    onSubmit={(v) => this.onSubmit(v, groupId)}
                    form={groupId}
                    defaultExpanded={idx == 0} 
                    itemsFetchData={(userId, groupId, force=false) => {
                      return this.props.apiFields && this.props.apiFields.hasOwnProperty(groupId) && !force
                        ? this.props.apiFields[groupId].items
                        : this.props.itemsFetchData(userId, groupId)
                    }}
                    groupData = {this.props.apiGroups.items[groupId]}
                    fieldData = {this.props.apiFields && this.props.apiFields.hasOwnProperty(groupId) 
                      ? this.props.apiFields[groupId]
                      : undefined}
                    rows = {this.props.apiFields && this.props.apiFields.hasOwnProperty(groupId) 
                      ? this.props.apiFields[groupId].items
                      : undefined} />
                )
              })}
          </div>
        </div>
      );
    }
};

const mapStateToProps = state => {
  return {
    stepCounter: state.stepCounter,
    apiFields: state.apiFields,
    apiGroups: state.apiGroups,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      increment: () => increment(),
      decrement: () => decrement(),
      itemsFetchData: (userId, groupId) => itemsFetchData(userId, groupId),
      groupsFetchData: (userId) => groupsFetchData(userId),
      itemsPutData: (userId, groupId, groupVal) => itemsPutData(userId, groupId, groupVal)
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Home));
