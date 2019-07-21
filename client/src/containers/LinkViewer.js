import React from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import { getMaterialHeaders } from '../store/reducers/api.materialHeaders';
import { getMaterial, itemsPutData } from '../store/reducers/api.materials';

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
  appBar: {
    backgroundColor: 'rgb(38,55,70)'
  },
  loginButton: {
    marginLeft: 'auto',
    backgroundColor: 'rgb(255, 109, 33)'
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    padding: 0,
  },
  root: {
    width: '100%',
    padding: theme.spacing.unit * 2,
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

class LinkViewer extends React.Component {
  componentDidMount() {
    console.log(this.props.match.params);
    var params = this.props.match.params;
    this.props.groupsFetchData(params.userId, params.linkId);
  }

  render() {
    const { classes } = this.props;
    var params = this.props.match.params;

    return (
      <React.Fragment>
        <CssBaseline />

        { !localStorage.getItem('user') && (
          <AppBar position="static" className={classes.appBar}>
            <Toolbar className={classes.layout}>
              <a href='/'>
                <img src="/static/favicon.png" style={{marginRight: '10px', height:'40px'}}/>
              </a>
              <Typography variant="h6" color="inherit" noWrap>
                Monagard
              </Typography>
              <Button className={classes.loginButton} variant="contained" color="primary" href="/signin">
                Login / Register
              </Button>
            </Toolbar>
          </AppBar>
        )}
      <main>
        <div
          style={{
            //display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Typography variant="subtitle1" align="center" style={{margin: '10px'}} >
            Someone has just shared this link with you. You can continue to access below information as long as they don't revoke your permissions.           
          </Typography>
          <div className={classes.root}>
            {Object.keys(this.props.apiGroups.items).length == 0 &&
              (<CircularProgress size={24} className={classes.buttonProgress} />)}
            {/* {Object.keys(this.props.apiGroups.items).map( (groupId, idx) => {

                if (groupId != params.linkId) {
                  return;
                }

                if (!this.props.apiGroups.items[groupId].shareLink) {
                  return;
                }
                              
                return (
                  <UserDataExpensionPanel
                    insertable={false}
                    updateable={false}
                    key={"userDataPanel" + groupId}
                    onSubmit={(v) => this.onSubmit(v, groupId)}
                    form={groupId}
                    defaultExpanded={true} 
                    userId={params.userId}
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
              })} */}
          </div>
        </div>
        </main>
    </React.Fragment>
      );
    }
};

const mapStateToProps = state => {
  return {
    apiMaterials: state.apiMaterials,
    apiMaterialHeaders: state.apiMaterialHeaders,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getMaterial: (userId, groupId) => getMaterial(userId, groupId),
      getMaterialHeaders: (userId) => getMaterialHeaders(userId),
      itemsPutData: (userId, groupId, groupVal) => itemsPutData(userId, groupId, groupVal)
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(LinkViewer));
