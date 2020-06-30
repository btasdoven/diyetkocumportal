import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from '@material-ui/core/CardActions';
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Chip from '@material-ui/core/Chip';
import CircularProgress from '@material-ui/core/CircularProgress';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import { fade, withStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import DoneIcon from '@material-ui/icons/Done';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import Rating from '@material-ui/lab/Rating';
import 'font-awesome/css/font-awesome.min.css';
import { withSnackbar } from 'material-ui-snackbar-provider';
import moment from "moment";
import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
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
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    //top: 0,
    [theme.breakpoints.up(750 + theme.spacing(6))]: {
      width: '750px',
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
    this.handleStatusChange = this.handleStatusChange.bind(this);
    this.handleLinkCopied = this.handleLinkCopied.bind(this);
    
    this.state = {
      userId: JSON.parse(localStorage.getItem('user')).id,
      date: moment().format('YYYYMMDD'),
      linkCopied: false,
    }
  }

  isLoaded() {
    var loaded = this.props.apiDietitianComments != undefined &&
      this.props.apiDietitianComments[this.state.userId] != undefined &&
      this.props.apiDietitianComments[this.state.userId].isGetLoading != true &&
      this.props.apiDietitianComments[this.state.userId].data != undefined;

      return loaded;
  }
  
  handleStatusChange(commentId, status) {
    var that = this;
    return () => {
      var comments = that.props.apiDietitianComments[that.state.userId].data;
      comments[commentId].status = status
      that.props.putDietitianComments(that.state.userId, comments);
    };
  }

  componentDidMount() {
    if (!this.isLoaded()) {
      this.props.getDietitianComments(this.state.userId);
    }
  }

  handleLinkCopied() {
    this.setState({ linkCopied: true })
    this.props.snackbar.showMessage(
      'Anket linkiniz panoya kopyalandı.',
      //'Undo', () => handleUndo()
    )
  } 

  render() {
    const { classes } = this.props;
    const showLoader = !this.isLoaded();

    var comments = showLoader ? undefined : this.props.apiDietitianComments[this.state.userId].data;
    
    return (
        <div className={classes.root}>
        <div className={classes.main}>
          <Card variant="outlined" className={classes.card} style={{marginBottom: '16px'}}>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <div className={classes.text}>
                    <Typography variant="body2" style={{}}>
                      * Artık danışanlarından yorum almak çok kolay.<br />
                      * Aşağıdaki linke tıkladığında bu link kopyalanmış olacak.<br />
                      * Bu linki danışanına ister WhatsApp'tan istersen de Instagram'dan gönder.<br />
                      * Danışanların senin hakkında yorum yazsın. <br />
                      * Yazılan yorumlar onayın için bu sayfaya düşsün. <br />
                      * Sen de beğendiğin yorumları kişisel sayfanda göstermek için buradan onayla.
                    </Typography>
                  </div>
                </Grid>

                <Grid style={{textAlign:'center'}} item xs={12}>
                  <CopyToClipboard text={`https://diyetkocum.net/${this.state.userId}/anket`} >
                    <span>
                      <Chip
                        //avatar={<Avatar>M</Avatar>}
                        label={`https://diyetkocum.net/${this.state.userId}/anket`}
                        clickable
                        color="primary"
                        onClick={this.handleLinkCopied}
                        onDelete={this.handleLinkCopied}
                        deleteIcon={this.state.linkCopied ? <DoneIcon color="primary" /> : <FileCopyIcon  color="primary"/>}
                        variant="outlined"
                      />
                    </span>
                  </CopyToClipboard>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          { showLoader && renderLoadingButton(classes) }
          { !showLoader && Object.keys(comments).filter((c) => comments[c].status != 'rejected').sort().reverse().map((commentId, idx) => {
            return (
              <Card elevation={0} key={idx} style={{paddingTop: idx == 0 ? '0' : '8px'}}>
                <CardHeader
                  style={{padding: 0}}
                  avatar={
                    <Avatar alt={comments[commentId].name}>
                      
                    </Avatar>
                  }
                  action={
                    <IconButton disabled style={{paddingTop: '20px'}}>
                      <Typography variant="caption" color="textSecondary">{comments[commentId].date}</Typography>
                    </IconButton>
                  }
                  title={comments[commentId].name}
                  subheader={<Rating readOnly={true} value={comments[commentId].rating} size="small" />}
                />
                <CardContent>
                  <Typography variant="body2" color="textPrimary" component="p" style={{paddingLeft: '40px'}}>
                    {comments[commentId].notes.split("\n").map((item, idx) => <span key={idx}>{item}<br/></span>)}
                  </Typography>
                </CardContent>
                <CardActions style={{justifyContent: 'center', paddingBottom: '16px'}}>
                  {comments[commentId].status == 'pending' && <Button onClick={this.handleStatusChange(commentId, 'confirmed')} size="small" variant="contained" color="secondary">KİŞİSEL SAYFANA EKLE</Button>}
                  {comments[commentId].status == 'pending' && <Button  onClick={this.handleStatusChange(commentId, 'rejected')} size="small" variant="outlined" color="default">REDDET</Button>}
                  {comments[commentId].status == 'confirmed' && 
                    <Typography variant="caption" color="textPrimary" component="p" style={{textAlign: 'center'}}>
                      Bu yorum kişisel sayfanızda gözükmektedir.
                    </Typography>
                  }
                  {comments[commentId].status == 'confirmed' && <Button edge="flex-end" onClick={this.handleStatusChange(commentId, 'rejected')} size="small" variant="outlined" color="secondary">KALDIR</Button>}
                </CardActions>
                <Divider />
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
