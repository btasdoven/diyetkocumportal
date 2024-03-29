
import { Box } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CircularProgress from '@material-ui/core/CircularProgress';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import 'github-markdown-css';
import Image from 'material-ui-image';
import React from 'react';
import ReactMarkdown from 'react-markdown/with-html';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ExtendedLink from '../../components/ExtendedLink';
import { userService } from '../../services/user.service';
import { getDietitianProfile } from '../../store/reducers/api.dietitianProfile';
import CircularLoader from "../../components/CircularLoader";

const styles = theme => ({
    root: {
        //background: 'linear-gradient(to right bottom, #f5f5f5, #f5f5f5)'
        //backgroundColor: '#fdfdfd',
        backgroundColor: 'white',
    },
    avatar: {
        width: theme.spacing(24),
        height: theme.spacing(24),
        borderWidth: 7,
        borderColor: '#fc5185',
        borderStyle: 'solid'
    },
    avatar2: {
        width: theme.spacing(7),
        height: theme.spacing(7),
        marginRight: theme.spacing(1),
    },
    appBar: {
        background: "#364f6b",
        color: "#f5f5f5"
    },
    card: {
        marginBottom: theme.spacing(1),
        //backgroundColor: '#f5f5f5',
        width: '100%',
    },
    text: {
        color: '#364f6b'
    },
    rootTypeSelect: {
        height: "inherit",
        display: "flex",
        flexDirection: 'column',
        justifyContent: "center",
        width: '100%',
        //height: 'calc(100vh - ',
        alignItems: "center",
        padding: theme.spacing(3),
        paddingTop: 0,
        textAlign: 'center',
        //position: 'absolute',
        //top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
    rootLoading: {
        height: "inherit",
        display: "flex",
        justifyContent: "center",
        width: '100%',
        alignItems: "center",
        marginTop: theme.spacing(5)
    },
    buttonProgress: {
        top: '50%',
        left: '50%',
    },
});

function renderLoadingButton(classes) {
  return (
    <div className={classes.rootLoading} style={{padding: '8px'}}>
      <CircularProgress size={24} className={classes.buttonProgress} />
    </div>
  )
} 

class BlogPage extends React.Component {
    constructor(props) {
        super(props)
        this.isLoaded = this.isLoaded.bind(this);

        this.state = {
          userId: this.props.match && this.props.match.params && this.props.match.params.diyetisyenUserName ? this.props.match.params.diyetisyenUserName : '',
          postName: this.props.match && this.props.match.params && this.props.match.params.postName ? this.props.match.params.postName : '',
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0)

        if (!this.isLoaded()) {
            this.props.getDietitianProfile(this.state.userId);
        }

        var backButtonUrl = this.props.location && this.props.location.state && this.props.location.state.fromUrl
            ? this.props.location.state.fromUrl
            : `/${this.state.userId}`

        this.props.setBackButton(backButtonUrl)
    }

    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            window.scrollTo(0, 0)
            this.setState({
                userId: this.props.match && this.props.match.params && this.props.match.params.diyetisyenUserName ? this.props.match.params.diyetisyenUserName : '',
                postName: this.props.match && this.props.match.params && this.props.match.params.postName ? this.props.match.params.postName : '',
            })
        }
    }

    isLoaded() {
        var loaded = this.props.apiDietitianProfile != undefined &&
            this.props.apiDietitianProfile[this.state.userId] != undefined &&
            this.props.apiDietitianProfile[this.state.userId].isGetLoading != true &&
            this.props.apiDietitianProfile[this.state.userId].data != undefined;

        return loaded;
    }

    render() {
        const showLoader = !this.isLoaded();
        const { classes } = this.props;
        
        if (showLoader) {
            return <CircularLoader />;
        }

        var userProfile = this.props.apiDietitianProfile[this.state.userId].data;

        var post = userProfile.posts && userProfile.posts[this.state.postName] ? userProfile.posts[this.state.postName] : undefined;


        return (
            <React.Fragment >
                <CssBaseline />

                {/* <HeaderV2 static backButton={backButtonUrl}/> */}

                <div className={classes.root}>
                    <main 
                        style={{
                            maxWidth: '800px',
                            paddingLeft: '16px',
                            paddingRight: '16px',
                            paddingBottom: '32px',
                            width: '100%',
                            margin: 'auto',
                            //textAlign: 'justify',
                            color: '#364f6b',
                        }}
                    >
                        <List>
                            <ListItem component={ExtendedLink} to={`/${this.state.userId}`} style={{paddingLeft: 0}}>
                                <ListItemAvatar>
                                    <Avatar
                                        className={classes.avatar2}
                                        src={userService.getStaticFileUri(userProfile.url)}
                                        alt={userProfile.name}
                                    />
                                </ListItemAvatar>
                                <ListItemText primary={<Typography color="textPrimary">{userProfile.name}</Typography>} secondary={userProfile.unvan || 'Diyetisyen'} />
                                {/* <ListItemSecondaryAction>
                                <Checkbox
                                    edge="end"
                                    onChange={handleToggle(value)}
                                    checked={checked.indexOf(value) !== -1}
                                    inputProps={{ 'aria-labelledby': labelId }}
                                />
                                </ListItemSecondaryAction> */}
                            </ListItem>
                        </List>

                        <div className="markdown-body" 
                            style={{
                                lineHeight: '2',
                                fontSize: '18px',
                                letterSpacing: '-0.2px',
                            }}
                            //style={{fontFamily: 'Cambria, Serif'}}
                        >
                            <ReactMarkdown source={post.text} escapeHtml={false}/>
                        </div>

                        {Object.keys(userProfile.posts).length > 1 && (
                            <Card elevation={0} style={{paddingTop: '32px'}}>
                                <CardHeader
                                    style={{ textAlign: 'center' }}
                                    title={
                                        <Box my={1}>
                                            <Typography style={{ fontWeight: '600' }} className={classes.text} variant="h6">BENZER YAZILAR</Typography>
                                        </Box>
                                    }
                                />
                                <CardContent style={{ paddingTop: 0 }}>
                                    <Grid container>
                                        {Object.keys(userProfile.posts).map((blogId) => {
                                            if (blogId == this.state.postName)
                                                return;

                                            return (
                                                <Grid key={blogId} item xs={4} style={{padding: '4px'}} component={ExtendedLink} 
                                                    to={{ 
                                                        pathname: `/${this.state.userId}/blog/${blogId}`, 
                                                        state: {fromUrl: `/${this.state.userId}/blog/${this.state.postName}`}
                                                    }}
                                                >
                                                    <Image
                                                        imageStyle={{borderRadius: '8px'}}
                                                        aspectRatio={1080.0/1920}
                                                        src={userService.getStaticFileUri(userProfile.posts[blogId].img || '') }
                                                    /> 
                                                </Grid>
                                            )
                                        })}
                                    </Grid>        
                                    <Button color="secondary" component={ExtendedLink} to={'/blog'} style={{marginTop: '16px', width: '100%'}}>
                                        TÜM YAZILARI GÖR
                                    </Button>
                                </CardContent>
                            </Card>
                        )}
                    </main>
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        apiDietitianProfile: state.apiDietitianProfile,
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getDietitianProfile: (userId) => getDietitianProfile(userId),
        },
        dispatch
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(BlogPage));
