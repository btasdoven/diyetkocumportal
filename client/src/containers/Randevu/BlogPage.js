import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import styled from 'styled-components';
import Geocode from "react-geocode";
import GoogleMapReact from 'google-map-react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import Image from 'material-ui-image'
import Divider from "@material-ui/core/Divider";
import CssBaseline from '@material-ui/core/CssBaseline';
import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import ReactMarkdown from 'react-markdown/with-html'

import 'github-markdown-css'

import MenuRoundedIcon from '@material-ui/icons/MenuRounded';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles';

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Rating from '@material-ui/lab/Rating';
import Grid from '@material-ui/core/Grid';
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { AppBar, Toolbar, Box } from "@material-ui/core";
import InstagramIcon from '@material-ui/icons/Instagram';

import HeaderV2 from "../../components/Header/HeaderV2";
import { userService } from '../../services/user.service'
import { getDietitianProfile } from '../../store/reducers/api.dietitianProfile';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
    root: {
        //background: 'linear-gradient(to right bottom, #f5f5f5, #f5f5f5)'
        backgroundColor: '#fdfdfd'
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
    }
});

function renderLoadingButton(classes) {
  return (
    <div className={classes.rootLoading}>
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
            return renderLoadingButton(classes);
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
                            <ListItem component={Link} to={`/${this.state.userId}`} style={{paddingLeft: 0}}>
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

                        <div className="markdown-body" style={{fontFamily: 'Cambria, Serif'}}>
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
                                                <Grid key={blogId} item xs={4} style={{padding: '4px'}} component={Link} 
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
                                    <Button color="secondary" component={Link} to={'/blog'} style={{marginTop: '16px', width: '100%'}}>
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
