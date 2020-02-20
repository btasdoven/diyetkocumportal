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

import Header from "../../components/Header";

const styles = theme => ({
    root: {
        //margin: theme.spacing(1),
        marginTop: theme.spacing(7),
        //backgroundColor: 'rgb(255,255,255)'
    },
    avatar: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
    card: {
      marginBottom: theme.spacing(1),
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
                <Header
                    noButton={true}
                    permanentDrawer={false}
                    title={"DİYET KOÇUM RANDEVU PORTALI"}
                />
                <main style={{
                    maxWidth: '800px',
                    paddingLeft: '8px',
                    paddingRight: '8px',
                    paddingBottom: '56px',
                    width: '100%',
                    margin: 'auto'}}
                >
                    <Card variant="outlined" className={classes.card}>
                        <CardHeader
                        avatar={
                            <Avatar className={classes.avatar} alt={user.name} src={user.url} />
                        }
                        title={<Typography variant="h5" component="h2">{user.name}</Typography>}
                        subheader={user.unvan}
                        />
                    </Card>
                    <span>
                        <Card variant="outlined" className={classes.card}>
                        <CardHeader
                            style={{textAlign: 'center'}}
                            title={
                            <Rating readOnly={true} value={5} size="large" />
                            }
                        />
                        <CardContent style={{paddingTop:0}}>
                            <Grid container>
                            <Grid item xs={12}>
                                <div>
                                <Typography variant="body2" style={{textAlign: 'center'}}>
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
                        <div className={classes.rootTypeSelect}>
                            {user.online_diyet == true && <Button style={{margin: '24px'}} variant="contained" color="primary" onClick={() => this.props.onComplete('onlinediyet')}>ONLİNE DİYETE BAŞLA</Button>}
                            <Button variant="contained" color="secondary" onClick={() => this.props.onComplete('randevu')}>YÜZ YÜZE RANDEVU AL</Button>
                        </div>
                    </span>
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
