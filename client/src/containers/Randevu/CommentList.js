import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import { fade, withStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import Rating from '@material-ui/lab/Rating';
import 'font-awesome/css/font-awesome.min.css';
import { withSnackbar } from 'material-ui-snackbar-provider';
import React from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { getDietitianComments, putDietitianComments } from '../../store/reducers/api.dietitianComments';









const styles = theme => ({
  root: {
    height: "inherit",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
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
    borderRadius: theme.spacing(4), //theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.95),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.99),
    },
    margin: theme.spacing(1),
    padding: theme.spacing(0.5),
    flex: 1
  },
  searchIconStart: {
    paddingLeft: theme.spacing(1),
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
    height: 44,
    margin: 4,
  },
  iconButton: {
    margin: theme.spacing(1),
  },
  searchWrapper: {
    display: 'flex', 
    alignItems: 'center',
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


function renderLoadingButton(classes, idx) {
  return (
    <div key={idx} className={classes.rootLoading}>
      <CircularProgress size={24} className={classes.buttonProgress} />
    </div>
  )
} 

class Envanter extends React.Component {
  
  constructor(props) {
    super(props);

    this.isLoaded = this.isLoaded.bind(this);
    
    this.state = {
      userId: props.userId,
      loggedInUser: JSON.parse(localStorage.getItem('user')),
    }
  }

  isLoaded() {
    var loaded = this.props.apiDietitianComments != undefined &&
      this.props.apiDietitianComments[this.state.userId] != undefined &&
      this.props.apiDietitianComments[this.state.userId].isGetLoading != true &&
      this.props.apiDietitianComments[this.state.userId].data != undefined;

      return loaded;
  }
  
  componentDidMount() {
    if (!this.isLoaded()) {
      this.props.getDietitianComments(this.state.userId);
    }
  }

  render() {
    const { classes } = this.props;
    const showLoader = !this.isLoaded();

    var comments = showLoader ? undefined : this.props.apiDietitianComments[this.state.userId].data;
    var commentKeys = showLoader ? undefined : Object.keys(comments).filter((c) => comments[c].status == 'confirmed')

    return (
        <div className={classes.root}>
        <div className={classes.main}>
          { showLoader && renderLoadingButton(classes) }
          { !showLoader && commentKeys.length == 0 && (
            <Typography variant="body2" color="textSecondary" component="p" style={{textAlign: 'center'}}>
              Herhangi bir danışan görüşü bulunmamaktadır.

              {this.state.loggedInUser != undefined && this.state.loggedInUser.id == this.state.userId && 
                " Danışan görüşü eklemek için Danışan Görüşleri sayfasından anket linkinizi danışanlarınız ile paylaşabilirsiniz."
              }
            </Typography>
          )}
          { !showLoader && commentKeys.sort().reverse().map((commentId, idx) => {
            return (
              <Card elevation={0} key={idx} style={{paddingTop: idx == 0 ? '0' : '8px'}}>
                <CardHeader
                  style={{padding: 0}}
                  avatar={
                    <Avatar style={{width: '32px', height: '32px'}} alt={comments[commentId].name}>
                      
                    </Avatar>
                  }
                  action={
                    <IconButton disabled style={{paddingTop: '20px'}}>
                      <Typography variant="caption" color="textSecondary">{comments[commentId].date}</Typography>
                    </IconButton>
                  }
                  title={comments[commentId].name}
                  subheader={<Rating readOnly={true} value={parseInt(comments[commentId].rating) || 5} size="small" />}
                />
                <Typography variant="body2" color="textSecondary" component="p" style={{paddingTop: '8px', paddingLeft: '48px'}}>
                  {comments[commentId].notes.split("\n").map((item, idx) => <span key={idx}>{item}<br/></span>)}
                </Typography>
              </Card>
            )
          })}
        </div>
        </div>
      );
    }
};

const mapStateToProps = state => {
  return {
    apiDietitianComments: state.apiDietitianComments,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getDietitianComments: (userId) => getDietitianComments(userId),
      putDietitianComments: (userId, values) => putDietitianComments(userId, values),
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(withRouter(withSnackbar()(Envanter))));
