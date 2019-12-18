import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from "@material-ui/core/CardActionArea";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { getEnvanter, putEnvanter } from '../../store/reducers/api.envanter';

import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import SearchIcon from '@material-ui/icons/Search';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { userService } from "../../services";
import { Form, Field, reduxForm } from "redux-form";

import UserDetails from './UserDetails'

const styles = theme => ({
  root: {
    height: "inherit",
    display: "flex",
    justifyContent: "center",
    //alignItems: "center"
  },
  main: {
    width: '100%',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    //top: 0,
    [theme.breakpoints.up(600 + theme.spacing(6))]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    //backgroundColor: 'red',
  },
  profile: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    padding: theme.spacing(3),
    //backgroundColor: 'blue',
  },
  form: {
    display: 'flex',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(3),
  },
  button: {
    marginLeft: theme.spacing(1),
    float: 'right'
  },
  field: {
    width: '100%',
    float: 'left'
  },
  avatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  }
});

function renderLoadingButton(classes) {
  return (
    <div className={classes.rootLoading}>
      <CircularProgress size={24} className={classes.buttonProgress} />
    </div>
  )
} 

function createData(name, calories, fat, carbs, protein) {
    return { 
        name, 
        calories, 
        fat, 
        carbs, 
        protein 
    };
  }
  
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];


  const renderTextField = ({
    label,
    input,
    meta: { touched, invalid, error },
    ...custom
  }) => (
    <TextField
      label={label}
      placeholder={label}
      error={touched && invalid}
      helperText={touched && error}
      {...input}
      {...custom}
      fullWidth
    />
  )

class Envanter extends React.Component {
  
  constructor(props) {
    super(props);

    this.onSubmitInternal = this.onSubmitInternal.bind(this);
  }

  componentDidMount() {
  }

  onSubmitInternal(formValues) {
      //RetrieveFormValuesForType(formValues)
      console.log(formValues);

      this.props.history.push(`/s/` + formValues['username'])
      //this.setState({username: formValues['username']});
      this.props.reset();
  }

  render() {
    const { classes } = this.props;
    const showLoader = false;

    return (
        <div className={classes.root}>
        <div className={classes.main}>
            { showLoader && renderLoadingButton(classes) }
            { !showLoader && 
                <span>
                  <Form 
                    onSubmit={this.props.handleSubmit(this.onSubmitInternal)}
                    className={classes.form}>
                    {/* <Field
                      className={classes.field}
                      name="username"
                      component={renderTextField}
                      placeholder="Enter Instagram username"
                      variant="outlined"
                      size="small"
                    />
                    <Button
                        onClick={this.props.handleSubmit(this.onSubmitInternal)}
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        startIcon={<SearchIcon />}
                    >
                        GO
                    </Button> */}
                  </Form>

                  {this.props.match.params.username && <UserDetails username={this.props.match.params.username}/>}
                </span>
            }
        </div>
        </div>
      );
    }
};

const mapStateToProps = state => {
  return {
    apiEnvanter: state.apiEnvanter,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({ form: 'UsernameForm' })(withStyles(styles)(Envanter)));
