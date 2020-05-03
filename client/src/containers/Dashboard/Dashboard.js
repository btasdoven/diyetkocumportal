import React from 'react';
import { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from "@material-ui/core/styles";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import RewardCard from './RewardCard'
import InfoCard from './InfoCard'
import InfoCard2 from './InfoCard2'
import InfoCard3 from './InfoCard3'

const styles = theme => ({
    root: {
        //height: 'calc(100vh - 48px)',
        padding: theme.spacing(1),
        width: '100%',
        maxWidth: '800px',
        margin: 'auto'
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

class Dashboard extends React.Component {
  
    constructor(props) {
      super(props);
    }
  
    render() {
        const { classes } = this.props;
        const showLoader = false;
    
        return (
            <div className={classes.root}>
                { showLoader && renderLoadingButton(classes) }
                { !showLoader && 
                    <Fragment>
                        <Grid container>
                            <Grid item xs={12} sm={12} md={12} lg={12} style={{padding: '8px'}}>
                                <Typography variant="h5" style={{color: 'rgb(50, 50, 93)'}}>Bildirimler</Typography>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12} style={{padding: '8px'}}>
                                <InfoCard />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12} style={{padding: '8px'}}>
                                <RewardCard />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12} style={{padding: '8px'}}>
                                <Typography variant="h5" style={{color: 'rgb(50, 50, 93)'}}>İstatistikler</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={4} style={{padding: '8px'}}>
                                <InfoCard3 
                                    // title="19 MAYIS 2020 - 23 NİSAN 2020" 
                                    value="44" 
                                    unit="PROFİL ZİYARETİ"
                                    img="//www.gstatic.com/mobilesdk/160505_mobilesdk/discoverycards/2x/hosting.png"
                                    styles={{background: '#172568', color: '#fff'}} 
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={4} style={{padding: '8px'}}>
                                <InfoCard3 
                                    // title="19 MAYIS 2020 - 23 NİSAN 2020" 
                                    value="13" 
                                    unit="KAYITLI DANIŞANLARIM"
                                    img="//www.gstatic.com/mobilesdk/160505_mobilesdk/discoverycards/2x/auth.png"
                                    styles={{background: '#ab60b8', color: '#fff'}} 
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={4} style={{padding: '8px'}}>
                                <InfoCard3 
                                    // title="19 MAYIS 2020 - 23 NİSAN 2020" 
                                    value="27" 
                                    unit="RANDEVULARIM"
                                    img="//www.gstatic.com/mobilesdk/160505_mobilesdk/discoverycards/2x/testlab.png"
                                    styles={{background: '#00b098', color: '#fff'}} 
                                />
                            </Grid>
                            {/* <Grid item xs={12} sm={6} md={4} lg={4} style={{padding: '8px'}}>
                                <InfoCard2 />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={4} style={{padding: '8px'}}>
                                <InfoCard2 />
                            </Grid> */}
                        </Grid>
                    </Fragment>
                }
            </div>
        );
      }
  };
  
const mapStateToProps = state => {
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
)(withStyles(styles)(Dashboard));


