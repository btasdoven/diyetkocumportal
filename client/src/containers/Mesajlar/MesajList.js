
import Avatar from "@material-ui/core/Avatar";
import Badge from "@material-ui/core/Badge";
import CircularProgress from '@material-ui/core/CircularProgress';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import { fade, withStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import 'font-awesome/css/font-awesome.min.css';
import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ExtendedLink from '../../components/ExtendedLink';
import { readMessages } from '../../store/reducers/api.danisanMessages';
import { getMessagePreviews } from '../../store/reducers/api.messagePreviews';










const styles = theme => ({
  root: {
    height: "inherit",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  rootLoading: {
      height: "inherit",
      display: "flex",
      justifyContent: "center",
      width: '100%',
      alignItems: "center",
      marginTop: theme.spacing(5)
  },
  main: {
    width: '100%',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    //top: 0,
    [theme.breakpoints.up(600 + theme.spacing(6))]: {
      width: '100%',
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
  },
  card: {
      marginBottom: theme.spacing(1),
      marginTop: theme.spacing(1),
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.95),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.99),
    },
    margin: theme.spacing(1),
    flex: 1
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  yeniDanisanBtn: {
    margin: theme.spacing(1)
  },
  divider: {
    height: 28,
    margin: 4,
  },
});


function renderLoadingButton(classes) {
  return (
    <div className={classes.rootLoading}>
      <CircularProgress size={24} className={classes.buttonProgress} />
    </div>
  )
} 

class Envanter extends React.Component {
  
  constructor(props) {
    super(props);

    this.isLoaded = this.isLoaded.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);

    this.state = {
      userId: JSON.parse(localStorage.getItem('user')).id
    }
  }
  
  isLoaded() {
    var userId = this.state.userId;

    var loaded = 
      this.props.apiMessagePreviews[userId] != undefined &&
      this.props.apiMessagePreviews[userId].isGetLoading != true &&
      this.props.apiMessagePreviews[userId].data != undefined;

    return loaded;
  }

  handleOnClick(danisanUserName) {
    return () => {
      console.log(danisanUserName)
      this.props.readMessages(this.state.userId, danisanUserName);
    }
  }

  componentDidMount() {
    if (!this.isLoaded()) {
      this.props.getMessagePreviews(this.state.userId);
    }
  }

  render() {
    const { classes } = this.props;
    const showLoader = !this.isLoaded();

    var danisans = showLoader ? undefined : this.props.apiMessagePreviews[this.state.userId].data;

    return (
        <div className={classes.root}>
        <div className={classes.main}>
            { showLoader && renderLoadingButton(classes) }
            { !showLoader && 
                <span> 
                  <List disablePadding>
                    {Object.keys(danisans).map((danisanKey, idx) => {                      
                      var danisan = danisans[danisanKey];
                      var fontWeight = danisan.unread == 0 ? 400 : 600;
                      return (
                        <span key={idx}>
                          <Divider component="li" />
                          <ListItem button component={ExtendedLink} onClick={this.handleOnClick(danisanKey)} to={"/m/" + danisanKey}>
                            <ListItemAvatar>
                            <Avatar src={danisan.danisanUrl} />
                            </ListItemAvatar>
                            <ListItemText primaryTypographyProps={{style: {fontWeight: fontWeight}}} secondaryTypographyProps={{style: {fontWeight: fontWeight}}} primary={danisanKey} secondary={danisan.lastMessage.message}/>
                            <div style={{flex: 'none', display: 'flex', flexDirection: 'column'}}>
                              <Typography style={{textAlign: 'right', fontWeight: fontWeight}} color="initial" variant="caption">{danisan.aktivite}</Typography>
                              { danisan.unread > 0 && (
                                <div>
                                  <Badge style={{marginLeft: 'calc(100% - 10px)', }} badgeContent={danisan.unread} color="secondary"></Badge>
                                </div>
                              )}
                            </div>
                          </ListItem>
                        </span>
                      )
                    })}  
                    <Divider component="li" />
                  </List>
                </span>
            }
        </div>
        </div>
      );
    }
};

const mapStateToProps = state => {
  return {
    apiMessagePreviews: state.apiMessagePreviews,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getMessagePreviews: (userId) => getMessagePreviews(userId),
      readMessages: (userId, danisanUserName) => readMessages(userId, danisanUserName)
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Envanter));
