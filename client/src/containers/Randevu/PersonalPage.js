import React from 'react';

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

import Header from "../../components/Header";

const styles = theme => ({
    root: {
        //margin: theme.spacing(1),
        marginTop: theme.spacing(7),
        background: 'linear-gradient(to right bottom, #f5f5f5, #f5f5f5)'
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
        backgroundColor: '#f5f5f5',
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
        textAlign: 'center',
        //position: 'absolute',
        //top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
});

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
            <div className={classes.root}>
                <main style={{
                    maxWidth: '800px',
                    paddingLeft: '8px',
                    paddingRight: '8px',
                    paddingBottom: '56px',
                    width: '100%',
                    margin: 'auto'
                }}
                >
                    <AppBar position="absolute" elevation={0} className={classes.appBar} >
                        <Toolbar>
                            <Box mx={1}>
                                <Avatar src="/static/favicon.png" className={classes.smallavatar} />
                            </Box>
                            <Typography style={{ fontWeight: '800', flex: 1 }} className={classes.appBar} variant="subtitle1" component="h5">DiyetKoçum</Typography>
                            <Button style={{ display: 'flex', padding: 0, minHeight: 0, minWidth: 0 }} href={"https://instagram.com/" + this.props.userId}>
                                <InstagramIcon style={{ fontSize: 30, color: "white" }} />
                            </Button>
                        </Toolbar>
                    </AppBar>

                    <Grid container spacing={0} direction="column" alignItems="center" justify="center">
                        <Box my={4} borderRadius="50%">
                            <Avatar className={classes.avatar} alt={user.name} src={user.url} />
                        </Box>

                        <Typography style={{ fontWeight: '600' }} className={classes.text} variant="h5" component="h2">{user.unvan}</Typography>
                        <Typography style={{ fontWeight: '500' }} className={classes.text} variant="h3" component="h2">{user.name}</Typography>

                        <div className={classes.rootTypeSelect}>
                            {user.online_diyet == true && <Button style={{ fontSize: '16px', fontWeight: '600', backgroundColor: "#fc5185", margin: '24px' }} color="primary" size="large" variant="contained" onClick={() => this.props.onComplete('onlinediyet')}>ONLİNE DİYETE BAŞLA</Button>}
                            <Button style={{ fontSize: '16px', fontWeight: '600', border: '2px solid', color: "#05386b" }} color="red" size="large" variant="outlined" onClick={() => this.props.onComplete('randevu')}>YÜZ YÜZE RANDEVU AL</Button>
                        </div>

                        <Box my={10} borderRadius="50%">
                            <Rating readOnly={true} value={5} size="large" />
                        </Box>





                        <Card className={classes.card}>
                            <CardHeader
                                style={{ textAlign: 'center' }}
                                title={
                                    <Box my={1}>
                                        <Typography style={{ fontWeight: '600' }} className={classes.text} variant="h5" component="h2">HAKKIMDA</Typography>
                                    </Box>
                                }
                            />
                            <CardContent style={{ paddingTop: 0 }}>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <div>
                                            <Typography variant="body1" style={{ textAlign: 'center' }} className={classes.text} >
                                                {user.ozgecmis ||
                                                    `Merhaba, Ben ${user.unvan || ''} ${user.name}! Siz değerli danışanlarıma zayıflama, kilo alma, kilo verme, hamilelik ve emzirme döneminde beslenme, hastalıklarda beslenme, sporcu beslenmesi, vegan/vejetaryen diyet gibi farklı alanlarda sağlıklı beslenme ve diyet danışmanlığı hizmeti vermekteyim.`
                                                }
                                                <br />
                                                <br />
                                                {user.online_diyet == true
                                                    ? "Online diyet yapmaktayım. Aşağıdan yüz yüze randevu ya da online diyeti seçerek daha sağlıklı ve kaliteli bir yaşama ilk adımını atabilirsin 🍏💪🙏"
                                                    : "Yalnızca yüz yüze randevu vermekteyim. Daha sağlıklı ve kaliteli bir yaşama ilk adımını aşağıdan atabilirsin 🍏💪🙏"}
                                            </Typography>
                                        </div>
                                    </Grid>
                                </Grid>
                            </CardContent>
                            {/* </div> */}
                        </Card>
                        <Box my={3} />

                        {user.address && (
                            <Card className={classes.card}>
                                <CardHeader
                                    style={{ textAlign: 'center' }}
                                    title={
                                        <Box my={1}>
                                            <Typography style={{ fontWeight: '600' }} className={classes.text} variant="h5" component="h2">OFİS</Typography>
                                        </Box>
                                    }
                                />
                                <CardContent style={{ paddingTop: 0 }}>
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <div>
                                                <Typography variant="body1" style={{ textAlign: 'center' }} className={classes.text} >
                                                    {user.address}
                                                </Typography>
                                            </div>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                                {/* </div> */}
                            </Card>
                        )}

                        <Box my={2} />
                        <Grid container spacing={0} direction="row" alignItems="center" justify="center">
                            <Button href={"https://instagram.com/" + this.props.userId} style={{ textTransform: "none" }}>
                                <InstagramIcon style={{ fontSize: 36 }} className={classes.text} />
                                <Typography style={{ fontWeight: '600' }} className={classes.text} variant="h5" component="h5">{'/' + this.props.userId}</Typography>
                            </Button>
                        </Grid>
                    </Grid>
                </main>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
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
)(withStyles(styles)(PersonalPage));
