import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(({ breakpoints, spacing }) => ({
  card: {
    width: '100%',
    maxWidth: 800,
    borderRadius: spacing(1),
    color: 'rgba(0,0,0,.54)',
    transition: 'box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: '0 1px 2px 0 rgba(60,64,67,.3), 0 1px 3px 1px rgba(60,64,67,.15)',
    position: 'relative',
    overflow: 'initial',
    // display: 'flex',
    // flexDirection: 'column',
    paddingLeft: 8,
    paddingRight: 8,
    margin: 'auto',
    // [breakpoints.up('sm')]: {
    //   textAlign: 'left',
    //   flexDirection: 'row-reverse',
    // },
  },
  media: {
    flexShrink: 0,
    width: '35%',
    paddingTop: '35%',
    marginLeft: 'auto',
    marginRight: 'auto',
    [breakpoints.up('sm')]: {
      marginRight: '3%',
      width: '20%',
      paddingTop: '20%',
    },
  },
  overline: {
    color: 'rgb(50, 50, 93)',
    fontWeight: 400,
    paddingBottom: '8px',
  },
  heading: {
    // color: 'rgb(50, 50, 93)',
    fontWeight: 400,
    paddingBottom: '16px'
  },
  // button: {
  //   backgroundColor: 'rgba(255, 255, 255, 0.15)',
  //   borderRadius: 100,
  //   paddingLeft: 32,
  //   paddingRight: 32,
  //   color: 'rgb(50, 50, 93)',
  //   textTransform: 'none',
  //   width: '100%',
  //   '&:hover': {
  //     backgroundColor: 'rgba(255, 255, 255, 0.32)',
  //   },
  //   [breakpoints.up('sm')]: {
  //     width: 'auto',
  //   },
  // },
}));


function isMobileOrTablet() {
  return /(android|iphone|ipad|mobile)/i.test(navigator.userAgent);
}

function whatsappLink() {
  console.log(isMobileOrTablet());
  
  return (
    'https://' +
    (isMobileOrTablet() ? 'api' : 'web') +
    '.whatsapp.com/send?phone=19712177653'
  );
}

const RewardCard = () => {
  const styles = useStyles();
  return (
    <Card className={styles.card}>
      {/* <CardMedia className={styles.media} image={'https://jkkm.info/ui/images/awards/victory.png'} /> */}
      <CardContent className={styles.content}>
        <Typography className={styles.overline} variant={'h6'}>
          Kişisel sayfana blog yazıları ekle
        </Typography>
        <Typography className={styles.heading} variant={'subtitle2'} gutterBottom>
          Kişisel sayfan senin internetteki yeni yüzün. Sayfanı ziyaret eden danışanlarına bilgi vermek ve kendini daha iyi tanıtmak için kişisel sayfana eklemek istediğin blog yazılarını bize gönderebilirsin.
        </Typography>
        <Button onClick={() => window.open(whatsappLink(), '_blank')} className={styles.button}>BLOG YAZISI GÖNDER</Button>
      </CardContent>
    </Card>
  );
};


export default RewardCard;