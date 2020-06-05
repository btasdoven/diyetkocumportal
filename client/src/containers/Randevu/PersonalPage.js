import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"
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

import { userService } from '../../services/user.service'
import { getDietitianProfile } from '../../store/reducers/api.dietitianProfile';

import CommentList from './CommentList'

const styles = theme => ({
    root: {
        //background: 'linear-gradient(to right bottom, #f5f5f5, #f5f5f5)'
        //backgroundColor: '#fdfdfd'
        backgroundColor: 'white'
    },
    avatar: {
        width: theme.spacing(24),
        height: theme.spacing(24),
        borderWidth: 7,
        borderColor: '#fc5185',
        borderStyle: 'solid'
    },
    smallavatar: {
        width: theme.spacing(5),
        height: theme.spacing(5),
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
        // color: '#364f6b'
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

const MarkerWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 18px;
  height: 18px;
  background-color: #000;
  border: 2px solid #fff;
  border-radius: 100%;
  user-select: none;
  transform: translate(-50%, -50%);
  cursor: ${props => (props.onClick ? 'pointer' : 'default')};
  &:hover {
    z-index: 1;
  }
`;

const MyMapComponent = compose(
    withProps({
      googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDOdRysM2gyUv8wqF41DrNK9l6DzRRqmAE",
      loadingElement: <div style={{ height: `100%` }} />,
      containerElement: <div style={{ height: `250px` }} />,
      mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap
  )((props) =>
    <GoogleMap
        disableDefaultUI={true}
        defaultCenter={{ lat: props.lat, lng: props.lng }}
        defaultZoom={props.zoom}
        defaultOptions={{
            //styles: mapStyle,
           // these following 7 options turn certain controls off see link below
            streetViewControl: false,
            scaleControl: false,
            mapTypeControl: false,
            panControl: false,
            zoomControl: false,
            rotateControl: false,
            fullscreenControl: false,
            //
            gestureHandling : "none",
            keyboardShortcuts: false,
        }}
    >
        {props.isMarkerShown && (
            <Marker position={{ lat: props.lat, lng: props.lng }} onClick={props.onMarkerClick}>
                <InfoWindow
                    //defaultPosition={{ lat: props.lat, lng: props.lng }}
                >
                    <div style={{textAlign: 'center'}}>
                        <Typography variant="body2" style={{paddingBottom: '16px'}}>{props.address}</Typography> 
                        <Button size="small" variant="contained" color="secondary" target="_blank" href={`https://www.google.com/maps/dir/?api=1&destination=${props.lat},${props.lng}`}>YOL TARİFİ AL</Button>
                    </div>
                </InfoWindow>
            </Marker>
        )}
    </GoogleMap>
  )

