import React from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { getDiary } from '../../store/reducers/api.diary';

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

import Diary from './DiaryCard'
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

  render() {
    const { classes, diaryData } = this.props;
    const showLoader = diaryData == undefined;

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
            { !showLoader && 
                <Grid container spacing={1}>
                { diaryData.entries.map( (dairyEntry, idx) => {
                    return (
                    <Grid key={idx} item xs={12} sm={6} md={4} xl={3}>
                        <Card>
                        <CardActionArea
                            //onClick={() => this.props.history.push("projects/" + materialHeaderData.id)}
                        >
                            <CardHeader
                            //   avatar={
                            //     <Avatar aria-label="Recipe" width="100%" src={materialHeaderData.headerImg} />
                            //   }
                            title={dairyEntry.type}
                            subheader={
                                <Typography variant="caption" color="textSecondary">
                                    {dairyEntry.description}
                                </Typography>
                            }
                            />
                        </CardActionArea>
                        </Card>
                    </Grid>
                    )
                })}
                </Grid>
            }
          </div>
        </div>
      );
    }
};

const mapStateToProps = state => {
  return {
    apiDiary: state.apiDiary,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getDiary: (userId, date) => getDiary(userId, date),
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Home));
