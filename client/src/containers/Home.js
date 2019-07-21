import React from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { increment, decrement } from "../store/reducers/stepCounter";
import { getMaterial, itemsPutData } from '../store/reducers/api.materials';
import { getMaterialHeaders } from '../store/reducers/api.materialHeaders';

import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Divider from '@material-ui/core/Divider';

import UserDataExpensionPanel from '../components/UserDataExpansionPanel'
import DataExpensionPanel from './DataExpansionPanelMaterial'
import DataExpensionCard from './DataExpansionCard'
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { userService } from "../services";

const styles = theme => ({
  root: {
    width: '100%',
    flexGrow: 1,
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
  
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getMaterialHeaders(JSON.parse(localStorage.getItem('user')).id);
  }

  onSubmit(v, groupId) {
    this.props.itemsPutData(JSON.parse(localStorage.getItem('user')).id, groupId, v);
  }

  render() {
    const { classes } = this.props;
    var apiMaterialHeaders = this.props.apiMaterialHeaders;
    
    return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <div className={classes.root}>

            {!apiMaterialHeaders.isLoaded && (<CircularProgress size={24} className={classes.buttonProgress} />)}

            <Grid container spacing={8}>
              {Object.keys(apiMaterialHeaders.items).map( (materialId, idx) => {
                return (
                  <Grid item xs={12} sm={6} md={4} xl={3}>
                    <DataExpensionCard
                      key={"userDataPanel" + materialId}
                      userId={JSON.parse(localStorage.getItem('user')).id}
                      materialHeaderData = {this.props.apiMaterialHeaders.items[materialId]} 
                      />
                  </Grid>
                  // <DataExpensionPanel
                  //   insertable={true}
                  //   updateable={true}
                  //   key={"userDataPanel" + materialId}
                  //   onSubmit={(v) => this.onSubmit(v, materialId)}
                  //   form={materialId}
                  //   defaultExpanded={true} 
                  //   // getMaterialFn={(userId, materialId, force=false) => {
                  //   //   return this.props.apiMaterials && this.props.apiMaterials.hasOwnProperty(materialId) && !force
                  //   //     ? this.props.apiMaterials[materialId].items
                  //   //     : this.props.getMaterial(userId, materialId)
                  //   // }}
                  //   userId={JSON.parse(localStorage.getItem('user')).id}
                  //   materialHeaderData = {this.props.apiMaterialHeaders.items[materialId]} 
                  //   // materialData = {this.props.apiMaterials && this.props.apiMaterials.hasOwnProperty(materialId)
                  //   //     ? this.props.apiMaterials[materialId]
                  //   //     : undefined} 
                  //   />
                )
              })}
            </Grid>
          </div>
        </div>
      );
    }
};

const mapStateToProps = state => {
  return {
    apiMaterialHeaders: state.apiMaterialHeaders,
    apiMaterials: state.apiMaterials,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      itemsPutData: (userId, groupId, groupVal) => itemsPutData(userId, groupId, groupVal),
      getMaterialHeaders: (userId) => getMaterialHeaders(userId),
      getMaterial: (userId, materialId) => getMaterial(userId, materialId),
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Home));
