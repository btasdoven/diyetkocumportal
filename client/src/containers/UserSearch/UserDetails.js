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
import Badge from '@material-ui/core/Badge';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import SendIcon from '@material-ui/icons/Send';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';

import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import InputBase from '@material-ui/core/InputBase';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { userService } from "../../services";
import { Form, Field, reduxForm } from "redux-form";

import { Link } from "react-router-dom";
import {reset} from 'redux-form';

const styles = theme => ({
  profile: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    padding: theme.spacing(3),
    //backgroundColor: 'blue',
  },
  form: {
    display: 'flex',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
  button: {
    marginLeft: theme.spacing(1),
    float: 'right'
  },
  avatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  card: {
      marginBottom: theme.spacing(1),
  },
  rootLoading: {
      height: "inherit",
      display: "flex",
      justifyContent: "center",
      width: '100%',
      alignItems: "center",
      marginTop: theme.spacing(5)
  },
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
    <InputBase
        label={label}
        placeholder={label}
        error={touched && invalid}
        {...input}
        {...custom}
        fullWidth
    />
    // <TextField
    //   label={label}
    //   placeholder={label}
    //   error={touched && invalid}
    //   helperText={touched && error}
    //   {...input}
    //   {...custom}
    //   fullwidth
    // />
  )

class Envanter extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
        currentUser: undefined,
        prevUser: undefined,
        userIgInfo: undefined,
    };
    this.onSubmitInternal = this.onSubmitInternal.bind(this);
  }

  isLoaded() {
      return this.props.apiEnvanter != undefined &&
        this.props.apiEnvanter[this.props.username] != undefined &&
        this.props.apiEnvanter[this.props.username].isLoaded == true &&
        this.state.userIgInfo != undefined &&
        this.state.userIgInfo.username == this.props.username;
  }

  componentDidMount() {
      console.log('mount')
      console.log(this.state)

    if (this.state.currentUser != this.props.username)
    {
        this.setState({
            prevUser: this.state.currentUser,
            currentUser: this.props.username
        });

        fetch('https://www.instagram.com/' + this.props.username + '/?__a=1')
          .then(response => response.json())
          .then(data => this.setState({ userIgInfo: data.graphql.user}))
          .catch(err => console.log(err));

        this.props.getEnvanter(5, this.props.username);
    }
  }

  componentDidUpdate() {
    console.log('update')
    console.log(this.state)

    if (this.state.currentUser != this.props.username)
    {
        this.setState({
            prevUser: this.state.currentUser,
            currentUser: this.props.username
        });

        fetch('https://www.instagram.com/' + this.props.username + '/?__a=1')
          .then(response => response.json())
          .then(data => this.setState({ userIgInfo: data.graphql.user}))
          .catch(err => console.log(err));
        this.props.getEnvanter(5, this.props.username);
    }
  }

  onSubmitInternal(formValues) {
      //RetrieveFormValuesForType(formValues)
      console.log(formValues);

      if (formValues != undefined) {
        var currentEnvanter = this.props.apiEnvanter[this.props.username].items;
        currentEnvanter.comments.push(formValues);
        this.props.putEnvanter(5, this.props.username, currentEnvanter);
        this.props.reset();
      }
  }

  render() {
    const { classes } = this.props;
    const showLoader = !this.isLoaded();

    const userIgInfo = showLoader ? undefined : this.state.userIgInfo;
    const userLocalInfo = showLoader ? undefined : this.props.apiEnvanter[this.props.username].items;

    console.log(userIgInfo);
    console.log(userLocalInfo);

    return (
        <span>
            { showLoader && renderLoadingButton(classes) }
            { !showLoader && 
                <span>
                    <Card className={classes.card}>
                        <CardHeader
                        avatar={
                            <Avatar className={classes.avatar} alt={userIgInfo.full_name} src={userIgInfo.profile_pic_url} />
                        }
                        // action={
                        //   <IconButton aria-label="settings">
                        //     <MoreVertIcon />
                        //   </IconButton>
                        // }
                        title={<Typography variant="h5" component="h2">{userIgInfo.full_name}</Typography>}
                        //subheader={JSON.stringify(user)}
                        />
                        {/* <CardMedia
                        className={classes.media}
                        image="/static/images/cards/paella.jpg"
                        title="Paella dish"
                        /> */}
                        <CardContent>
                            {!userLocalInfo.isClaimed && 
                                <Button component={Link} to={"/u?claim=" + userIgInfo.username} variant="outlined" color="primary" fullWidth>
                                    CLAIM THIS PROFILE
                                </Button>
                            }
                            {/*<Typography variant="body2" color="textSecondary" component="p">
                                {userLocalInfo.isClaimed ? "hh" : "aa"}
                            </Typography> */}
                        </CardContent>
                        {/* <CardActions disableSpacing>
                        <IconButton aria-label="add to favorites">
                            <FavoriteIcon />
                        </IconButton>
                        <IconButton aria-label="share">
                            <ShareIcon />
                        </IconButton>
                        <IconButton
                            // className={clsx(classes.expand, {
                            //   [classes.expandOpen]: expanded,
                            // })}
                            //onClick={handleExpandClick}
                            //aria-expanded={expanded}
                            aria-label="show more"
                        >
                            <ExpandMoreIcon />
                        </IconButton>
                        </CardActions> */}
                    </Card>

                    <Form onSubmit={this.props.handleSubmit(this.onSubmitInternal)}>
                        <Card className={classes.card}>
                            {/* <CardMedia
                            className={classes.media}
                            image="/static/images/cards/paella.jpg"
                            title="Paella dish"
                            /> */}
                            <CardContent style={{paddingBottom:0}}>
                                <Field
                                    className={classes.field}
                                    name="text"
                                    component={renderTextField}
                                    placeholder="Enter your thoughts here..."
                                    variant="outlined"
                                    multiline
                                    rows="4"
                                    variant="outlined"
                                    autoFocus={true}
                                    //style={{backgroundColor:'red'}}
                                />
                            </CardContent>
                            <CardActions disableSpacing  style={{paddingTop:0}}>
                                <IconButton 
                                    style={{marginLeft:'auto'}}
                                    onClick={this.props.handleSubmit(this.onSubmitInternal)}>
                                    <SendIcon />
                                </IconButton>
                            </CardActions>
                        </Card>
                    </Form>
                    
                    { userLocalInfo.comments.map( (row, idx) => (
                        <Card key={idx} className={classes.card}>
                            {/* <CardMedia
                            className={classes.media}
                            image="/static/images/cards/paella.jpg"
                            title="Paella dish"
                            /> */}
                            {/* <CardHeader
                            //title={<Typography variant="h5" component="h2">{user.full_name}</Typography>}
                            subheader="September 14, 2016"
                            /> */}
                            <CardContent style={{paddingBottom:0}}>
                                <Typography variant="body2" color="textPrimary" component="p">
                                    {row.text}
                                </Typography>
                            </CardContent>
                            <CardActions disableSpacing style={{justifyContent: "flex-end"}}>
                                <span style={{marginRight: 'auto'}}>
                                    <Button
                                        style={{color: 'rgba(0,0,0,0.54)'}}
                                        color="default"
                                        size="small"
                                        startIcon={<ThumbUpIcon/>}
                                    >
                                        {row.like || 0}
                                    </Button>
                                    <Button
                                        style={{color: 'rgba(0,0,0,0.54)'}}
                                        color="inherit"
                                        size="small"
                                        startIcon={<ThumbDownIcon/>}
                                    >
                                        {row.dislike || 0}
                                    </Button>
                                </span>
                                <span style={{justifyContent: "flex-end"}}>
                                <Typography variant="caption"  component="p">
                                    5 mins ago
                                </Typography>
                                </span>
                            </CardActions>
                        </Card>
                    ))}
                </span>
            }
        </span>
    )}
};

const mapStateToProps = state => {
  return {
    apiEnvanter: state.apiEnvanter,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getEnvanter: (userId, user) => getEnvanter(userId, user),
      putEnvanter: (userId, user, values) => putEnvanter(userId, user, values),
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({ form: 'CommentForm' })(withStyles(styles)(Envanter)));