class PersonalPage extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        window.scrollTo(0, 0)
    }

    render() {
        var user = this.props.dietitianProfile;
        const { classes } = this.props;

        return (
            <React.Fragment >
                <CssBaseline />

                <div className={classes.root}>
                    <main style={{
                        maxWidth: '800px',
                        paddingLeft: '8px',
                        paddingRight: '8px',
                        paddingBottom: '64px',
                        width: '100%',
                        margin: 'auto'
                    }}
                    >
                        {/* <AppBar position="absolute" elevation={0} className={classes.appBar} >
                            <Toolbar>
                                <Box mx={1}>
                                    <Avatar src="/static/favicon.png" className={classes.smallavatar} />
                                </Box>
                                <Typography style={{ fontWeight: '800', flex: 1 }} className={classes.appBar} variant="subtitle1" component="h5">DiyetKoçum</Typography>
                                <Button style={{ display: 'flex', padding: 0, minHeight: 0, minWidth: 0 }} href={"https://instagram.com/" + this.props.userId}>
                                    <InstagramIcon style={{ fontSize: 30, color: "white" }} />
                                </Button>
                            </Toolbar>
                        </AppBar> */}

                        <Grid container spacing={0} direction="column" alignItems="center" justify="center">
                            <Box my={4} borderRadius="50%">
                                <Avatar className={classes.avatar} alt={user.name} src={userService.getStaticFileUri(user.url)} />
                            </Box>

                            <Typography style={{ fontWeight: '600', color: '#32325d' }} className={classes.text} variant="h5" component="h2">{user.unvan}</Typography>
                            <Typography style={{ fontWeight: '500', textAlign:'center', color: '#32325d' }} className={classes.text} variant="h4" component="h1">{user.name}</Typography>

                            <Box my={3} borderRadius="50%">
                                <Rating readOnly={true} value={5} size="large" />
                            </Box>

                            <div className={classes.rootTypeSelect}>
                                {user.online_diyet == true && <Button style={{ fontSize: '16px', fontWeight: '600', backgroundColor: "#fc5185", margin: '24px', marginTop: 0 }} color="primary" size="large" variant="contained" onClick={() => this.props.onComplete('onlinediyet')}>ONLİNE DİYETE BAŞLA</Button>}
                                {Object.keys(user.addresses).length > 0 && <Button style={{ fontSize: '16px', fontWeight: '600', border: '2px solid', color: "#05386b" }} size="large" variant="outlined" onClick={() => this.props.onComplete('randevu')}>YÜZ YÜZE RANDEVU AL</Button>}
                            </div>

                            {(Object.keys(user.addresses).length > 0 || user.online_diyet == true) && 
                                <Typography variant="caption" style={{ textAlign: 'center', padding: '24px', paddingTop: '8px' }} className={classes.text} >
                                    Diyetisyeniniz ile gerçekleştireceğiniz online ya da yüz yüze randevular diyetisyeninizin belirleyeceği ücrete tabidir.
                                </Typography>
                            }

                            {/* <Divider /> */}

                            <Card elevation={0} className={classes.card}>
                                <CardHeader
                                    style={{ textAlign: 'center' }}
                                    title={
                                        <Typography variant="h5" style={{color: '#32325d', fontWeight: 400}}>Hakkımda</Typography>
                                        // <Box my={1}>
                                        //     <Typography style={{ fontWeight: '600', color: 'rgb(50, 50, 93)' }} className={classes.text} variant="h6">HAKKIMDA</Typography>
                                        // </Box>
                                    }
                                />
                                <CardContent style={{ paddingTop: 0 }}>
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <div>
                                                <Typography variant="body1" color="textSecondary" className={classes.text} >
                                                    {user.ozgecmis ||
                                                        `Merhaba, Ben ${user.unvan || ''} ${user.name}! Siz değerli danışanlarıma zayıflama, kilo alma, kilo verme, hamilelik ve emzirme döneminde beslenme, hastalıklarda beslenme, sporcu beslenmesi, vegan/vejetaryen diyet gibi farklı alanlarda sağlıklı beslenme ve diyet danışmanlığı hizmeti vermekteyim.`
                                                    }
                                                </Typography>
                                            </div>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                                {/* </div> */}
                            </Card>

                            {user.uzmanlik_alanlari && 
                                <Card elevation={0} className={classes.card}>
                                    <CardHeader
                                        style={{ textAlign: 'center' }}
                                        title={
                                            <Typography variant="h5" style={{color: '#32325d', fontWeight: 400}}>Uzmanlık Alanlarım</Typography>
                                            // <Box my={1}>
                                            //     <Typography style={{ fontWeight: '600', color: 'rgb(50, 50, 93)' }} className={classes.text} variant="h6">UZMANLIK ALANLARIM</Typography>
                                            // </Box>
                                        }
                                    />
                                    <CardContent style={{ paddingTop: 0 }}>
                                        <Grid container>
                                            <Grid item xs={12}>
                                                <div>
                                                    <Typography variant="body1" color="textSecondary" className={classes.text} >
                                                        {user.uzmanlik_alanlari}
                                                    </Typography>
                                                </div>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                    {/* </div> */}
                                </Card>
                            }

                            <Box my={1} />

                            {user.badges && Object.keys(user.badges).length > 0 && (
                                <Card elevation={0} className={classes.card}>
                                    <CardHeader
                                        style={{ textAlign: 'center' }}
                                        title={
                                            <Typography variant="h5" style={{color: '#32325d', fontWeight: 400}}>Rozetlerim</Typography>
                                            // <Box my={1}>
                                            //     <Typography style={{ fontWeight: '600', color: 'rgb(50, 50, 93)' }} className={classes.text} variant="h6">ROZETLERİM</Typography>
                                            // </Box>
                                        }
                                    />
                                    <CardContent style={{ paddingTop: 0 }}>
                                        <Grid container>
                                            {Object.keys(user.badges).map((b) => (
                                                <Grid key={b} item xs={3}>
                                                    <Image
                                                        src={user.badges[b].url}
                                                    /> 
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </CardContent>
                                    {/* </div> */}
                                </Card>
                            )}

                            {user.addresses && Object.keys(user.addresses).length > 0 && (
                                <Card elevation={0} className={classes.card}>
                                    <CardHeader
                                        style={{ textAlign: 'center' }}
                                        title={
                                            <Typography variant="h5" style={{color: '#32325d', fontWeight: 400}}>{Object.keys(user.addresses).length == 1 ? "Ofis Adresim" : "Ofis Adreslerim"}</Typography>
                                            // <Box my={1}>
                                            //     <Typography style={{ fontWeight: '600' }} className={classes.text} variant="h6">
                                            //         {Object.keys(user.addresses).length == 1 ? "OFİS ADRESİM" : "OFİS ADRESLERİM"}
                                            //     </Typography>
                                            // </Box>
                                        }
                                    />
                                    <CardContent style={{ paddingTop: 0 }}>
                                        <Grid container>
                                            {Object.keys(user.addresses).map((address, idx) => {
                                                var ad = user.addresses[address];
                                                
                                                if (ad.latlng == undefined)
                                                    return (
                                                        <Grid key={address} item xs={12}>
                                                            <div>
                                                                <Typography variant="body1" style={{ textAlign: 'center' }} className={classes.text} >
                                                                    {ad.address}
                                                                </Typography>
                                                            </div>
                                                        </Grid>
                                                    )
                                                else
                                                return (
                                                    <Grid key={address+"_2"} item xs={12} style={{paddingTop: idx == 0 ? 0 : '16px'}} >
                                                        <MyMapComponent 
                                                            address={ad.address}
                                                            lat={ad.latlng.lat} 
                                                            lng={ad.latlng.lng} 
                                                            zoom={ad.latlng.zoom}
                                                            isMarkerShown />
                                                    </Grid>
                                                )
                                            })}
                                        </Grid>
                                    </CardContent>
                                </Card>
                            )}

                            {user.posts && Object.keys(user.posts).length > 0 && (
                                <Card elevation={0} className={classes.card}>
                                    <CardHeader
                                        style={{ textAlign: 'center' }}
                                        title={
                                            <Typography variant="h5" style={{color: '#32325d', fontWeight: 400}}>Blog Yazılarım</Typography>
                                            /* <Typography style={{ fontWeight: '600' }} className={classes.text} variant="h6">BLOG YAZILARIM</Typography> */
                                        }
                                    />
                                    <CardContent style={{ paddingTop: 0 }}>
                                        <Grid container>
                                            {Object.keys(user.posts).map((blogId) => (
                                                <Grid key={blogId} item xs={4} style={{padding: '4px'}} component={Link} to={`/${this.props.userId}/blog/${blogId}`}>
                                                    <Image
                                                        imageStyle={{borderRadius: '8px'}}
                                                        aspectRatio={1080.0/1920}
                                                        src={userService.getStaticFileUri(user.posts[blogId].img || '') }
                                                    /> 
                                                </Grid>
                                            ))}
                                            
                                        </Grid>
                                    </CardContent>
                                </Card>
                            )}

                            <Card elevation={0} className={classes.card}>
                                <CardHeader
                                    style={{ textAlign: 'center' }}
                                    title={
                                        <Typography variant="h5" style={{color: '#32325d', fontWeight: 400}}>Danışan Görüşleri</Typography>
                                        // <Box my={1}>
                                        //     <Typography style={{ fontWeight: '600' }} className={classes.text} variant="h6">YORUMLAR</Typography>
                                        // </Box>
                                    }
                                />
                                <CardContent style={{ paddingTop: 0 }}>
                                    <CommentList userId={this.props.userId} />
                                </CardContent>
                            </Card>

                            <Box my={2} />

                            <Grid container spacing={0} direction="row" alignItems="center" justify="center">
                                <Button href={"https://instagram.com/" + this.props.userId} style={{ textTransform: "none" }}>
                                    <InstagramIcon style={{ fontSize: 36, color: '#32325d' }} className={classes.text} />
                                    <Typography style={{ fontWeight: '600',color: '#32325d' }} className={classes.text} variant="h5" component="h5">{'/' + this.props.userId}</Typography>
                                </Button>
                            </Grid>
                        </Grid>
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
)(withStyles(styles)(PersonalPage));
