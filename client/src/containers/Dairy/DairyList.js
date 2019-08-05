import React from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import SpeedDial from "../SpeedDial/SpeedDial"

import { getMaterial, itemsPutData } from '../../store/reducers/api.materials';
import { getMaterialHeaders } from '../../store/reducers/api.materialHeaders';

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

import Dairy from './Dairy'
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { userService } from "../../services";

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

class Home extends React.Component {
  
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (this.props.apiMaterialHeaders.isLoaded != true) {
      this.props.getMaterialHeaders(JSON.parse(localStorage.getItem('user')).id);
    }
  }

  onSubmit(v, groupId) {
    this.props.itemsPutData(JSON.parse(localStorage.getItem('user')).id, groupId, v);
  }

  render() {
    const { classes } = this.props;
    var apiMaterialHeaders = this.props.apiMaterialHeaders;
    const showLoader = apiMaterialHeaders.isLoaded != true && Object.keys(apiMaterialHeaders.items).length == 0;

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
                const materialHeaderData = this.props.apiMaterialHeaders.items[materialId];

                return (
                  <Grid key={materialId} item xs={12} sm={6} md={4} xl={3}>
                    <Card>
                      <CardActionArea
                        //onClick={() => this.props.history.push("projects/" + materialHeaderData.id)}
                      >
                        <CardHeader
                          avatar={
                            <Avatar aria-label="Recipe" width="100%" src={materialHeaderData.headerImg} />
                          }
                          title={materialHeaderData.header}
                          subheader={
                            <Typography variant="caption" color="textSecondary">
                              {materialHeaderData.state} at {materialHeaderData.purity}{materialHeaderData.purityUnit} purity, left {materialHeaderData.weight}{materialHeaderData.weightUnit}
                            </Typography>
                          }
                        />
                      </CardActionArea>
                    </Card>
                  </Grid>
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
