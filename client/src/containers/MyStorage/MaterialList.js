import React from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { getMaterial, itemsPutData } from '../../store/reducers/api.materials';
import { getMaterialHeaders } from '../../store/reducers/api.materialHeaders';

import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';

import MaterialCard from './MaterialCard'
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  root: {
    width: '100%',
    flexGrow: 1,
  },
  rootLoading: {
      height: "inherit",
      display: "flex",
      justifyContent: "center",
      width: '100%',
      alignItems: "center",
      margin: '8px'
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

function renderLoadingButton(classes) {
  return (
    <div className={classes.rootLoading}>
      <CircularProgress size={24} className={classes.buttonProgress} />
    </div>
  )
} 

class MaterialList extends React.Component {
  
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
    const showLoader = !apiMaterialHeaders.isLoaded && Object.keys(apiMaterialHeaders.items).length == 0;

    return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <div className={classes.root}>

          { showLoader && renderLoadingButton(classes) }

            <Grid container spacing={1}>
              {Object.keys(apiMaterialHeaders.items).map( (materialId, idx) => {
                return (
                  <Grid key={materialId} item xs={12} sm={6} md={4} xl={3}>
                    <MaterialCard
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
)(withStyles(styles)(MaterialList));