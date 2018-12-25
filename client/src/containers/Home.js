import React from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { increment, decrement } from "../store/reducers/stepCounter";
import { itemsFetchData, itemsPutData } from '../store/reducers/api';

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

  onSubmit(v, field) {
    console.log('onSubmit')
    console.log(v);
    console.log(field);

    this.props.itemsPutData(JSON.parse(localStorage.getItem('user')).id, field, v);
  }

  render() {

    const { classes } = this.props;

    console.log("lala");
    console.log(this.props.api.items)
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
            {
              Object.keys(this.props.api.items).map( (itemKey, idx) => {
              var item = this.props.api.items[itemKey];
              return (
                <UserDataExpensionPanel
                  key={"userDataPanel" + itemKey}
                  onSubmit={(v) => this.onSubmit(v, itemKey)}
                  form={itemKey}
                  defaultExpanded={idx == 0}
                  rows = {item} />
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
    api: state.api
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      increment: () => increment(),
      decrement: () => decrement(),
      itemsFetchData: (url) => itemsFetchData(url),
      itemsPutData: (userId, field, val) => itemsPutData(userId, field, val)
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Home));
