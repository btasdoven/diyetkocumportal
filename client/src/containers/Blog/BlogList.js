
import CircularLoader from "../../components/CircularLoader"
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CircularProgress from '@material-ui/core/CircularProgress';
import green from '@material-ui/core/colors/green';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles, withTheme } from '@material-ui/core/styles';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import Image from 'material-ui-image';
import moment from "moment";
import 'moment/locale/tr';
import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ExtendedLink from "../../components/ExtendedLink";
import { userService } from '../../services/user.service';
import { getAllPosts } from '../../store/reducers/api.allPosts';

moment.locale('tr')

const styles = theme => ({
  layoutToolbar: {
    width: 'auto',
    color: '#262626',
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    padding: 0,
    // flexDirection: 'row',
    // display: 'flex',
    justifyContent: 'space-between',
    minHeight: theme.spacing(7),
    [theme.breakpoints.up(750 + theme.spacing(6))]: {
      width: 750,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: 'calc(50% - 12px)',
    left: 'calc(50% - 12px)',
  },
  rootLoading: {
      height: "inherit",
      display: "flex",
      justifyContent: "center",
      width: '100%',
      alignItems: "center",
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(2),
      //textAlign: 'center',
  },
  root: {
    margin: theme.spacing(2),
    marginBottom: theme.spacing(2),
    marginTop: 0,
  },
  media: {
    height: '0',
    paddingTop: '125%',
    borderRadius: '12px',
  },
  avatar: {
      width: theme.spacing(7),
      height: theme.spacing(7),
      //paddingRight: theme.spacing(1),
  },
  imgContainer: {
    display: 'flex', 
    overflowX: 'auto',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    [theme.breakpoints.up(750 + theme.spacing(6))]: {
      flexWrap: 'wrap',
      overflowX: 'auto',
    }
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

function groupBy(xs, key) {
  return xs.reduce(function(rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};

function renderLoadingButton(classes) {
    return (
      <div className={classes.rootLoading} style={{padding: '8px'}}>
        <CircularProgress size={24} className={classes.buttonProgress} />
      </div>
    )
  } 

class LandingPage extends React.Component {

  constructor(props) {
    super(props)

    this.isLoaded = this.isLoaded.bind(this);
  }

  componentDidMount() {
    if (!this.isLoaded()) {
        this.props.getAllPosts();
    }

    this.props.setTitle('Blog Yazıları')
  }

  isLoaded() {
    var loaded = this.props.apiAllPosts != undefined &&
      this.props.apiAllPosts.isGetLoading != true &&
      this.props.apiAllPosts.data != undefined;

      return loaded;
  }

  render() {
    const { classes } = this.props;
    const showLoader = !this.isLoaded();
    const posts = showLoader ? undefined : this.props.apiAllPosts.data.filter(p => p['userId'] == 'demo');
    const postsPerUser = showLoader ? undefined : groupBy(posts, 'userId');
    const ratio = isWidthUp('xs', this.props.width) ? (750 - 64) / 4 : 40;
    const unit = isWidthUp('xs', this.props.width) ? 'px' : 'vw';

    return (
      <React.Fragment >
        <CssBaseline />

        {/* <HeaderV2 static 
          onBackButton={"/"}
          title={"Blog Yazıları"}
        /> */}

        <main className={classes.layoutToolbar} style={{margin:'auto'}}>
            { showLoader && <CircularLoader /> }
            { !showLoader && Object.keys(postsPerUser).map((userId) => {
                if (postsPerUser[userId].filter(post => post.postImg != undefined).length == 0) {
                  return;
                }

                // postsPerUser[userId] = postsPerUser[userId].concat(postsPerUser[userId])
                // postsPerUser[userId] = postsPerUser[userId].concat(postsPerUser[userId])
                postsPerUser[userId] = postsPerUser[userId].filter(post => post.postImg != undefined)
                var postCount = postsPerUser[userId].length

                return (
                  <Card elevation={0} key={userId} style={{marginBottom: '16px'}}>
                    <CardActionArea component={ExtendedLink} to={{ pathname: `/${userId}`, state: {fromUrl: '/blog'}}} >
                      <CardHeader
                        style={{paddingLeft: '24px', paddingBottom: '8px'}}
                        avatar={
                          <Avatar src={userService.getStaticFileUri(postsPerUser[userId][0].userImg)} className={classes.avatar} />
                        }
                        // action={
                        //   <IconButton aria-label="settings">
                        //     <MoreVertIcon />
                        //   </IconButton>
                        // }
                        title={postsPerUser[userId][0].userFullName}
                        subheader={postsPerUser[userId][0].userUnvan || 'Diyetisyen'}
                      />
                      {/* <CardMedia
                        className={classes.media}
                        image={userService.getStaticFileUri(post.postImg || '')}
                        title="Paella dish"
                      /> */}
                      </CardActionArea>
                      <CardContent style={{padding: 0}}>
                        <div className={classes.imgContainer}>
                          {postsPerUser[userId].map((post, idx) => 
                            <ExtendedLink
                              key={post.postId}
                              to={{pathname: `/${userId}/blog/${post.postId}`, state: {fromUrl: '/blog'}}}
                            >
                              <Image
                                imageStyle={{ left: '8px', borderRadius: '8px', height: `calc(${1920.0/1080.0 * ratio}${unit})`, width: `calc(${ratio}${unit})`}}
                                style={{paddingLeft: `calc(${ratio}${unit} + ${idx != postCount - 1 ? '0px' : '8px'})`, paddingRight: '8px', paddingTop: `calc(${1920.0/1080.0 * ratio}${unit} + 8px)`, width: `${ratio}${unit}`}}
                                aspectRatio={1080.0/1920}
                                src={userService.getStaticFileUri(post.postImg || '') }
                              /> 
                            </ExtendedLink>
                          )}
                        </div>
                      </CardContent>
                    {/* <CardActions disableSpacing>
                      <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                      </IconButton>
                      <IconButton aria-label="share">
                        <ShareIcon />
                      </IconButton>
                    </CardActions> */}
                  </Card>
                )
              })
            }
        </main>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
    return {
        apiAllPosts: state.apiAllPosts,
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return bindActionCreators(
      {
        getAllPosts: () => getAllPosts(),
      },
      dispatch
    );
  };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTheme(withWidth()(withStyles(styles)(LandingPage))));