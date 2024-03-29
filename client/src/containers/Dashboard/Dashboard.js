
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import { withStyles } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ExtendedLink from '../../components/ExtendedLink';
import { registerEvent } from '../../components/Signin/PageTracker';
import { getDanisanPreviews } from '../../store/reducers/api.danisanPreviews';
import { getDietitianAppointments } from '../../store/reducers/api.dietitianAppointments';
import { getDietitianProfile } from '../../store/reducers/api.dietitianProfile';
import InfoCard from './InfoCard';
import InfoCard3 from './InfoCard3';
import CircularLoader from '../../components/CircularLoader';




const styles = theme => ({
    root: {
        //height: 'calc(100vh - 48px)',
        padding: theme.spacing(1),
        paddingTop: 0,
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

function isMobileOrTablet() {
  return /(android|iphone|ipad|mobile)/i.test(navigator.userAgent);
}

function whatsappLink() {
  // console.log(isMobileOrTablet());
  
  return (
    'https://' +
    (isMobileOrTablet() ? 'api' : 'web') +
    '.whatsapp.com/send?phone=19712177653'
  );
}

class Dashboard extends React.Component {
  
    constructor(props) {
        super(props);

        this.isLoadedDanisan = this.isLoadedDanisan.bind(this);
        this.isLoadedDanisan = this.isLoadedDanisan.bind(this);
        this.isLoadedAppointment = this.isLoadedAppointment.bind(this);
      
        this.state = {
            userId: JSON.parse(localStorage.getItem('user')).id,
        }
    }

    isLoadedProfile() {
      var loaded = this.props.apiDietitianProfile != undefined &&
        this.props.apiDietitianProfile[this.state.userId] != undefined &&
        this.props.apiDietitianProfile[this.state.userId].isGetLoading != true &&
        this.props.apiDietitianProfile[this.state.userId].data != undefined;
  
        return loaded;
    }

    isLoadedDanisan() {  
      var loaded = this.props.apiDanisanPreviews != undefined &&
        this.props.apiDanisanPreviews[this.state.userId] != undefined &&
        this.props.apiDanisanPreviews[this.state.userId].isGetLoading != true &&
        this.props.apiDanisanPreviews[this.state.userId].data != undefined;
  
        return loaded;
    }

    isLoadedAppointment() {
      var loaded = this.props.apiDietitianAppointments != undefined &&
        this.props.apiDietitianAppointments[this.state.userId] != undefined &&
        this.props.apiDietitianAppointments[this.state.userId].isGetLoading != true &&
        this.props.apiDietitianAppointments[this.state.userId].data != undefined;
  
        return loaded;
    }

    componentDidMount() {
      if (!this.isLoadedProfile()) {
        this.props.getDietitianProfile(this.state.userId);
      }
      if (!this.isLoadedDanisan()) {
        this.props.getDanisanPreviews(this.state.userId);
      }
      if (!this.isLoadedAppointment()) {
        this.props.getDietitianAppointments(this.state.userId);
      }
    }
  
    render() {
      const { classes } = this.props;
      const showLoader1 = !this.isLoadedProfile();
      const showLoader2 = !this.isLoadedDanisan();
      const showLoader3 = !this.isLoadedAppointment();
      const dietitianProfile = showLoader1 ? undefined : this.props.apiDietitianProfile[this.state.userId].data;
      const danisanPreviews = showLoader2 ? undefined : this.props.apiDanisanPreviews[this.state.userId].data;
      const appointments = showLoader3 ? undefined : this.props.apiDietitianAppointments[this.state.userId].data;

      var appointmentCount = 0

      if (appointments != undefined) {
        Object.keys(appointments).forEach((apptDay) => {
          Object.keys(appointments[apptDay].data).forEach((apptHour) => {
            ++appointmentCount;
          })
        })
      }
    
      return (
        <div className={classes.root}>
          <Grid container>
            {/* <Grid item xs={12} sm={12} md={12} lg={12} style={{padding: '8px'}}>
              <Typography variant="h5" style={{color: 'rgb(50, 50, 93)'}}>Bildirimler</Typography>
            </Grid> */}
            {/* <Grid item xs={12} sm={12} md={12} lg={12} style={{padding: '8px'}}>
              <InfoCard 
                title="Kişisel sayfana blog yazıları ekle"
                content="Kişisel sayfan senin internetteki yeni yüzün. Sayfanı ziyaret eden danışanlarına bilgi vermek ve kendini daha iyi tanıtmak için kişisel sayfana eklemek istediğin blog yazılarını bize gönderebilirsin."
                buttonText="BLOG YAZISI GÖNDER"
                onClick={() => {
                  registerEvent("SendBlogPostViaWhatsAppFromDashboard")
                  window.open(whatsappLink(), '_blank')
                }}
              />
            </Grid> */}
            <Grid item xs={12} sm={12} md={12} lg={12} style={{padding: '8px'}}>
              <InfoCard 
                Component={ExtendedLink}
                title="Arkadaşını getir, Premium kazan"
                content="Herhangi bir diyetisyen arkadaşını referans linkin üzerinden Diyet Koçum'a üye yaparak 1 hafta ücretsiz Premium kazanabilirsin."
                buttonText="ARKADAŞINI DAVET ET"
                onClick={() => {
                  registerEvent("InviteFriendFromDashboard")
                }}
                to={"/status"}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} style={{padding: '8px'}}>
              <InfoCard 
                Component={ExtendedLink}
                to={'/me'}
                title="Haritadan ofis adresini seç"
                content="Yeni eklenen bu özellik ile ofisinin konumunu kişisel sayfanda harita üzerinden gösterebilir ve danışanlarının kolayca yol tarifi almasını sağlayabilirsin."
                buttonText="ADRESİNİ ŞİMDİ SEÇ"
                onClick={() => {
                  registerEvent("AddressOnMapFromDashboard")
                }}
              />
            </Grid>
            {/* <Grid item xs={12} sm={12} md={12} lg={12} style={{padding: '8px'}}>
              <RewardCard onClick={() => registerEvent("ViewEnlerFromDashboard")} to="/enler"/>
            </Grid> */}
            <Grid item xs={12} sm={12} md={12} lg={12} style={{padding: '8px'}}>
              <Typography variant="h5" style={{color: 'rgb(50, 50, 93)'}}>İstatistikler</Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12} sm={6} md={4} lg={4} style={{padding: '8px'}}>
              { showLoader1 && <CircularLoader /> }
              { !showLoader1 && 
                <InfoCard3 
                  // title="19 MAYIS 2020 - 23 NİSAN 2020" 
                  value={dietitianProfile.pageViewCount || 0 }
                  unit="PROFİL ZİYARETİ"
                  img="//www.gstatic.com/mobilesdk/160505_mobilesdk/discoverycards/2x/hosting.png"
                  styles={{background: '#172568', color: '#fff'}} 
                />
              }
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4} style={{padding: '8px'}}>
              { showLoader2 && <CircularLoader /> }
              { !showLoader2 && 
                <InfoCard3 
                  // title="19 MAYIS 2020 - 23 NİSAN 2020" 
                  value={Object.keys(danisanPreviews).filter(d => danisanPreviews[d].visibleToDietitian != false).length}
                  unit="KAYITLI DANIŞANLARIM"
                  img="//www.gstatic.com/mobilesdk/160505_mobilesdk/discoverycards/2x/auth.png"
                  styles={{background: '#ab60b8', color: '#fff'}} 
                />
              }
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4} style={{padding: '8px'}}>
              { showLoader3 && <CircularLoader /> }
              { !showLoader3 && 
                <InfoCard3 
                  // title="19 MAYIS 2020 - 23 NİSAN 2020" 
                  value={appointmentCount}
                  unit="RANDEVULARIM"
                  img="//www.gstatic.com/mobilesdk/160505_mobilesdk/discoverycards/2x/testlab.png"
                  styles={{background: '#00b098', color: '#fff'}} 
                />
              }
            </Grid>
          </Grid>
        </div>
      );
    }
  };
  
const mapStateToProps = (state, ownProps) => {

    return {
      apiDietitianProfile: state.apiDietitianProfile,
      apiDanisanPreviews: state.apiDanisanPreviews,
      apiDietitianAppointments: state.apiDietitianAppointments,
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return bindActionCreators(
      {
        getDietitianProfile: (userId) => getDietitianProfile(userId),
        getDanisanPreviews: (userId) => getDanisanPreviews(userId),
        getDietitianAppointments: (userId, date) => getDietitianAppointments(userId, date),
      },
      dispatch
    );
  };
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(Dashboard));


