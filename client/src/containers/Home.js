import React from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { increment, decrement } from "../store/reducers/stepCounter";
import { itemsFetchData } from '../store/reducers/api';

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

  constructor(props) {
      super(props);
      console.log(props);
  }

  componentDidMount() {
    console.log(localStorage.getItem('user'));
    this.props.itemsFetchData(JSON.parse(localStorage.getItem('user')).id);
  }

  render() {

    const { classes } = this.props;

    return (
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
          {/* <Card>
            <CardContent>
              <Typography variant="headline">
                Redux Example
              </Typography>
              <Typography
                align="center"
                variant="subheading"
              >
                Counter: {this.props.stepCounter.counter}
              </Typography> <br/>
            </CardContent>
            <CardActions>
              <Button color="primary" variant="contained" onClick={this.props.increment}>
                Increment
              </Button>
              <Button
                color="secondary"
                variant="contained"
                onClick={this.props.decrement}
              >
                Decrement
              </Button>
            </CardActions>
          </Card> */}
          
          <div className={classes.root}>
            <UserDataExpensionPanel rows = {this.props.api.items} onSubmit={(v) => {
              console.log(v);
            }}>
            </UserDataExpensionPanel>
            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}><img src="https://img.icons8.com/material/24/000000/facebook.png"/> Facebook Fields</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                  sit amet blandit leo lobortis eget.
                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>Custom</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                  sit amet blandit leo lobortis eget.
                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>Custom</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                  sit amet blandit leo lobortis eget.
                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>Custom</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                  sit amet blandit leo lobortis eget.
                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>

          </div>
        </div>
        <br/>
        <div>
          
          <Divider />

        </div>

        <Divider />

            </div>
      );
    }
};

const mapStateToProps = state => {
  return {
    stepCounter: state.stepCounter,
    api: state.api
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      increment: () => increment(),
      decrement: () => decrement(),
      itemsFetchData: (url) => itemsFetchData(url)
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Home));
